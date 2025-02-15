'use client'
import React, { useState } from "react";
import ProductGrid from "@/components/CakeProdcutGrid";
import Banner from "@/components/MenuBanner";
import BakerySidebar from "@/components/MenuSidebar";
import Navbar from "@/components/Navbar";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Cakes");

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col pt-20"> 
      {/* The pt-20 ensures the content starts below the fixed Navbar */}
      
      {/* Banner section */}
      <Banner 
        title={selectedCategory.toUpperCase()}
        description="Discover our delicious selection of treats"
      />

      {/* Content section with sidebar and product grid */}
      <div className="flex flex-1">
        <BakerySidebar 
          activeCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <div className="flex-1">
          <ProductGrid selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;