import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }>
}) {
    try {
        await connectDB();

        const productId = (await params).id;
        const body = await req.json();

        const updatedProduct = await Product.findByIdAndUpdate(productId, body, { new: true });

        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const productId = (await params).id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>
}) {
    try {
        await connectDB();

        const product = await Product.findById((await params).id).lean();

        if (!product) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(product, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch products"}, {status: 500})
    }
}