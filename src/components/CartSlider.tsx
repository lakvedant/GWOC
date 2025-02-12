import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types/checkout';

interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center gap-4 mb-4 p-4 border-b">
      <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onQuantityChange(item.id.toString(), Math.max(1, item.quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-sm">{item.quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onQuantityChange(item.id.toString(), item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(item.id.toString())}
            className="text-red-500 ml-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};

interface CartSliderProps {
  onClose: () => void; // Function to close the drawer
}

export const CartSlider: React.FC<CartSliderProps> = ({ onClose }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1, title: "Product 1", price: 2, quantity: 1,
      name: '',
      image: '',
      variant: ''
    },
    {
      id: 2, title: "Product 2", price: 1, quantity: 2,
      name: '',
      image: '',
      variant: ''
    },
    {
      id: 3, title: "Product 3", price: 2, quantity: 1,
      name: '',
      image: '',
      variant: ''
    },
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === Number(id) ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id.toString() !== id));
  };

  const handleCouponApply = () => {
    const validCoupons: { [key: string]: number } = {
      'SAVE10': 0.1,
      'SAVE20': 0.2,
      'test99' : 0.99
    };

    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
    } else {
      alert('Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal * (1 - discount);

  const handleCheckout = () => {
    // Store cart data in localStorage or state management solution
    localStorage.setItem('cartData', JSON.stringify({
      items: cartItems,
      subtotal,
      discount,
      total
    }));

    // Close the drawer
    onClose();

    // Navigate to checkout page
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b">
        <h2 className="text-lg font-medium">Shopping Cart</h2>
      </div>
      <ScrollArea className="flex-1 px-4">
        {cartItems.map((item) => (
          <CartItemComponent 
            key={item.id} 
            item={item} 
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        ))}
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
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between mb-4 text-green-600">
            <span>Discount ({(discount * 100).toFixed(0)}%)</span>
            <span>-${(subtotal * discount).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between mb-4 font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
};
