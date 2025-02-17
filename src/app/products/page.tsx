"use client";

import React, { useState } from "react";
import ProductGrid from "@/components/CakeProdcutGrid";
import Banner from "@/components/MenuBanner";
import BakerySidebar from "@/components/MenuSidebar";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Desert Hampers", image: "/desert_hampers.png" },
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

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen flex flex-col pt-20 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Banner
          title={selectedCategory ? selectedCategory.toUpperCase() : "Our Menu"}
          description="Discover our delicious selection of treats"
        />

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="categoryGrid"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4 sm:p-6 place-items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  className="relative group w-full max-w-[270px] sm:max-w-[290px] md:max-w-[300px] lg:max-w-[330px] flex flex-col items-center"
                  onClick={() => setSelectedCategory(category.name)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-white border border-rose-200 group-hover:shadow-2xl transition"
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
                  <span className="mt-5 text-xl sm:text-base md:text-2xl font-bold text-rose-700 group-hover:text-rose-900 transition uppercase text-center font-sans">
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="productGrid"
              className="flex flex-1 md:flex-row bg-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-auto min-w-[250px] h-full bg-gray-100">
                <BakerySidebar
                  activeCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
              <div className="flex-1 h-full overflow-auto p-4 sm:p-6">
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
