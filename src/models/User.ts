import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  phone: string;
  name: string;
  dob?: string;
  email: string;
  gender?: "Male" | "Female" | "Other";
  orders: Types.ObjectId[];
  products: {
    productId: Types.ObjectId;
    isReviewed: boolean;
    reviewId?: Types.ObjectId;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: [] }],
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        isReviewed: { type: Boolean, required: true, default: false },
        reviewId: { type: Schema.Types.ObjectId, ref: "Review", default: null },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
