import { NextResponse } from "next/server";
import User from "@/models/User"; // Ensure correct import for the User model
import connectDB from "@/lib/db";

export async function GET() {
    try {
        await connectDB();

        const users = await User.find({}).sort({
            createdAt: -1,
        }).lean();

        if (!users || users.length === 0) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(users, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch products"}, {status: 500})
    }
}

// ✅ Handle POST request to check if the user exists
export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure database connection

    const { phone } = await req.json(); // Extract phone from request

    if (!phone) {
      return NextResponse.json({ message: "Phone number is required." }, { status: 400 });
    }

    const user = await User.findOne({ phone });

    return NextResponse.json({ exists: !!user }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
