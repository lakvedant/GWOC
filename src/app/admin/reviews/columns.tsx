"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Actions } from "./actions";
import { IReview } from "@/models/Review";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const getStatusColor = (status: string) => {
  const colors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Approved: "bg-blue-200 text-blue-800",
    Rejected: "bg-red-200 text-red-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-200 text-gray-800";
}

export const columns: ColumnDef<IReview>[] = [
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User Name
        <ArrowUpDown className="size-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.userName}</span>,
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <span className="text-gray-600">{row.original.productName}</span>,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => <span>{row.original.rating}</span>,
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => <span>{row.original.comment}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-sm rounded ${getStatusColor(row.original.status)}`}
      >
        {row.original.status}
      </span>
      // <Badge variant={row.original.status ? "default" : "destructive"}>
      //   {row.original.status ? "Approved" : "Pending"}
      // </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
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
      <Actions 
        id={row.original._id?.toString() || ""} 
        status={row.original.status} 
      />
    ),
  },
];