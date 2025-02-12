import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isNewItem?: boolean;
  weight?: string;
}

const ProductCard = ({
  title,
  description,
  price,
  image,
  category,
  isNewItem = false,
  weight = "1 kg"
}: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isNewItem && (
          <Badge className="absolute top-4 left-4 bg-pink-500 text-white">
            New Arrival
          </Badge>
        )}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-pink-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <span className="text-sm text-pink-500 font-medium">
            {category}
          </span>
          <h3 className="text-lg font-semibold text-gray-800 mt-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-pink-600">
              ₹{price}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              / {weight}
            </span>
          </div>
          
          <Button 
            size="sm"
            className="bg-pink-100 text-pink-700 hover:bg-pink-200 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Quick view overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Button className="bg-white text-pink-600 hover:bg-pink-50">
          Quick View
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;