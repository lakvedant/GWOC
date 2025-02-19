import { NextRequest, NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import connectDB from "@/lib/db";
import Order, { IOrder } from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

interface UserProduct {
  productId: Types.ObjectId;
  isReviewed: boolean;
  reviewId?: Types.ObjectId;
}

export async function POST(req: Request) {
  try {
    await connectDB();
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
    const validatedProducts = products.map((product: { productId: string; quantity: number; weight:string }) => {
      if (!mongoose.isValidObjectId(product.productId)) {
        throw new Error(`Invalid productId format: ${product.productId}`);
      }
      return { productId: new mongoose.Types.ObjectId(product.productId), quantity: product.quantity, weight: product.weight };
    });
    console.log("validatedProducts", validatedProducts);

    // Validate payment type
    if (!["COD", "UPI"].includes(paymentType)) {
      return NextResponse.json({ success: false, message: "Invalid payment type (COD/UPI only)" }, { status: 400 });
    }
    if (paymentType === "UPI" && !upiImage) {
      return NextResponse.json({ success: false, message: "UPI payment requires a screenshot" }, { status: 400 });
    }

    // Generate next order ID
    const latestOrder = await Order.findOne().sort({ orderID: -1 }).lean();
    const nextOrderID = (Array.isArray(latestOrder) ? 200 : (latestOrder?.orderID || 200)) + 1;

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

    // First, get the user's existing products
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Safely build set of existing product IDs
    const existingProductIds = new Set();
    if (user.products && Array.isArray(user.products)) {
      user.products.forEach((p: any) => {
        if (p && p.productId) {
          try {
            const idStr = p.productId.toString();
            if (idStr) existingProductIds.add(idStr);
          } catch (e) {
            // Skip invalid product ID
          }
        }
      });
    }

    // Filter out products that already exist
    const newProducts = validatedProducts
      .filter((p: { productId: { toString: () => unknown; }; }) => !existingProductIds.has(p.productId.toString()))
      .map((p: { productId: any; }) => ({
        productId: p.productId,
        isReviewed: false,
        approved: false
      }));

    // Update user with new order and only new products
    const updateQuery: any = {
      $push: {
        orders: order._id
      }
    };
    
    // Only push products if there are new ones
    if (newProducts.length > 0) {
      updateQuery.$push.products = { $each: newProducts };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateQuery,
      { new: true }
    );

    return NextResponse.json({ 
      success: true, 
      order,
      message: "Order created & linked to user"
    }, { status: 202 });

  } catch (error) {
    console.error("Order creation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    // Get userId from the query parameters
    const searchParams = new URL(req.url).searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json([], { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json([], { status: 400 });
    }

    // Ensure Product model is registered before using populate
    if (!mongoose.models.Product) {
      mongoose.model('Product', Product.schema);
    }

    // Fetch orders and populate product details
    const orders: IOrder[] = await Order.find({ userId })
      .populate("products.productId") // Populate product details
      .sort({ createdAt: -1 }); // Sort by newest first

    // Transform response to match required format
    const transformedOrders = orders.map(order => {
      try {
        return {
          _id: order._id,
          orderID: order.orderID,
          userId: order.userId,
          name: order.name,
          phone: order.phone,
          instructions: order.instructions || "",
          upiImage: order.upiImage || "",
          products: order.products.map(product => {
            try {
              return {
                productId: product.productId._id, // Only return the product ID
                quantity: product.quantity,
                _id: product._id
              };
            } catch (e) {
              // Fallback if product structure is unexpected
              return {
                productId: product.productId,
                quantity: product.quantity,
                _id: product._id
              };
            }
          }),
          amount: order.amount,
          paymentType: order.paymentType,
          orderStatus: order.orderStatus,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          __v: order.__v
        };
      } catch (e) {
        // Return basic order data if transformation fails
        return order;
      }
    });

    return NextResponse.json(transformedOrders, { status: 200 }); // Directly return the array
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json([], { status: 500 }); // Return empty array on error
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
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