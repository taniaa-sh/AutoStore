'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface PropsType {
  imgUrl: string;
  title: string;
  amount: number;
}

function AutoCard(props: PropsType) {

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      className="border border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-100 flex flex-col gap-3 p-4 bg-white cursor-pointer"
    >
      <div
        className='relative overflow-hidden'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={props.imgUrl}
          alt="car image"
          width={300}
          height={300}
          className="rounded-lg object-cover transition-all duration-300 mx-auto h-40"
        />
        <video ref={videoRef} className="absolute top-0 left-0 w-full h-40 object-cover opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" autoPlay muted loop>
          <source src="https://bugatti.imgix.net/68220e5df5c0fd72764da4fe/2025-model-teaser-videos-w16mistral_720.mp4?fm=mp4&w=1920&video-codec=av1&video-bitrate=2m" type="video/mp4" />
        </video>
      </div>
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
