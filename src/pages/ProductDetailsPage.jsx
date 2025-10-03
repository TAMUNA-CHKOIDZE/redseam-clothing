import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products";
import cart from "../assets/icons/shopping-cart-white.svg";
import routes from "../router/routes";
import { useCart } from "../context/CartContext";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import NotFound from "./NotFound";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart(); // აქ ვიღებ CartContext-ის ფუნქციებს

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || "");
        setSelectedVariantIndex(0);
        setError(null);
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ProductDetailsSkeleton />;
  if (error) return <NotFound />;
  if (!product) return null;

  const selectedVariant = product.variants[selectedVariantIndex];
  const selectedColor = selectedVariant.color;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div className="pt-[30px] px-[100px] pb-[110px]">
      {/* Breadcrumb navigation */}
      <nav aria-label="breadcrumb" className="mb-[49px]">
        <ul className="flex items-center gap-1">
          <li className="font-light text-[14px] leading-[100%] tracking-[0%] text-dark-blue">
            <Link
              to={routes.productList}
              className="font-light text-[14px] leading-[100%] tracking-[0%] text-dark-blue"
            >
              Listing
            </Link>
          </li>
          <li className="font-light text-[14px] leading-[100%] tracking-[0%] text-dark-blue">
            /
          </li>
          <li
            aria-current="page"
            className="font-light text-[14px] leading-[100%] tracking-[0%] text-dark-blue"
          >
            {product.name}
          </li>
        </ul>
      </nav>

      <div className="flex gap-x-[168px]">
        {/* Left side images */}
        <div className="flex gap-x-[24px]">
          <div className="flex flex-col gap-y-[9px]">
            {product.variants.map((variant, index) => (
              <img
                key={index}
                src={variant.image}
                alt={`Thumbnail ${index}`}
                className="w-[121px] h-[161px] object-cover border border-[#E1DFE1] cursor-pointer"
                onClick={() => setSelectedVariantIndex(index)}
              />
            ))}
          </div>

          <div className="w-[703px] h-[937px] border border-[#E1DFE1] overflow-hidden rounded-[10px]">
            <img
              src={selectedVariant.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right side product info */}
        <div className="w-[704px]">
          <h1 className="font-poppins font-semibold text-[32px] leading-[100%] tracking-[0] text-dark-blue mb-[21px]">
            {product.name}
          </h1>

          <p className="font-poppins font-semibold text-[32px] leading-[100%] tracking-[0] text-dark-blue mb-[56px]">
            ${product.price}
          </p>

          {/* Color selector */}
          <div className="flex flex-col gap-y-[48px] w-[382px] mb-[56px]">
            <div>
              <p className="font-poppins font-normal text-[16px] leading-[100%] tracking-[0] text-dark-blue mb-[16px]">
                Color: <strong>{selectedColor}</strong>
              </p>

              <div className="flex gap-x-[13px]">
                {(product.variants ?? []).map((variant, index) => {
                  const color = variant.color.toLowerCase();
                  const isLightColor =
                    color === "#ffffff" ||
                    color === "white" ||
                    color == "navy blue";

                  return (
                    <button
                      key={index}
                      className={`w-[48px] h-[48px] rounded-full p-[5px] flex items-center justify-center cursor-pointer ${
                        index === selectedVariantIndex
                          ? "border border-[#E1DFE1]"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedVariantIndex(index)}
                    >
                      <span
                        style={{ backgroundColor: variant.color }}
                        className={`w-[38px] h-[38px] rounded-full block relative ${
                          isLightColor ? "shadow-inner shadow-black/30" : ""
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size selector */}
            <div>
              <p className="font-poppins font-normal text-base leading-[100%] tracking-normal text-dark-blue mb-[16px]">
                Size: <strong>{selectedSize}</strong>
              </p>
              <div className="flex gap-x-[8px]">
                {(product.sizes ?? []).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[70px] h-[42px] border border-[#E1DFE1] rounded-[10px] cursor-pointer font-poppins font-normal text-[16px] leading-none tracking-normal text-dark-blue ${
                      size === selectedSize ? "border-dark-blue" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="flex flex-col">
              <label className="font-poppins font-normal text-base leading-[100%] tracking-normal text-dark-blue mb-[16px]">
                Quantity
              </label>
              <div className="relative w-[70px] h-[42px]">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-full cursor-pointer border border-[#E1DFE1] rounded-[10px] px-[15px] pr-[35px] py-[9px] appearance-none text-base text-dark-blue"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-#10151F"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            className="btn btn-cta text-semibold-18 w-full h-[59px] flex items-center justify-center gap-x-[10px] mb-[56px]"
            onClick={handleAddToCart}
          >
            <img src={cart} alt="cart" />
            Add to cart
          </button>

          <hr className="border border-[#E1DFE1] mb-[56px]" />

          {/* Product details */}
          <div className="flex justify-between items-center mb-[10px]">
            <h3 className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal text-dark-blue">
              Details
            </h3>
            <img
              src={product.logo}
              alt={product.brand}
              className="w-[109px] h-[61px]"
            />
          </div>

          <p className="font-poppins font-normal text-[16px] leading-[100%] tracking-normal text-[#3E424A] mb-[20px]">
            Brand: <strong>{product.brand}</strong>
          </p>

          <p className="font-poppins font-normal text-[16px] leading-[100%] tracking-normal text-[#3E424A]">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
