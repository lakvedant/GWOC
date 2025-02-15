import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
  userId: Schema.Types.ObjectId;
  street: string;
  house: string;
  society: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const AddressSchema = new Schema<IAddress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    society: { type: String, default: "N/A" },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: "India" },
  },
  { timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model<IAddress>("Address", AddressSchema);
export default Address;
