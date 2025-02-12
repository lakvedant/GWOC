'use client'
import React, { useState } from "react";
import ProductGrid from "@/components/CakeProdcutGrid";
import Banner from "@/components/MenuBanner";
import BakerySidebar from "@/components/MenuSidebar";
import Navbar from "@/components/Navbar";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="flex">
        <BakerySidebar />
        <ProductGrid selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Page;
