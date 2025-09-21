import React, { useEffect, useState } from "react";
import filterIcon from "../assets/icons/filter.svg";
import sortIcon from "../assets/icons/chevron-down.svg";
import { fetchProducts } from "../api/products";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  // პროდუქტების და pagination-ისთვის საჭირო ინფორმაციის სტეიტები
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    from: 0,
    to: 0,
    per_page: 10,
  });

  // ფილტრის და სორტირების state
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sort, setSort] = useState(""); // "" | "price" | "-price" | "created_at" | "-created_at"

  // ფილტრის და სორტის ველების გამოჩენა-გაქრობისთვის
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // priceFrom და priceTo აისახება სეითში ჩვეულებრივად onChange-ით,
  // 700 მილის შემდეგ ხდება debounce, და შეიცვლება debouncedPriceFrom და debouncedPriceTo,
  const [debouncedPriceFrom, setDebouncedPriceFrom] = useState(priceFrom);
  const [debouncedPriceTo, setDebouncedPriceTo] = useState(priceTo);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceFrom(priceFrom);
    }, 700);
    return () => clearTimeout(handler);
  }, [priceFrom]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPriceTo(priceTo);
    }, 700);
    return () => clearTimeout(handler);
  }, [priceTo]);

  // API-ის გამოძახება მაშინ, როცა debounced ველები შეიცვლება
  useEffect(() => {
    loadProducts(1, {
      priceFrom: debouncedPriceFrom,
      priceTo: debouncedPriceTo,
      sort,
    });
  }, [debouncedPriceFrom, debouncedPriceTo, sort]);

  // API-ზე პროდუქტის ჩამოტვირთვა პარამეტრებით ერთი გვერდისთვის
  const loadProducts = (page = 1, filters = {}) => {
    setLoading(true);
    setError(null);

    // API პარამეტრები
    const params = {
      priceFrom: filters.priceFrom ?? priceFrom,
      priceTo: filters.priceTo ?? priceTo,
      sort: filters.sort ?? sort,
    };

    fetchProducts(page, params)
      .then((data) => {
        setProducts(data.data);
        setMeta(data.meta);
      })
      .catch(() => setError("Error loading products"))
      .finally(() => setLoading(false));
  };

  // საწყისი ჩატვირთვა
  useEffect(() => {
    loadProducts();
  }, []);

  // გვერდის შეცვლა
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > meta.last_page) return;
    loadProducts(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ფილტრის ან სორტის ცვლილებისას
  const handleFilterSortChange = () => {
    loadProducts(1, { priceFrom, priceTo, sort });
  };

  // ფილტრის და სორტის dropdown-ების ღილაკების კლიკები
  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
    setShowSort(false);
  };

  const toggleSort = () => {
    setShowSort((prev) => !prev);
    setShowFilter(false);
  };

  // ჩატვირთვის დროს ვაჩვენებ loading-ს ტექსტის სახით და უნდა შეცვალო სკელეტონით
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // თუ შეცდომა არ არის, ვაჩვენებ ვიზუალურ შეტყობინებას
  if (error) {
    return <div className="text-center py-20 text-primary">{error}</div>;
  }

  return (
    <div className="pt-[72px] pr-[100px] pb-[216px] pl-[100px]">
      {/* title და ფილტრის, სორტირების ელემენტები */}
      <div className="flex justify-between items-center mb-[32px]">
        <h1 className="heading-primary">Products</h1>

        <div className="flex items-center">
          {/* ვაჩვენებ არჩეული 10 პროდუქტის გვერდს total page-იდან (94) */}
          <h5 className="font-normal text-[12px] leading-[100%] tracking-[0] text-dark-blue-light mr-[32px]">
            Showing {meta.from}-{meta.to} of {meta.total} results
          </h5>

          {/* ფილტრის ღილაკი და ინფუთები */}
          <div className="relative mr-[32px]">
            <div
              className="flex items-center gap-x-[8px] cursor-pointer"
              onClick={toggleFilter}
            >
              <img src={filterIcon} alt="Filter icon" />
              <span className="font-normal text-[16px] leading-[100%] tracking-[0] text-dark-blue">
                Filter
              </span>
            </div>

            {showFilter && (
              <div className="absolute top-full mt-2 bg-white p-4 rounded shadow-md flex items-center gap-x-[8px] z-10">
                <input
                  type="number"
                  min={0}
                  placeholder="from"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-[80px]"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="to"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-[80px]"
                />
              </div>
            )}
          </div>

          {/* სორტირების ღილაკი და dropdown */}
          <div className="relative">
            <div
              className="flex items-center gap-x-[4px] cursor-pointer"
              onClick={toggleSort}
            >
              <span className="font-normal text-[16px] leading-[100%] tracking-[0] text-dark-blue">
                Sort by
              </span>
              <img src={sortIcon} alt="Sort icon" />
            </div>

            {showSort && (
              <select
                className="absolute top-full mt-2 border border-gray-300 rounded p-2 text-dark-blue z-10 bg-white"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setShowSort(false);
                  handleFilterSortChange();
                }}
              >
                <option value="">Default</option>
                <option value="price">Price: High to Low</option>
                <option value="-price">Price: Low to High</option>
                <option value="created_at">Date: Oldest First</option>
                <option value="-created_at">Date: Newest First</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* პროდუქტის სია */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          // <ProductCard key={product.id} product={product} />
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* გვერდების ნავიგაცია */}
      <Pagination
        currentPage={meta.current_page}
        totalPages={meta.last_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductsPage;
