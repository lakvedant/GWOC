import { getAuthToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const apiBaseUrl = "https://cpaas.messagecentral.com";
const customerId = process.env.CUSTOMER_ID!;

export async function POST(
	req: NextRequest,
) {
	try {
		const { verificationId, otp } = await req.json();
		if (!verificationId || !otp) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		const authToken = await getAuthToken();

		const response = await fetch(
			`${apiBaseUrl}/verification/v3/validateOtp?verificationId=${verificationId}&code=${otp}`,
			{
				method: "GET",
				headers: { authToken },
			}
		);

		if (!response.ok) throw new Error("OTP verification failed");

		const data = await response.json();
		return NextResponse.json({ data: data.data }, { status: 200 });
	} catch (error) {
		console.error("OTP verification error:", error);
		return NextResponse.json({ message: "OTP verification failed" }, { status: 500 });
	}
}
