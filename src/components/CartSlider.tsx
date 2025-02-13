import React, { useState } from 'react';
import { Toast } from "@/components/ui/toast"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types/checkout';

// // Add notification component
// const CartNotification = ({ message }: { message: string }) => (
//   <Toast className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
//     {message}
//   </Toast>
// );


interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  setCartItems: (items: any) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center gap-4 mb-4 p-4 border-b">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.variant}</p>
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
      <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};

interface CartSliderProps {
  onClose: () => void;
  cartItems: CartItem[]; // Should be an array
  setCartItems: (items: CartItem[]) => void; // Should be a function
}

export const CartSlider: React.FC<CartSliderProps> = ({ onClose }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    setNotificationMessage(`${product.name} added to cart`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === String(id) ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id.toString() !== id));
  };

  const handleCouponApply = () => {
    const validCoupons: { [key: string]: number } = {
      'SAVE10': 0.1,
      'SAVE20': 0.2,
      'test99': 0.99
    };

    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
      setNotificationMessage('Coupon applied successfully!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      setNotificationMessage('Invalid coupon code');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal * (1 - discount);

  const handleCheckout = () => {
    localStorage.setItem('cartData', JSON.stringify({
      items: cartItems,
      subtotal,
      discount,
      total
    }));
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col h-full">
      {showNotification && <CartNotification message={notificationMessage} />}
      <div className="px-4 py-2 border-b">
        <h2 className="text-lg font-medium">Shopping Cart</h2>
      </div>
      <ScrollArea className="flex-1 px-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItemComponent 
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem} setCartItems={function (items: any): void {
                throw new Error('Function not implemented.');
              } }            />
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