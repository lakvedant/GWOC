// models/Review.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userName: string;
  userid: string;
  rating: number;
  comment: string;
  status: "Approved" | "Pending" | "Rejected";
  productId: Schema.Types.ObjectId;
  productName: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userName: { type: String, required: true },
    userid: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["Approved", "Pending", "Rejected", "Picked", "Declined"], 
      required: true,
      default: "Pending"
    },
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