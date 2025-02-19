import connectDB from "@/lib/db";
import Product, { IProduct } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const products = await Product.find({}).sort({
            createdAt: -1,
        }).lean();

        if (!products || products.length === 0) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(products, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch products", error}, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body:IProduct = await req.json();

        if (!body.name || !body.description || !body.price || !body.category || !body.image || !body.available || !body.discount) {
            return NextResponse.json(
                {error: "Missing required fields"},
                {status: 400}
            )
        }

        const productData = {
            ...body,
        }

        const newProduct = await Product.create(productData);
        return NextResponse.json(newProduct, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Failed to add product", error}, {status: 500})
    }
}