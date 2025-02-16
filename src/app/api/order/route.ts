import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate required fields
    if (!body.userId || !body.name || !body.phone || !body.products || !body.amount) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields"
      }, { status: 400 });
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

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const userId = req.nextUrl.searchParams.get("userId");
    const orderId = req.nextUrl.searchParams.get("orderId");

    if (!userId && !orderId) {
      return NextResponse.json({ 
        success: false,
        message: "Either userId or orderId is required" 
      }, { status: 400 });
    }

    let query = {};
    
    if (orderId) {
      query = { orderID: parseInt(orderId) };
    } else if (userId) {
      if (!mongoose.isValidObjectId(userId)) {
        return NextResponse.json({
          success: false,
          message: "Invalid userId format"
        }, { status: 400 });
      }
      query = { userId: new mongoose.Types.ObjectId(userId) };
    }

    const orders = await Order.find(query)
      .populate('products.productId')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch orders"
    }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.orderId || !body.orderStatus) {
      return NextResponse.json({
        success: false,
        message: "Order ID and status are required"
      }, { status: 400 });
    }

    // Validate order status
    const validStatuses = ["Pending", "Accepted", "Ready", "Picked", "Declined"];
    if (!validStatuses.includes(body.orderStatus)) {
      return NextResponse.json({
        success: false,
        message: "Invalid order status"
      }, { status: 400 });
    }

    const order = await Order.findOneAndUpdate(
      { orderID: body.orderId },
      { orderStatus: body.orderStatus },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({
        success: false,
        message: "Order not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      order,
      message: "Order status updated successfully"
    });

  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update order"
    }, { status: 500 });
  }
}