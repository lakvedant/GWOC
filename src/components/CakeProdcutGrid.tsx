'use client'
import React, { useEffect, useState } from "react";
import CakeProductCard from "@/components/CakeProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  selectedCategory: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${selectedCategory}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-10">
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        products.map((product) => (
          <CakeProductCard
            key={product._id}
            title={product.name}
            price={product.price}
            imageUrl={product.image}
          />
        ))
      ) : (
        <p className="text-gray-500">No products available in this category.</p>
      )}
    </div>
  );
};

export default ProductGrid;
