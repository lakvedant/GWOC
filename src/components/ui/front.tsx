"use client"
import React from 'react';
import Image from "next/image";
import { motion} from "framer-motion";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const HeroSection = () => {
    const features = [
        {
            id: 1,
            title: "Purely Eggless, Perfectly Delicious",
            description: "Enjoy homemade, preservative-free cupcakes, brownies, cakes, and ice creams—all 100% vegetarian!",
            position: "top-56 right-[200px]",
            flexDirection: "flex-row"
        },
        {
            id: 3,
            title: "Order & Pickup Convenience",
            description: "Easy online ordering with hassle-free pickup at Parle Point, Surat.",
            position: "bottom-[400px] right-[200px]",
            flexDirection: "flex-row"
        },
        {
            id: 2,
            title: "Natural & Preservative-Free",
            description: "Freshly made with high-quality ingredients, free from artificial additives.",
            position: "top-[300px] right-[800px]",
            flexDirection: "flex-row-reverse"
        },
        {
            id: 4,
            title: "Customizable Treats",
            description: "Personalize cakes and treats to match your taste and style.",
            position: "bottom-[330px] right-[800px]",
            flexDirection: "flex-row-reverse"
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
                        Bindi`&apos;s Bakes,
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
                            className="mx-2 w-32 h-6"
                            viewBox="0 0 200 20"
                        >
                            <motion.path
                                d="M2 10 Q 100 -20, 400 20"
                                stroke="#F472B6"
                                strokeWidth="4"
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
                            initial="rest"
                            whileHover="hover"
                            className="max-w-xs transition-all duration-300 bg-white/80 p-4 rounded-lg"
                        >
                            <motion.h3
                                className={`font-bold text-pink-500 mb-1 text-xl ${roboto.className}`}
                                whileHover={{ scale: 1.1 }}
                            >
                                {feature.title}
                            </motion.h3>
                            <motion.p
                                className="text-sm text-[#6a1b9a]"
                                initial={{ opacity: 0, height: 0 }}
                                variants={{
                                    hover: {
                                        opacity: 1,
                                        height: "auto",
                                        transition: {
                                            duration: 0.3
                                        }
                                    },
                                    rest: {
                                        opacity: 0,
                                        height: 0,
                                        transition: {
                                            duration: 0.3
                                        }
                                    }
                                }}
                            >
                                {feature.description}
                            </motion.p>
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
                        whileHover="hover"
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
                            <h3 className={`font-bold text-pink-500 mb-1 text-xl ${roboto.className}`}>
                                {feature.title}
                            </h3>
                            <motion.p
                                className="text-sm text-[#6a1b9a]"
                                initial={{ opacity: 0, height: 0 }}
                                variants={{
                                    hover: {
                                        opacity: 1,
                                        height: "auto",
                                        transition: {
                                            duration: 0.3
                                        }
                                    },
                                    rest: {
                                        opacity: 0,
                                        height: 0,
                                        transition: {
                                            duration: 0.3
                                        }
                                    }
                                }}
                            >
                                {feature.description}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;