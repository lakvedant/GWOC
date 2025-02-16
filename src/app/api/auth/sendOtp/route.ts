import { getAuthToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const apiBaseUrl = "https://cpaas.messagecentral.com";
// const customerId = process.env.CUSTOMER_ID!;

export async function POST(
	req: NextRequest,
) {
	try {
		const { phone } = await req.json();
		if (!phone)
			return NextResponse.json({ message: "Phone number is required" }, { status: 400 });

		const authToken = await getAuthToken();

		const response = await fetch(
			`${apiBaseUrl}/verification/v3/send?countryCode=91&flowType=SMS&mobileNumber=${phone}&otpLength=6`,
			{
				method: "POST",
				headers: { authToken },
			}
		);

		if (!response.ok) console.error("Failed to send OTP");

		const data = await response.json();
		return NextResponse.json({ data: data.data }, { status: 200 });
	} catch (error) {
		console.error("OTP sending error:", error);
		return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
	}
}
