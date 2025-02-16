'use client'
import React, { useState } from "react";
import ProductGrid from "@/components/CakeProdcutGrid";
import Banner from "@/components/MenuBanner";
import BakerySidebar from "@/components/MenuSidebar";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  { name: "Desert Hampers", image: "/images/desert_hampers.jpg" },
  { name: "Cakes", image: "/ccake.jpg" },
  { name: "Donuts", image: "/cdonuts.jpg" },
  { name: "Cookies", image: "/images/cookies.jpg" },
  { name: "Ice Creams", image: "/images/ice_creams.jpg" },
  { name: "Muffins", image: "/images/muffins.jpg" },
  { name: "Brownies", image: "/images/brownies.jpg" },
  { name: "Fudge", image: "/images/fudge.jpg" },
  { name: "Chocolate Truffle Balls", image: "/images/chocolate_truffle_balls.jpg" },
  { name: "Chocolate Modak", image: "/images/chocolate_modak.jpg" }
];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col pt-20"> 
        {/* Banner section */}
        <Banner 
          title={selectedCategory ? selectedCategory.toUpperCase() : "Our Menu"}
          description="Discover our delicious selection of treats"
        />

        {/* If no category is selected, show all categories */}
        {!selectedCategory ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-11 p-8 place-items-center">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                className="flex flex-col items-center group"
                onClick={() => setSelectedCategory(category.name)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-64 h-64 bg-gray-200 rounded-full overflow-hidden shadow-lg border border-rose-200 group-hover:border-rose-400 transition">
                  <Image src={category.image} alt={category.name} width={160} height={160} className="object-cover w-full h-full" />
                </div>
                <span className="mt-3 text-xl font-bold group-hover:text-rose-900 text-pink-500 transition tracking-wide uppercase text-center">
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>
        ) : (
          /* Show products and sidebar when category is selected */
          <div className="flex flex-1">
            <BakerySidebar 
              activeCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <div className="flex-1">
              <ProductGrid selectedCategory={selectedCategory} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;