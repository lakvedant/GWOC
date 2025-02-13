'use client'
import React, { useState } from "react";
import ProductGrid from "@/components/CakeProdcutGrid";
import Banner from "@/components/MenuBanner";
import BakerySidebar from "@/components/MenuSidebar";
import Navbar from "@/components/Navbar";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Cakes");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
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
    </div>
  );
};

export default Page;