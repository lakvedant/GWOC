import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  orderID: number;
  userId: Schema.Types.ObjectId;
  address: {
    street: string;
    house: string;
    society: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  phone: string;
  products: { productId: mongoose.Types.ObjectId; quantity: number }[];
  amount: number;
  deliveryType: string;
  paymentType: "COD" | "UPI";
  orderStatus: "Accepted" | "Inprogress" | "Delivered" | "Declined";
}

const OrderSchema = new Schema<IOrder>(
  {
    orderID: { type: Number, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: {
      street: { type: String, required: true },
      house: { type: String, required: true },
      society: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone: { type: String, required: true },
    products: [{ productId: { type: Schema.Types.ObjectId, required: true }, quantity: { type: Number, required: true } }],
    amount: { type: Number, required: true },
    deliveryType: { type: String, required: true },
    paymentType: { type: String, enum: ["COD", "UPI"], required: true },
    orderStatus: { type: String, enum: ["Accepted", "Inprogress", "Delivered", "Declined"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
