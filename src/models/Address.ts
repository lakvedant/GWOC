import mongoose, { Schema, Document } from "mongoose";

interface IAddress extends Document {
    street: string;
    house: string;
    society: string;
    city: string;
    state: string;
    pincode: string;
}

const AddressSchema = new Schema<IAddress>({
    street: { type: String, required: true },
    house: { type: String, required: true },
    society: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
}, { timestamps: true });

const Address = mongoose.models.Address || mongoose.model<IAddress>("Address", AddressSchema);

export default Address;
