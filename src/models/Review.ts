import mongoose, { Schema, Document, Types } from "mongoose";
interface IReview extends Document {
	userName: string;
	userid: string;
	rating: number;
	comment: string;
	approved: boolean;
	productId: Types.ObjectId;
	productName: string;
}

const ReviewSchema = new Schema<IReview>({
	userName: { type: String, required: true},
	userid: { type: String, required: true },
	rating: { type: Number, required: true, min: 1, max: 5 },
	comment: { type: String, required: true },
	approved: { type: Boolean, default: false },
	productName: { type: String, required: true}
},
{ timestamps: true });

const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;