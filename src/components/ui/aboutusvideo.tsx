import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutUsBanner = () => {
    return (
        <div className="w-full bg-pink-50 overflow-hidden">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Video Section */}
                    <div className="rounded-xl overflow-hidden shadow-xl relative">
                        <div className="absolute inset-0 bg-pink-900/10 z-10 pointer-events-none"></div>
                        <div className="aspect-w-16 aspect-h-9">
                            <img
                                src="bindi.jpg"
                                alt="Our bakery team working together"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-pink-200 rounded-full z-0"></div>
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink-100 rounded-full z-0"></div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col space-y-6 max-w-lg">
                        <h2 className="text-3xl font-bold text-pink-900">
                            <span className="block">Our Story</span>
                            <span className="block text-pink-600 mt-1">Baked with Love Since 1987</span>
                        </h2>

                        <p className="text-pink-800 text-lg">
                            Welcome to Bindi's Cupcakery, a cozy cloud kitchen born from a love of baking and a dream to spread sweetness. Established in 2020, right in the heart of our home, we've been creating handcrafted cupcakes and desserts that bring joy to every bite.                        </p>

                        <p className="text-pink-700">
                            Every morning at 4am, our bakers begin their day, ensuring that when our doors open, you're greeted with the irresistible aroma of freshly baked goods.
                        </p>

                        <div className="pt-4">
                            <a
                                href="/about"
                                className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors shadow-md group"
                            >
                                <span className="font-medium">Know More About Us</span>
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Flour Dusting */}
            <div className="hidden lg:block absolute -bottom-16 left-10 w-48 h-48 bg-pink-100 rounded-full opacity-30 blur-xl"></div>
            <div className="hidden lg:block absolute top-10 right-10 w-32 h-32 bg-pink-100 rounded-full opacity-30 blur-xl"></div>
        </div>
    );
};

export default AboutUsBanner;