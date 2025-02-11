import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen bg-[#002B0F] flex flex-col items-center justify-center text-center px-4">
            <div className="relative">
                <h1 className="text-white font-extrabold text-6xl sm:text-7xl md:text-8xl leading-tight uppercase -mb-24">
                    Explore Our
                </h1>
                <div className="relative -mt-24"> {/* Adjusted margin here */}
                    <Image
                        src="/cupcake.png"
                        alt="Cupcake"
                        width={400}  // Increased width
                        height={400} // Increased height
                        className="relative mx-auto contain z-10" // Added z-index
                    />
                </div>
                <div className="text-white font-extrabold text-6xl sm:text-7xl md:text-8xl leading-tight uppercase -mt-48 absolute  z-30"> {/* Adjusted margin here */}
                    Cake Haven!
                </div>
            </div>
            <p className="text-white text-lg sm:text-xl max-w-2xl mt-4">
                Experience Bliss in Every Bite! Discover our artisanal cakes, crafted
                with passion and creativity to sweeten your moments of joy.
            </p>
            <button className="mt-6 bg-pink-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-md hover:bg-pink-600 transition">  {/* Reduced padding */}
                Explore Now!
            </button>
        </div>
    );
}
