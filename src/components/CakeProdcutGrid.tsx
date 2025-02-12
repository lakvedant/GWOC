import type React from "react"
import CakeProductCard from "@/components/CakeProductCard"

interface Product {
  title: string
  price: number
  rating: number
  imageUrl: string
}

const products: Product[] = [
  {
    title: "Chocolate Truffle Cake",
    price: 499,
    rating: 4.8,
    imageUrl: "/cupcake.png",
  },
  {
    title: "Vanilla Delight Cake",
    price: 399,
    rating: 4.5,
    imageUrl: "/cupcake.png",
  },
  {
    title: "Strawberry Fantasy Cake",
    price: 449,
    rating: 4.7,
    imageUrl: "/cupcake.png",
  },
  {
    title: "Black Forest Cake",
    price: 429,
    rating: 4.6,
    imageUrl: "/cupcake.png",
  },
  {
    title: "Red Velvet Cake",
    price: 529,
    rating: 4.9,
    imageUrl: "/cupcake.png",
  },
  {
    title: "Butterscotch Bliss Cake",
    price: 479,
    rating: 4.5,
    imageUrl: "/cupcake.png",
  },
]

const ProductGrid: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-10 flex-1 items-center justify-center">
      {products.map((product, index) => (
        <CakeProductCard key={index} title={product.title} price={product.price} imageUrl={product.imageUrl} />
      ))}
    </div>
  )
}

export default ProductGrid