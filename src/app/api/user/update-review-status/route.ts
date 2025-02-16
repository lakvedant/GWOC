import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log("Request body:", body);
    const { userId, productId, reviewId, isReviewed, approved } = body;

    if (!userId || !productId || !reviewId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find user and update the specific product using atomic operation
    const user = await User.findOneAndUpdate(
      { 
        _id: userId,
        "products.productId": productId 
      },
      {
        $set: {
          "products.$.isReviewed": isReviewed,
          "products.$.reviewId": reviewId,
          "products.$.approved": approved
        }
      },
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User or product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      products: user.products 
    });

  } catch (error) {
    console.error("❌ Error updating review status:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error", 
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}