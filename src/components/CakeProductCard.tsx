import React from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

interface CakeCardProps {
  title: string;
  price: number;
  imageUrl: string;
}

const CakeProductCard: React.FC<CakeCardProps> = ({
  title,
  price,
  imageUrl = "/api/placeholder/200/200",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden max-w-[320px] border border-gray-100 relative group">
      <div className="absolute top-3 right-3 z-10">
        <Image src="/veg.png" width={16} height={16} alt="veg" className="opacity-80" />
      </div>

      <div className="relative aspect-square w-full bg-gray-50 p-2">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 p-6"
          priority
        />
      </div>

      <div className="p-4 pb-1 space-y-3 bg-white">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
            {title}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">₹</span>
            <span className="text-xl font-bold text-gray-900">{price}</span>
          </div>
          <Button 
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-1.5 rounded-full text-sm font-medium"
          >
            Add to Cart
          </Button>
        </div>

        <p className="text-[11px] text-gray-400 text-center border-t border-gray-50 pt-1">
          Customisable
        </p>
      </div>
    </div>
  );
};

export default CakeProductCard;