import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate required fields
    const { userId, name, phone, products, amount, paymentType, upiImage, instructions } = body;
    if (!userId || !name || !phone || !products || !amount) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Validate userId format
    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ success: false, message: "Invalid userId format" }, { status: 400 });
    }

    // Validate products
    const validatedProducts = products.map((product: { productId: string; quantity: number }) => {
      if (!mongoose.isValidObjectId(product.productId)) {
        throw new Error(`Invalid productId format: ${product.productId}`);
      }
      return { productId: new mongoose.Types.ObjectId(product.productId), quantity: product.quantity };
    });

    // Validate payment type
    if (!["COD", "UPI"].includes(paymentType)) {
      return NextResponse.json({ success: false, message: "Invalid payment type (COD/UPI only)" }, { status: 400 });
    }
    if (paymentType === "UPI" && !upiImage) {
      return NextResponse.json({ success: false, message: "UPI payment requires a screenshot" }, { status: 400 });
    }

    // Generate next order ID
    const latestOrder = await Order.findOne().sort({ orderID: -1 }).lean();
    const nextOrderID = (latestOrder?.orderID || 200) + 1;

    // Create the order
    const order = await Order.create({
      orderID: nextOrderID,
      userId: new mongoose.Types.ObjectId(userId),
      name,
      phone,
      instructions: instructions || "",
      upiImage,
      products: validatedProducts,
      amount,
      paymentType,
      orderStatus: "Pending",
    });

    // Add order ID to user's orders array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { orders: order._id } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order, message: "Order created & linked to user" },{ status: 202 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to create order" }, { status: 500 });
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