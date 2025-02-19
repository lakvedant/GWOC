"use client";

import React, { useState } from "react";
import ProductGrid from "@/components/CakeProdcutGrid";
import Banner from "@/components/MenuBanner";
import BakerySidebar from "@/components/MenuSidebar";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu

const categories = [
  { name: "Cakes", image: "/ccake.jpg" },
  { name: "Donuts", image: "/cdonuts.jpg" },
  { name: "Cookies", image: "/ccookie.jpg" },
  { name: "Ice Cream", image: "/cice_creams.jpeg" },
  { name: "Muffins", image: "/cmuffins.jpg" },
  { name: "Brownie", image: "/cbrownie.jpg" },
  { name: "Fudge", image: "/cfudge.jpg" },
  { name: "Truffle Balls", image: "/cchocolate_truffle_balls.jpeg" },
  { name: "Chocolate Modak", image: "/cchocolate_modak.jpeg" },
];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  // Mobile category horizontal scrolling list
  const MobileCategoryList = () => (
    <div className="md:hidden overflow-x-auto whitespace-nowrap pb-4 pt-2 px-2 bg-pink-50">
      <div className="inline-flex space-x-3">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            !selectedCategory
              ? "bg-pink-500 text-white"
              : "bg-white text-pink-700 border border-pink-200"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category.name
                ? "bg-pink-500 text-white"
                : "bg-white text-pink-700 border border-pink-200"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen flex flex-col pt-16 md:pt-20 bg-gradient-to-b from-pink-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Banner
          title={selectedCategory ? selectedCategory.toUpperCase() : "Our Menu"}
          description="Discover our delicious selection of treats"
        />

        {/* Mobile Category Horizontal Scrolling List */}
        {selectedCategory && <MobileCategoryList />}

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="categoryGrid"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3 d:gap-8 p-3 sm:p-6 place-items-center bg-[url('/path/to/subtle-pattern.png')] bg-opacity-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  className="relative group w-full max-w-[145px] sm:max-w-[290px] md:max-w-[300px] lg:max-w-[300px] flex flex-col items-center"
                  onClick={() => setSelectedCategory(category.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-white border border-pink-100 group-hover:shadow-pink-200 transition duration-300"
                    whileHover={{ rotateY: 10 }}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </motion.div>
                  <span className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-pink-700 group-hover:text-pink-900 transition uppercase text-center font-sans">
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="productGrid"
              className="flex flex-1 flex-col md:flex-row bg-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Mobile sidebar toggle button */}
              <button
                onClick={toggleMobileSidebar}
                className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-pink-500 text-white rounded-full shadow-lg"
              >
                {showMobileSidebar ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Responsive Sidebar for Mobile */}
              <AnimatePresence>
                {showMobileSidebar && (
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={toggleMobileSidebar}
                  >
                    <motion.div
                      className="absolute right-0 top-0 h-full w-64 bg-pink-50 p-4"
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="pt-10">
                        <BakerySidebar
                          activeCategory={selectedCategory}
                          onCategoryChange={(category) => {
                            setSelectedCategory(category);
                            setShowMobileSidebar(false);
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop Sidebar - Hidden on Mobile */}
              <div className="hidden md:block w-auto min-w-[250px] h-full bg-pink-50">
                <BakerySidebar
                  activeCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>

              {/* Product Grid - Full Width on Mobile */}
              <div className="flex-1 h-full overflow-auto p-3 sm:p-6">
                <ProductGrid selectedCategory={selectedCategory} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Page;