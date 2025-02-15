"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/Admin/data-table";
import { PageWrapper } from "@/components/Admin/page-wrapper";
import { columns } from "./colomns";
import { IUser } from "@/models/User";
import { Row } from "@tanstack/react-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import AddNewCustomer from "@/components/Admin/AddNewCustomer";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from "next/link";

interface AddNewProductProps {
  onSave: (data: IUser) => void;
  onClose: () => void;
}

const customersPage = () => {
  const [customers, setcustomers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  useEffect(() => {
    const fetchcustomers = async () => {
      try {
        const data = await fetch("/api/user", 
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res) => res.json()
            );
            setcustomers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchcustomers();
  }, []);

  const handleDelete = async (rows: Row<IUser>[]) => {
    const productIds = rows.map((row) => row.original._id); // Extract `_id` from selected rows
  
    if (!confirm(`Are you sure you want to delete ${productIds.length} product(s)?`)) return;
  
    try {
      // Send DELETE request for each selected product
      await Promise.all(
        productIds.map(async (id) => {
          const response = await fetch(`/api/customers/${id}`, { method: "DELETE" });
  
          if (!response.ok) {
            throw new Error(`Failed to delete product with ID: ${id}`);
          }
        })
      );
  
      // Update local state after deletion
      setcustomers((prevcustomers) => prevcustomers.filter((product) => !productIds.includes(product._id)));
    } catch (error) {
      console.error("Error deleting customers:", error);
    }
  };

  const handleAddNew = () => {
    setIsAddNewOpen(true);
  };

  const handleAddNewClose = () => {
    setIsAddNewOpen(false);
  };

  const handleAddNewSave = async (newProduct: IUser) => {
    try {
      const response = await fetch("/api/customers", {
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
      setcustomers((prevcustomers) => [...prevcustomers, addedProduct]);
      handleAddNewClose();
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  return (
    <>
            <DashboardBreadcrumb />
    
    
    <div className="max-screen-2xl mx-auto w-full pb-10">
      <Card className="border-none shadow1">
        <PageWrapper>
          <CardHeader className="gap-y-2 items-center md:flex-row md:items-center md:justify-between md:mb-0 mb-5">
            <CardTitle className="text-xl line-clamp-1">Customers</CardTitle>

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
              <p className="text-center text-gray-500">Loading customers...</p>
            ) : customers.length === 0 ? (
              <p className="text-center text-gray-500">No customers found.</p>
            ) : (
                <DataTable columns={columns} data={customers} filterKey="name" onDelete={handleDelete} />
            )}
          </CardContent>
        </PageWrapper>
      </Card>
      <Sheet open={isAddNewOpen} onOpenChange={setIsAddNewOpen}>
        <SheetContent className="max-h-screen overflow-y-scroll" side="right">
          <SheetHeader>
            <SheetTitle>Add New Customer</SheetTitle>
          </SheetHeader>
          <AddNewCustomer onSave={handleAddNewSave} onClose={handleAddNewClose} />
        </SheetContent>
      </Sheet>
    </div>
    </>
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
            <Link href="#">customers</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All customers</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default customersPage;
