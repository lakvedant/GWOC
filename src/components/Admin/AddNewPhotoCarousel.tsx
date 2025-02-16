"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, AlertCircle } from "lucide-react";
import FileUpload from "./FileUpload";
import { IPhotoCarouselSchema } from "@/models/PhotoCarousel";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AddNewPhotoCarouselProps {
    onSave: (data: IPhotoCarouselSchema) => void;
    onClose: () => void;
}

export default function AddNewPhotoCarousel({ onSave, onClose }: AddNewPhotoCarouselProps) {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IPhotoCarouselSchema>({
        defaultValues: {
            title: "",
            description: "",
            image: "",
            createdAt: new Date(),
        },
    });

    const handleUploadSuccess = (response: IKUploadResponse) => {
        setValue("image", response.filePath);
    };

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    };

    const onSubmit = async (data: IPhotoCarouselSchema) => {
        if (!data.image) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/photo-carousel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const newPhoto = await response.json();
            
            // Reset form
            const fields = ['title', 'description', 'image'];
            fields.forEach(field => setValue(field, ''));
            setUploadProgress(0);

            onSave(newPhoto);
        } catch (error) {
            console.error("Failed to publish photo", error);
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
                    {/* Title Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Photo Title</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                            placeholder="Enter photo title"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <Alert variant="destructive" className="py-2 px-3">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.title.message}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white min-h-[120px]"
                            placeholder="Enter photo description"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && (
                            <Alert variant="destructive" className="py-2 px-3">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.description.message}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Photo Image</label>
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
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading || !uploadProgress}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Publishing Photo...</span>
                    </>
                ) : (
                    "Publish Photo"
                )}
            </button>
        </form>
    );
}