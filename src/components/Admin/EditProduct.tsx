import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { IProduct } from "@/models/Product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductUpdateData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  discount: number;
  valueForOffer: number;
  weight?: string;
}

interface ProductSliderProps {
  product: IProduct;
  onClose: () => void;
  onSave: (updatedProduct: ProductUpdateData) => void;
}

export const EditProduct: React.FC<ProductSliderProps> = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<ProductUpdateData>({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    available: product.available,
    discount: product.discount || 0,
    valueForOffer: product.valueForOffer || 0,
    weight: product.weight || "",
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: parseFloat(value) || 0 });
  };

  const handleToggleAvailable = (checked: boolean) => {
    setEditedProduct({ ...editedProduct, available: checked });
  };

  const handleCategoryChange = (value: string) => {
    setEditedProduct({ ...editedProduct, category: value });
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    return editedProduct.price - (editedProduct.price * (editedProduct.discount / 100));
  };

  // Common categories (can be replaced with actual categories from your system)
  const categories = ["Fudge", "Chocolate Modak", "Truffle Balls", "Brownie", "Muffins", "Cookies", "Cakes", "Ice Cream", "Donuts", "Swiss Rolls", "Valetine Specials", "Desert Hamper", "DH"];

  return (
    // Fixed container styling to ensure proper scrolling
    <div className="flex flex-col h-full max-h-screen">
      {/* The ScrollArea component should take most of the available height */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-6 pb-20">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Basic Information</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Product Name</label>
                <Input 
                  name="name" 
                  value={editedProduct.name} 
                  onChange={handleTextChange} 
                  placeholder="Enter product name"
                  className="mt-1"
                  required 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={editedProduct.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  name="description" 
                  value={editedProduct.description} 
                  onChange={handleTextChange} 
                  placeholder="Describe the product"
                  className="mt-1 h-32"
                  required 
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Pricing & Availability</h3>
            
            <Card className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Base Price (₹)</label>
                  <Input 
                    name="price" 
                    type="number" 
                    value={editedProduct.price} 
                    onChange={handleNumericChange} 
                    placeholder="0.00"
                    className="mt-1"
                    required 
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Discount (%)</label>
                  <Input 
                    name="discount" 
                    type="number" 
                    value={editedProduct.discount} 
                    onChange={handleNumericChange} 
                    placeholder="0"
                    className="mt-1"
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Value For Offer</label>
                  <Input 
                    name="valueForOffer" 
                    type="number" 
                    value={editedProduct.valueForOffer} 
                    onChange={handleNumericChange} 
                    placeholder="0"
                    className="mt-1"
                    required 
                  />
                </div>
              </div>
              
              {/* Price Summary */}
              <div className="mt-4 pt-3 border-t">
                <div className="flex justify-between items-center text-sm">
                  <span>Base Price:</span>
                  <span className="font-medium">₹{editedProduct.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span>Discount ({editedProduct.discount}%):</span>
                  <span className="font-medium text-red-500">
                    -₹{(editedProduct.price * (editedProduct.discount / 100)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center font-medium mt-2 pt-2 border-t">
                  <span>Final Price:</span>
                  <span className="text-green-600">₹{calculateDiscountedPrice().toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Image & Availability */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Availability</h3>
            
            <div className="space-y-3">              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <label className="text-sm font-medium">Available for ordering</label>
                <Switch 
                  checked={editedProduct.available} 
                  onCheckedChange={handleToggleAvailable} 
                />
              </div>
            </div>
          </div>

          {/* Save Button - Position at the bottom but ensure it's visible within scroll area */}
          <div className="py-4">
            <Button className="w-full" onClick={handleSave}>
              Save Product Changes
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};