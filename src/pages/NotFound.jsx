import React from "react";
import { Link } from "react-router-dom";
import routes from "../router/routes";

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-[40px] bg-gray-lightest">
      <h1 className="font-semibold text-[64px] leading-[100%] tracking-[0%] text-primary mb-4">
        404
      </h1>
      <h4 className="heading-secondary">Oops! Page not found.</h4>
      <p className="text-base-14 text-gray-dark">
        The page you're looking for doesn't exist or has beed moved.
      </p>
      <Link
        to={routes.productList}
        className="btn btn-cta text-semibold-18 px-10 py-4"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
