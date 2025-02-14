"use client"
import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const ValentineCountdown = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const valentineDays = [
        {
            date: "7 Feb",
            title: "Rose Day",
            description: "Start a love-filled February with the perfect gifts",
            bgColor: "from-pink-100 to-rose-200",
            image: "/api/placeholder/600/400"
        },
        {
            date: "8 Feb",
            title: "Propose Day",
            description: "Express your love with our special collection",
            bgColor: "from-red-100 to-pink-200",
            image: "/api/placeholder/600/400"
        },
        {
            date: "9 Feb",
            title: "Chocolate Day",
            description: "Sweeten your love with delicious treats",
            bgColor: "from-rose-100 to-red-200",
            image: "/api/placeholder/600/400"
        },
        {
            date: "10 Feb",
            title: "Teddy Day",
            description: "Cuddle with love and sweetness",
            bgColor: "from-pink-100 to-red-100",
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
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Main Carousel */}
            <div
                className="relative w-full h-screen transition-transform duration-700 ease-out flex"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {valentineDays.map((day, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full bg-gradient-to-r ${day.bgColor} transition-opacity duration-700
                            ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="container mx-auto h-full px-4">
                            <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
                                <div className="space-y-6 animate-fade-in">
                                    <div className="inline-flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 text-red-500 font-medium">
                                        <Heart className="w-4 h-4 animate-bounce" />
                                        7th - 14th February
                                    </div>

                                    <h1 className="text-6xl font-serif font-bold text-gray-800">
                                        Countdown to
                                        <br />
                                        <span className="text-red-500">Valentine's</span> begins!
                                    </h1>

                                    <p className="text-xl text-gray-600">
                                        {day.description}
                                    </p>

                                    <button className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                                        ORDER NOW
                                    </button>
                                </div>

                                <div className="relative">
                                    <img
                                        src={day.image}
                                        alt={day.title}
                                        className="rounded-lg shadow-2xl animate-float"
                                    />
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                                        <span className="font-medium text-red-500">{day.title}</span>
                                        <span className="text-gray-500 ml-2">{day.date}</span>
                                    </div>
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
            <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-4 justify-center">
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

            {/* Valentine's Days Timeline */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 flex justify-between items-center overflow-x-auto">
                {valentineDays.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`flex items-center gap-2 cursor-pointer px-4 py-1 rounded-full transition-all
                            ${currentSlide === index ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    >
                        <Heart className={`w-4 h-4 ${currentSlide === index ? 'animate-bounce' : ''}`} />
                        <span className="whitespace-nowrap">{day.title}</span>
                        <span className="text-sm opacity-75">{day.date}</span>
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