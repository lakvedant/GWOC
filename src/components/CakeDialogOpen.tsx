'use client';
import React, { useState, useEffect } from 'react';
import { Heart, Info, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { ProductData } from '@/models/Product';
import { IKImage } from 'imagekitio-next';
import { CartItem } from '@/types/checkout';
import { useRouter } from 'next/navigation';
import { useCart } from './CartProvider';

interface Review {
  _id: string;
  userName: string;
  userid: string;
  rating: number;
  comment: string;
  status: string;
  productId: string;
  productName: string;
  createdAt: string;
}

type WeightOption = string;

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
  const [weightOptions, setWeightOptions] = useState<WeightOption[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>('');
  const [message, setMessage] = useState('');
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(product.price);
  const [discountedPrice, setDiscountedPrice] = useState<number>(product.price);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const shortText = product.description.slice(0, 100);


  // Define weight options and prices based on category
  useEffect(() => {
    let options: string[] = [];
    
    if (product.category === "Cakes" || product.category === "Chocolate Modak") {
      options = ["500g", "1kg", "1.5kg", "2kg", "3kg"];
    } else if (product.category === "Cookies" || product.category === "Muffins") {
      options = ["100g", "250g", "500g", "1kg"];
    } else {
      options = ["1 Pc", "2 Pc", "5 Pc", "8 Pc", "10 Pc"];
    }
    
    setWeightOptions(options);
    setSelectedWeight(options[0]); // Set first option as default
  }, [product.category]);

  // Calculate price based on selected weight
  useEffect(() => {
    if (!selectedWeight) return;
    
    let priceMultiplier = 1;
    const isPieceBased = selectedWeight.includes('Pc');
    
    if (isPieceBased) {
      const pieceCount = parseInt(selectedWeight.split(' ')[0]);
      priceMultiplier = pieceCount;
    } else {
      if (selectedWeight === '100g') priceMultiplier = 0.2;
      else if (selectedWeight === '250g') priceMultiplier = 0.5;
      else if (selectedWeight === '500g') priceMultiplier = 1;
      else if (selectedWeight === '1kg') priceMultiplier = 2;
      else if (selectedWeight === '1.5kg') priceMultiplier = 3;
      else if (selectedWeight === '2kg') priceMultiplier = 4;
      else if (selectedWeight === '3kg') priceMultiplier = 6;
    }
    
    const newPrice = product.price * priceMultiplier;
    setCurrentPrice(newPrice);
    
    // Calculate discounted price
    const newDiscountedPrice = product.discount 
      ? newPrice - (newPrice * (product.discount / 100))
      : newPrice;
    setDiscountedPrice(newDiscountedPrice);
  }, [selectedWeight, product.price, product.discount]);

  // Fetch reviews for this product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const response = await fetch(`/api/reviews/${product._id}`);
        if (response.ok) {
          const data = await response.json();
          
          // Filter reviews to show only those with "Approved" status
          const approvedReviews = data.filter((review: Review) => review.status === "Approved");
          setReviews(approvedReviews);
          
          // Calculate average rating only from approved reviews
          if (approvedReviews.length > 0) {
            const sum = approvedReviews.reduce((acc: number, review: Review) => acc + review.rating, 0);
            setAverageRating(parseFloat((sum / approvedReviews.length).toFixed(1)));
          } else {
            setAverageRating(0);
          }
        } else {
          console.error('Failed to fetch reviews:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    if (product._id) {
      fetchReviews();
    }
  }, [product._id]);

  const handleAddToCart = () => {
    const isPieceBased = selectedWeight.includes('Pc');
    const basePrice = isPieceBased ? product.price : discountedPrice;
    
    const cartItem: CartItem = {
      id: product._id,
      name: product.name,
      price: basePrice,
      quantity: isPieceBased ? parseInt(selectedWeight.split(' ')[0]) : 1,
      image: product.image,
      variant: selectedWeight,
      message: message,
      title: '',
      weight: selectedWeight
    };
    addToCart(cartItem);
    onClose();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };


  return (
    <div className="relative bg-white max-h-[90vh] overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Left side - Image section */}
          <div className="relative">
            <div className='h-[250px] md:h-[27.7rem] relative'>
              <IKImage
                path={product.image}
                alt={product.name}
                fill
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-pink-50/90 p-3 md:p-4 rounded-b-lg">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">In Our Chef&apos;s Word</h3>
              <p className="text-xs md:text-sm text-gray-600">
                {chefWords[product.category]}
              </p>
            </div>
          </div>

          {/* Right side - scrollable content */}
          <div className="relative flex flex-col h-[calc(90vh-300px)] md:h-[36rem]">
            <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-4 md:space-y-6">
              {/* Product header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Image src="/veg.png" width={14} height={14} alt="veg" className="opacity-80" />
                    <span className="text-xs md:text-sm text-green-600 font-extrabold -ml-1">EGGLESS</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{product.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700 text-sm">
                      {averageRating > 0 ? averageRating : 4.9}
                    </span>
                    <span className="text-gray-400 text-sm">({reviews.length || 0} reviews)</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsWishlistActive(!isWishlistActive)}
                  className="p-2 hover:bg-pink-50 rounded-full transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 md:w-6 md:h-6 ${isWishlistActive ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>

              {/* Price section */}
              <div className="flex flex-wrap items-center gap-2">
                {product.discount && (
                  <span className="text-sm md:text-base text-gray-400 line-through">₹{currentPrice}</span>
                )}
                <span className="text-xl md:text-2xl font-bold text-gray-900">₹{discountedPrice}</span>
                {product.discount && (
                  <span className="text-sm text-green-500">({product.discount}% OFF)</span>
                )}
              </div>

              {/* Weight selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800 text-sm md:text-base">
                    {selectedWeight.includes('Pc') ? 'Select Quantity' : 'Select Weight'}
                  </h3>
                  <button className="flex items-center gap-1 text-gray-500 text-xs md:text-sm">
                    <Info className="w-4 h-4" />
                    Serving Info
                  </button>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {weightOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedWeight(option)}
                      className={`p-2 rounded border text-xs md:text-sm transition-colors ${
                        selectedWeight === option
                          ? "border-pink-500 text-pink-500 bg-pink-50"
                          : "border-gray-200 text-gray-600 hover:border-pink-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message input */}
              {product.category === "Cakes" && (
                <div>
                  <label className="block text-gray-800 font-medium mb-2 text-sm md:text-base">
                    Cake Message
                    <span className="float-right text-gray-400 text-xs md:text-sm">
                      {message.length}/25
                    </span>
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 25))}
                    placeholder="Enter message on cake"
                    className="w-full p-2 md:p-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm md:text-base"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Product Description</h2>
                <p className="text-sm md:text-base text-gray-600">
                  {isExpanded ? product.description : shortText + "..."}
                  {!isExpanded && product.description.length > 175 && (
                    <button 
                      className="text-pink-500 hover:text-pink-600 font-medium ml-1 text-sm md:text-base"
                      onClick={() => setIsExpanded(true)}
                    >
                      Read more
                    </button>
                  )}
                </p>
                {isExpanded && (
                  <button 
                    className="text-pink-500 hover:text-pink-600 font-medium mt-2 text-sm md:text-base"
                    onClick={() => setIsExpanded(false)}
                  >
                    Read less
                  </button>
                )}
              </div>

              {/* Features grid */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 bg-gray-50 rounded-lg p-3 md:p-4">
                <div className="flex flex-col items-center text-center">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-pink-500 mb-1 md:mb-2" />
                  <span className="text-xs md:text-sm font-medium">Made to Order</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xl md:text-2xl mb-1 md:mb-2">🍰</span>
                  <span className="text-xs md:text-sm font-medium">100% Fresh</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xl md:text-2xl mb-1 md:mb-2">✓</span>
                  <span className="text-xs md:text-sm font-medium">HomeMade</span>
                </div>
              </div>

              {/* Reviews section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Ratings & Reviews</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                    <div>
                      <span className="text-3xl font-bold">{averageRating > 0 ? averageRating : 4.9}</span>
                      <span className="text-gray-500 text-lg">/5</span>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-gray-500">
                    Based on {reviews.length || 0} reviews
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-4">
                  {isLoadingReviews ? (
                    <p className="text-gray-500">Loading reviews...</p>
                  ) : reviews.length > 0 ? (
                    reviews.slice(0, 3).map((review) => (
                      <div key={review._id} className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="flex">
                            {Array(Math.floor(review.rating)).fill(null).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            {Array(5 - Math.floor(review.rating)).fill(null).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-gray-200" />
                            ))}
                          </span>
                          <span className="text-gray-400">Verified user</span>
                        </div>
                        <h3 className="font-medium mt-2">{review.userName}</h3>
                        {review.comment && (
                          <p className="text-gray-700 mt-1">{review.comment}</p>
                        )}
                        <div className="text-sm text-gray-500 mt-1">
                          Posted on {formatDate(review.createdAt)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              </div>
              {/* Read all reviews button */}
              {reviews.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <button 
                    onClick={() => router.push(`/product/${product._id}/reviews`)}
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
              )}
            </div>

            {/* Fixed buttons at bottom */}
            <div className="sticky bottom-0 bg-white pt-3 md:pt-4 mt-3 md:mt-4 grid grid-cols-2 gap-2 md:gap-4">
              <button 
                className="p-2 md:p-3 rounded-lg border-2 border-pink-500 text-pink-500 font-medium hover:bg-pink-50 transition-colors text-sm md:text-base"
                disabled={!product.available}
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button 
                className="p-2 md:p-3 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors text-sm md:text-base"
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