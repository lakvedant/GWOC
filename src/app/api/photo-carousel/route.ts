import connectDB from "@/lib/db";
import PhotoCarousel, { IPhotoCarouselSchema } from "@/models/PhotoCarousel";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const photocarousels = await PhotoCarousel.find({}).sort({
            createdAt: -1,
        }).lean();

        if (!photocarousels || photocarousels.length === 0) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(photocarousels, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch photocarousels", error}, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body:IPhotoCarouselSchema = await req.json();

        if (!body.title || !body.description || !body.image) {
            return NextResponse.json(
                {error: "Missing required fields"},
                {status: 400}
            )
        }

        const productData = {
            ...body,
        }

        const newProduct = await PhotoCarousel.create(productData);
        return NextResponse.json(newProduct, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Failed to add product", error}, {status: 500})
    }
}