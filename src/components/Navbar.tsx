// Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { CartSlider } from "@/components/CartSlider";
import UserDropdown from "@/components/UserProfile";
import CakeOrderDialog from "@/components/CakeDialogOpen"; // Import the dialog component
import { ProductData } from "@/models/Product"; // Import the ProductData model

interface CartBadgeProps {
  count: number;
}

export const Navbar = () => {
  // Navigation and UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductData[]>([]);
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Load cart data
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    setCartItems(savedCart);
  }, []);

  // Handle search input
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.description?.toLowerCase().includes(value.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowResults(true);
  };

  // Handle product item click
  const handleProductClick = (product: ProductData) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    setShowResults(false);
    setSearchQuery("");
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  // Handle add to cart from dialog
  const handleAddToCart = (item: any) => {
    // Implement your add to cart logic here
    // Update cart items
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Cart badge component
  const CartBadge: React.FC<CartBadgeProps> = ({ count }) => (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full px-2 py-1 min-w-6 h-6 flex items-center justify-center"
        >
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white text-xs font-bold"
          >
            {count}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Navigation items
  const navigationItems = ["Home", "About", "Products", "Contact"];

  return (
    <>
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
              {navigationItems.map((label) => (
                <Link
                  key={label}
                  href={label !== "Home" ? `/${label.toLowerCase()}` : "/"}
                  className="px-5 py-2 text-rose-900 hover:text-rose-700 text-sm font-semibold rounded-full hover:bg-rose-100"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Search & Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative w-[200px] transition-all duration-300 search-container">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full rounded-full border-rose-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-rose-300"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => {
                    setSearchFocused(true);
                    if (searchQuery) setShowResults(true);
                  }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-400" />
                
                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showResults && searchResults.length > 0 && (
                    <motion.div
                      key={`search-results-${searchResults.map(p => p._id).join("-")}-${Date.now()}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
                    >
                      {searchResults.map((product) => (
                        <div
                          key={product._id}
                          className="block px-4 py-2 hover:bg-rose-50 transition-colors cursor-pointer"
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          {product.description && (
                            <div className="text-xs text-gray-500 truncate">
                              {product.description.substring(0, 50)}...
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile Dropdown */}
              <UserDropdown />

              {/* Cart Button */}
              <Button 
                variant="ghost" 
                size="lg" 
                className="relative flex items-center space-x-2" 
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="text-base font-medium">Cart</span>
                <CartBadge count={cartItems.length} />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6 text-rose-700" />
                <CartBadge count={cartItems.length} />
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-rose-700" />
                ) : (
                  <Menu className="h-6 w-6 text-rose-700" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-2 space-y-1">
                {navigationItems.map((label) => (
                  <Link
                    key={label}
                    href={label !== "Home" ? `/${label.toLowerCase()}` : "/"}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Sidebar */}
        <div 
          className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <CartSlider onClose={() => setIsCartOpen(false)} />
        </div>

        {/* Cart Overlay */}
        {isCartOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40" 
            onClick={() => setIsCartOpen(false)} 
          />
        )}
      </motion.nav>

      {/* Product Dialog Modal */}
{isDialogOpen && selectedProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">

      {/* Premium Close Button */}
      <button 
        onClick={handleCloseDialog} 
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 
                   transition-all duration-300 ease-in-out z-50"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="2" 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <CakeOrderDialog 
        product={selectedProduct} 
        onClose={handleCloseDialog} 
        onAddToCart={handleAddToCart} 
      />
    </div>
  </div>
)}


    </>
  );
};

export default Navbar;