'use client';

import React from 'react';
import Image from 'next/image';

const features = [
  { icon: '/icons/handmade.png', text: 'HANDMADE WITH LOVE' },
  { icon: '/icons/no-preservative.png', text: 'NO PRESERVATIVE' },
  { icon: '/icons/same-day.png', text: 'SWIFT SAME-DAY DELIVERIES' },
  { icon: '/icons/vegetarian.png', text: 'VEGETARIAN-FRIENDLY OPTIONS' },
];

const FeaturesSection = () => {
  return (
    <div className="bg-pink-100 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-gray-800 text-center md:text-left md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold">EXPLORE WHOLENESS WITH EVERY BITE</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-8 md:mt-0 md:w-1/2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <Image src={feature.icon} alt={feature.text} width={40} height={40} />
              </div>
              <span className="text-gray-800 font-semibold text-sm md:text-base">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
