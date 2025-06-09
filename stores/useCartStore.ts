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
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (item) =>
                set((state) => ({
                    cart: [...state.cart, item],
                })),
            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter((p) => p.id !== id),
                })),
        }),
        {
            name: 'cart-storage',
        }
    )
);
