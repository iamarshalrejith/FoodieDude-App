import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem, Product } from "../types";

// type of context and create context
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

// Provider
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  // add item
  const addItem = (product: Product, size: CartItem["size"]) => {
    // if already in cart, increment qunatity
    const newCartItem: CartItem = {
      id: "1", // generate
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  // update quantity
  const contextValue = {
    items: items,
    addItem: addItem,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
