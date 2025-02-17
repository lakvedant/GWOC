// models/Review.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userName: string;
  userid: string;
  rating: number;
  comment: string;
  approved: boolean;
  productId: Schema.Types.ObjectId;
  productName: string;
}

const ReviewSchema = new Schema<IReview>(
  {
    userName: { type: String, required: true },
    userid: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    approved: { type: Boolean, default: false },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    productName: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;