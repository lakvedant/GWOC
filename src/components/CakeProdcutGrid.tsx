'use client'
import React, { useEffect, useState } from "react";
import CakeProductCard from "@/components/CakeProductCard";
import { ProductData } from "@/models/Product";

interface ProductGridProps {
  selectedCategory: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParam = selectedCategory.toLowerCase() === 'all' 
          ? '' 
          : `?category=${encodeURIComponent(selectedCategory)}`;
        
        const res = await fetch(`/api/products${queryParam}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }
        
        const data = await res.json();
        
        const filteredProducts = selectedCategory.toLowerCase() === 'all'
          ? data
          : data.filter((product: ProductData) => 
              product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500 text-lg">
          No products available in {selectedCategory.toLowerCase()} category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 py-6 px-4 md:px-10">
      {products.map((product) => (
        <CakeProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;