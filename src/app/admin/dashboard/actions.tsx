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

type Props = {
  id: string;
  onEdit: (id: string) => void;
};

export const Actions = ({ id, onEdit }: Props) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this product. This action cannot be undone."
  );

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      console.log("Product deleted successfully:", id);
      router.refresh(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
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
          {/* Edit Button */}
          <DropdownMenuItem disabled={loading} onClick={() => onEdit(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>

          {/* Delete Button */}
          <DropdownMenuItem disabled={loading} onClick={handleDelete} className="text-red-600">
            <Trash className="size-4 mr-2" />
            {loading ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
