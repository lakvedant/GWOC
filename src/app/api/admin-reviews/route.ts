import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Review from "@/models/Review";

export async function GET() {
    try {
        await connectDB();

        const reviews = await Review.find({}).sort({
            createdAt: -1,
        }).lean();

        if (!reviews || reviews.length === 0) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(reviews, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch reviews", error}, {status: 500})
    }
}