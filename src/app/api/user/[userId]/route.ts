import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    const userId = params.userId;
    const body = await req.json();

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // If adding an order to the user
    if (body.orderId) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { orders: body.orderId }, // Use addToSet to prevent duplicates
        },
        { new: true }
      ).populate('orders');

      if (!updatedUser) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(updatedUser, { status: 200 });
    }

    // For other user updates
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      body,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}