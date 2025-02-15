"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Actions } from "./actions";
import { IUser } from "@/models/User";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <p className="line-clamp-2 text-gray-600">{row.original.phone}</p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="line-clamp-2 text-gray-600">{row.original.email}</p>
    ),
  },
  {
    accessorKey: "Date",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc" ? false: true)}
      >
        Date
        <ArrowUpDown className="size-4" />
      </button>
    ),
    enableSorting: true,
    cell: ({ row }) => <span className="capitalize">{new Date(row.original.createdAt).toLocaleDateString()}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Actions id={row.original._id?.toString() || ""} onEdit={(id) => console.log("Edit product:", id)} />
    ),
  },
];
