import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../router/routes";
import filterIcon from "../assets/icons/filter.svg";
import sortIcon from "../assets/icons/chevron-down.svg";
import { fetchProducts } from "../api/products";
import Pagination from "../components/Pagination";

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

  // ერთი გვერდის პროდუქტების ჩამოტვირთვა
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchProducts(1)
      .then((data) => {
        setProducts(data.data);
        setMeta(data.meta); // მეტა ინფო (გვერდის მონაცემები, რაც meta-ობიექტშია)
      })
      .catch(() => setError("Error loading products"))
      .finally(() => setLoading(false));
  }, []);

  // ფუნქცია გვერდის ცვლილების შემთხვევისთვის, რომელიც ჩატვირთავს შესაბამის გვერდს pageNumber-ის მიხედვით
  const handlePageChange = (pageNumber) => {
    // თუ გვერდი გადის ლიმიტებს, უარს ვამბობთ
    if (pageNumber < 1 || pageNumber > meta.last_page) return;

    setLoading(true);
    setError(null);

    fetchProducts(pageNumber)
      .then((data) => {
        setProducts(data.data);
        setMeta(data.meta);
      })
      .catch(() => setError("Error loading products"))
      .finally(() => setLoading(false));

    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <div className="mr-[32px]">
            <h5 className="font-normal text-[12px] leading-[100%] tracking-[0] text-dark-blue-light">
              Showing {meta.from}-{meta.to} of {meta.total} results
            </h5>
          </div>

          {/* ფილტრის ღილაკი */}
          <div className="flex items-center mr-[32px] gap-x-[8px] cursor-pointer">
            <img src={filterIcon} alt="Filter icon" />
            <span className="font-normal text-[16px] leading-[100%] tracking-[0] text-dark-blue">
              Filter
            </span>
          </div>

          {/* სორტირების ღილაკი */}
          <div className="flex items-center gap-x-[4px] cursor-pointer">
            <span className="font-normal text-[16px] leading-[100%] tracking-[0] text-dark-blue">
              Sort by
            </span>
            <img src={sortIcon} alt="Sort icon" />
          </div>
        </div>
      </div>

      {/* პროდუქტის სია */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <Link
            key={product.id}
            to={routes.productDetail.replace(":id", product.id.toString())}
            className="hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-shadow rounded-[10px]"
          >
            <div className="w-full h-[549px] flex items-center justify-center mb-[12px]">
              <img
                src={product.cover_image}
                alt={product.name}
                className="object-cover w-full h-full rounded-t-[10px]"
              />
            </div>
            <div>
              <h2 className="font-medium text-[18px] leading-[100%] tracking-[0] text-dark-blue">
                {product.name}
              </h2>
              <p className="font-medium text-base leading-[100%] tracking-[0] text-dark-blue mt-2">
                ${product.price}
              </p>
            </div>
          </Link>
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
