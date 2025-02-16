// import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/ui/front";
import CuriousSection from "@/components/ui/front2";
import WhatsAppChat from "@/components/WAIcon";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import CupcakeShowcase from "@/components/ui/hero-section";
// import ReviewPage from "@/components/Admin/ReviewPage";
import PhotoCarousel from "@/components/PhotoCarousel";
// import HomePage from "@/components/PhotoCarousel";
// import ProfilePage from "@/components/ui/ProfilePage";
import CreativeCakeHero from "@/components/ui/cakehero";
// import CuriousHero from "@/components/ui/front2";
// import CakeWheelHero from "@/components/ui/front2";
// import CakeShowcase from "@/components/ui/front2";
import ValentineCountdown from "@/components/ui/valentine";
// import ImageSlider from "@/components/PhotoCarousel";
// import AboutUs from "@/components/ui/aboutus";

const page = () => {
  return (
    <div>
      <Navbar />
      <ValentineCountdown />
      <HeroSection />
      <CreativeCakeHero />
      <CuriousSection />
      <PhotoCarousel />

      {/* <CupcakeShowcase /> */}
      <WhatsAppChat />
      {/* <FeaturesSection /> */}
      {/* <ReviewPage /> */}
      <Footer />
      {/* <HomePage /> */}
      {/* <ProfilePage /> */}
      {/* <AboutUs /> */}
    </div>
  )
}

export default page;
