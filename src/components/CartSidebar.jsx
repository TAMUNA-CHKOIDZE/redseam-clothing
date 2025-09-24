import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import routes from "../router/routes";
import empryCart from "../assets/images/oops.png";
import CartItem from "../components/CartItem";

function CartSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate(routes.checkout);
  };

  const handleStartShopping = () => {
    onClose(); // sidebar ქრება
    navigate(routes.productList); // გადადით პროდუქციის გვერდზე
  };

  return (
    // ფონის გადაფარება (dark overlay)
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isOpen ? "bg-[#10151F]/30 visible" : "invisible"
      }`}
      onClick={onClose}
    >
      {/* sidebar */}
      <div
        className={`fixed top-0 right-0 w-[540px] h-full bg-white z-50 shadow-lg py-[40px] pl-[40px] transition-transform duration-300 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-[60px] pr-[40px]">
            <h2 className="font-medium text-[20px] leading-[100%] tracking-[0] text-dark-blue">
              Shopping cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              className="text-[32px] font-medium text-[#10151F] cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="mt-[90px] flex flex-col items-center">
              <img src={empryCart} alt="cart" className="mb-[24px]" />
              <h4 className="mb-[10px] text-[#10151F] font-semibold text-[24px] leading-[100%] tracking-[0]">
                Ooops!
              </h4>
              <p className="font-normal text-[14px] leading-[100%] tracking-[0] text-[#3E424A] mb-[58px]">
                You've got nothing in your cart just yet...
              </p>
              <button
                className="btn btn-cta text-base-14 w-[241px] h-[41px]"
                onClick={handleStartShopping}
              >
                Start shopping
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col gap-y-[36px] max-h-[300px] overflow-y-auto pr-[40px]"
              style={{ maxHeight: "calc(100vh - 490px)" }}
            >
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  imageSize="small"
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer (Subtotal, Delivery, Total) */}
        {cartItems.length > 0 && (
          <div className="mt-[80px] pr-[40px]">
            <div className="mb-[80px] flex flex-col gap-y-[16px]">
              <div className="flex justify-between">
                <span className="font-normal text-[16px] leading-[100%] tracking-[0] font-poppins text-[#3E424A]">
                  Items subtotal
                </span>
                <span className="font-normal text-[16px] leading-[100%] tracking-[0] font-poppins text-[#3E424A]">
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-normal text-[16px] leading-[100%] tracking-[0] font-poppins text-[#3E424A]">
                  Delivery
                </span>
                <span className="font-normal text-[16px] leading-[100%] tracking-[0] font-poppins text-[#3E424A]">
                  $5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[20px] leading-[100%] tracking-[0] font-poppins text-[#10151F]">
                  Total
                </span>
                <span className="font-medium text-[20px] leading-[100%] tracking-[0] font-poppins text-[#10151F]">
                  $
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ) + 5}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="btn btn-cta text-semibold-18 w-full h-[59px]"
            >
              Go to checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;
