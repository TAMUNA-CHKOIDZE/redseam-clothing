import { Link } from "react-router-dom";
import routes from "../router/routes";

function ProductCard({ product }) {
  return (
    <Link
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
  );
}

export default ProductCard;
