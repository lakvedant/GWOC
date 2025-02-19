"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sigmar, Candal } from 'next/font/google';

const sigmar = Sigmar({
	weight: ['400'],
	subsets: ['latin'],
});

const candal = Candal({
	weight: ['400'],
	subsets: ['latin'],
});

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

interface SliderControllerProps {
	prevRef: React.RefObject<HTMLDivElement | null>;
	nextRef: React.RefObject<HTMLDivElement | null>;
}

const cakeData = [
	{
		id: 1,
		title: "Strawberry Dream",
		description: "Velvety layers of vanilla sponge with fresh strawberries and cream",
		image: "/Photo1.jpg",
	},
	{
		id: 2,
		title: "Chocolate Decadence",
		description: "Rich chocolate ganache with hazelnut praline and gold flakes",
		image: "/Photo2.jpg",
	},
	{
		id: 3,
		title: "Blueberry Bliss",
		description: "Light mascarpone cream with wild blueberry compote",
		image: "/Photo3.jpg",
	},
	{
		id: 4,
		title: "Raspberry Elegance",
		description: "Delicate layers of almond biscuit with raspberry mousse",
		image: "/Photo4.jpg",
	},
	{
		id: 5,
		title: "Tiramisu Tower",
		description: "Classic Italian flavors with a modern presentation",
		image: "/Photo5.jpg",
	},
	{
		id: 6,
		title: "Lemon Zest Delight",
		description: "Refreshing lemon cream with meringue peaks",
		image: "/Photo6.jpg",
	},
	{
		id: 7,
		title: "Caramel Symphony",
		description: "Layers of caramel, chocolate, and crunchy feuilletine",
		image: "/c7.jpg",
	},
];

const SliderController: React.FC<SliderControllerProps> = ({
	prevRef,
	nextRef,
}) => (
	<div className="slider-controller flex justify-center items-center space-x-6 mt-10 hidden sm:block">
		<motion.div
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			ref={prevRef}
			className="swiper-button-prev slider-arrow transform transition-all duration-300 backdrop-blur-md p-4 w-16 h-16 rounded-full shadow-xl hover:shadow-2xl text-white bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center cursor-pointer relative overflow-hidden group"
		>
			<div className="absolute inset-0 bg-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
			<div className="absolute -inset-px bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-50 animate-pulse blur-sm" />
			<ChevronLeft className="w-6 h-6 relative z-10" />
		</motion.div>
		<div className="swiper-pagination !static flex space-x-2 [--swiper-pagination-color:#FF80B5] [--swiper-pagination-bullet-size:12px] [--swiper-pagination-bullet-inactive-color:#FFC0CB] [--swiper-pagination-bullet-inactive-opacity:0.5] transition-all" />
		<motion.div
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			ref={nextRef}
			className="swiper-button-next slider-arrow transform transition-all duration-300 backdrop-blur-md p-4 w-16 h-16 rounded-full shadow-xl hover:shadow-2xl text-white bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center cursor-pointer relative overflow-hidden group"
		>
			<div className="absolute inset-0 bg-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
			<div className="absolute -inset-px bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-50 animate-pulse blur-sm" />
			<ChevronRight className="w-6 h-6 relative z-10" />
		</motion.div>
	</div>
);

// Floating Particles Component
const FloatingParticles = () => {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{Array.from({ length: 15 }).map((_, i) => (
				<div
					key={i}
					className={`absolute w-${Math.floor(Math.random() * 12) + 8} h-${Math.floor(Math.random() * 12) + 8} rounded-full bg-pink-${Math.floor(Math.random() * 3) + 1}00/20 mix-blend-screen filter blur-xl animate-float-custom`}
					style={{
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
						animationDelay: `${Math.random() * 5}s`,
						animationDuration: `${Math.random() * 10 + 10}s`,
						opacity: 0.3 + Math.random() * 0.4,
						transform: `scale(${0.5 + Math.random() * 1.5})`,
					}}
				/>
			))}
		</div>
	);
};

// LightRay Component for hero section
const LightRays = () => {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-pink-300/40 to-transparent rotate-12 transform -translate-x-1/2 blur-3xl" />
			<div className="absolute top-0 right-1/4 w-1/2 h-full bg-gradient-to-b from-rose-300/40 to-transparent -rotate-12 transform translate-x-1/2 blur-3xl" />
		</div>
	);
};

// Modal Component for Image Preview
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	image: string;
	title: string;
	description: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image, title, description }) => {
	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
				onClick={onClose}
			>
				<motion.div
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					transition={{ type: "spring", damping: 25 }}
					className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
					onClick={(e) => e.stopPropagation()}
				>
					<Image
						src={image}
						alt={title}
						width={1200}
						height={700}
						className="w-full max-h-[70vh] object-cover"
					/>
					<div className="absolute top-4 right-4">
						<button
							onClick={onClose}
							className="bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
						>
							<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
					</div>
					<div className="p-8 bg-white">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
						<p className="text-gray-600 mb-4">{description}</p>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

// ExpandButton Component
interface ExpandButtonProps {
	onExpand: () => void;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({ onExpand }) => {
	return (
		<div className="absolute bottom-4 right-4 z-20">
			<button
				onClick={onExpand}
				className="bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
			>
				<Expand className="w-6 h-6" />
			</button>
		</div>
	);
};

// Hero Section Component
const HeroSection = () => {
	return (
		<div className="relative overflow-hidden py-16 px-6 mb-16">
			<LightRays />
			<div className="relative max-w-5xl mx-auto text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
				>
					<h1 className="text-6xl md:text-7xl font-bold mb-6">
						<div className={candal.className}>

							<span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 bg-clip-text text-transparent">
								Sweet Gallery
							</span>
						</div>
					</h1>
					<div className={sigmar.className}>
						<p className="text-3xl md:text-4xl font-light mb-8 text-pink-700/90">
							Our Delectable Creations
						</p>
					</div>
					<p className="max-w-2xl mx-auto text-pink-800/80 mb-12 text-lg">
						Explore our stunning collection of handcrafted pastries and cakes,
						each one a masterpiece of flavor and design. Click on any image to learn more.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="relative inline-block"
				>
					<div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95, y: 5 }}
						className="relative px-8 py-4 bg-white text-pink-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition duration-300"
						onClick={() => {
							window.scrollBy({
								top: window.innerHeight,
								behavior: 'smooth',
							});
						}}
					>
						Discover Our Collection
					</motion.button>
				</motion.div>
			</div>
		</div>
	);
};

const PhotoCarousel: React.FC = () => {
	const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
	const prevRef = React.useRef<HTMLDivElement>(null);
	const nextRef = React.useRef<HTMLDivElement>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedCake, setSelectedCake] = useState(cakeData[0]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleSlideClick = (index: number) => {
		// Only open modal if clicking the center (active) slide
		if (swiperRef && index === swiperRef.realIndex) {
			handleExpand(cakeData[index].id);
		} else if (swiperRef) {
			swiperRef.slideToLoop(index, 600, true);
		}
	};

	const handleSlideChange = (swiper: SwiperType) => {
		setCurrentIndex(swiper.realIndex);
	};

	const handleExpand = (id: number) => {
		const cake = cakeData.find(cake => cake.id === id);
		if (cake) {
			setSelectedCake(cake);
			setModalOpen(true);
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (modalOpen) {
				if (e.key === 'Escape') setModalOpen(false);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [modalOpen]);

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-white overflow-hidden">
			<FloatingParticles />

			<HeroSection />

			<div className="container mx-auto px-4 py-12">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="relative mb-12"
				>
					<Swiper
						onSwiper={setSwiperRef}
						effect={"coverflow"}
						grabCursor={true}
						centeredSlides={true}
						loop={true}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
							pauseOnMouseEnter: true,
						}}
						coverflowEffect={{
							rotate: 5,
							stretch: 0,
							depth: 100,
							modifier: 2.5,
							slideShadows: true,
						}}
						breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 20 },
							640: { slidesPerView: 2, spaceBetween: 40 },
							1024: { slidesPerView: 3, spaceBetween: 50 },
							1280: { slidesPerView: 3, spaceBetween: 60 },
						}}
						pagination={{
							clickable: true,
							dynamicBullets: true,
						}}
						navigation={{
							prevEl: prevRef.current,
							nextEl: nextRef.current,
						}}
						modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
						className="!pb-16"
						onInit={(swiper) => {
							if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
								swiper.params.navigation.prevEl = prevRef.current;
								swiper.params.navigation.nextEl = nextRef.current;
							}
							swiper.navigation.init();
							swiper.navigation.update();
						}}
						onSlideChange={handleSlideChange}
					>
						{cakeData.map((cake, index) => (
							<SwiperSlide
								key={cake.id}
								className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform ${index !== currentIndex ? 'hover:scale-105' : ''}`}
								onClick={() => handleSlideClick(index)}
							>
								<Image
									src={cake.image}
									alt={cake.title}
									width={600}
									height={800}
									className="w-full h-[600px] object-cover transition-transform duration-700"
									priority={index < 3}
								/>
								{index === currentIndex && (
									<ExpandButton onExpand={() => handleExpand(cake.id)} />
								)}
							</SwiperSlide>
						))}
					</Swiper>
					<SliderController prevRef={prevRef} nextRef={nextRef} />
				</motion.div>
			</div>

			<Modal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				image={selectedCake.image}
				title={selectedCake.title}
				description={selectedCake.description}
			/>

			<style jsx global>{`
        @keyframes float-custom {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(5deg); }
          50% { transform: translate(0, -30px) rotate(0deg); }
          75% { transform: translate(-10px, -15px) rotate(-5deg); }
        }
        
        .swiper-slide-active {
          transform: scale(1.15) !important;
          z-index: 2 !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15) !important;
          cursor: pointer;
        }
        
        .swiper-slide-prev,
        .swiper-slide-next {
          z-index: 1 !important;
        }
        
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background-image: linear-gradient(to left, rgba(255,255,255,0.8), transparent) !important;
          opacity: 0.0 !important;
        }
        
        .swiper-pagination-bullet {
          transition: transform 0.3s, opacity 0.3s !important;
        }
        
        .swiper-pagination-bullet-active {
          transform: scale(1.3) !important;
        }
      `}</style>
		</div>
	);
};

export default PhotoCarousel;