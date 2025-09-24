import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import ConfirmationModal from "../components/ConfirmationModal";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);

  const handleFormSubmit = (formData) => {
    setShowModal(true); // ჩნდება ConfirmationModal
    clearCart(); // კალათის გასუფთავება
    setFormResetKey((prev) => prev + 1); // ფორმის key შეიცვლება და თავიდან დაიხატება
  };

  const handleCloseModal = () => {
    setShowModal(false); // მოდალი დაიხუროს
    navigate("/products"); // მომხმარებელი გადაიყვანოს პროდუქტების გვერდზე
  };

  return (
    <div className="px-[100px] pt-[72px] pb-[188px]">
      {showModal ? (
        <ConfirmationModal onClose={handleCloseModal} />
      ) : (
        <>
          <h1 className="heading-primary mb-[42px]">Checkout</h1>
          <div className="flex justify-between gap-x-[130px]">
            <div className="w-[1130px] bg-[#F8F6F7] px-[47px] py-[72px] rounded-[16px]">
              <h2 className="text-[#3E424A] font-medium text-[22px] leading-[100%] tracking-[0%] mb-[46px]">
                Order details
              </h2>
              <CheckoutForm key={formResetKey} onSubmit={handleFormSubmit} />
            </div>

            <div className="w-[460px] h-[635px] shrink-0 flex flex-col justify-between">
              {/* Cart Items */}
              <div className="flex flex-col gap-y-[36px] max-h-[304px] overflow-y-auto pr-[40px]">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    imageSize="large"
                  />
                ))}
              </div>

              {/* Totals */}
              {cartItems.length > 0 && (
                <div className="flex flex-col gap-y-[16px]">
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
              )}
              <button
                form="checkout-form"
                type="submit"
                className="btn btn-cta w-full h-[59px]"
              >
                Pay
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
