"use client";

import ImageFeed from "@/components/Admin/ProductFeed";
import ImageUploadForm from "@/components/Admin/ProductUploadForm";
import { IProduct } from "@/models/Product";
import { useEffect, useState } from "react";


export default function Page() {
    const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await fetch("/api/products", 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json()
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchImages();
  }, []);
  return (
    <>
    <ImageFeed products={products} />
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Product</h1>
        <ImageUploadForm />
      </div>
    </div>
    </>
  );
}