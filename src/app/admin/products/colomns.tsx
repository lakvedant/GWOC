"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Actions } from "./actions";
import { IProduct } from "@/models/Product";
import { IKImage } from "imagekitio-next";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-16 h-16 flex justify-center items-center">
        <IKImage
          path={row.original.image}
          // transformation={[{ width: '64', height: '64' }]}
          width={400}
          height={400}
          alt={row.original.name || "Product Image"}
          className="rounded object-cover w-full h-full"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="line-clamp-2 text-gray-600">{row.original.description}</p>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price (₹)
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span>₹{row.original.price.toFixed(2)}</span>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="capitalize">{row.original.category}</span>,
  },
  {
    accessorKey: "Date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc" ? false: true)}
      >
        Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <span className="capitalize">{new Date(row.original.createdAt).toLocaleDateString("en-IN")}</span>,
  },
  {
    accessorKey: "available",
    header: "Availability",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-sm rounded whitespace-nowrap ${
          row.original.available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
        }`}
      >
        {row.original.available ? "Available" : "Out of Stock"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Actions id={row.original._id?.toString() || ""} onEdit={(id) => console.log("Edit product:", id)} />
    ),
  },
];
