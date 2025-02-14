"use client";

import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartProvider';
import { IKImage } from 'imagekitio-next';

interface CartSliderProps {
  onClose?: () => void;
}

export const CartSlider: React.FC<CartSliderProps> = ({ onClose }) => {
  const router = useRouter();
  
  const { cartItems, updateQuantity, removeItem, subtotal, discount, setDiscount } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [notification, setNotification] = useState('');

  const handleCouponApply = () => {
    const validCoupons: { [key: string]: number } = {
      'SAVE10': 0.1,
      'SAVE20': 0.2,
      'test99': 0.99
    };

    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
      setNotification('Coupon applied successfully!');
    } else {
      setNotification('Invalid coupon code');
    }
    setTimeout(() => setNotification(''), 3000);
  };

  const total = subtotal * (1 - discount);

  const handleCheckout = () => {
    if (onClose) onClose();
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b">
        <h2 className="text-lg font-medium">Shopping Cart ({cartItems.length})</h2>
      </div>

      <ScrollArea className="flex-1 px-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mb-4 p-4 border-b">
              <div className="relative w-16 h-16">
                <IKImage
                  path={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={64}
                  height={64}
                  lqip={{ active: true }}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                {item.variant && <p className="text-sm text-gray-500">{item.variant}</p>}
                {item.message && <p className="text-sm text-gray-500">Message: {item.message}</p>}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))
        )}
      </ScrollArea>

      <div className="px-4 py-2 border-t">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleCouponApply}>Apply</Button>
        </div>
        <div className="flex justify-between mb-4">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between mb-4 text-green-600">
            <span>Discount ({(discount * 100).toFixed(0)}%)</span>
            <span>-₹{(subtotal * discount).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between mb-4 font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <Button
          className="w-full"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
