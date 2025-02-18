import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }>
}) {
    try {
        await connectDB();

        const id = (await params).id;
        const body = await req.json();

        if (!body.status) {
            return NextResponse.json({ message: "status field not found" }, { status: 400 });
        }

        const review = await Review.findById(id);

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        const validStatuses = ["Pending", "Approved", "Rejected"];
        if (!validStatuses.includes(body.status)) {
            return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
        }

        review.status = body.status;
        await review.save();

        return NextResponse.json(review, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update review", error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const id = (await params).id;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete review", error }, { status: 500 });
  }
}