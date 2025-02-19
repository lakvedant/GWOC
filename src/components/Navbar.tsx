'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { CartSlider } from "@/components/CartSlider";
import UserDropdown from "@/components/UserProfile";
import CakeOrderDialog from "@/components/CakeDialogOpen";
import { ProductData } from "@/models/Product";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface CartBadgeProps {
  count: number;
}

export const Navbar = () => {
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductData[]>([]);
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartData") || "[]");
    setCartItems(savedCart);
  }, []);

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

  const handleProductClick = (product: ProductData) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    setShowResults(false);
    setSearchQuery("");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (item: any) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    toast({
      title: "Added to cart",
      description: `You now have ${updatedCart.length} items in your cart`,
      duration: 3000,
    });
  };

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
        <div className="mx-auto px-4 sm:px-6 lg:px-0 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/logo-2.png" 
                alt="logo" 
                width={100} 
                height={100} 
                className="h-10 w-auto -ml-1 pr-2" 
                priority 
              />
            </Link>
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/logo-1.png" 
                alt="logo" 
                width={100} 
                height={100} 
                className="h-10 w-auto mt-2" 
                priority 
              />
            </Link>

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
                
                {showResults && searchResults.length > 0 && (
                  <motion.div
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
              </div>

              <UserDropdown />

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
      </motion.nav>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-[101] overflow-hidden"
            >
              <CartSlider onClose={() => setIsCartOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isDialogOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[102] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
            <button 
              onClick={handleCloseDialog} 
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 
                       transition-all duration-300 ease-in-out z-[103]"
            >
              <X className="w-5 h-5" />
            </button>

            <CakeOrderDialog 
              product={selectedProduct} 
              onClose={handleCloseDialog} 
              onAddToCart={handleAddToCart} 
            />
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default Navbar;