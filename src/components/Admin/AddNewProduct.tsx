"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, AlertCircle } from "lucide-react";
import FileUpload from "./FileUpload";
import { IProduct } from "@/models/Product";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AddNewProductProps {
    onSave: (data: IProduct) => void;
    onClose: () => void;
}

export default function AddNewProduct({ onSave, onClose }: AddNewProductProps) {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IProduct>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            discount: 0,
            image: "",
            available: true,
            valueForOffer: 0, // Default: No special offer
            review: [],
            weight: undefined,
        },
    });

    const handleUploadSuccess = (response: IKUploadResponse) => {
        setValue("image", response.filePath);
    };

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    };

    const onSubmit = async (data: IProduct) => {
        if (!data.image) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const newProduct = await response.json();
            
            // Reset form
            const fields = ['name', 'description', 'price', 'category', 'discount', 'image', 'valueForOffer', 'weight'];
            fields.forEach(field => setValue(field, ''));
            setValue('review', []);
            setUploadProgress(0);

            onSave(newProduct);
        } catch (error) {
            console.error("Failed to publish product", error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                            placeholder="Enter product name"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <Alert variant="destructive" className="py-2 px-3">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.name.message}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Price Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price (₹)</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                            placeholder="0.00"
                            {...register("price", { required: "Price is required", min: 0 })}
                        />
                        {errors.price && (
                            <Alert variant="destructive" className="py-2 px-3">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.price.message}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Category Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                            {...register("category", { required: "Category is required" })}
                        >
                            <option value="">Select a category</option>
                            <option value="Fudge">Fudge</option>
                            <option value="Chocolate Modak">Chocolate Modak</option>
                            <option value="Truffle Balls">Truffle Balls</option>
                            <option value="Brownie">Brownie</option>
                            <option value="Muffins">Muffins</option>
                            <option value="Cookies">Cookies</option>
                            <option value="Cakes">Cakes</option>
                            <option value="Ice Cream">Ice Cream</option>
                            <option value="Donuts">Donuts</option>
                            <option value="Swiss Rolls">Swiss Rolls</option>
                            <option value="Valetine Specials">Valentine Specials</option>
                            <option value="Desert Hamper">Desert Hamper</option>
                            <option value="Dips">Dips</option>
                            <option value="Desert">Desert</option>

                        </select>
                        {errors.category && (
                            <Alert variant="destructive" className="py-2 px-3">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.category.message}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Description Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white min-h-[120px]"
                            placeholder="Enter product description"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && (
                            <Alert variant="destructive" className="py-2 px-3">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.description.message}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Special Offer and Discount Group */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Special Offer Type</label>
                            <select
                                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                                {...register("valueForOffer")}
                            >
                                <option value={0}>None</option>
                                <option value={1}>Best Seller</option>
                                <option value={2}>Sugar Free</option>
                                <option value={3}>Newly Added</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Discount (%)</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                                placeholder="0"
                                {...register("discount", { min: 0, max: 100 })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the form remains the same */}
            <div className="space-y-6 pt-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Product Image</label>
                    <FileUpload fileType="image" onSuccess={handleUploadSuccess} onProgress={handleUploadProgress} />
                    {uploadProgress > 0 && (
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                                className="bg-black h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${uploadProgress}%` }} 
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Availability</label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="true"
                                {...register("available")}
                                className="w-4 h-4 text-black focus:ring-black border-gray-300"
                            />
                            <span>Available</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="false"
                                {...register("available")}
                                className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300"
                            />
                            <span>Out of Stock</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={loading || !uploadProgress}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Publishing Product...</span>
                        </>
                    ) : (
                        "Publish Product"
                    )}
                </button>
            </div>
        </form>
    );
}