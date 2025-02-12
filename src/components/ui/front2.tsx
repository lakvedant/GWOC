import React from 'react';

const CuriousSection = () => {
    return (
        <div className="relative w-full">
            {/* Deep Wave Pattern at top */}
            <div className="absolute top-0 left-0 right-0">
                <svg
                    className="w-full h-32"
                    viewBox="0 0 1440 160"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#FFE6FA"
                        d="M0,128L40,128C80,128,160,128,240,122.7C320,117,400,107,480,101.3C560,96,640,96,720,101.3C800,107,880,117,960,117.3C1040,117,1120,107,1200,96C1280,85,1360,75,1400,69.3L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
                        style={{
                            transform: 'scale(1, 2) translateY(-20px)',
                            transformOrigin: 'center'
                        }}
                    />
                </svg>
            </div>

            {/* Main Content */}
            <div className="bg-pink-500 pt-32 pb-32 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    {/* Heading */}
                    <h1 className="text-white text-6xl font-extrabold mb-6 leading-tight tracking-wide">
                        CURIOUS... BY<br />
                        NAME, BY NATURE
                    </h1>

                    {/* Subtext */}
                    <p className="text-white text-lg mb-12 max-w-2xl mx-auto opacity-90">
                        It's what inspires us to whip up, throw together, tear, shake, and break the rules – on a mission
                        to redefine food for a new generation.
                    </p>

                    {/* Cake Image */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative">
                            <img
                                src="/cake1.png"
                                alt="Lemon tart with raspberries and orange slices"
                                className="rounded-lg w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CuriousSection;