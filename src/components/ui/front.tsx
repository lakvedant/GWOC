"use client"
import React from 'react';
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const HeroSection = () => {
    const controls = useAnimation();
    const features = [
        {
            id: 1,
            title: "DAIRY-FREE",
            description: "Enjoy our bakes without milk or dairy derivatives, perfect for those seeking lactose-free indulgence.",
            position: "top-56 left-72",
            flexDirection: "flex-row-reverse"
        },
        {
            id: 2,
            title: "WHEAT FLOUR (GLUTEN)",
            description: "Our sponge cakes and muffins are made with high-quality wheat flour, giving each bite a soft texture and rich taste.",
            position: "bottom-[380px] left-[250px]",
            flexDirection: "flex-row-reverse"
        },
        {
            id: 3,
            title: "HIGH-PROTEIN BLEND",
            description: "Our doughnuts are enriched with a high-protein blend, helping you stay energized and full longer.",
            position: "top-[320px] right-[260px]",
            flexDirection: "flex-row"
        },
        {
            id: 4,
            title: "SUGAR-FREE SWEETENERS",
            description: "Enjoy the perfect sweetness with zero added sugars, making it ideal for a balanced diet.",
            position: "bottom-[330px] right-[300px]",
            flexDirection: "flex-row"
        }
    ];

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const bounceAnimation = {
        scale: [1, 1.1, 1],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const titleVariants = {
        initial: { y: -100, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-[#FFE4E1] flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">
            <div className="relative">
                <motion.h1
                    variants={titleVariants}
                    initial="initial"
                    animate="animate"
                    className="text-[#75166e] font-extrabold text-5xl sm:text-7xl md:text-8xl leading-tight uppercase -mb-24 ml-10"
                >
                    <motion.span
                        animate={{
                            color: ["#75166e", "#B11268", "#75166e"],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        Bindi's Bakes,
                    </motion.span>
                </motion.h1>
                <div className="relative -mt-24">
                    <motion.div
                        initial={{ rotate: -10, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 50,
                            duration: 1
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: [0, -5, 5, -5, 0],
                            transition: { duration: 0.5 }
                        }}
                    >
                        <Image
                            src="/cupcake3.png"
                            alt="Cupcake"
                            width={600}
                            height={600}
                            className="mx-auto contain z-10"
                        />
                    </motion.div>
                </div>
                <motion.div
                    animate={floatingAnimation}
                    className="text-[#B11268] font-extrabold text-5xl sm:text-7xl md:text-7xl leading-tight uppercase -mt-32 absolute z-10 ml-30"
                >
                    Happiness Awaits!
                </motion.div>
            </div>
            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: 0.5
                }}
                className="text-[#6a1b9a] text-lg sm:text-xl max-w-2xl -mt-8"
            >
                Experience Bliss in Every Bite! Discover our artisanal cakes, crafted
                with passion and creativity to sweeten your moments of joy.
            </motion.p>
            <motion.button
                initial={{ scale: 0 }}
                animate={bounceAnimation}
                whileHover={{
                    scale: 1.2,
                    backgroundColor: "#B11268",
                    boxShadow: "0px 0px 8px rgb(177, 18, 104)"
                }}
                whileTap={{ scale: 0.9 }}
                className="mt-6 bg-pink-500 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg"
            >
                Explore Now!
            </motion.button>

            {/* Desktop Features */}
            <div className="hidden md:block">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 1.2 + index * 0.2,
                            type: "spring",
                            stiffness: 200
                        }}
                        whileHover={{ scale: 1.05 }}
                        className={`absolute z-20 ${feature.position} flex items-center ${feature.flexDirection}`}
                    >
                        <motion.div
                            whileHover={{
                                rotate: 360,
                                backgroundColor: "#FFD700",
                                scale: 1.2
                            }}
                            transition={{ duration: 0.5 }}
                            className="w-10 h-10 bg-[#ffeb3b] text-lg font-bold text-pink-500 flex items-center justify-center rounded-full shadow-lg cursor-pointer"
                            style={{ clipPath: 'polygon(50% 0%, 80% 10%, 100% 40%, 90% 80%, 50% 100%, 10% 80%, 0% 40%, 20% 10%)' }}
                        >
                            {feature.id}
                        </motion.div>
                        <motion.svg
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
                            className="mx-2 w-16 h-6"
                            viewBox="0 0 100 20"
                        >
                            <motion.path
                                d="M2 10 Q 50 -10, 98 10"
                                stroke="#F472B6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                fill="transparent"
                                animate={{
                                    strokeDashoffset: [0, -20],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </motion.svg>
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                borderRadius: "10px",
                                padding: "10px"
                            }}
                            className="max-w-xs transition-all duration-300"
                        >
                            <motion.h3
                                className="font-bold text-pink-500 mb-1"
                                style={{ fontFamily: 'Comic Sans MS, cursive' }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {feature.title}
                            </motion.h3>
                            <p className="text-sm text-[#6a1b9a]">{feature.description}</p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile Features */}
            <div className="md:hidden mt-16 space-y-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2 * index
                        }}
                        className="flex items-center space-x-4 bg-white/80 p-4 rounded-lg shadow-md"
                    >
                        <div className="w-10 h-10 bg-[#ffeb3b] text-lg font-bold text-pink-500 flex items-center justify-center rounded-full shadow-lg">
                            {feature.id}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-pink-500 mb-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                                {feature.title}
                            </h3>
                            <p className="text-sm text-[#6a1b9a]">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;