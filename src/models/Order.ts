import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  __v: number;
  updatedAt: Date;
  _id: mongoose.Types.ObjectId;
  orderID: number;
  userId: Schema.Types.ObjectId;
  name: string;
  phone: string;
  instructions: string;
  upiImage?: string;
  products: {
    _id: mongoose.Types.ObjectId; productId: mongoose.Types.ObjectId; quantity: number 
}[];
  amount: number;
  paymentType: "COD" | "UPI";
  orderStatus: "Pending" | "Accepted" | "Ready" | "Picked" | "Declined";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderID: { type: Number, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    instructions: { type: String },
    upiImage: { type: String },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    paymentType: { type: String, enum: ["COD", "UPI"], required: true },
    orderStatus: { 
      type: String, 
      enum: ["Pending", "Accepted", "Ready", "Picked", "Declined"], 
      required: true,
      default: "Pending"
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default Order;