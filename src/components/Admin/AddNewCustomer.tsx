"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { IUser } from "@/models/User";

interface AddNewCustomerProps {
    onSave: (data: IUser) => void;
    onClose: () => void;
}

export default function AddNewCustomer({ onSave, onClose }: AddNewCustomerProps) {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IUser>({
        defaultValues: {
            name: "",
            phone: "",
            email: "",
        },
    });

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    };

    const onSubmit = async (data: IUser) => {
        setLoading(true);
        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const newProduct = await response.json();

            // Reset form after successful submission
            setValue("name", "");
            setValue("phone", "");
            setValue("email", 0);
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
                <label className="label">Phone</label>
                <input
                    type="text"
                    className={`input input-bordered bg-gray-200 ${errors.name ? "input-error" : ""}`}
                    {...register("name", { required: "Name is required" })}
                />
                {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
            </div>

            <div className="form-control">
                <label className="label">Email</label>
                <input
                    type="number"
                    className={`input input-bordered bg-gray-200 ${errors.price ? "input-error" : ""}`}
                    {...register("price", { required: "Price is required", min: 0 })}
                />
                {errors.price && <span className="text-error text-sm mt-1">{errors.price.message}</span>}
            </div>

            <button
                type="submit"
                className="btn bg-black text-white hover:bg-gray-800 btn-block hover:cursor-pointer"
                disabled={loading || !uploadProgress}>
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Customer...
                    </>
                ) : (
                    "Create Customer"
                )}
            </button>
        </form>
    );
}