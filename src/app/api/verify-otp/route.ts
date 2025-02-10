import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const verifySid = process.env.TWILIO_VERIFY_SID!;

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();
    if (!phone || !otp) return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });

    const verificationCheck = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: `+91${phone}`,
      code: otp,
    });

    if (verificationCheck.status === "approved") {
      return NextResponse.json({ success: true, message: "OTP Verified Successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
