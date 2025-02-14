"use client"
import React, { useState, useEffect } from "react";
import { ChevronDown, Star, Clock, Cake, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CakeWheelHero = () => {
    const [rotation, setRotation] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = (event) => {
            const scrollAmount = event.deltaY;
            setRotation(prev => prev - (scrollAmount * 0.5));
        };

        window.addEventListener("wheel", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const cakeFeatures = [
        {
            title: "Velvety Chocolate Glaze 🍫",
            description: "Rich Belgian chocolate coating that melts in your mouth"
        },
        {
            title: "Fresh Berry Medley 🍓",
            description: "Hand-picked strawberries, juicy cherries, and plump blueberries"
        },
        {
            title: "Luxurious Layers 🎂",
            description: "Multiple layers of moist chocolate sponge and cream"
        },
        {
            title: "Premium Ingredients ✨",
            description: "Made with finest Madagascar vanilla and Dutch cocoa"
        }
    ];

    const servingDetails = [
        "Perfect for special occasions",
        "Serves 8-10 people",
        "Best enjoyed within 48 hours",
        "Keep refrigerated at 4°C"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
                    <div className="relative">
                        <div
                            className={`relative w-full aspect-square transition-transform duration-75 ease-linear ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                } transition-all duration-700`}
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transformOrigin: "center center",
                            }}
                        >
                            <img
                                src="/cake2.png"
                                alt="Assorted Cake Slices"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                        <Badge className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm text-pink-600 px-4 py-2 animate-fade-in-right">
                            <Star className="w-4 h-4 mr-2 animate-spin-slow" />
                            Premium Selection
                        </Badge>

                        <Badge className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm text-pink-600 px-4 py-2 animate-fade-in-left">
                            <Clock className="w-4 h-4 mr-2 animate-spin-slow" />
                            Fresh Daily
                        </Badge>
                    </div>

                    <div className={`space-y-8 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'} transition-all duration-1000 ease-out`}>
                        <div>
                            <Badge variant="outline" className="mb-4 animate-bounce-slow">
                                <Cake className="w-4 h-4 mr-2" />
                                🍫 Indulgence Redefined 🍓
                            </Badge>

                            <h1 className="text-6xl font-bold mb-6 transition-all duration-700 hover:text-pink-600">
                                <span className="text-gray-800 inline-block hover:-translate-y-1 transition-transform duration-300">Decadent</span>
                                <br />
                                <span className="text-pink-600 inline-block hover:-translate-y-1 transition-transform duration-300">Chocolate Bliss</span>
                            </h1>

                            {/* Feature Points */}
                            <div className="space-y-6 mb-8">
                                {cakeFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/50 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                                            }`}
                                        style={{ transitionDelay: `${index * 150}ms` }}
                                    >
                                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                                            <Check className="w-4 h-4 text-pink-600" />
                                            {feature.title}
                                        </div>
                                        <div className="text-gray-600 ml-6">
                                            {feature.description}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Serving Details */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {servingDetails.map((detail, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-2 text-sm text-gray-600 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                            } transition-all duration-500`}
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></div>
                                        {detail}
                                    </div>
                                ))}
                            </div>

                            <div className={`flex items-center gap-4 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                } transition-all duration-700 delay-500`}>
                                <button className="px-8 py-4 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-pink-200 hover:-translate-y-1 hover:scale-105 active:scale-95">
                                    Order Now
                                </button>
                                <div className="transform hover:scale-105 transition-transform duration-300">
                                    <div className="text-2xl font-bold text-pink-600">$49.99</div>
                                    <div className="text-sm text-gray-600">Whole Cake</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fade-in-left {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                
                .animate-fade-in-right {
                    animation: fade-in-right 1s ease-out forwards;
                }
                
                .animate-fade-in-left {
                    animation: fade-in-left 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default CakeWheelHero;