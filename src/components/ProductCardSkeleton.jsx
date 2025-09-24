import React from "react";

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-200 h-[300px] rounded-[10px]" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export default ProductCardSkeleton;
