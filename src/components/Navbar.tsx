"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginSignupModal from "./Login";
import { Input } from "@/components/ui/input";
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from "framer-motion";
import { CartSlider } from "@/components/CartSlider"; // Ensure CartSlider handles checkout logic

export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setTimeout(() => setIsLoginOpen(true), 300); // Ensure smooth transition
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 font-playfair ${
        scrolled ? "bg-rose-50/80 backdrop-blur-lg shadow-lg" : "bg-rose-50"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Image src="/logo.png" alt="logo" width={150} height={150} className="h-12 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center space-x-1">
            {["Home", "About", "Menu", "Contact"].map((label) => (
              <motion.div key={label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/${label.toLowerCase()}`}
                  className="relative px-5 py-2 text-rose-900 hover:text-rose-700 text-sm font-semibold rounded-full transition-all duration-300 hover:bg-rose-100 group font-montserrat tracking-wide"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search & Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div className="relative" animate={{ width: searchFocused ? 300 : 200 }} transition={{ duration: 0.3 }}>
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-rose-200 bg-white/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-rose-300 focus:border-transparent font-montserrat"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-400" />
            </motion.div>

            <Button variant="ghost" size="icon" className="hover:bg-rose-100 rounded-full p-2" onClick={() => setIsLoginOpen(true)}>
              <User className="h-6 w-6 text-rose-700" />
            </Button>

            {/* Custom Cart Button */}
            <Button variant="ghost" size="lg" className="relative flex items-center space-x-2 hover:bg-pink-50 rounded-full px-6 py-3"
              onClick={() => setIsCartOpen(true)}
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

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-rose-100 rounded-full p-2">
              <ShoppingCart className="h-6 w-6 text-rose-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white text-xs flex items-center justify-center font-montserrat">
                  {cartItems.length}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hover:bg-rose-100 rounded-full p-2">
              {isMobileMenuOpen ? <X className="h-6 w-6 text-rose-700" /> : <Menu className="h-6 w-6 text-rose-700" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Custom Cart Sidebar */}
      <div className={`fixed top-0  right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="h-full overflow-y-auto">
          <CartSlider onClose={() => setIsCartOpen(false)} />
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsCartOpen(false)} />}

      {/* Login Modal */}
      {isLoginOpen && <LoginSignupModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
    </motion.nav>
  );
};

export default Navbar;
