"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartSlider } from "./CartSlider";
import Link from "next/link";
import LoginSignupModal from "./Login";
import { Input } from "@/components/ui/input";
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from "framer-motion";

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 font-playfair ${scrolled
        ? 'bg-rose-50/80 backdrop-blur-lg shadow-lg'
        : 'bg-rose-50'
        }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={150}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center space-x-1">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="relative px-5 py-2 text-rose-900 hover:text-rose-700 text-sm font-semibold rounded-full transition-all duration-300 hover:bg-rose-100 group font-montserrat tracking-wide"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar and Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div
              className="relative"
              animate={{ width: searchFocused ? 300 : 200 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-rose-200 bg-white/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-rose-300 focus:border-transparent font-montserrat"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-400" />
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-rose-100 rounded-full p-2 transition-colors duration-300"
                onClick={() => setIsLoginOpen(true)}
              >
                <User className="h-6 w-6 text-rose-700" />
              </Button>
            </motion.div>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-rose-100 rounded-full p-2 transition-colors duration-300"
                  >
                    <ShoppingCart className="h-6 w-6 text-rose-700" />
                    {cartItems.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white text-xs flex items-center justify-center shadow-lg font-montserrat"
                      >
                        {cartItems.length}
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
                <CartSlider onClose={() => setIsCartOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-rose-100 rounded-full p-2"
              >
                <ShoppingCart className="h-6 w-6 text-rose-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white text-xs flex items-center justify-center font-montserrat">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-rose-100 rounded-full p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-rose-700" />
                ) : (
                  <Menu className="h-6 w-6 text-rose-700" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-rose-50/80 backdrop-blur-lg border-t border-rose-100"
            >
              <div className="px-3 py-2">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-rose-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-rose-300 focus:border-transparent font-montserrat"
                />
                <Search className="absolute left-6 top-24 h-5 w-5 text-rose-400" />
              </div>
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-rose-900 hover:text-rose-700 hover:bg-rose-100 rounded-lg transition-colors duration-300 font-montserrat"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginSignupModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      )}
    </motion.nav>
  );
};

export default Navbar;