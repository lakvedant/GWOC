"use client";

import { Edit, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/models/User";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditUser } from "@/components/EditUser";

type Props = {
  id: string;
  onEdit: (id: string) => void;
};

export const Actions = ({ id, onEdit }: Props) => {
  const router = useRouter();
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleEditClick = async () => {
    try {
      const response = await fetch(`/api/user/${id}`);
      if (!response.ok) throw new Error("Failed to fetch user");

      const user = await response.json();
      setSelectedUser(user);
      setIsSliderOpen(true);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSave = async (updatedUser: Partial<IUser>) => {
    try {
      await fetch(`/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      setIsSliderOpen(false);
      onEdit(id);
      router.refresh();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={false} onClick={handleEditClick}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isSliderOpen} onOpenChange={setIsSliderOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit User</SheetTitle>
            <SheetDescription>
              Make changes to user details here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          {selectedUser && (
            <EditUser
              user={selectedUser}
              onClose={() => setIsSliderOpen(false)}
              onSave={handleSave}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};