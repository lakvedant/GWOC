import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
	try {
		const { phone, name } = await request.json();

		if (!phone || !name) {
			return NextResponse.json(
				{ error: "phone and name are required" },
				{ status: 400 }
			);
		}

		await connectDB();

		// Check if user already exists
		const existingUser = await User.findOne({ phone });
		if (existingUser) {
			return NextResponse.json(
				{ error: "phone already registered" },
				{ status: 400 }
			);
		}

		await User.create({
			phone,
			name,
		});

		return NextResponse.json(
			{ message: "User registered successfully" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Failed to register user" },
			{ status: 500 }
		);
	}
}
