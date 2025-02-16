// app/api/product/[id]/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product, { IProduct } from "@/models/Product";
import connectDB from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const id = params.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).select('name price image available category');
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    if (!product.available) {
      return NextResponse.json(
        { success: false, message: "Product is not available" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      }
    });

  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}