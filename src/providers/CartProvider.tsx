import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

// type of context and create context
type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

// Provider
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  // add item
  const addItem = (product: Product, size: CartItem["size"]) => {
    // if already in cart, increment qunatity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size,
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };

  // update quantity

  // Notes:
  // React only checks oldRef === newRef (memory address)
  // If it’s the same → no re-render
  // If it’s different → re-render

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : {
              ...item,
              quantity: item.quantity + amount,
            },
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = Number(items.reduce((sum,item)=> (sum+=(item.product.price * item.quantity)),0).toFixed(2))
  const contextValue = {
    items: items,
    addItem: addItem,
    updateQuantity: updateQuantity,
    total,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
