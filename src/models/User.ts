import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  phone: string;
  name: string;
  dob?: string;
  email?: string;
  gender?: "Male" | "Female" | "Other";
}

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: String },
    email: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
