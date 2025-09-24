const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  imageSize = "large",
}) => {
  const imageStyles =
    imageSize === "large" ? "w-[100px] h-[134px]" : "w-[80px] h-[100px]";

  const priceTextSize = imageSize === "large" ? "text-[18px]" : "text-sm";

  return (
    <li className="flex items-start gap-x-[17px]">
      <img
        src={item.image}
        alt={item.name}
        className={`${imageStyles} object-cover border border-[#E1DFE1] rounded-[10px]`}
      />

      <div className="flex flex-col gap-y-[13px] flex-1">
        <div className="flex justify-between gap-x-[19px]">
          <div className="flex flex-col gap-y-[8px]">
            <h3 className="font-medium text-[14px] leading-[100%] tracking-[0] text-dark-blue">
              {item.name}
            </h3>
            <p className="font-normal text-[12px] leading-[100%] tracking-[0] text-dark-blue-light">
              {item.color}
            </p>
            <p className="font-normal text-[12px] leading-[100%] tracking-[0] text-dark-blue-light">
              {item.size}
            </p>
          </div>
          <span
            className={`font-medium ${priceTextSize} leading-[100%] tracking-[0] text-dark-blue`}
          >
            ${item.price}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-[70px] h-[26px] rounded-[100px] px-[8px] border border-[#E1DFE1]">
            <button
              className="cursor-pointer text-[#E1DFE1]"
              onClick={() =>
                onUpdateQuantity(
                  item.id,
                  item.color,
                  item.size,
                  item.quantity - 1
                )
              }
            >
              –
            </button>
            <span>{item.quantity}</span>
            <button
              className="cursor-pointer text-[#3E424A]"
              onClick={() =>
                onUpdateQuantity(
                  item.id,
                  item.color,
                  item.size,
                  item.quantity + 1
                )
              }
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id, item.color, item.size)}
            className="font-poppins font-normal text-[12px] leading-[100%] tracking-[0] text-[#3E424A] cursor-pointer hover:text-primary transition"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
