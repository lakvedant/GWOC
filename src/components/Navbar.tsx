"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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

  React.useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    setCartItems(savedCart);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reviews", label: "Reviews" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
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
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTitle></SheetTitle>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="relative flex items-center space-x-2 hover:bg-pink-50 hover:text-pink-600 rounded-full px-6 py-3 transition-colors duration-200"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-base font-medium">Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-6 w-6 bg-pink-600 rounded-full text-white text-sm flex items-center justify-center animate-pulse">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
                <CartSlider onClose={() => setIsCartOpen(false)} />
              </SheetContent>
            </Sheet>
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

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginSignupModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;