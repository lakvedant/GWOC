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
import { IProduct } from "@/models/Product";
import { EditProduct} from "@/components/Admin/EditProduct";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string; // URL of the product image
  available: boolean;
}

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
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleEditClick = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");

      const product = await response.json();
      setSelectedProduct(product);
      setIsSliderOpen(true);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSave = async (updatedProduct: Product) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      setIsSliderOpen(false);
      onEdit(id);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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
            <SheetTitle>Edit Product</SheetTitle>
            <SheetDescription>
              Make changes to your product here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          {selectedProduct && (
            <EditProduct
              product={selectedProduct}
              onClose={() => setIsSliderOpen(false)}
              onSave={handleSave}
            />
          )}

          {/* <SheetFooter>
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                onClick={() => {
                  if (selectedProduct) {
                    handleSave(selectedProduct);
                  }
                }}
              >
                Save changes
              </Button>
            </div>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </>
  );
};