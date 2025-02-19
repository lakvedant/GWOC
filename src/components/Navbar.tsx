'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Search, Menu, X, LogIn, LogOut, User } from "lucide-react";
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
import { CartItem } from "@/types/checkout";

interface CartBadgeProps {
  count: number;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  searchResults: ProductData[];
  onProductClick: (product: ProductData) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearch,
  searchResults,
  onProductClick,
}) => {
  const suggestedSearches = [
    "Cake",
    "Muffin",
    "Cupcake",
    "Brownie",
    "Pastry",
    "Cookie",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-x-0 top-0 h-3/4 bg-pink-100 shadow-lg z-50"
        >
          <div className="max-w-3xl mx-auto p-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for cakes, desserts, and more..."
                className="w-full pl-12 pr-4 py-3 text-lg border-2 border-rose-300 rounded-full focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-rose-400" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={onClose}
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>

            <div className="mt-8 max-h-[calc(100vh-300px)] overflow-auto">
              {searchQuery ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Search Results</h3>
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col space-y-3">
                      {searchResults.map((product) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={product._id}
                          className="p-4 rounded-xl hover:bg-rose-50 border border-rose-100 cursor-pointer transition-all duration-200 hover:shadow-md"
                          onClick={() => onProductClick(product)}
                        >
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          {product.description && (
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No results found</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => onSearch(term)}
                        className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-full text-sm transition-all duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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

export const Navbar = () => {
  const { toast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductData[]>([]);
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.description?.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered);
  };

  const handleProductClick = (product: ProductData) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
    setSearchFocused(false);
    setSearchQuery("");
  };

  const handleLogin = async () => {
    try {
      // Implement your login logic here
      setIsAuthenticated(true);
      toast({
        title: "Logged in successfully",
        duration: 3000,
      });
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.log(error);
      
      toast({
        title: "Login failed",
        description: "Please try again",
        duration: 3000,
      });
    }
  };

  const handleLogout = async () => {
    try {
      // Implement your logout logic here
      setIsAuthenticated(false);
      toast({
        title: "Logged out successfully",
        duration: 3000,
      });
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.log(error);
      
      toast({
        title: "Logout failed",
        description: "Please try again",
        duration: 3000,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (item: CartItem) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    toast({
      title: "Added to cart",
      description: `You now have ${updatedCart.length} items in your cart`,
      duration: 3000,
    });
  };

  const navigationItems = ["Home", "About", "Products", "Contact", "Customize"];

  // Mobile auth menu component
  const MobileAuthMenu = () => (
    <div className="px-4 py-2 border-t border-gray-200">
      {isAuthenticated ? (
        <>
          <div className="flex items-center space-x-2 px-3 py-2 text-gray-700">
            <User className="h-5 w-5" />
            <span>Your Profile</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
        >
          <LogIn className="h-5 w-5" />
          <span>Login</span>
        </button>
      )}
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full top-0 z-30 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo-2.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="h-8 w-auto sm:h-12"
                  priority
                />
              </Link>
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo-1.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="h-8 w-auto sm:h-12"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-1 flex-1">
              {navigationItems.map((label) => (
                <Link
                  key={label}
                  href={label !== "Home" ? `/${label.toLowerCase()}` : "/"}
                  className="px-4 py-2 text-gray-700 hover:text-rose-600 text-sm font-medium rounded-full hover:bg-rose-50 transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:bg-rose-50 text-gray-700 hover:text-rose-600"
                onClick={() => setSearchFocused(true)}
              >
                <Search className="h-5 w-5" />
                <span className="text-sm font-medium">Search</span>
              </Button>

              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 hover:bg-rose-50 text-gray-700 hover:text-rose-600"
                  onClick={handleLogin}
                >
                  <LogIn className="h-5 w-5" />
                  <span className="text-sm font-medium">Login</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="relative flex items-center space-x-2 hover:bg-rose-50 text-gray-700 hover:text-rose-600"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm font-medium">Cart</span>
                <CartBadge count={cartItems.length} />
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-rose-50"
                onClick={() => setSearchFocused(true)}
              >
                <Search className="h-5 w-5 text-gray-700" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-rose-50"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                <CartBadge count={cartItems.length} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-rose-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
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
              <MobileAuthMenu />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchFocused}
        onClose={() => setSearchFocused(false)}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        searchResults={searchResults}
        onProductClick={handleProductClick}
      />

      {/* Cart Slider */}
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
              className="fixed top-0 right-0 h-full w-full max-w-96 bg-white shadow-2xl z-[101] overflow-hidden"
            >
              <CartSlider onClose={() => setIsCartOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Dialog */}
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