"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Heart, Star } from 'lucide-react';
import Image from 'next/image';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
            {/* Hero Section */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover w-full h-full brightness-50"
                    >
                        <source src="/1.mp4" type="video/mp4" />
                        {/* Fallback image in case video fails to load */}
                        <Image
                            src="/bakery.avif"
                            alt="Bakery Background"
                            fill
                            className="object-cover w-full h-full brightness-50"
                        />
                    </video>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
                    <div className="container flex flex-col items-center justify-center h-full px-4 mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl font-bold text-white font-serif md:text-7xl"
                        >
                            Bindi&apos;s Cupcakery
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-6 text-xl text-white/90 md:text-2xl"
                        >
                            Crafting Sweet Moments Since 2020
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-12 md:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col justify-center"
                        >
                            <h2 className="text-4xl font-bold text-rose-800 font-serif">Our Sweet Story</h2>
                            <p className="mt-6 text-lg leading-relaxed text-pink-600 font-montserrat">
                                Founded by passionate baker Bindi Malji, our cupcakery began as a small kitchen dream
                                that blossomed into a beloved local treasure. Every cupcake we create is infused with
                                creativity, love, and the finest ingredients sourced from local suppliers.
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-pink-600 font-montserrat">
                                What sets us apart is our commitment to crafting not just desserts, but moments of pure joy.
                                Each recipe has been perfected through years of dedication, resulting in flavors that bring
                                smiles to faces and warmth to hearts.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
                        >
                            <Image
                                src="/bakery-women.jpg"
                                alt="Bindi baking"
                                className="object-cover w-full h-full"
                                fill
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: <ChefHat className="w-8 h-8 text-pink-500" />,
                                title: "Artisanal Quality",
                                description: "Hand-crafted with premium ingredients and attention to detail"
                            },
                            {
                                icon: <Heart className="w-8 h-8 text-pink-500" />,
                                title: "Made with Love",
                                description: "Every cupcake is baked with passion and care"
                            },
                            {
                                icon: <Star className="w-8 h-8 text-pink-500" />,
                                title: "Custom Creations",
                                description: "Personalized designs for your special occasions"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="p-8 text-center transition-transform duration-300 bg-pink-50 rounded-xl hover:scale-105"
                            >
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white rounded-full shadow-md">
                                    {feature.icon}
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-gray-800">{feature.title}</h3>
                                <p className="mt-4 text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



        </div>
    );
};

export default AboutUs;