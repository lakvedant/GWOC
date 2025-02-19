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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from "next/link";

// interface AddNewProductProps {
//   onSave: (data: IProduct) => void;
//   onClose: () => void;
// }

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
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
    const productIds = rows.map((row) => row.original._id);
  
    if (!confirm(`Are you sure you want to delete ${productIds.length} product(s)?`)) return;
  
    try {
      await Promise.all(
        productIds.map(async (id) => {
          const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
          if (!response.ok) {
            throw new Error(`Failed to delete product with ID: ${id}`);
          }
        })
      );
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
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      handleAddNewClose();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-2 py-4 md:p-6">
        <DashboardBreadcrumb />
        
        <div className="w-full max-w-full md:max-w-7xl mx-auto mt-4">
          <Card className="border-none shadow-md">
            <PageWrapper>
              <CardHeader className="space-y-4 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-xl line-clamp-1">Products</CardTitle>
                  <button
                    className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition w-full md:w-auto"
                    onClick={handleAddNew}
                  >
                    <Plus className="size-5 mr-2" />
                    Add New
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-2 md:p-6">
                {loading ? (
                  <p className="text-center text-gray-500">Loading products...</p>
                ) : products.length === 0 ? (
                  <p className="text-center text-gray-500">No products found.</p>
                ) : (
                  <DataTable 
                    columns={columns} 
                    data={products} 
                    filterKey="description" 
                    onDelete={handleDelete}
                  />
                )}
              </CardContent>
            </PageWrapper>
          </Card>
        </div>
      </div>

      <Sheet open={isAddNewOpen} onOpenChange={setIsAddNewOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto" side="right">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <AddNewProduct onSave={handleAddNewSave} onClose={handleAddNewClose} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Products</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default ProductsPage;