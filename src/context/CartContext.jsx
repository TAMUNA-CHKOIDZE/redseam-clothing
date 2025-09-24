import React, { createContext, useState, useContext, useEffect } from "react";
import { useContext as useAuthContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuthContext(AuthContext); // user ავტ კონტექსტიდან

  // key კალათისთვის User ID-ის მიხედვით
  const storageKey = user ? `cart_${user.id}` : "cart_guest";

  // კალათის დასაწყისი User ID-ის მიხედვით localStorage-იდან
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  // როცა user შეიცვლება, კალათის წამოღება თავიდან
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(storageKey);
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      setCartItems([]);
    }
  }, [storageKey]);

  // კალათის ცვლილების შენახვა storageKey-ის მიხედვით
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);

  const addToCart = (product, color, size, quantity) => {
    const variant = product.variants.find((v) => v.color === color);
    const image = variant?.image || product.cover_image || "";

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
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            color,
            size,
            quantity,
            image,
          },
        ];
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
    if (quantity < 1) {
      // თუ რაოდენობა 1-ზე ნაკლებია, წაშალე პროდუქტი
      removeFromCart(productId, color, size);
      return;
    }

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

  // localStorage-დან კალათის გასუფთავება
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
