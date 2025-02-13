import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/ui/front";
import CuriousSection from "@/components/ui/front2";
import WhatsAppChat from "@/components/WAIcon";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CupcakeShowcase from "@/components/ui/hero-section";

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CuriousSection />
      <CupcakeShowcase />
      <WhatsAppChat />
      <FeaturesSection />
    </div>
  )
}

export default page;
