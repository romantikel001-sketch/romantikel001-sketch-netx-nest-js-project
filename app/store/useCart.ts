import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IProduct } from '@/app/types/product';
import { CartItem } from '@/app/types/cart';

interface CartStore {
  items: CartItem[];
  addItem: (product: IProduct) => void; 
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        const existing = state.items.find((i) => i.id === product.id);
        
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === product.id 
                ? { ...i, quantity: i.quantity + 1 } 
                : i
            ),
          };
        }
        
       return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);