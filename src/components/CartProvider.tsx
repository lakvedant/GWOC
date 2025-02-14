'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types/checkout';

interface UserInfo {
  userId: string;
  name: string;
  phone: string;
  email?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  userInfo: UserInfo | null;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
  subtotal: number;
  discount: number;
  setDiscount: (discount: number) => void;
  isAuthenticated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [discount, setDiscount] = useState(0);

  // Load cart and user info from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedUserInfo = localStorage.getItem('userInfo');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save user info to localStorage when it changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [userInfo]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === newItem.id && item.variant === newItem.variant
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id && item.variant === newItem.variant
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const updateUserInfo = (info: UserInfo) => {
    setUserInfo(info);
    localStorage.setItem('userInfo', JSON.stringify(info));
  };

  const clearUserInfo = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isAuthenticated = Boolean(userInfo?.userId);

  return (
    <CartContext.Provider value={{
      cartItems,
      userInfo,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      updateUserInfo,
      clearUserInfo,
      subtotal,
      discount,
      setDiscount,
      isAuthenticated
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
