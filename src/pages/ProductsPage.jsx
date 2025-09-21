import React, { useEffect, useState } from "react";
import filterIcon from "../assets/icons/filter.svg";
import sortIcon from "../assets/icons/chevron-down.svg";
import xMark from "../assets/icons/x-mark.svg";
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

  const resetFilter = () => {
    setPriceFrom("");
    setPriceTo("");
    loadProducts(1, { priceFrom: "", priceTo: "" });
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
              <div className="absolute top-[34px] right-[0px]  bg-white rounded-[8px] z-10 w-[392px] p-[16px] border border-solid border-[#E1DFE1]">
                <h5 className="font-semibold text-base leading-none tracking-normal text-dark-blue mb-[20px]">
                  Select price
                </h5>
                <div className="flex items-center gap-x-[10px] mb-[10px]">
                  <input
                    type="number"
                    min={0}
                    placeholder="from"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    className="px-[12px] h-[42px] input"
                  />
                  <input
                    type="number"
                    min={0}
                    placeholder="to"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    className="px-[12px] h-[42px] input"
                  />
                </div>
                <div
                  className="text-right"
                  onClick={() => {
                    handleFilterSortChange();
                    setShowFilter(false);
                  }}
                >
                  <button className="btn btn-cta text-base-14 w-[124px] h-[42px]">
                    Apply
                  </button>
                </div>
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
              <div className="absolute top-[34px] right-[0px] bg-white rounded-[8px] z-10 w-[223px] p-[16px] border border-solid border-[#E1DFE1]">
                <button
                  onClick={() => {
                    setSort("-created_at");
                    setShowSort(false);
                    handleFilterSortChange();
                  }}
                  className={`block w-full text-left py-2 ${
                    sort === "-created_at" ? "text-dark-blue font-medium" : ""
                  }`}
                >
                  New products first
                </button>

                <button
                  onClick={() => {
                    setSort("price");
                    setShowSort(false);
                    handleFilterSortChange();
                  }}
                  className={`block w-full text-left py-2 ${
                    sort === "price" ? "text-dark-blue font-medium" : ""
                  }`}
                >
                  Price, low to high
                </button>

                <button
                  onClick={() => {
                    setSort("-price");
                    setShowSort(false);
                    handleFilterSortChange();
                  }}
                  className={`block w-full text-left py-2 ${
                    sort === "-price" ? "text-dark-blue font-medium" : ""
                  }`}
                >
                  Price, high to low
                </button>

                <button
                  onClick={() => {
                    setSort("");
                    setShowSort(false);
                    loadProducts(1, { priceFrom, priceTo, sort: "" });
                  }}
                  className={`block w-full text-left py-2 ${
                    sort === "" ? "text-dark-blue font-medium" : ""
                  }`}
                >
                  Default
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ფილტრაციის შედეგი  */}
      {priceFrom && priceTo && (
        <div className="items-center gap-x-[6px] border border-solid border-[#E1DFE1] px-[16px] py-[8px] inline-flex rounded-[50px] mb-[26px]">
          <h6 className="text-dark-blue font-poppins font-normal text-[14px] leading-none tracking-normal">
            Price: {priceFrom}-{priceTo}
          </h6>
          <img
            src={xMark}
            alt="x-mark"
            className="cursor-pointer"
            onClick={resetFilter}
          />
        </div>
      )}

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
