'use client';

import Image from 'next/image';
import { useCartStore } from '../../../stores/useCartStore';
import { Plus, Minus } from 'lucide-react';

function ShoppingCart() {
  const cart = useCartStore((state) => state.cart);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);

  const total = cart.reduce(
    (sum, item) => sum + item.price_usd * item.amount,
    0
  );

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col justify-between min-h-screen">
      {cart.length === 0 ? (
        <div className="text-center mt-20 text-gray-500 text-xl h-[350px]">
          Shopping cart is empty. 🛒
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6 text-blue-700 mt-20">
            🛒 Your shopping cart
          </h1>
          <div className="space-y-4 -mt-96">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.model}
                    width={100}
                    height={60}
                    className="rounded-md"
                  />
                  <div>
                    <h2 className="text-base md:text-lg font-semibold">
                      {item.model}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">
                      ${item.price_usd.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <button
                    onClick={() => decrease(item.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-xs md:text-base "
                  >
                    <Minus size={16} />
                  </button>
                  <div className="rounded-xl border border-gray-300 px-4 py-1 flex items-center justify-center">
                    {item.amount}
                  </div>
                  <button
                    onClick={() => increase(item.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-xs md:text-base"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mt-8 flex justify-between items-center border-t pt-4">
              <span className="text-base md:text-xl font-bold">
                total amount:
              </span>
              <span className="text-base md:text-xl text-blue-700 font-bold">
                ${total.toLocaleString()}
              </span>
            </div>
            <button className="text-sm md:text-lg w-full md:w-fit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
              Payment
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default ShoppingCart;
