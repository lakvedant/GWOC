import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";

interface Product {
  productId: string;
  // Add other properties of the product if needed
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select('products');
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Filter out empty products
    const validProducts = user.products.filter((product: Product) => 
      product && product.productId && product.productId !== ""
    );

    return NextResponse.json({ 
      success: true, 
      products: validProducts 
    });
  } catch (error) {
    console.error("Error fetching user products:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}