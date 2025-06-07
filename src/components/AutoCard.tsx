'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface PropsType {
  imgUrl: string;
  title: string;
  amount: number;
}

function AutoCard(props: PropsType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      className="border border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-100 flex flex-col gap-3 p-4 w-[320px] bg-white cursor-pointer"
    >
      <Image
        src={props.imgUrl}
        alt="car image"
        width={300}
        height={200}
        className="rounded-lg object-cover transition-all duration-300"
      />
      <h4 className="text-lg font-semibold text-gray-800">{props.title}</h4>
      <h4 className="text-md font-medium text-gray-800">Cost: <span className="font-bold text-purple-700">{props.amount} $</span></h4>
      <div className='flex gap-[0.5] items-center'>
        <h4 className='text-xs text-gray-700'>show more</h4>
        <Image
          src="/arrow-right-short.svg"
          alt="right arrow"
          width={20}
          height={20}
          className="text-gray-700 opacity-50"
        />
      </div>
    </motion.div>
  );
}

export default AutoCard;
