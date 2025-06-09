'use client';

import Image from 'next/image';
import { useCartStore } from '../../../stores/useCartStore';

function ShoppingCart() {

    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const addToCart = useCartStore((state) => state.addToCart);

    const total = cart.reduce((sum: number, item) => sum + item.price_usd, 0);

    return (
        <>
            {
                cart.length === 0 ? (
                    <main className="max-w-4xl mx-auto p-6">
                        <div className="text-center mt-20 text-gray-500 text-xl h-[350px]">
                            Shopping cart is empty. 🛒
                        </div>
                    </main>
                ) :
                    <main className="max-w-4xl mx-auto  p-6">
                        <h1 className="text-2xl font-bold mb-6 text-blue-700 mt-20">🛒 Your shopping cart</h1>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between bg-white shadow rounded-xl p-4">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={item.image}
                                            alt={item.model}
                                            width={100}
                                            height={60}
                                            className="rounded-md"
                                        />
                                        <div>
                                            <h2 className="text-base md:text-lg font-semibold">{item.model}</h2>
                                            <p className="text-xs md:text-sm text-gray-500">${item.price_usd.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row items-center gap-2'>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-xs md:text-base w-20"
                                        >
                                            delete
                                        </button>
                                        <div className='rounded-xl border border-gray-300 px-4 py-1 flex items-center justify-center'>{cart.length}</div>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-xs md:text-base w-20"
                                        >
                                            add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-between items-center border-t pt-4">
                            <span className="text-base md:text-xl font-bold">total amount:</span>
                            <span className="text-base md:text-xl text-blue-700 font-bold">${total.toLocaleString()}</span>
                        </div>
                        <button className="text-sm md:text-lg w-full md:w-fit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
                            Payment
                        </button>
                    </main>
            }

        </>
    );
}

export default ShoppingCart;
