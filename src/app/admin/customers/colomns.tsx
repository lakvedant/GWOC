"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Actions } from "./actions";
import { IUser } from "@/models/User";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-gray-600">{row.original.email}</span>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.gender || "Not Specified"}</span>
    ),
  },
  {
    accessorKey: "orders",
    header: "Orders",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.orders?.length || 0} orders
      </Badge>
    ),
  },
  {
    accessorKey: "products",
    header: "Reviews",
    cell: ({ row }) => {
      const reviewedProducts = row.original.products?.filter(p => p.isReviewed)?.length || 0;
      return (
        <Badge variant="secondary">
          {reviewedProducts} reviews
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Join Date
        <ArrowUpDown className="size-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Actions id={row.original._id?.toString() || ""} onEdit={(id) => console.log("Edit user:", id)} />
    ),
  },
];