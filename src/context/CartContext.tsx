import { createContext, useContext, useEffect, useState } from "react";

import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

interface CartContextType {
  items: CartItem[];

  addToCart: (
    product: Product,
    color: string,
    size: string,
    quantity: number,
  ) => void;

  removeFromCart: (id: number, color: string, size: string) => void;

  updateQuantity: (
    id: number,
    color: string,
    size: string,
    quantity: number,
  ) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Cart parse error:", e);
      return [];
    }
  });

  useEffect(() => {
    if (items.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);
  const addToCart = (
    product: Product,
    color: string,
    size: string,
    quantity: number,
  ) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color,
          selectedSize: size,
        },
      ];
    });
  };

  const removeFromCart = (id: number, color: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size
          ),
      ),
    );
  };

  const updateQuantity = (
    id: number,
    color: string,
    size: string,
    quantity: number,
  ) => {
    setItems((prev) =>
      prev
        .map((item) => {
          const isMatch =
            item.product.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size;

          if (!isMatch) return item;

          return {
            ...item,
            quantity: Math.max(1, quantity),
          };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
