"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CartSlider } from "@/components/CartSlider";
import UserDropdown from "@/components/UserProfile";

export const Navbar = () => {
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-30 transition-all duration-300 font-playfair ${
        scrolled ? "bg-rose-50/80 backdrop-blur-lg shadow-lg" : "bg-rose-50"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo.png" alt="logo" width={150} height={150} className="h-12 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center space-x-1">
            {["Home", "About", "Menu", "Contact"].map((label) => (
              <Link
                key={label}
                href={label !== "Home" ? `/${label.toLowerCase()}` : ("/")}
                className="px-5 py-2 text-rose-900 hover:text-rose-700 text-sm font-semibold rounded-full hover:bg-rose-100"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Search & Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative w-[200px] transition-all duration-300">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-rose-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-rose-300"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-400" />
            </div>

            {/* User Profile Dropdown */}
            <UserDropdown />

            {/* Cart Button */}
            <Button variant="ghost" size="lg" className="relative flex items-center space-x-2" onClick={() => setIsCartOpen(true)}>
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
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-6 w-6 text-rose-700" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6 text-rose-700" /> : <Menu className="h-6 w-6 text-rose-700" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <CartSlider onClose={() => setIsCartOpen(false)} />
      </div>

      {/* Overlay */}
      {isCartOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsCartOpen(false)} />}
    </motion.nav>
  );
};

export default Navbar;
