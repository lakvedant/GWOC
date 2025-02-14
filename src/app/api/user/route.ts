import { NextResponse } from "next/server";
import User from "@/models/User"; // Ensure correct import for the User model
import dbConnect from "@/lib/db"; // Ensure DB connection

// ✅ Handle POST request to check if the user exists
export async function POST(req: Request) {
  try {
    await dbConnect(); // Ensure database connection

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
