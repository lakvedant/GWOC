"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CupcakeShowcase = () => {
    const [rotation, setRotation] = useState(0);

    const features = [
        {
            id: 1,
            title: "DAIRY-FREE",
            description: "Enjoy our bakes without milk or dairy derivatives, perfect for those seeking lactose-free indulgence.",
            position: "top-36 -left-48",
            flexDirection: "flex-row-reverse"
        },
        {
            id: 2,
            title: "WHEAT FLOUR (GLUTEN)",
            description: "Our sponge cakes and muffins are made with high-quality wheat flour, giving each bite a soft texture and rich taste.",
            position: "-bottom-10 -left-48",
            flexDirection: "flex-row-reverse"
        },
        {
            id: 3,
            title: "HIGH-PROTEIN BLEND",
            description: "Our doughnuts are enriched with a high-protein blend, helping you stay energized and full longer.",
            position: "top-48 -right-48",
            flexDirection: "flex-row"
        },
        {
            id: 4,
            title: "SUGAR-FREE SWEETENERS",
            description: "Enjoy the perfect sweetness with zero added sugars, making it ideal for a balanced diet.",
            position: "-bottom-16 -right-48",
            flexDirection: "flex-row"
        }
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#E7DDFF] p-8">
            <div className="relative max-w-5xl mx-auto">
                <h1 className="text-center mb-2">
                    <div className="text-5xl font-bold text-[#AE8528]" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        INDULGENCE WITH A
                    </div>
                    <div className="text-5xl font-bold text-[#AE8528]" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        HEALTHY TWIST
                    </div>
                </h1>

                <div className="relative flex justify-center perspective-1000">
                    <motion.div
                        className="w-96 h-96"
                        style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                        }}
                        animate={{ rotateY: rotation }}
                        transition={{ duration: 1 }}
                    >
                        <Image
                            fill
                            src="/cupcake.png"
                            alt="Chocolate Cupcake"
                            className="w-max h-max object-contain"
                        />
                    </motion.div>

                    {features.map((feature) => (
                        <React.Fragment key={feature.id}>
                            <div className={`absolute ${feature.position} flex items-center ${feature.flexDirection}`}>
                                {/* Changed the shape of the yellow number badge */}
                                <div className="w-10 h-10 bg-yellow-300 text-lg font-bold text-pink-500 flex items-center justify-center rounded-full border-spacing-x-10 border-pink-400 shadow-lg"
                                    style={{ clipPath: 'polygon(50% 0%, 80% 10%, 100% 40%, 90% 80%, 50% 100%, 10% 80%, 0% 40%, 20% 10%)' }}>
                                    {feature.id}
                                </div>

                                {/* Made the dashed line curved */}
                                <svg className="mx-2 w-16 h-6" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10 Q 50 -10, 98 10" stroke="#F472B6" strokeWidth="2" strokeDasharray="5,5" fill="transparent" />
                                </svg>

                                <div className="max-w-xs">
                                    <h3 className="font-bold text-pink-500 mb-1" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm">{feature.description}</p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                <button
                    className="block mx-auto mt-8 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
                    onClick={() => setRotation(rotation + 180)}
                >
                    Rotate Cupcake
                </button>
            </div>
        </div>
    );
};

export default CupcakeShowcase;
