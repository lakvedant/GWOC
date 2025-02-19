import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	category: string;
	discount?: number;
	image: string; // URL of the product image
	available: boolean;
	valueForOffer?: number;
	review?: { rating: number; reviewId: Schema.Types.ObjectId }[];
	weight?: string;
	createdAt: Date;
};

export type ProductData = Omit<IProduct, keyof Document> & {
	_id: string;
  };
  
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
