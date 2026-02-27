import React from 'react'
import { assets } from "../assets/assets.js"

const Hero = () => {
  if (!assets?.hero) return null;

  return (
    <div className='my-6 flex justify-center items-center'>
      <img 
        src={assets.hero} 
        alt="Hero Banner"
        className='w-[80%] object-contain' />
    </div>
  );
};

export default Hero;
