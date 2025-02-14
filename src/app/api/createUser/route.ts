import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { phone, name, email } = await req.json();

    if (!phone || !name || !email) {
      return NextResponse.json(
        { message: "Phone, name, and email are required." },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this phone number already exists." },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({ phone, name, email });
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id.toString());

    // Create response with JWT token in HTTP-only cookie
    const response = NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );

    response.cookies.set({
      name: 'userToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Server error." },
      { status: 500 }
    );
  }
}
