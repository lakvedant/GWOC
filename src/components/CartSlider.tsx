"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { IKImage } from "imagekitio-next";
import LoginSignupModal from "@/components/Login";

interface CartSliderProps {
  onClose?: () => void;
}

const COUPONS: { [key: string]: number } = {
  "SAVE10": 0.10, // 10% off
  "SAVE20": 0.20, // 20% off
  "FREESHIP": 0.15, // 15% off
  "SAVE99": 0.99, // 99% off
};

const getAuthStatus = async (): Promise<boolean> => {
  const response = await fetch("/api/auth-status", { cache: "no-store" });
  const data = await response.json();
  return data.isAuthenticated;
};

export const CartSlider: React.FC<CartSliderProps> = ({ onClose }) => {
  const router = useRouter();
  const { cartItems, updateQuantity, removeItem, subtotal, discount, setDiscount, userInfo } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!userInfo);

  useEffect(() => {
    if (!userInfo) {
      const fetchAuthStatus = async () => {
        const authStatus = await getAuthStatus();
        setIsAuthenticated(authStatus);
      };
      fetchAuthStatus();
    }
  }, [userInfo]);

  const handleCheckout = () => {
    if (isAuthenticated) {
      if (onClose) onClose();
      router.push("/checkout");
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleCouponApply = () => {
    const formattedCode = couponCode.trim().toUpperCase();
    if (COUPONS[formattedCode as keyof typeof COUPONS]) {
      setDiscount(COUPONS[formattedCode]);
      setNotification(`Coupon applied! You saved ${(COUPONS[formattedCode] * 100).toFixed(0)}%.`);
    } else {
      setNotification("Invalid coupon code. Try again.");
      setDiscount(0);
    }
  };

  return (
    <div className="flex flex-col h-full z-50">
      <div className="px-4 py-2 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">Shopping Cart ({cartItems.length})</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="ml-auto"
          aria-label="Close cart"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Your cart is empty</div>
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
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleCouponApply}>Apply</Button>
        </div>
        {notification && <p className="text-sm text-green-600 mb-2">{notification}</p>}

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
          <span>₹{(subtotal * (1 - discount)).toFixed(2)}</span>
        </div>
        <Button className="w-full" onClick={handleCheckout} disabled={cartItems.length === 0}>
          Checkout
        </Button>
      </div>

      {!isAuthenticated && <LoginSignupModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};