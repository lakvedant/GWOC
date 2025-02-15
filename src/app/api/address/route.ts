import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Address from "@/models/Address";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate required fields
    if (!body.userId || !body.street || !body.house || !body.city || !body.state || !body.pincode) {
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

    const newAddress = await Address.create({
      userId: new mongoose.Types.ObjectId(body.userId),
      street: body.street,
      house: body.house,
      society: body.society || "N/A",
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      country: body.country || "India",
    });

    return NextResponse.json({ success: true, address: newAddress });

  } catch (error) {
    console.error("Address creation error:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create address"
    }, { status: 500 });
  }
}
