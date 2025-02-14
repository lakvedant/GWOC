'use client'
import React, { useState } from 'react';
import { Heart, Info, Clock, Star} from 'lucide-react';
import Image from 'next/image';
import { ProductData } from '@/models/Product';
import { IKImage } from 'imagekitio-next';
import { CartItem } from '@/types/checkout';
import { useRouter } from 'next/navigation';
import { useCart } from './CartProvider';



type WeightOption = '0.5 Kg' | '1 Kg' | '1.5 Kg' | '2 Kg' | '4 Kg';

interface CakeOrderDialogProps {
  product: ProductData;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}



const chefWords: { [key: string]: string[] } = {
  "Fudge": [
      "Indulge in the rich, velvety smoothness of homemade fudge, where every bite melts in your mouth, releasing a burst of deep chocolate flavor, balanced with buttery sweetness and a hint of caramelized perfection."
  ],
  
  "Chocolate Modak": [
      "A divine fusion of tradition and indulgence, chocolate modaks combine the richness of creamy chocolate with the essence of festive joy, creating a mouthwatering delight that melts in your mouth and leaves a lingering sweetness."
  ],
  
  "Truffle Balls": [
      "Bite into the luxurious delight of chocolate truffle balls, where silky-smooth ganache meets a crisp cocoa dusting, offering a heavenly balance of rich chocolate intensity and melt-in-your-mouth creaminess in every bite."
  ],
  
  "Brownie": [
      "Experience the perfect blend of crisp, crackly edges and an irresistibly fudgy center in every brownie, packed with intense chocolate goodness, creating a rich, gooey, and utterly satisfying treat for any sweet craving."
  ],
  
  "Muffins": [
      "Enjoy the soft, fluffy texture of freshly baked muffins, bursting with delicious flavors like chocolate chips, blueberries, or cinnamon spice, offering a perfect balance of sweetness, moisture, and golden-baked perfection in every bite."
  ],
  
  "Cookies": [
      "Savor the delightful crunch of golden-baked cookies with a chewy, melt-in-your-mouth center, generously packed with chocolate chips, nuts, or caramel, delivering the ultimate combination of crispiness and softness in every bite."
  ],
  
  "Cakes": [
      "Celebrate every moment with moist, spongy cakes, layered with luscious buttercream, silky ganache, or fresh fruits, creating a divine fusion of textures and flavors that make every slice a piece of edible art."
  ],
  
  "Ice Cream": [
      "Cool down with creamy, dreamy ice cream, crafted with the finest ingredients, offering a smooth, velvety texture and a refreshing burst of flavors that melt effortlessly, leaving a lingering sweetness on your taste buds."
  ],
  
  "Donuts": [
      "Sink your teeth into a soft, fluffy donut, coated in glossy chocolate, sprinkled with vibrant toppings, or filled with luscious cream, delivering the perfect balance of sweetness, airiness, and indulgence in every bite."
  ],
  
  "Swiss Rolls": [
      "Relish the perfect swirl of delicate sponge cake and rich, creamy filling in Swiss rolls, offering a light yet indulgent treat that combines soft textures, sweet flavors, and a delightful melt-in-mouth experience."
  ]
};

const CakeOrderDialog: React.FC<CakeOrderDialogProps> = ({ product, onClose }) => {

  const router = useRouter();
  const { addToCart } = useCart();  
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>('0.5 Kg');
  const [message, setMessage] = useState('');
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const shortText = product.description.slice(0, 175); 

  const weights: WeightOption[] = ['0.5 Kg', '1 Kg', '1.5 Kg', '2 Kg', '4 Kg'];
  
  const originalPrice = product.price;
  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100))
    : product.price;

    const handleAddToCart = () => {
      const cartItem: CartItem = {
        id: product._id,
        name: product.name,
        price: discountedPrice,
        quantity: 1,
        image: product.image,
        variant: selectedWeight,
        message: message,
        title: ''
      };
      addToCart(cartItem);  // <-- Add to cart using the context
      onClose();  // Close the dialog after adding to cart
    };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="relative bg-white">
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - keep the image section unchanged */}
          <div className="relative">
            <div className='h-[27.7rem] relative'>
              <IKImage
                path={product.image}
                alt={product.name}
                fill
                className="rounded-lg w-full"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-pink-50/90 p-4 rounded-b-lg">
              <h3 className="font-semibold text-gray-800">In Our Chef's Word</h3>
              <p className="text-sm text-gray-600">
                {chefWords[product.category]}
              </p>
            </div>
          </div>

          {/* Right side - scrollable content */}
          <div className="relative flex flex-col h-[36rem]">
            <div className="flex-1 overflow-y-auto pr-4 space-y-6">
              {/* Product header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Image src="/veg.png" width={14} height={14} alt="veg" className="opacity-80" />
                    <span className="text-sm text-green-600 font-extrabold -ml-1">EGGLESS</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mt-1">{product.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700">
                      {product.review && product.review.length > 0
                        ? (product.review.reduce((acc, curr) => acc + curr.rating, 0) / product.review.length).toFixed(1)
                        : 4.9}
                    </span>
                    <span className="text-gray-400">({product.review?.length || 0} reviews)</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsWishlistActive(!isWishlistActive)}
                  className="p-2 hover:bg-pink-50 rounded-full transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlistActive ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>

              {/* Price section */}
              <div className="flex items-center gap-2">
                {product.discount && (
                  <span className="text-gray-400 line-through">₹{originalPrice}</span>
                )}
                <span className="text-2xl font-bold text-gray-900">₹{discountedPrice}</span>
                {product.discount && (
                  <span className="text-green-500">({product.discount}% OFF)</span>
                )}
                <span className="text-sm text-gray-500">(Inclusive of GST)</span>
              </div>

              {/* Weight selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800">Select Weight</h3>
                  <button className="flex items-center gap-1 text-gray-500 text-sm">
                    <Info className="w-4 h-4" />
                    Serving Info
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {weights.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`p-2 rounded border text-sm transition-colors ${
                        selectedWeight === weight
                          ? 'border-pink-500 text-pink-500 bg-pink-50'
                          : 'border-gray-200 text-gray-600 hover:border-pink-200'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message input */}
              {product.category === "Cakes" && (
                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    Cake Message
                    <span className="float-right text-gray-400 text-sm">
                      {message.length}/25
                    </span>
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 25))}
                    placeholder="Enter message on cake"
                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                  />
                </div>
              )}


              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Product Description</h2>
                <p className="text-gray-600">
                  {isExpanded ? product.description : shortText + "..."}
                  {!isExpanded && product.description.length > 175 && (
                    <button 
                      className="text-pink-500 hover:text-pink-600 font-medium ml-1"
                      onClick={() => setIsExpanded(true)}
                    >
                      Read more
                    </button>
                  )}
                </p>
                {isExpanded && (
                  <button 
                    className="text-pink-500 hover:text-pink-600 font-medium mt-2"
                    onClick={() => setIsExpanded(false)}
                  >
                    Read less
                  </button>
                )}
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                <div className="flex flex-col items-center text-center">
                  <Clock className="w-8 h-8 text-pink-500 mb-2" />
                  <span className="text-sm font-medium">On-Time Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-2xl mb-2">🍰</span>
                  <span className="text-sm font-medium">100% Fresh</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-2xl mb-2">✓</span>
                  <span className="text-sm font-medium">HomeMade</span>
                </div>
              </div>

              {/* Reviews section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Ratings & Reviews</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                    <div>
                      <span className="text-3xl font-bold">4.9</span>
                      <span className="text-gray-500 text-lg">/5</span>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-gray-500">
                    Based on {product.review?.length || 0} reviews
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-4">
                  {[
                    { name: 'Nikki', rating: 5, date: '07/02/2025', location: 'Delhi', occasion: 'Birthday' },
                    { name: 'Sapna Nishad', rating: 5, date: '07/02/2025', location: 'Faridabad', occasion: 'Birthday' },
                    { name: 'Mahendra Yadav', rating: 5, date: '05/02/2025', location: 'Bangalore', occasion: 'Birthday' }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="flex">
                          {Array(review.rating).fill(null).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </span>
                        <span className="text-gray-400">Verified user</span>
                      </div>
                      <h3 className="font-medium mt-2">{review.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        Posted on {review.date}  •  {review.location} 
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Read all reviews button */}
              <div className="border-t border-gray-100 pt-4">
                <button 
                  onClick={() => router.push('/reviews')}
                  className="w-full text-left text-gray-800 font-medium py-3 px-4 hover:bg-gray-50 rounded-lg flex justify-between items-center group transition-colors"
                >
                  Read all reviews
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              
            </div>

            {/* Fixed buttons at bottom */}
            <div className="relative bottom-0 bg-white pt-4 mt-4 grid grid-cols-2 gap-4">
              <button 
                className="p-3 rounded-lg border-2 border-pink-500 text-pink-500 font-medium hover:bg-pink-50 transition-colors"
                disabled={!product.available}
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button 
                className="p-3 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
                disabled={!product.available}
                onClick={handleBuyNow}
              >
                Buy Now | ₹{discountedPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeOrderDialog;