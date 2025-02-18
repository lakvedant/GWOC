import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieLoader = ({ className = '' }) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, []);

  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <div className="w-48 h-48">
        <DotLottieReact
          key={animationKey}
          src="https://lottie.host/000a6f23-2874-438b-a14e-7af8f81623be/BjOdUXpDA3.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LottieLoader;
