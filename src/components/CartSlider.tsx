import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  title: string;
  price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ title, price, quantity }) => {
  return (
    <div className="flex items-center gap-4 mb-4 p-4 border-b">
      <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      </div>
      <p className="font-medium">${price}</p>
    </div>
  );
};

export const CartSlider = () => {
  const cartItems = [
    { title: "Product 1", price: 99.99, quantity: 1 },
    { title: "Product 2", price: 149.99, quantity: 2 },
    { title: "Product 3", price: 79.99, quantity: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b">
        <h2 className="text-lg font-medium">Shopping Cart</h2>
      </div>
      <ScrollArea className="flex-1 px-4">
        {cartItems.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
      </ScrollArea>
      <div className="border-t p-4 mt-auto">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  );
};