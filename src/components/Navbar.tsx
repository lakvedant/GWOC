"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartSlider } from "./CartSlider";
import Link from "next/link";
import LoginSignupModal from "./Login";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    setCartItems(savedCart);

    // Handle clicking outside to close cart
    const handleClickOutside = (event: MouseEvent) => {
      const cartPanel = document.getElementById("cart-panel");
      if (cartPanel && !cartPanel.contains(event.target as Node) && !(event.target as Element).closest(".cart-trigger")) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reviews", label: "Reviews" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={150} 
              height={60} 
              className="h-14 w-auto" 
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-pink-600 text-lg font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </div>

          {/* Right Section - Search, Account, Cart */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                className="w-64 pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-pink-400 focus:ring-pink-400 text-base"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Account Button */}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center space-x-2 hover:bg-pink-50 hover:text-pink-600 rounded-full px-6 py-3 transition-colors duration-200"
            >
              <User className="h-6 w-6" />
              <span className="text-base font-medium">Account</span>
            </Button>

            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="lg"
              className="cart-trigger relative flex items-center space-x-2 hover:bg-pink-50 hover:text-pink-600 rounded-full px-6 py-3 transition-colors duration-200"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-base font-medium">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-pink-600 rounded-full text-white text-sm flex items-center justify-center animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:bg-pink-50 rounded-full p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-pink-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
        } overflow-hidden bg-white border-t`}
      >
        <div className="px-4 py-4 space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-gray-200"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Custom Cart Slider */}
      <div
        id="cart-panel"
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <CartSlider onClose={() => setIsCartOpen(false)} />
        </div>
      </div>

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginSignupModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;