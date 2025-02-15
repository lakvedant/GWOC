"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { IKImage } from "imagekitio-next";
import LoginSignupModal from "@/components/Login"; // Import the Login Modal

interface CartSliderProps {
  onClose?: () => void;
}

// Function to check auth status on the server (fallback)
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!userInfo); // Use userInfo first

  // Check authentication status only if userInfo is missing
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

  // Callback for successful login → Redirect to checkout
  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    router.push("/checkout");
  };

  function handleCouponApply(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b">
        <h2 className="text-lg font-medium">Shopping Cart ({cartItems.length})</h2>
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
          <span>₹{(subtotal * (1 - discount)).toFixed(2)}</span>
        </div>
        <Button className="w-full" onClick={handleCheckout} disabled={cartItems.length === 0}>
          Checkout
        </Button>
      </div>

      {/* Login Modal (Only show if user is NOT authenticated) */}
      {!isAuthenticated && <LoginSignupModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};
