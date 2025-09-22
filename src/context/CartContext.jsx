import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, color, size, quantity) => {
    setCartItems((prevItems) => {
      // მოძებნე მსგავსი პროდუქტი კალათაში (id + ფერი + ზომა)
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id && item.color === color && item.size === size
      );

      if (existingItem) {
        // თუ არის, გაზარდე რაოდენობა
        return prevItems.map((item) =>
          item.id === product.id && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // თუ არა, დაამატე ახალი პროდუქტი კალათაში
        return [...prevItems, { ...product, color, size, quantity }];
      }
    });
  };

  // პროდუქტის წაშლა კალათიდან variant-ებით
  const removeFromCart = (productId, color, size) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === productId && item.color === color && item.size === size)
      )
    );
  };

  // რაოდენობის შეცვლა variant-ებისთვის
  const updateQuantity = (productId, color, size, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // კალათაში არსებული პროდუქციის საერთო რაოდენობა
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
