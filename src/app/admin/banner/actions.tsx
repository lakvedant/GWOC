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
import { IPhotoCarouselSchema } from "@/models/PhotoCarousel";
import { EditPhotoCarousel } from "@/components/Admin/EditPhotoCarousel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface PhotoCarousel {
  title: string;
  description: string;
  image: string; // URL of the photo
}

type Props = {
  id: string;
  onEdit: (id: string) => void;
};

export const Actions = ({ id, onEdit }: Props) => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this photo. This action cannot be undone."
  );

  const [loading, setLoading] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<IPhotoCarouselSchema | null>(null);

  const handleEditClick = async () => {
    try {
      const response = await fetch(`/api/photo-carousel/${id}`);
      if (!response.ok) throw new Error("Failed to fetch photo");

      const photo = await response.json();
      setSelectedPhoto(photo);
      setIsSliderOpen(true);
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  const handleSave = async (updatedPhoto: PhotoCarousel) => {
    try {
      await fetch(`/api/photo-carousel/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPhoto),
      });

      setIsSliderOpen(false);
      onEdit(id);
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/photo-carousel/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }

      console.log("Photo deleted successfully:", id);
      router.refresh(); // Refresh photo list after deletion
    } catch (error) {
      console.error("Error deleting photo:", error);
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
          <DropdownMenuItem disabled={loading} onClick={handleEditClick}>
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

      {/* Sheet is always in DOM, controlled by `isSliderOpen` */}
      <Sheet open={isSliderOpen} onOpenChange={setIsSliderOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit Photo</SheetTitle>
            <SheetDescription>
              Make changes to your photo here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          {selectedPhoto && (
            <EditPhotoCarousel
              photo={selectedPhoto}
              onClose={() => setIsSliderOpen(false)}
              onSave={handleSave}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};