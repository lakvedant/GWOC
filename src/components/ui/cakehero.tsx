import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Clock, Award } from 'lucide-react';

const CreativeCakeHero = () => {
    return (
        <div className="relative min-h-screen bg-amber-50 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            </div>

            <div className="container mx-auto px-4 py-12 relative">
                <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
                    {/* Text Content - Left Side */}
                    <div className="space-y-6 z-10">
                        <div className="flex items-center space-x-2">
                            <span className="px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                                Premium Bakery
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold">
                            <span className="block text-gray-800">Artisan</span>
                            <span className="block mt-2 text-pink-600">Cakes & Pastries</span>
                        </h1>

                        <p className="text-lg text-gray-600 max-w-md">
                            Discover our handcrafted delights, where every slice tells a story of passion,
                            creativity, and the finest ingredients.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 py-6">
                            <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                <span className="text-gray-700">Premium Quality</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-pink-500" />
                                <span className="text-gray-700">Fresh Daily</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Award className="w-5 h-5 text-blue-500" />
                                <span className="text-gray-700">Award Winning</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button className="px-8 py-4 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-pink-200 hover:-translate-y-0.5">
                                Order Now
                                <ChevronRight className="w-5 h-5 inline-block ml-2" />
                            </button>
                            <button className="px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 border-2 border-pink-600">
                                View Gallery
                            </button>
                        </div>
                    </div>

                    {/* Image Layout - Right Side */}
                    <div className="relative h-[600px] z-10">
                        {/* Main Image */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                            <img
                                src="/api/placeholder/320/320"
                                alt="Featured Cake"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating Small Images */}
                        <div className="absolute top-20 left-0 w-40 h-40 rounded-lg overflow-hidden shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                            <img
                                src="/api/placeholder/160/160"
                                alt="Cake Detail 1"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute bottom-20 right-0 w-40 h-40 rounded-lg overflow-hidden shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                            <img
                                src="/api/placeholder/160/160"
                                alt="Cake Detail 2"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute top-40 right-20 bg-white p-4 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-sm font-medium text-gray-800">Daily Special</div>
                            <div className="text-pink-600">20% OFF</div>
                        </div>

                        <div className="absolute bottom-40 left-20 bg-white p-4 rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                            </div>
                            <div className="text-sm text-gray-600">500+ Reviews</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeCakeHero;