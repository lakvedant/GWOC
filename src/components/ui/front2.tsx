"use client"
import React, { useState, useEffect } from "react";
import { Star, Clock, Cake, Check, Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const CakeWheelHero = () => {
    const [rotation, setRotation] = useState(0);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, -100]);

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            const scrollAmount = event.deltaY;
            setRotation(prev => prev - (scrollAmount * 0.2));
        };

        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, []);

    const cakeFeatures = [
        { title: "Velvety Chocolate Glaze 🍫", description: "Rich Belgian chocolate coating that melts in your mouth" },
        { title: "Fresh Berry Medley 🍓", description: "Hand-picked strawberries, juicy cherries, and plump blueberries" },
        { title: "Luxurious Layers 🎂", description: "Multiple layers of moist chocolate sponge and cream" },
        { title: "Premium Ingredients ✨", description: "Made with finest Madagascar vanilla and Dutch cocoa" }
    ];

    const servingDetails = [
        "Perfect for special occasions",
        "Serves 8-10 people",
        "Best enjoyed within 48 hours",
        "Keep refrigerated at 4°C"
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/background2.jpg"
                    alt="Background pattern"
                    className="object-cover opacity-80"
                    fill
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 opacity-80"></div>
            </div>

            {/* Animated Gradient Orbs */}
            <motion.div style={{ y }} className="absolute inset-0 z-10">
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-pink-100 rounded-full mix-blend-multiply filter blur-[150px] opacity-30 animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-rose-100 rounded-full mix-blend-multiply filter blur-[150px] opacity-30 animate-float-delayed"></div>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 md:py-12 relative z-20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[90vh]">
                    {/* Cake Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative order-2 lg:order-1 w-full h-full flex items-center justify-center"
                    >
                        <div className="relative w-full aspect-square max-w-2xl mx-auto" style={{ transform: `rotate(${rotation}deg)` }}>
                            <Image
                                fill
                                src="/cake2.png"
                                alt="Assorted Cake Slices"
                                className="w-full h-full object-contain drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300 scale-125"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        <Badge className="absolute top-4 left-4 lg:top-8 lg:left-8 bg-white/90 backdrop-blur-sm text-pink-600 px-3 py-1 lg:px-4 lg:py-2 shadow-lg hover:shadow-pink-200 transition-all duration-300 text-sm lg:text-base hover:bg-white/90 hover:text-pink-600 hover:scale-110">
                            <Star className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 animate-spin-slow" />
                            Premium Selection
                        </Badge>

                        <Badge className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 bg-white/90 backdrop-blur-sm text-pink-600 px-3 py-1 lg:px-4 lg:py-2 shadow-lg hover:shadow-pink-200 transition-all duration-300 text-sm lg:text-base hover:bg-white/90 hover:text-pink-600 hover:scale-110">
                            <Clock className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 animate-spin-slow" />
                            Fresh Daily
                        </Badge>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 lg:space-y-8 order-1 lg:order-2"
                    >
                        <div>
                            <Badge variant="outline" className="mb-4 bg-white/80 backdrop-blur-sm border-pink-200 text-pink-600 hover:bg-white text-sm lg:text-base">
                                <Cake className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                                🍫 Indulgence Redefined 🍓
                            </Badge>

                            <h1 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-6">
                                <span className="text-gray-800 block mb-1 lg:mb-2 bg-gradient-to-r from-pink-400 to-rose-600 bg-clip-text text-transparent">
                                    Decadent Chocolate
                                </span>
                                <span className="text-pink-600 block">Bliss Experience</span>
                            </h1>

                            {/* Feature Points */}
                            <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
                                {cakeFeatures.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + 0.4 }}
                                        className="group backdrop-blur-sm rounded-xl p-3 lg:p-4 bg-white/50 shadow-sm hover:bg-white/80 transition-all duration-300 border border-transparent hover:border-pink-100"
                                    >
                                        <div className="font-semibold text-gray-800 flex items-center gap-2 text-sm lg:text-base">
                                            <Check className="w-4 h-4 lg:w-5 lg:h-5 text-pink-600 group-hover:scale-110 transition-transform" />
                                            <span className="group-hover:text-pink-700 transition-colors">{feature.title}</span>
                                        </div>
                                        <div className="text-gray-600 ml-6 lg:ml-7 text-xs lg:text-sm leading-relaxed">
                                            {feature.description}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Serving Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mb-6 lg:mb-8">
                                {servingDetails.map((detail, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.8 }}
                                        className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 bg-white/50 backdrop-blur-sm p-2 rounded-lg border border-pink-50"
                                    >
                                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-pink-400 animate-pulse"></div>
                                        {detail}
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Section */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="flex flex-wrap items-center gap-4 lg:gap-6"
                            >
                                <button className="px-6 lg:px-8 py-3 lg:py-4 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-pink-300/40 hover:-translate-y-1 flex items-center gap-2 text-sm lg:text-base">
                                    <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                                    Order Now
                                </button>
                                <div className="flex flex-col">
                                    <div className="text-xl lg:text-2xl font-bold text-pink-600 flex items-center gap-2">
                                        ₹1400
                                        <span className="text-xs lg:text-sm font-normal text-gray-500 line-through">₹2000</span>
                                    </div>
                                    <div className="text-xs lg:text-sm text-gray-600">Whole Cake (1.5kg)</div>
                                </div>
                                <button className="p-2 lg:p-3 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200 hover:bg-pink-50 transition-colors">
                                    <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-pink-600" />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.02); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(20px) scale(0.98); }
                }
                .animate-float { animation: float 8s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default CakeWheelHero;