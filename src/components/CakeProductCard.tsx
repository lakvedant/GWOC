import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { IKImage } from 'imagekitio-next';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CakeOrderDialog from './CakeDialogOpen';
import { ProductData } from '@/models/Product';
import { CartItem } from '@/types/checkout';
import { useCart } from '@/hooks/useCart';

interface CakeCardProps {
  product: ProductData;
}

const CakeProductCard: React.FC<CakeCardProps> = ({ product }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();

  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100))
    : product.price;

  const handleAddToCart = (cartItem: CartItem) => {
    addToCart(cartItem);
    setIsDialogOpen(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCardClick = () => {
    if (product.available) {
      setIsDialogOpen(true);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    if (product.available) {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden max-w-[300px] border border-gray-100 relative group cursor-pointer"
      >
        <div className="absolute top-3 right-3 z-10">
          <Image src="/veg.png" width={20} height={20} alt="veg" className="opacity-80" />
        </div>
        
        <div className="relative aspect-square bg-gray-50 p-2">
          <IKImage
            path={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <div className="p-4 pb-1 space-y-3 bg-white">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-medium text-gray-800 line-clamp-1">
              {product.name}
            </h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-semibold text-gray-900">₹</span>
              <span className="text-xl font-semibold text-gray-900">{discountedPrice}</span>
            </div>
            <Button
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-1.5 rounded-full text-sm font-medium"
              onClick={handleButtonClick}
              disabled={!product.available}
            >
              {product.available ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>

          {product.category.toLowerCase() === "cakes" ? (
            <div className="text-[11px] text-gray-400 text-center -mt-1">
              <p>Customisable</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl p-0">
          <DialogTitle className="sr-only">Customize {product.name}</DialogTitle>
          <CakeOrderDialog 
            product={product} 
            onClose={() => setIsDialogOpen(false)}
            onAddToCart={handleAddToCart}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CakeProductCard;