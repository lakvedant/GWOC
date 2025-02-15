import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate required fields
    if (!body.userId || !body.addressId || !body.products || !body.amount) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields"
      }, { status: 400 });
    }

    // Validate ObjectId format for userId and addressId
    if (!mongoose.isValidObjectId(body.userId) || !mongoose.isValidObjectId(body.addressId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid userId or addressId format"
      }, { status: 400 });
    }

    // Validate and format products array
    const validatedProducts = body.products.map((product: { productId: string; quantity: number }) => {
      if (!mongoose.isValidObjectId(product.productId)) {
        throw new Error(`Invalid productId format: ${product.productId}`);
      }
      return {
        productId: new mongoose.Types.ObjectId(product.productId),
        quantity: product.quantity
      };
    });

    // Get next order ID
    const latestOrder = await Order.findOne().sort({ orderID: -1 }).lean() as { orderID?: number } | null;
    const nextOrderID = (latestOrder?.orderID || 200) + 1;

    const newOrder = {
      orderID: nextOrderID,
      userId: new mongoose.Types.ObjectId(body.userId),
      address: new mongoose.Types.ObjectId(body.addressId),
      phone: body.phone,
      products: validatedProducts,
      amount: body.amount,
      deliveryType: body.deliveryType,
      paymentType: body.paymentType,
      orderStatus: "Accepted"
    };

    const order = await Order.create(newOrder);
    return NextResponse.json({ success: true, order });
    
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create order"
    }, { status: 500 });
  }
}
