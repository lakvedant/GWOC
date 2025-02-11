import ProductCard from '@/components/MenuProductCard'
import React from 'react'

const page = () => {
  return (
    <div>
        <ProductCard
  title="Chocolate Truffle Cake"
  description="Rich chocolate cake layered with smooth truffle cream and decorated with chocolate shavings"
  price={899}
  image="/api/placeholder/400/320"
  category="Premium Cakes"
  isNewItem={true}
  weight="1 kg"
/>
      
    </div>
  )
}

export default page
