"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useConfirm from "@/components/Admin/use-confirm";
import { IOrder } from "@/models/Order";
import { EditOrder } from "@/components/Admin/EditOrder";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface OrderUpdateData {
  orderStatus: "Pending" | "Accepted" | "Ready" | "Picked" | "Declined";
  instructions?: string;
}

type Props = {
  id: string;
  onEdit: (id: string) => void;
};

export const Actions = ({ id, onEdit }: Props) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this order. This action cannot be undone."
  );

  const [loading, setLoading] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const handleEditClick = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`);

      const order = await response.json();
      setSelectedOrder(order);
      setIsSliderOpen(true);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const handleSave = async (updatedOrder: OrderUpdateData) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      setIsSliderOpen(false);
      onEdit(id);
      router.refresh();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      console.log("Order deleted successfully:", id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={loading} onClick={handleEditClick}>
            <Edit className="size-4 mr-2" />
            Update Status
          </DropdownMenuItem>

          <DropdownMenuItem disabled={loading} onClick={handleDelete} className="text-red-600">
            <Trash className="size-4 mr-2" />
            {loading ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isSliderOpen} onOpenChange={setIsSliderOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto" side="right">
          <SheetHeader>
            <SheetTitle>Update Order Status</SheetTitle>
            <SheetDescription>
              Change the order status and add any special instructions.
            </SheetDescription>
          </SheetHeader>

          {selectedOrder && (
            <EditOrder
              order={selectedOrder}
              onClose={() => setIsSliderOpen(false)}
              onSave={handleSave}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};