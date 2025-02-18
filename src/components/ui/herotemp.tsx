import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';

const CupcakeBanner = () => {
    return (
        <div className="relative w-full h-[600px] bg-purple-200 overflow-hidden">
            {/* Top wavy shape */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-white opacity-90"
                style={{
                    clipPath: 'ellipse(80% 100% at 50% -20%)'
                }}
            />

            {/* Bottom wavy shape */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-white opacity-90"
                style={{
                    clipPath: 'ellipse(80% 100% at 50% 120%)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 p-12">
                <h1 className="font-cursive text-6xl mb-2">
                    <span className="text-black">The most</span>
                    <br />
                    <span className="text-pink-200">delicious cakes</span>
                </h1>

                <p className="text-gray-700 mb-8">
                    Collect, eat, give. The choice is yours!
                </p>

                <button className="bg-purple-700 text-white px-6 py-3 rounded-full hover:bg-purple-800 transition-colors">
                    Go to the catalog
                </button>

                {/* Social Icons */}
                <div className="flex gap-4 mt-8">
                    <Instagram className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
                    <Twitter className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
                    <Facebook className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900" />
                </div>
            </div>

            {/* Cupcake Images */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                {[1, 2, 3].map((index) => (
                    <Image
                        fill
                        key={index}
                        src="/api/placeholder/200/200"
                        alt={`Strawberry cupcake ${index}`}
                        className="w-48 h-48 object-contain transform rotate-12 hover:rotate-0 transition-transform duration-300"
                    />
                ))}
            </div>
        </div>
    );
};

export default CupcakeBanner;