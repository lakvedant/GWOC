import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const verifySid = process.env.TWILIO_VERIFY_SID!; // If using Twilio Verify API

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    if (!phone) return NextResponse.json({ error: "Phone number is required" }, { status: 400 });

    const otpResponse = await client.verify.v2.services(verifySid).verifications.create({
      to: `+91${phone}`,
      channel: "sms",
    });

    return NextResponse.json({ success: true, status: otpResponse.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
