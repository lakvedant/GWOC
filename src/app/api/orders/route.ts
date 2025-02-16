import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    try {
        await connectDB();

        const orders = await Order.find({}).sort({
            createdAt: -1,
        }).lean();

        if (!orders || orders.length === 0) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(orders, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch orders", error}, {status: 500})
    }
}

export async function POST(req: Request) {
    try {
      await connectDB();
      const body = await req.json();
  
      // Validate required fields
      if (!body.name || !body.phone || !body.products || !body.amount) {
        return NextResponse.json({
          success: false,
          message: "Missing required fields"
        }, { status: 400 });
      }

      if (!body.userId) {
        body.userId = "67b1af5e952fed6ef899d5f8";
      }
  
      // Validate ObjectId format for userId
      if (!mongoose.isValidObjectId(body.userId)) {
        return NextResponse.json({
          success: false,
          message: "Invalid userId format"
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
  
      // Validate payment type
      if (!["COD", "UPI"].includes(body.paymentType)) {
        return NextResponse.json({
          success: false,
          message: "Invalid payment type. Must be either 'COD' or 'UPI'"
        }, { status: 400 });
      }
  
      // If payment type is UPI, ensure upiImage is provided
      if (body.paymentType === "UPI" && !body.upiImage) {
        return NextResponse.json({
          success: false,
          message: "UPI payment requires a payment screenshot"
        }, { status: 400 });
      }
  
      // Get next order ID
      const latestOrder = await Order.findOne().sort({ orderID: -1 }).lean() as { orderID?: number } | null;
      const nextOrderID = (latestOrder?.orderID || 200) + 1;
  
      const newOrder = {
        orderID: nextOrderID,
        userId: new mongoose.Types.ObjectId(body.userId),
        name: body.name,
        phone: body.phone,
        instructions: body.instructions || "",
        upiImage: body.upiImage,
        products: validatedProducts,
        amount: body.amount,
        paymentType: body.paymentType as "COD" | "UPI",
        orderStatus: "Pending"
      };
  
      const order = await Order.create(newOrder);
      
      return NextResponse.json({ 
        success: true, 
        order,
        message: "Order created successfully" 
      });
  
    } catch (error) {
      console.error("Order creation error:", error);
      return NextResponse.json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to create order"
      }, { status: 500 });
    }
  }