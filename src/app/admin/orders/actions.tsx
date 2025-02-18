"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useConfirm from "@/components/Admin/use-confirm";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this order. This action cannot be undone."
  );

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
      <Button 
        variant="ghost" 
        onClick={handleDelete} 
        disabled={loading}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash className="size-4" />
      </Button>
    </>
  );
};