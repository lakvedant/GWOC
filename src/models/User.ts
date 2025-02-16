import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  phone: string;
  name: string;
  dob?: string;
  email: string;
  gender?: "Male" | "Female" | "Other";
<<<<<<< HEAD
  orders: Types.ObjectId[];
  products: {
    productId: Types.ObjectId;
    isReviewed: boolean;
    reviewId?: Types.ObjectId;
  }[];
=======
  orders: Types.ObjectId[]; // ✅ Use `Types.ObjectId` for better Mongoose compatibility
  products: { productId: mongoose.Types.ObjectId; isReviewed: boolean; reviewId?: Schema.Types.ObjectId; }[];  
>>>>>>> c6f9b26a601567b39eb339ea92681449d28182e6
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
<<<<<<< HEAD
    dob: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: [] }],
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        isReviewed: { type: Boolean, required: true, default: false },
        reviewId: { type: Schema.Types.ObjectId, ref: "Review", default: null },
=======
    dob: { type: String, default: null }, // ✅ Set default to `null` instead of `undefined`
    email: { type: String, required: true, unique: true }, // ✅ Ensure emails are unique
    gender: { type: String, enum: ["Male", "Female", "Other"], default: null }, 
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: [] }], // ✅ Default empty array ensures field exists
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        isReviewed: { type: Boolean, required: true },
        reviewId: { type: Schema.Types.ObjectId, ref: "Review" },
>>>>>>> c6f9b26a601567b39eb339ea92681449d28182e6
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
