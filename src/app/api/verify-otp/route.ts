import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();
    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    const response = await fetch("https://api.messagecentral.com/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MESSAGE_CENTRAL_API_KEY}`,
      },
      body: JSON.stringify({ phone: `+91${phone}`, otp }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "OTP Verified Successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
