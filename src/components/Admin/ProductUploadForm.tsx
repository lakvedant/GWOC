"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import FileUpload from "./FileUpload";

interface ImageFormData {
	name: string;
	description: string;
	price: number;
	category: string;
	image: string;
	available: boolean;
}

export default function ImageUploadForm() {
	const [loading, setLoading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ImageFormData>({
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			category: "",
			image: "",
		},
	});

	const handleUploadSuccess = (response: IKUploadResponse) => {
		setValue("image", response.filePath);
	};

	const handleUploadProgress = (progress: number) => {
		setUploadProgress(progress);
	};

	const onSubmit = async (data: ImageFormData) => {
		if (!data.image) {
			return;
		}

		setLoading(true);
		try {
			await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			// Reset form after successful submission
			setValue("name", "");
			setValue("description", "");
			setValue("price", 0);
			setValue("category", "");
			setValue("image", "");
			setUploadProgress(0);
		} catch (error) {
			console.error("Failed to publish video", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="form-control">
				<label className="label">Name</label>
				<input
					type="text"
					className={`input input-bordered bg-gray-200 ${
						errors.name ? "input-error" : ""
					}`}
					{...register("name", { required: "Title is required" })}
				/>
				{errors.name && (
					<span className="text-error text-sm mt-1">{errors.name.message}</span>
				)}
			</div>

			<div className="form-control">
				<label className="label">Description</label>
				<textarea
					className={`textarea textarea-bordered h-24 bg-gray-200 ${
						errors.description ? "textarea-error" : ""
					}`}
					{...register("description", { required: "Description is required" })}
				/>
				{errors.description && (
					<span className="text-error text-sm mt-1">
						{errors.description.message}
					</span>
				)}
			</div>

			<div className="form-control">
				<label className="label">Price</label>
				<input
					type="number"
					className={`input input-bordered bg-gray-200 ${
						errors.name ? "input-error" : ""
					}`}
					{...register("price", { required: "Price is required" })}
				/>
				{errors.name && (
					<span className="text-error text-sm mt-1">{errors.name.message}</span>
				)}
			</div>

			<div className="form-control">
				<label className="label">Category</label>
				<input
					type="text"
					className={`input input-bordered bg-gray-200 ${
						errors.name ? "input-error" : ""
					}`}
					{...register("category", { required: "Category is required" })}
				/>
				{errors.name && (
					<span className="text-error text-sm mt-1">{errors.name.message}</span>
				)}
			</div>

			<div className="form-control">
				<label className="label">Available</label>
				<div className="flex gap-4">
					<label className="flex items-center gap-2">
						<input
							type="radio"
							value="yes"
							{...register("available", {
								required: "Availability is required",
							})}
							className="radio checked:bg-blue-500 bg-gray-200"
						/>
						Yes
					</label>
					<label className="flex items-center gap-2">
						<input
							type="radio"
							value="no"
							{...register("available", {
								required: "Availability is required",
							})}
							className="radio checked:bg-red-500 bg-gray-200"
						/>
						No
					</label>
				</div>
				{errors.available && (
					<span className="text-error text-sm mt-1">
						{errors.available.message}
					</span>
				)}
			</div>

			<div className="form-control">
				<label className="label">Upload Image</label>
				<FileUpload
					fileType="image"
					onSuccess={handleUploadSuccess}
					onProgress={handleUploadProgress}
				/>
				{uploadProgress > 0 && (
					<div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
						<div
							className="bg-primary h-2.5 rounded-full transition-all duration-300 bg-gray-200"
							style={{ width: `${uploadProgress}%` }}
						/>
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
						Publishing Image...
					</>
				) : (
					"Publish Image"
				)}
			</button>
		</form>
	);
}
