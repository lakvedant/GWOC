"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Clock, Heart, Star, Award, Instagram, Facebook, Twitter } from 'lucide-react';
import Image from 'next/image';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
            {/* Hero Section */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        fill
                        src="/api/placeholder/1920/1080"
                        alt="Cupcake Background"
                        className="object-cover w-full h-full brightness-50"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
                    <div className="container flex flex-col items-center justify-center h-full px-4 mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl font-bold text-white font-serif md:text-7xl"
                        >
                            Bindi &apos; s Cupcakery
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-6 text-xl text-white/90 md:text-2xl"
                        >
                            Crafting Sweet Moments Since 2015
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
                            <h2 className="text-4xl font-bold text-gray-800 font-serif">Our Sweet Story</h2>
                            <p className="mt-6 text-lg leading-relaxed text-gray-600">
                                Founded by passionate baker Bindi Patel, our cupcakery began as a small kitchen dream
                                that blossomed into a beloved local treasure. Every cupcake we create is infused with
                                creativity, love, and the finest ingredients sourced from local suppliers.
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-gray-600">
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
                                fill
                                src="/api/placeholder/800/600"
                                alt="Bindi baking"
                                className="object-cover w-full h-full"
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

            {/* Awards Section */}
            <section className="py-20 bg-purple-50">
                <div className="container px-4 mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-bold text-gray-800 font-serif"
                    >
                        Recognition & Awards
                    </motion.h2>
                    <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { year: "2023", award: "Best Local Bakery" },
                            { year: "2022", award: "Innovation in Desserts" },
                            { year: "2021", award: "Customer Choice Award" },
                            { year: "2020", award: "Top Cupcake Artist" }
                        ].map((award, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 bg-white rounded-lg shadow-md"
                            >
                                <Award className="w-8 h-8 mx-auto text-pink-500" />
                                <h3 className="mt-4 text-xl font-bold text-gray-800">{award.award}</h3>
                                <p className="mt-2 text-gray-600">{award.year}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20">
                <div className="container px-4 mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 font-serif">Visit Us</h2>
                    <p className="mt-6 text-lg text-gray-600">
                        123 Sweet Street, Bakery Lane<br />
                        Cupcake City, CC 12345
                    </p>
                    <div className="flex justify-center gap-6 mt-8">
                        {[
                            { icon: <Instagram className="w-6 h-6" />, label: "Instagram" },
                            { icon: <Facebook className="w-6 h-6" />, label: "Facebook" },
                            { icon: <Twitter className="w-6 h-6" />, label: "Twitter" }
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center justify-center w-12 h-12 text-pink-500 transition-colors duration-300 bg-pink-100 rounded-full hover:bg-pink-200"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                    <div className="mt-8">
                        <p className="flex items-center justify-center gap-2 text-lg text-gray-600">
                            <Clock className="w-5 h-5 text-pink-500" />
                            Open Tuesday - Sunday: 9AM - 6PM
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;