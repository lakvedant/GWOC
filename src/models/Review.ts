import mongoose, { Schema, Document } from "mongoose";
interface IReview extends Document {
	customerName: string;
	rating: number;
	comment: string;
	approved: boolean;
}

const ReviewSchema = new Schema<IReview>({
	customerName: { type: String, required: true },
	rating: { type: Number, required: true, min: 1, max: 5 },
	comment: { type: String, required: true },
	approved: { type: Boolean, default: false },
},
{ timestamps: true });

const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;