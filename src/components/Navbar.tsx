"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CustomButton from './CustomButton'
import { useCartStore } from '../../stores/useCartStore';

function Navbar() {

  const cart = useCartStore((state) => state.cart);
  return (
    <>
      <header className="absolute w-full z-10">
        <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-6'>
          <div className='flex gap-2'>
            <Link href="/" className='flex justify-center items-center'>
              <Image
                src={"/logo.svg"}
                width={118}
                height={18}
                alt='logo'
                className='object-contain'
              />
            </Link>
            <Link href="/shoppingCart" className='flex justify-center items-center gap-1'>
              <Image
                src={"/shoppingIcon.png"}
                width={30}
                height={30}
                alt='logo'
                className='object-contain'
              />
              <span className='rounded-full bg-blue-600 text-white w-5 h-5 flex justify-center items-center'>{cart.map((item) => item.amount).reduce((a, b) => a + b, 0)}</span>
            </Link>
          </div>
          <CustomButton
            title="Sign In"
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
          />
        </nav>
      </header>
    </>
  )
}

export default Navbar