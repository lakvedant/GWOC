import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { IProduct } from "@/models/Product";

interface Product {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string; // URL of the product image
    available: boolean;
}

interface ProductSliderProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product>({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    available: product.available,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleToggleAvailable = () => {
    setEditedProduct({ ...editedProduct, available: !editedProduct.available });
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <div className="flex flex-col h-full mt-8">
      {/* <div className="px-4 py-2 border-b flex justify-between items-center"> */}
        {/* <h2 className="text-lg font-medium">Edit Product</h2> */}
        {/* <Button variant="ghost" onClick={onClose}>Close</Button> */}
      {/* </div> */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <Input name="name" value={editedProduct.name} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <Textarea name="description" value={editedProduct.description} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <Input name="price" type="number" value={editedProduct.price} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <Input name="category" value={editedProduct.category} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Image URL</label>
          <Input name="image" value={editedProduct.image} onChange={handleChange} required />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="text-sm font-medium">Available</label>
          <Switch checked={editedProduct.available} onCheckedChange={handleToggleAvailable} />
        </div>
      <div className="px-4 py-2 border-t">
        <Button className="w-full" onClick={handleSave}>Save Changes</Button>
      </div>
      </ScrollArea>
    </div>
  );
};