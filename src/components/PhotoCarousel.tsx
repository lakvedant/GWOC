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
	"/cupcake1.png",
	"/cupcake1.png",
	"/cupcake1.png",
	"/cupcake1.png",
	"/cupcake1.png",
	"/cupcake1.png",
];

const SliderController: React.FC<SliderControllerProps> = ({
	prevRef,
	nextRef,
}) => (
	<div className="slider-controller">
		<div ref={prevRef} className="swiper-button-prev slider-arrow">
			<ChevronLeft className="w-6 h-6 text-white" />
		</div>
		<div ref={nextRef} className="swiper-button-next slider-arrow">
			<ChevronRight className="w-6 h-6 text-white" />
		</div>
		<div className="swiper-pagination"></div>
	</div>
);

const PhotoCarousel: React.FC = () => {
	const [swiperRef, setSwiperRef] = React.useState<SwiperType | null>(null);
	const prevRef = React.useRef<HTMLDivElement>(null);
	const nextRef = React.useRef<HTMLDivElement>(null);

	const handleSlideClick = (index: number) => {
		if (!swiperRef) return;

		const currentIndex = swiperRef.realIndex;
		const clickedIndex = index % images.length;

		// Calculate the shortest path to the clicked slide
		const diff = clickedIndex - currentIndex;
		const normalizedDiff =
			((diff + images.length / 2) % images.length) - images.length / 2;

		swiperRef.slideToLoop(clickedIndex, 300);
	};

	return (
		<div className="container">
			<h1 className="heading">Cake Gallery</h1>
			<Swiper
				onSwiper={setSwiperRef}
				effect={"coverflow"}
				grabCursor={true}
				centeredSlides={true}
				loop={true}
				slidesPerView={3}
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
				}}
				pagination={{
					el: ".swiper-pagination",
					clickable: true,
				}}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
					enabled: true,
				}}
				modules={[EffectCoverflow, Pagination, Navigation]}
				className="swiper_container"
				onInit={(swiper) => {
					if (typeof swiper.params.navigation !== "boolean") {
						const navigation = swiper.params.navigation;
						if (navigation) {
							navigation.prevEl = prevRef.current;
							navigation.nextEl = nextRef.current;
						}
					}
					swiper.navigation.init();
					swiper.navigation.update();
				}}>
				{images.map((imagePath, index) => (
					<SwiperSlide
						key={index}
						className="pb-12 cursor-pointer"
						onClick={() => handleSlideClick(index)}>
						<Image
							src={imagePath}
							alt={`Cake slide ${index + 1}`}
							width={500}
							height={500}
							priority={index === 0}
						/>
					</SwiperSlide>
				))}
				<SliderController prevRef={prevRef} nextRef={nextRef} />
			</Swiper>
		</div>
	);
};

export default PhotoCarousel;
