"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check } from "lucide-react";
import { Actions } from "./actions";
import { IOrder } from "@/models/Order";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Row } from "@tanstack/react-table"; // Import Row type
import { useRouter } from "next/navigation";

const orderStatuses = [
  { value: "Pending", label: "Pending" },
  { value: "Accepted", label: "Accepted" },
  { value: "Ready", label: "Ready" },
  { value: "Picked", label: "Picked" },
  { value: "Declined", label: "Declined" },
];

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

const StatusCell = ({ row }: { row: Row<IOrder> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setLoading(true);
      await fetch(`/api/orders/${row.original._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      router.push("/admin/orders");
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-left font-normal ${getStatusColor(row.original.orderStatus)}`}
          disabled={loading}
        >
          {row.original.orderStatus}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {orderStatuses.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => handleStatusUpdate(status.value)}
          >
            <Check 
              className={`size-4 mr-2 ${
                status.value === row.original.orderStatus ? "opacity-100" : "opacity-0"
              }`}
            />
            {status.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "orderID",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        OrderID
        <ArrowUpDown className="size-4 ml-2" />
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
        Name
        <ArrowUpDown className="size-4 ml-2" />
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
        <ArrowUpDown className="size-4 ml-2" />
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
        <ArrowUpDown className="size-4 ml-2" />
      </Button> 
    ),
    cell: StatusCell
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  },
  {
    id: "actions",
    header: "Delete",
    cell: ({ row }) => (
      <Actions id={row.original._id?.toString() || ""} />
    ),
  },
];
