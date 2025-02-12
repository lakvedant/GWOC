"use client";
import { useState } from "react";

const AddProduct = () => {
	const [form, setForm] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
	});
	const [image, setImage] = useState<File | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImage(e.target.files?.[0] || null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!image) return alert("Please upload an image!");

		const formData = new FormData();
		formData.append("name", form.name);
		formData.append("description", form.description);
		formData.append("price", form.price);
		formData.append("category", form.category);
		formData.append("image", image);

		const response = await fetch("/api/products/add", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();
		if (data.success) {
			alert("Product added successfully!");
			setForm({ name: "", description: "", price: "", category: "" });
			setImage(null);
		} else {
			alert("Failed to add product");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 p-4 border rounded-lg">
			<input
				type="text"
				name="name"
				placeholder="Product Name"
				value={form.name}
				onChange={handleChange}
				required
			/>
			<textarea
				name="description"
				placeholder="Description"
				value={form.description}
				onChange={handleChange}
				required
			/>
			<input
				type="number"
				name="price"
				placeholder="Price"
				value={form.price}
				onChange={handleChange}
				required
			/>
			<select
    name="category"
    value={form.category}
    onChange={handleChange}
    required
    className="select select-bordered bg-gray-200"
>
    <option value="">Select a category</option>
    <option value="Fudge">Fudge</option>
    <option value="Chocolate Modak">Chocolate Modak</option>
    <option value="Truffle Chocolate Balls">Truffle Chocolate Balls</option>
    <option value="Brownie">Brownie</option>
    <option value="Muffins">Muffins</option>
    <option value="Cookies">Cookies</option>
    <option value="Cakes">Cakes</option>
    <option value="Ice Cream">Ice Cream</option>
    <option value="Donuts">Donuts</option>
    <option value="Swiss Rolls">Swiss Rolls</option>
</select>
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				required
			/>
			<button type="submit" className="bg-blue-500 text-white py-2 rounded">
				Add Product
			</button>
		</form>
	);
};

export default AddProduct;
