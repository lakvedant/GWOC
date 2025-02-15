import Navbar from '@/components/Navbar'
import ProfilePage from '@/components/ui/ProfilePage'
import React from 'react'

const page = () => {
  return (
    <>
    <Navbar />
    <div className='pt-20'>
      <ProfilePage />
    </div>
    </>
  )
}

export default page
