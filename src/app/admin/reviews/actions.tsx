"use client";

import { Check, MoreHorizontal, Trash, XCircle } from "lucide-react";
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
  status: "Approved" | "Pending" | "Rejected";
};

export const Actions = ({ id, status }: Props) => {
  console.log(status);
  
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this product. This action cannot be undone."
  );

  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>(status);

  const handleDeleteClick = async () => {
    const ok = await confirm();
    if (!ok) return;
  
    setLoading(true);
    try {
      await fetch(`/api/admin-reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.refresh();
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    const ok = await confirm();
    if (!ok) return;

    setLoading(true);
    try {
        await fetch(`/api/admin-reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setCurrentStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating review status:", error);
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
        {status === "Pending" &&  
        <>
          <DropdownMenuItem disabled={loading} onClick={() => handleStatusChange("Approved")} className="text-green-600 hover:text-white">
            <Check className="size-4 mr-2" />
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem disabled={loading} onClick={() => handleStatusChange("Rejected")}>
            <XCircle className="size-4 mr-2" />
            Reject
          </DropdownMenuItem>
          </>
        }

        {status === "Approved" &&
        <>
        <DropdownMenuItem disabled={loading} onClick={() => handleStatusChange("Rejected")}>
            <XCircle className="size-4 mr-2" />
            Reject
          </DropdownMenuItem>
        </>
        }
        {status === "Rejected" && 

        <>
        <DropdownMenuItem disabled={loading} onClick={() => handleStatusChange("Approved")} className="text-green-600 hover:text-white">
            <Check className="size-4 mr-2" />
            Approve
          </DropdownMenuItem>
          </>
        }

        <DropdownMenuItem disabled={loading} onClick={handleDeleteClick} className="text-red-600">
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};