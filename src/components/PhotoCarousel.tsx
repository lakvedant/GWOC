"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SliderControllerProps {
	prevRef: React.RefObject<HTMLDivElement | null>;
	nextRef: React.RefObject<HTMLDivElement | null>;
}

const images = [
	"/cupcake1.png",
	"/Valentine Special .jpg",
	"/Valentine Special Chocolate Cake.jpg",
	"/cupcake2.png",
	"/Valentine Special CupCake.jpg",
	"/images.jpg",
	"/Cake.jpg",
];

const SliderController: React.FC<SliderControllerProps> = ({
	prevRef,
	nextRef,
}) => (
	<div className="slider-controller">
		<div
			ref={prevRef}
			className="swiper-button-prev slider-arrow hover:scale-125 transition-transform duration-300 backdrop-blur-sm p-3 w-16 h-16 rounded-full shadow-xl hover:shadow-2xl text-white"
		>
			<ChevronLeft className="w-6 h-6" />
		</div>
		<div
			ref={nextRef}
			className="swiper-button-next slider-arrow hover:scale-125 transition-transform duration-300 backdrop-blur-sm p-3 rounded-full shadow-xl hover:shadow-2xl"
		>
			<ChevronRight className="w-8 h-8 text-white" />
		</div>
		<div className="swiper-pagination !bottom-0 [--swiper-pagination-color:#FF80B5] [--swiper-pagination-bullet-size:12px] hover:[--swiper-pagination-bullet-size:14px] transition-all" />
	</div>
);

const PhotoCarousel: React.FC = () => {
	const [swiperRef, setSwiperRef] = React.useState<SwiperType | null>(null);
	const prevRef = React.useRef<HTMLDivElement>(null);
	const nextRef = React.useRef<HTMLDivElement>(null);

	const handleSlideClick = (index: number) => {
		if (!swiperRef) return;
		swiperRef.slideToLoop(index, 600, true);
	};

	return (
		<div className="container mx-auto px-4 py-16 bg-gradient-to-b from-rose-50 to-pink-100 relative overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed" />
			</div>

			<h1 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
				Sweet Gallery
				<span className="block text-2xl md:text-3xl font-normal mt-4 text-pink-600/80">
					Our Delectable Creations
				</span>
			</h1>

			<Swiper
				onSwiper={setSwiperRef}
				effect={"coverflow"}
				grabCursor={true}
				centeredSlides={true}
				loop={true}
				coverflowEffect={{
					rotate: 15,
					stretch: -30,
					depth: 200,
					modifier: 1,
					slideShadows: true,
				}}
				breakpoints={{
					320: { slidesPerView: 1, spaceBetween: 20 },
					640: { slidesPerView: 2, spaceBetween: 30 },
					1024: { slidesPerView: 3, spaceBetween: 40 },
				}}
				pagination={{ clickable: true }}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				modules={[EffectCoverflow, Pagination, Navigation]}
				className="!pb-16"
				onInit={(swiper) => {
					if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
					}
					swiper.navigation.init();
					swiper.navigation.update();
				}}
			>
				{images.map((imagePath, index) => (
					<SwiperSlide
						key={index}
						className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
						onClick={() => handleSlideClick(index)}
					>
						<div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<Image
							src={imagePath}
							alt={`Cake ${index + 1}`}
							width={600}
							height={800}
							className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
							priority={index < 3}
						/>
						<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
							<h3 className="text-xl font-bold mb-2">Sweet Delight #{index + 1}</h3>
							<p className="text-sm opacity-90">Velvety layers • Fresh berries • Premium ingredients</p>
						</div>
					</SwiperSlide>
				))}
				<SliderController prevRef={prevRef} nextRef={nextRef} />
			</Swiper>

			<style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s 2s ease-in-out infinite; }
        
        .swiper-slide-active {
          transform: scale(1.1) !important;
          z-index: 1 !important;
        }
        
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 100%) !important;
        }
      `}</style>
		</div>
	);
};

export default PhotoCarousel;