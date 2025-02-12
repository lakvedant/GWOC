
import FeaturesSection from '@/components/Features'
import HeroSection from '@/components/ui/front'
import CuriousSection from '@/components/ui/front2'
import CupcakeShowcase from '@/components/ui/hero-section'
import WhatsAppChat from '@/components/WAIcon'
import React from 'react'
import Navbar from '@/components/Navbar'

const page = () => {
  return (
    <div>
      <HeroSection />
      <CuriousSection />
      <CupcakeShowcase />
      <WhatsAppChat />
      <FeaturesSection />
    </div>
  )
}

export default page
