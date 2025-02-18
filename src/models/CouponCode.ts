import mongoose, { Schema, Document } from "mongoose";

export interface ICouponCode extends Document {
  couponCodeID: number;
  code: string;
  name: string;
  type: "Discount" | "Flat";
  discount: number;
  startDate: Date;
  endDate: Date;
  status: boolean;
  quantity: number;
}

const CouponCodeSchema = new Schema<ICouponCode>(
  {
    couponCodeID: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["Discount", "Flat"], required: true },
    discount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: Boolean, required: true, default: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);


const CouponCode = mongoose.models.CouponCode || mongoose.model<ICouponCode>("CouponCode", CouponCodeSchema);

export { CouponCode };
