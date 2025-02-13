// hooks/useCart.ts
import { create } from 'zustand';
import { CartItem } from '@/types/checkout';

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...state.items, item] };
  }),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id.toString() !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id.toString() === id ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));