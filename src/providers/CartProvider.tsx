import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem, Product } from '../types';
import { randomUUID } from 'expo-crypto';
import { useRouter } from 'expo-router';

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: async () => {},
  isCheckingOut: false,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
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

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId ? item : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = Number(
    items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0).toFixed(2)
  );

  // Checkout: in a real app, call your Supabase insert order API here
  const checkout = async () => {
    setIsCheckingOut(true);
    try {
      // TODO: await insertOrder({ total, items: [...] });
      await new Promise((res) => setTimeout(res, 800)); // simulate network
      setItems([]);
      router.push('/(user)/orders');
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout, isCheckingOut }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);