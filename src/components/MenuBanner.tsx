import React from 'react';

interface BannerProps {
  title: string;
  description: string;
}

const Banner = ({ title, description }: BannerProps) => {
  return (
    <div className="relative bg-pink-50/50 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Decorative background elements */}
        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 opacity-10">
          <div className="w-32 h-32 rounded-full bg-pink-200"></div>
        </div>
        <div className="absolute right-10 bottom-0 opacity-10">
          <div className="w-24 h-24 rounded-full bg-pink-200"></div>
        </div>

        {/* Content */}
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold text-pink-800 mb-8">
            {title}
          </h1>

          {/* Decorative dots */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-pink-300"></div>
              <div className="w-2 h-2 rounded-full bg-pink-400"></div>
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              <div className="w-2 h-2 rounded-full bg-pink-300"></div>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-lg text-pink-700 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;