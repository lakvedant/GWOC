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
// import GiftHamperPage from "@/components/ui/customizehamper";
import TestimonialsPage from "@/components/ui/testimonials";
import AboutUsBanner from "@/components/ui/aboutusvideo";
import GiftHamperPage from "@/components/ui/customizehamper";
// import BakeryContactPage from "@/components/ui/contactus";
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
      <AboutUsBanner />
      <PhotoCarousel />
      <WhatsAppChat />
      <TestimonialsPage />
      <Footer />
      <GiftHamperPage />
    </div>
  )
}

export default page;
