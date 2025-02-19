import { NextResponse } from "next/server";
import Review from "@/models/Review"; // Adjust the path based on your project structure

export async function GET() {
  try {
    const reviews = await Review.find(); // Fetch all reviews

    return NextResponse.json({ success: true, reviews }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error },
      { status: 500 }
    );
  }
}
