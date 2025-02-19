"use client"
import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const ValentineCountdown = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const valentineDays = [
        {
            date: "7 Feb",
            title: "Rose Day",
            description: "Begin your love story with the timeless gesture of roses. Choose from our curated collection of fresh blooms to express your feelings in the most romantic way.",
            bgColor: "from-pink-100 to-rose-200",
            image: "/api/placeholder/600/400"
        },
        {
            date: "10 Feb",
            title: "Teddy Day",
            description: "Make your love feel extra special with our adorable collection of plush teddy bears. Each comes with a personalized message to make this moment unforgettable.",
            bgColor: "from-red-100 to-pink-200",
            image: "/api/placeholder/600/400"
        },
        {
            date: "12 Feb",
            title: "Promise Day",
            description: "Seal your promises with our exquisite collection of promise rings and bracelets. Create lasting memories with thoughtfully crafted jewelry pieces.",
            bgColor: "from-purple-100 to-pink-200",
            image: "/api/placeholder/600/400"
        },
        {
            date: "14 Feb",
            title: "Valentine's Day",
            description: "Celebrate the grand finale of love with our premium Valentine's packages. From romantic dinners to luxury gift hampers, make this day truly special.",
            bgColor: "from-red-200 to-rose-300",
            image: "/api/placeholder/600/400"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % valentineDays.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + valentineDays.length) % valentineDays.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    });

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Main Carousel */}
            <div className="relative w-full h-screen">
                {valentineDays.map((day, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r ${day.bgColor} transition-all duration-700 ease-out
                            ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                        style={{
                            transform: `translateX(${(index - currentSlide) * 100}%)`
                        }}
                    >
                        <div className="container mx-auto h-full px-4">
                            <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
                                <div className="space-y-6 animate-fade-in">
                                    <div className="inline-flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 text-red-500 font-medium">
                                        <Heart className="w-4 h-4 animate-bounce" />
                                        7th - 14th February
                                    </div>

                                    <h1 className="text-6xl font-serif font-bold text-gray-800">
                                        {day.title}
                                        <br />
                                        <span className="text-red-500">Special</span>
                                    </h1>

                                    <p className="text-xl text-gray-600">
                                        {day.description}
                                    </p>

                                    <button className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                        SHOP NOW
                                    </button>
                                </div>

                                <div className="relative">
                                    <Image
                                        fill
                                        src="/valentine.jpg"
                                        alt={day.title}
                                        className="rounded-lg shadow-2xl animate-float"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:scale-110 z-10"
            >
                <ChevronLeft className="w-6 h-6 text-red-500" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:scale-110 z-10"
            >
                <ChevronRight className="w-6 h-6 text-red-500" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-20 left-0 right-0 flex gap-1 p-4 justify-center">
                {valentineDays.map((_, index) => (
                    <div
                        key={index}
                        className="relative h-1 w-24 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                        onClick={() => setCurrentSlide(index)}
                    >
                        <div
                            className={`absolute inset-0 bg-red-500 rounded-full transition-transform duration-500
                                ${currentSlide === index ? 'scale-x-100' : 'scale-x-0'}`}
                        ></div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ValentineCountdown;