"use client"
import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { IKImage } from 'imagekitio-next';

const ValentineCountdown = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [carouselData, setCarouselData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/photo-carousel");
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setCarouselData(data);
            } catch (err) {
                console.log("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide, carouselData]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (carouselData.length === 0) return <div className="text-center py-10">No data available</div>;

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="relative w-full h-screen">
                {carouselData.map((item, index) => (
                    <div
                        key={item._id}
                        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-100 to-rose-200 transition-all duration-700 ease-out
                            ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
                        style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
                    >
                        <div className="container mx-auto h-full px-4">
                            <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
                                <div className="space-y-6 animate-fade-in">
                                    <div className="inline-flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 text-red-500 font-medium">
                                        <Heart className="w-4 h-4 animate-bounce" />
                                        7th - 14th February
                                    </div>

                                    <h1 className="text-6xl font-serif font-bold text-gray-800">
                                        {item.title}
                                        <br />
                                        <span className="text-red-500">Special</span>
                                    </h1>

                                    <p className="text-xl text-gray-600">
                                        {item.description}
                                    </p>

                                    <button
                                        className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                                        onClick={() => window.location.href = '/products'}
                                    >
                                        SHOP NOW
                                    </button>
                                </div>

                                <div className="relative">
                                    <IKImage
                                        width={800}
                                        height={300}
                                        path={item.image}
                                        alt={item.name || "Product Image"}
                                        className="rounded-lg shadow-2xl animate-float hidden sm:block"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:scale-110 z-10 hidden sm:block"
            >
                <ChevronLeft className="w-6 h-6 text-red-500" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:scale-110 z-10 hidden sm:block"
            >
                <ChevronRight className="w-6 h-6 text-red-500" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-20 left-0 right-0 flex gap-1 p-4 justify-center">
                {carouselData.map((_, index) => (
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
        </div >
    );
};

export default ValentineCountdown;
