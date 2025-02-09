import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	category: string;
	image: string; // URL of the product image
	available: boolean;
}

const ProductSchema = new Schema<IProduct>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	image: { type: String, required: true },
	available: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
