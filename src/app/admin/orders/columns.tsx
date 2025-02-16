"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Actions } from "./actions";
import { IOrder } from "@/models/Order";
import { Button } from "@/components/ui/button";

const getStatusColor = (status: string) => {
  const colors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Accepted: "bg-blue-200 text-blue-800",
    Ready: "bg-green-200 text-green-800",
    Picked: "bg-purple-200 text-purple-800",
    Declined: "bg-red-200 text-red-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-200 text-gray-800";
};

const getPaymentTypeColor = (type: string) => {
  return type === "COD" ? "bg-orange-200 text-orange-800" : "bg-green-200 text-green-800";
};

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "orderID",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order ID
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">#{row.original.orderID}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer Name
        <ArrowUpDown className="size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.instructions}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.phone}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount (₹)
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span>₹{row.original.amount?.toFixed(2)}</span>,
  },
  {
    accessorKey: "paymentType",
    header: "Payment",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-sm rounded ${getPaymentTypeColor(row.original.paymentType)}`}
      >
        {row.original.paymentType}
      </span>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-sm rounded ${getStatusColor(row.original.orderStatus)}`}
      >
        {row.original.orderStatus}
      </span>
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
        <ArrowUpDown className="size-4" />
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
      <Actions id={row.original._id?.toString() || ""} onEdit={(id) => console.log("Edit order:", id)} />
    ),
  },
];