"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { useCartStore } from '../../stores/useCartStore';
import { useRouter } from 'next/navigation';

function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-10 h-auto bg-slate-100 shadow backdrop-blur-lg">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto px-6 py-4">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            width={118}
            height={18}
            alt="logo"
            className="object-contain"
          />
        </Link>

        {/* آیکن همبرگر فقط در موبایل */}
        <div className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Image
            src={isOpen ? "/menuClose.png" : "/menu.png"}
            alt="menu"
            width={25}
            height={25}
            className="object-contain cursor-pointer"
          />
        </div>

        {/* منوی دسکتاپ */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/contactUs" className="text-blue-600 hover:underline">Contact Us</Link>
          <Link href="/about" className="text-blue-600 hover:underline">About Us</Link>
          <Link href="/shoppingCart" className="relative">
            <Image
              src="/shoppingIcon.png"
              width={30}
              height={30}
              alt="cart"
              className="object-contain"
            />
            <span className="absolute -top-2 -right-2 rounded-full bg-blue-600 text-white w-5 h-5 text-xs flex justify-center items-center">
              {cart.map((item) => item.amount).reduce((a, b) => a + b, 0)}
            </span>
          </Link>
          <CustomButton
            title="Sign In"
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            handleClick={() => router.push("/signin")}
          />
        </nav>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-slate-100 z-100">
          <Link href="/about" onClick={() => setIsOpen(false)} className="block text-blue-600">
            About Us
          </Link>
          <Link
            href="/shoppingCart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src="/shoppingIcon.png"
              width={24}
              height={24}
              alt="cart"
              className="object-contain"
            />
            <span className="rounded-full bg-blue-600 text-white w-5 h-5 text-xs flex justify-center items-center">
              {cart.map((item) => item.amount).reduce((a, b) => a + b, 0)}
            </span>
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/signin");
            }}
            className="w-full rounded-full bg-white text-primary-blue py-2 shadow"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
