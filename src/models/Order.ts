import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
	customerName: string;
	phone: string;
	items: { productId: mongoose.Types.ObjectId; quantity: number }[];
	totalAmount: number;
	paymentStatus: "Pending" | "Completed";
}

const OrderSchema = new Schema<IOrder>({
	customerName: { type: String, required: true },
	phone: { type: String, required: true },
	items: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			quantity: { type: Number, required: true, min: 1 },
		},
	],
	totalAmount: { type: Number, required: true },
	paymentStatus: {
		type: String,
		enum: ["Pending", "Completed"],
		default: "Pending",
	},
}, {timestamps: true});

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;