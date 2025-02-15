import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { message: "Phone number is required." }, 
        { status: 400 }
      );
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return NextResponse.json(
        { 
          exists: false,
          message: "User not found" 
        }, 
        { status: 200 }
      );
    }

    // Return user info if found
    return NextResponse.json(
      {
        exists: true,
        userId: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { message: "Server error occurred while fetching user information." }, 
      { status: 500 }
    );
  }
}