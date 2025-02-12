import React from 'react';

const WaveBackground = () => {
  return (
    <div className="relative w-full h-64 bg-pink-100">
      <div className="absolute inset-0">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/80 to-pink-100/40" />
        
        {/* Soft wave shapes */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: `
              radial-gradient(100% 100% at 50% 100%, 
                rgba(251, 207, 232, 0.4) 0%,
                rgba(251, 207, 232, 0) 100%
              )
            `
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: `
              radial-gradient(100% 100% at 50% 100%, 
                rgba(252, 231, 243, 0.6) 0%,
                rgba(252, 231, 243, 0) 100%
              )
            `
          }}
        />
        
        {/* Content Section */}
        <div className="relative z-10 max-w-4xl mx-auto pt-12 px-4 text-center">
          <h1 className="text-5xl font-serif font-bold tracking-wide text-amber-700 mb-1">
            CAKES
          </h1>
          <div className="flex justify-center items-center space-x-2 mb-1">
            <span className="text-pink-300 text-3xl">•</span>
            <span className="text-pink-300 text-3xl">•</span>
            <span className="text-pink-300 text-3xl">•</span>
            <span className="text-pink-300 text-3xl">•</span>
          </div>
          <p className="text-gray-800 text-lg font-light max-w-3xl mx-auto leading-relaxed font-sans ">
            This is where it all began! Our home-style brownies are what made Theobroma the household name it is today. Best enjoyed with a scoop of ice cream and chocolate sauce or devoured as is.
          </p>
        </div>

        {/* Curved wave paths */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120V40C240 80 480 100 720 100C960 100 1200 80 1440 40V120H0Z"
            fill="#FDF2F8"
            fillOpacity="0.4"
          />
          <path
            d="M0 120V60C240 90 480 105 720 105C960 105 1200 90 1440 60V120H0Z"
            fill="#FCE7F3"
            fillOpacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
};

export default WaveBackground;