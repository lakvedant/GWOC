"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import Image from 'next/image';

const TestimonialsPage = () => {
    const testimonials = [
        {
            id: 1,
            name: "Emma Johnson",
            location: "Local Customer",
            image: "/cupcake1.png",
            content: "The sourdough bread from this bakery is simply divine! I&apos;ve tried countless others in the city, but none compare to the perfect crust and tender crumb I find here. It&apos;s become a weekend tradition to stop by for our family dinner bread.",
            favorite: "Artisan Sourdough"
        },
        {
            id: 2,
            name: "Michael Chen",
            location: "Food Blogger",
            image: "/cupcake1.png",
            content: "As someone who reviews bakeries professionally, I can honestly say these croissants are the closest I&apos;ve found to what I enjoyed in Paris. The butter lamination is perfect - so flaky and delicious!",
            favorite: "Almond Croissants"
        },
        {
            id: 3,
            name: "Sarah Williams",
            location: "Wedding Planner",
            image: "/cupcake1.png",
            content: "I've recommended this bakery to all my wedding clients, and they never disappoint. Their custom cakes are not only gorgeous but taste amazing. My brides are always thrilled!",
            favorite: "Wedding Cakes"
        },
        {
            id: 4,
            name: "David Rodriguez",
            location: "Cafe Owner",
            image: "/cupcake1.png",
            content: "We source all our pastries from this wonderful bakery. Our customers rave about their pain au chocolat and cinnamon rolls. Consistent quality, every single time.",
            favorite: "Pain au Chocolat"
        },
        {
            id: 5,
            name: "Priya Patel",
            location: "GDG Lead",
            image: "/cupcake1.png",
            content: "Our club meetings became much more popular after we started ordering dessert platters from here! The variety is wonderful and they accommodate dietary restrictions beautifully.",
            favorite: "Large Hamper"
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const navigate = useCallback((direction: 'next' | 'prev') => {
        if (isAnimating) return;

        setIsAnimating(true);
        if (direction === 'next') {
            setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        } else {
            setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        }

        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, testimonials.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            navigate('next');
        }, 8000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-pink-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-pink-900 mb-4">What Our Customers Say</h2>
                    <div className="h-1 w-24 bg-pink-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-lg text-pink-800 max-w-2xl mx-auto">
                        We take pride in creating delicious memories for our community. Here&apos;s what some of our wonderful customers have shared about their experiences.
                    </p>
                </div>

                <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl max-w-5xl mx-auto py-10 px-6 md:px-12 mb-16">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500 rounded-full -translate-x-16 -translate-y-16 opacity-70"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500 rounded-full translate-x-20 translate-y-20 opacity-70"></div>

                    <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                                <div className="relative w-full h-full">
                                    <div className="absolute w-full h-full bg-pink-200 rounded-full top-2 left-2"></div>
                                    <div className="absolute inset-0 w-full h-full bg-white rounded-full overflow-hidden border-4 border-pink-500">
                                        <Image
                                            src={testimonials[activeIndex].image}
                                            alt={testimonials[activeIndex].name}
                                            className="object-cover"
                                            fill
                                            sizes="(max-width: 768px) 112px, 128px"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="relative">
                                    <Quote className="text-rose-200 w-10 h-10 absolute -top-3 -left-3" />
                                    <p className="text-gray-700 text-lg leading-relaxed mb-6 italic z-10 relative">
                                        {testimonials[activeIndex].content}
                                    </p>
                                </div>

                                <div className="border-t border-pink-500 pt-4 mt-6">
                                    <h4 className="font-bold text-pink-900 text-xl">{testimonials[activeIndex].name}</h4>
                                    <p className="text-pink-700">{testimonials[activeIndex].location}</p>
                                    <p className="text-pink-600 mt-2 font-medium">
                                        Favorite: <span className="text-pink-500">{testimonials[activeIndex].favorite}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 flex space-x-3">
                        <button
                            onClick={() => navigate('prev')}
                            className="bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-full p-2 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate('next')}
                            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-center gap-2 mb-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (!isAnimating) {
                                    setIsAnimating(true);
                                    setActiveIndex(index);
                                    setTimeout(() => setIsAnimating(false), 500);
                                }
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-pink-600 w-6' : 'bg-pink-300'}`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 flex flex-col items-center text-center">
                        <div className="bg-pink-100 rounded-full p-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <h3 className="text-pink-900 font-bold text-xl mb-2">Local Favorite</h3>
                        <p className="text-pink-700">Voted &ldquo;Best Bakery&rdquo; in the city for 5 consecutive years</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 flex flex-col items-center text-center">
                        <div className="bg-pink-100 rounded-full p-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-pink-900 font-bold text-xl mb-2">Loyal Customers</h3>
                        <p className="text-pink-700">Over 80% of our customers return weekly for their favorites</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 flex flex-col items-center text-center">
                        <div className="bg-pink-100 rounded-full p-4 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-pink-900 font-bold text-xl mb-2">Quality Ingredients</h3>
                        <p className="text-pink-700">All organic, locally-sourced ingredients for exceptional taste</p>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold text-pink-900 mb-4">Ready to experience our delicious treats?</h3>
                    <button
                        className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-full transition-colors shadow-md"
                        onClick={() => window.location.href = '/products'}
                    >
                        Visit Our Bakery
                    </button>
                    <p className="text-pink-700 mt-4">
                        Or call us at <span className="font-medium">8849130189</span> to place an order
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;