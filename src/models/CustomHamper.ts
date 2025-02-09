import mongoose, { Schema, Document } from "mongoose";

interface ICustomHamper extends Document {
	customerName: string;
	phone: string;
	selectedProducts: { productId: mongoose.Types.ObjectId; quantity: number }[];
	message?: string;
}

const CustomHamperSchema = new Schema<ICustomHamper>({
	customerName: { type: String, required: true },
	phone: { type: String, required: true },
	selectedProducts: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			quantity: { type: Number, required: true, min: 1 },
		},
	],
	message: { type: String },
}, { timestamps: true });

const CustomHamper =
	mongoose.models.CustomHamper ||
	mongoose.model<ICustomHamper>("CustomHamper", CustomHamperSchema);

export default CustomHamper;
