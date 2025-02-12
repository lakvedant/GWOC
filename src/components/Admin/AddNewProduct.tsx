"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import FileUpload from "./FileUpload";
import { IProduct } from "@/models/Product";

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
        watch,
        formState: { errors },
    } = useForm<IProduct>({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            discount: undefined,
            image: "",
            available: true,
            valueForOffer: undefined,
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

            // Reset form after successful submission
            setValue("name", "");
            setValue("description", "");
            setValue("price", 0);
            setValue("category", "");
            setValue("discount", undefined);
            setValue("image", "");
            setValue("valueForOffer", undefined);
            setValue("review", []);
            setValue("weight", undefined);
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
                <label className="label">Name</label>
                <input
                    type="text"
                    className={`input input-bordered bg-gray-200 ${errors.name ? "input-error" : ""}`}
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
            </div>

            <div className="form-control">
                <label className="label">Description</label>
                <textarea
                    className={`textarea textarea-bordered h-24 bg-gray-200 ${errors.description ? "textarea-error" : ""}`}
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
            </div>

            <div className="form-control">
                <label className="label">Price</label>
                <input
                    type="number"
                    className={`input input-bordered bg-gray-200 ${errors.price ? "input-error" : ""}`}
                    {...register("price", { required: "Price is required", min: 0 })}
                />
                {errors.price && <span className="text-error text-sm mt-1">{errors.price.message}</span>}
            </div>

            <div className="form-control">
                <label className="label">Category</label>
                <select
                    className={`select select-bordered bg-gray-200 ${errors.category ? "select-error" : ""}`}
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
                </select>
                {errors.category && <span className="text-error text-sm mt-1">{errors.category.message}</span>}
            </div>

            <div className="form-control">
                <label className="label">Discount (%)</label>
                <input
                    type="number"
                    className="input input-bordered bg-gray-200"
                    {...register("discount", { min: 0, max: 100 })}
                />
            </div>

            <div className="form-control">
                <label className="label">Value for Offer</label>
                <input
                    type="number"
                    className="input input-bordered bg-gray-200"
                    {...register("valueForOffer", { min: 0 })}
                />
            </div>

            <div className="form-control">
                <label className="label">Weight (grams)</label>
                <input
                    type="number"
                    className="input input-bordered bg-gray-200"
                    {...register("weight", { min: 0 })}
                />
            </div>

            <div className="form-control">
                <label className="label">Available</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="true"
                            {...register("available", { required: "Availability is required" })}
                            className="radio checked:bg-blue-500 bg-gray-200"
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="false"
                            {...register("available", { required: "Availability is required" })}
                            className="radio checked:bg-red-500 bg-gray-200"
                        />
                        No
                    </label>
                </div>
                {errors.available && <span className="text-error text-sm mt-1">{errors.available.message}</span>}
            </div>

            <div className="form-control">
                <label className="label">Upload Image</label>
                <FileUpload fileType="image" onSuccess={handleUploadSuccess} onProgress={handleUploadProgress} />
                {uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-primary h-2.5 rounded-full transition-all duration-300 bg-gray-200" style={{ width: `${uploadProgress}%` }} />
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="btn bg-black text-white hover:bg-gray-800 btn-block hover:cursor-pointer"
                disabled={loading || !uploadProgress}>
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Publishing Product...
                    </>
                ) : (
                    "Publish Product"
                )}
            </button>
        </form>
    );
}
