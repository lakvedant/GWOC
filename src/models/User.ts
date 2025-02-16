import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  phone: string;
  name: string;
  dob?: string;
  email: string;
  gender?: "Male" | "Female" | "Other";
  orders: Types.ObjectId[]; // ✅ Use `Types.ObjectId` for better Mongoose compatibility
  createdAt: Date;
  updatedAt: Date; // ✅ Explicitly include updatedAt in the interface
}

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: String, default: null }, // ✅ Set default to `null` instead of `undefined`
    email: { type: String, required: true, unique: true }, // ✅ Ensure emails are unique
    gender: { type: String, enum: ["Male", "Female", "Other"], default: null }, 
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: [] }], // ✅ Default empty array ensures field exists
  },
  { timestamps: true }
);

// ✅ Ensure the model isn't redefined when running in development mode
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
