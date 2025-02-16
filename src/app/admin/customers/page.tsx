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
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await fetch("/api/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (rows: Row<IUser>[]) => {
    const customerIds = rows.map((row) => row.original._id);

    if (!confirm(`Are you sure you want to delete ${customerIds.length} customer(s)?`)) return;

    try {
      await Promise.all(
        customerIds.map(async (id) => {
          const response = await fetch(`/api/customers/${id}`, { method: "DELETE" });
          if (!response.ok) {
            throw new Error(`Failed to delete customer with ID: ${id}`);
          }
        })
      );
      setCustomers((prev) => prev.filter((customer) => !customerIds.includes(customer._id)));
    } catch (error) {
      console.error("Error deleting customers:", error);
    }
  };

  const handleAddNew = () => setIsAddNewOpen(true);
  const handleAddNewClose = () => setIsAddNewOpen(false);

  const handleAddNewSave = async (newCustomer: IUser) => {
    setCustomers((prev) => [...prev, newCustomer]);
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
                  <CardTitle className="text-xl line-clamp-1">Customers</CardTitle>
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
                  <p className="text-center text-gray-500">Loading customers...</p>
                ) : customers.length === 0 ? (
                  <p className="text-center text-gray-500">No customers found.</p>
                ) : (
                  <DataTable 
                    columns={columns} 
                    data={customers} 
                    filterKey="name" 
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
            <SheetTitle>Add New Customer</SheetTitle>
          </SheetHeader>
          <AddNewCustomer onSave={handleAddNewSave} onClose={handleAddNewClose} />
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
            <Link href="#">Customers</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Customers</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default CustomersPage;
