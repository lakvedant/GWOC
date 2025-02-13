import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/ui/front";
import CuriousSection from "@/components/ui/front2";
import WhatsAppChat from "@/components/WAIcon";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CupcakeShowcase from "@/components/ui/hero-section";
import ReviewPage from "@/components/Admin/ReviewPage";
import HomePage from "@/components/PhotoCarousel";
import ProfilePage from "@/components/ui/ProfilePage";

const page = () => {
  return (
    <div>
      {/* <Navbar />
      <HeroSection />
      <CuriousSection />
	  <HomePage />
      <CupcakeShowcase />
      <WhatsAppChat />
      <FeaturesSection /> */}
      {/* <ReviewPage />
      <Footer />
      <HomePage /> */}
      <ProfilePage />
    </div>
  )
}

export default page;
