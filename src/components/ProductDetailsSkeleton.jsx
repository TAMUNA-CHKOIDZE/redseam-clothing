function ProductDetailsSkeleton() {
  return (
    <div className="pt-[30px] px-[100px] pb-[110px] animate-pulse">
      {/* Breadcrumb */}
      <div className="mb-[49px] flex gap-1">
        <div className="h-4 w-[60px] bg-gray-300 rounded"></div>
        <div className="h-4 w-3 bg-gray-300 rounded"></div>
        <div className="h-4 w-[100px] bg-gray-300 rounded"></div>
      </div>

      <div className="flex gap-x-[168px]">
        {/* Left side thumbnails */}
        <div className="flex gap-x-[24px]">
          <div className="flex flex-col gap-y-[9px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[121px] h-[161px] bg-gray-300 rounded border border-[#E1DFE1]"
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-[703px] h-[937px] bg-gray-300 rounded border border-[#E1DFE1]" />
        </div>

        {/* Right side info */}
        <div className="w-[704px] flex flex-col gap-y-[20px]">
          {/* Title */}
          <div className="h-[40px] w-[300px] bg-gray-300 rounded" />
          {/* Price */}
          <div className="h-[40px] w-[120px] bg-gray-300 rounded" />

          {/* Color selector */}
          <div className="mt-[56px]">
            <div className="h-5 w-[80px] bg-gray-300 rounded mb-4" />
            <div className="flex gap-x-[13px]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[48px] h-[48px] rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-[48px]">
            <div className="h-5 w-[70px] bg-gray-300 rounded mb-4" />
            <div className="flex gap-x-[8px]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[70px] h-[42px] bg-gray-300 rounded-[10px]"
                />
              ))}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="mt-[48px]">
            <div className="h-5 w-[80px] bg-gray-300 rounded mb-4" />
            <div className="w-[70px] h-[42px] bg-gray-300 rounded-[10px]" />
          </div>

          {/* Add to cart button */}
          <div className="mt-[56px] h-[59px] w-full bg-gray-300 rounded" />

          <hr className="border border-[#E1DFE1] my-[56px]" />

          {/* Details title */}
          <div className="flex justify-between items-center mb-[10px]">
            <div className="h-5 w-[100px] bg-gray-300 rounded" />
            <div className="w-[109px] h-[61px] bg-gray-300 rounded" />
          </div>

          {/* Brand and description */}
          <div className="h-5 w-[120px] bg-gray-300 rounded mb-[20px]" />
          <div className="h-[80px] w-full bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
