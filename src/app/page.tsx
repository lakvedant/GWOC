
import FeaturesSection from '@/components/Features'
import WhatsAppChat from '@/components/WAIcon'
import React from 'react'
import HeroSection from '../components/front'
import Navbar from '@/components/Navbar'

const page = () => {
  return (
    <div>
      <Navbar />
      <WhatsAppChat />
      <FeaturesSection />
    </div>
  )
}

export default page
