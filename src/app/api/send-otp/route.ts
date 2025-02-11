import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const response = await fetch("https://api.messagecentral.com/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MESSAGE_CENTRAL_API_KEY}`,
      },
      body: JSON.stringify({ phone: `+91${phone}` }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
