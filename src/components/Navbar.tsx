import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CustomButton from './CustomButton'

function Navbar() {
  return (
    <>
    <header className="absolute w-full z-10">
        <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-6'>
            <Link href="/" className='flex justify-center items-center'>
            <Image
            src={"/logo.svg"}
            width={118}
            height={18}
            alt='logo'
            className='object-contain'
            />
            </Link>
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