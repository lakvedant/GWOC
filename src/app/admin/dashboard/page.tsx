"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/Admin/data-table";
import { PageWrapper } from "@/components/Admin/page-wrapper";
import { columns } from "./colomns";
import { IProduct } from "@/models/Product";
import { Row } from "@tanstack/react-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import AddNewProduct from "@/components/Admin/AddNewProduct";

interface AddNewProductProps {
  onSave: (data: IProduct) => void;
  onClose: () => void;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
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
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (rows: Row<IProduct>[]) => {
    const productIds = rows.map((row) => row.original._id); // Extract `_id` from selected rows
  
    if (!confirm(`Are you sure you want to delete ${productIds.length} product(s)?`)) return;
  
    try {
      // Send DELETE request for each selected product
      await Promise.all(
        productIds.map(async (id) => {
          const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
  
          if (!response.ok) {
            throw new Error(`Failed to delete product with ID: ${id}`);
          }
        })
      );
  
      // Update local state after deletion
      setProducts((prevProducts) => prevProducts.filter((product) => !productIds.includes(product._id)));
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const handleAddNew = () => {
    setIsAddNewOpen(true);
  };

  const handleAddNewClose = () => {
    setIsAddNewOpen(false);
  };

  const handleAddNewSave = async (newProduct: IProduct) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      // if (!response.ok) {
      //   throw new Error("Failed to add new product");
      // }

      const addedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      handleAddNewClose();
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  return (
    <div className="max-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow1">
        <PageWrapper>
          <CardHeader className="gap-y-2 items-center md:flex-row md:items-center md:justify-between md:mb-0 mb-5">
            <CardTitle className="text-xl line-clamp-1">Products</CardTitle>

            <div className="mt-11 relative">
              <button
                className="flex px-4 py-2 bg-black text-white rounded-[6px] hover:bg-slate-800 transition"
                onClick={handleAddNew}
              >
                <Plus className="size-6 mr-2" />
                Add New
              </button>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="text-center text-gray-500">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-500">No products found.</p>
            ) : (
                <DataTable columns={columns} data={products} filterKey="name" onDelete={handleDelete} />
            )}
          </CardContent>
        </PageWrapper>
      </Card>
      <Sheet open={isAddNewOpen} onOpenChange={setIsAddNewOpen}>
        <SheetContent className="max-h-screen overflow-y-scroll" side="right">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <AddNewProduct onSave={handleAddNewSave} onClose={handleAddNewClose} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductsPage;
