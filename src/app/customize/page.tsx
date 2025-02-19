import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import GiftHamperPage from '@/components/ui/customizehamper'
import React from 'react'

const page = () => {
  return (
    <div className='pt-20'>
        <Navbar />
      <GiftHamperPage />
      <Footer />
    </div>
  )
}

export default page
