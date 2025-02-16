"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, AlertCircle, Plus, Minus, Trash } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IOrder } from "@/models/Order";
import { IProduct } from "@/models/Product";

interface OrderProduct {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
}

interface AddNewOrderProps {
  onSave: (data: IOrder) => void;
  onClose: () => void;
}

export default function AddNewOrder({ onSave, onClose }: AddNewOrderProps) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Partial<IOrder>>({
    defaultValues: {
      name: "",
      phone: "",
      instructions: "",
      paymentType: "COD",
      orderStatus: "Pending",
    },
  });

  useEffect(() => {
    // Fetch available products
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Calculate total amount when selected products change
  useEffect(() => {
    const total = selectedProducts.reduce((sum, item) => {
      const product = products.find(p => p._id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    setTotalAmount(total);
  }, [selectedProducts, products]);

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { productId: "", quantity: 1 }]);
  };

  const handleRemoveProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p._id === productId);
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productId,
      name: product?.name,
      price: product?.price,
    };
    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = { ...updatedProducts[index], quantity };
    setSelectedProducts(updatedProducts);
  };

  const onSubmit = async (data: Partial<IOrder>) => {
    if (selectedProducts.length === 0) {
      alert("Please add at least one product");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        ...data,
        products: selectedProducts.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
        amount: totalAmount,
        orderStatus: "Accepted" as const,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const newOrder = await response.json();
      onSave(newOrder);
      onClose();
    } catch (error) {
      console.error("Failed to create order", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <div className="space-y-6">
        {/* Customer Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Customer Details</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
              placeholder="Customer name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <Alert variant="destructive" className="py-2 px-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.name.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
              placeholder="Phone number"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && (
              <Alert variant="destructive" className="py-2 px-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.phone.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Products Selection */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Products</h3>
            <button
              type="button"
              onClick={handleAddProduct}
              className="text-sm px-2 py-1 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {selectedProducts.map((item, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1">
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                  value={item.productId}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} - ₹{product.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-24">
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveProduct(index)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Payment Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Type</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="COD"
                {...register("paymentType")}
                className="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="UPI"
                {...register("paymentType")}
                className="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <span>UPI</span>
            </label>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Special Instructions</label>
          <textarea
            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white min-h-[80px]"
            placeholder="Add any special instructions..."
            {...register("instructions")}
          />
        </div>

        {/* Total Amount */}
        <div className="text-right">
          <span className="text-sm font-medium">Total Amount: </span>
          <span className="text-lg font-bold">₹{totalAmount.toFixed(2)}</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading || selectedProducts.length === 0}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Order...</span>
            </>
          ) : (
            "Create Order"
          )}
        </button>
      </div>
    </form>
  );
}