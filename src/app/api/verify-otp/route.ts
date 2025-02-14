import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";
import { getAuthToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
const apiBaseUrl = "https://cpaas.messagecentral.com";

export async function POST(req: NextRequest) {
  try {
    const { verificationId, otp, phone } = await req.json();
    
    if (!verificationId || !otp || !phone) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const authToken = await getAuthToken();

    // Verify OTP
    const otpResponse = await fetch(
      `${apiBaseUrl}/verification/v3/validateOtp?verificationId=${verificationId}&code=${otp}`,
      {
        method: "GET",
        headers: { authToken },
      }
    );

    if (!otpResponse.ok) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    const otpData = await otpResponse.json();

    // If OTP is valid, check if user exists
    await connectDB();
    const existingUser = await User.findOne({ phone });

    // Generate JWT token
    const token = generateToken(existingUser?._id?.toString() || phone);

    // Set JWT token in HTTP-only cookie
    const response = NextResponse.json(
      {
        message: "OTP verified successfully",
        exists: !!existingUser,
        data: otpData.data
      },
      { status: 200 }
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
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { message: "OTP verification failed" },
      { status: 500 }
    );
  }
}