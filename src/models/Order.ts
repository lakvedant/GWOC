import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
	userId: Schema.Types.ObjectId;
	address: Schema.Types.ObjectId;
	phone: string;
	products: { productId: mongoose.Types.ObjectId; quantity: number }[];
	amount: number;
	deliveryType: string;
	paymentType: "COD" | "UPI";
	orderStatus: "Accepted" | "Inprogress" | "Delivered" | "Declined";
}

const OrderSchema = new Schema<IOrder>({
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
	phone: { type: String, required: true },
	products: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			quantity: { type: Number, required: true, min: 1 },
		},
	],
	amount: { type: Number, required: true },
	deliveryType: { type: String, required: true },
	paymentType: { type: String, required: true, enum: ["COD", "UPI"] },
	orderStatus: { type: String, required: true, enum: ["Accepted", "Inprogress", "Delivered", "Declined"] },
}, {timestamps: true});

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;