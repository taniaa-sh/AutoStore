import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  model: string;
  price_usd: number;
  image: string;
  amount: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'amount'>) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const exists = state.cart.find((p) => p.id === item.id);
          if (exists) {
            return {
              cart: state.cart.map((p) =>
                p.id === item.id ? { ...p, amount: p.amount + 1 } : p
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, amount: 1 }],
            };
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        })),

      increase: (id) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === id ? { ...p, amount: p.amount + 1 } : p
          ),
        })),

      decrease: (id) =>
        set((state) => ({
          cart: state.cart
            .map((p) =>
              p.id === id ? { ...p, amount: p.amount - 1 } : p
            )
            .filter((p) => p.amount > 0),
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
);
