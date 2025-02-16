import connectDB from "@/lib/db";
import PhotoCarousel from "@/models/PhotoCarousel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }>
}) {
    try {
        await connectDB();

        const productId = (await params).id;
        const body = await req.json();

        const updatedProduct = await PhotoCarousel.findByIdAndUpdate(productId, body, { new: true });

        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update product", error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const productId = (await params).id;

        const deletedProduct = await PhotoCarousel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete product", error }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>
}) {
    try {
        await connectDB();

        const product = await PhotoCarousel.findById((await params).id).lean();

        if (!product) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(product, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch products", error}, {status: 500})
    }
}