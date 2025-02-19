// LoadingWrapper.tsx
'use client'

import React, { useEffect, useState } from 'react'
import LottieLoader from './Loader' // Adjust import path as needed

export default function LoadingWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2300)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-pink-100">
        <LottieLoader className="h-screen" />
      </div>
    )
  }

  return <>{children}</>
}