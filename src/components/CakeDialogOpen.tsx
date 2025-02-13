'use client'
import React, { useState } from 'react';
import { Heart, Info, Clock } from 'lucide-react';
import Image from 'next/image';
import { ProductData } from '@/models/Product';
import { IKImage } from 'imagekitio-next';
import { CartItem } from '@/types/checkout';
import { useRouter } from 'next/navigation';

type WeightOption = '0.5 Kg' | '1 Kg' | '1.5 Kg' | '2 Kg' | '4 Kg';

interface CakeOrderDialogProps {
  product: ProductData;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const CakeOrderDialog: React.FC<CakeOrderDialogProps> = ({ product, onClose, onAddToCart }) => {
  const router = useRouter();
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>('0.5 Kg');
  const [message, setMessage] = useState('');
  const [isWishlistActive, setIsWishlistActive] = useState(false);

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
    onAddToCart(cartItem);
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="relative bg-white">
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <div className='h-[36rem] relative'>
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
                {product.description}
                <span className="text-pink-500 cursor-pointer ml-1">Read more</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Image src="/veg.png" width={14} height={14} alt="veg" className="opacity-80" />
                  <span className="text-sm text-green-600 font-extrabold -ml-1">EGGLESS</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">{product.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-700">4.9</span>
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

            <div className="space-y-4">
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

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Product Description</h2>
                  <p className="text-gray-600">
                    {product.description}
                    <button className="text-pink-500 hover:text-pink-600 font-medium ml-1">
                      Read more
                    </button>
                  </p>
                  <p className="text-gray-400 mt-2">Category: {product.category}</p>
                </div>

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
              </div>

              <div className="grid grid-cols-2 gap-4 bottom-2 relative">
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
    </div>
  );
};

export default CakeOrderDialog;