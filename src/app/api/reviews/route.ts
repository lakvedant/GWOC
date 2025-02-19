import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Review from "@/models/Review";
import Product from "@/models/Product";
import connectDB from "@/lib/db";

// app/api/reviews/route.ts
// app/api/reviews/route.ts
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const { userName, userid, rating, comment, productId, productName } = body;

    // Validate required fields
    if (!userName || !userid || !rating || !comment || !productId || !productName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const formattedProductId = new Types.ObjectId(productId);

    // Create the review first
    const newReview = await Review.create({
      userName,
      userid,
      rating,
      comment,
      productId: formattedProductId,
      productName,
      approved: false,
    });

    // Fetch review and product separately
    const savedReview = await Review.findById(newReview._id).lean();
    const productData = await Product.findById(formattedProductId).lean();

    // Combine the data
    const reviewWithProduct = {
      ...savedReview,
      product: productData
    };

    // Update product's reviews array
    await Product.findByIdAndUpdate(formattedProductId, {
      $push: {
        reviews: {
          rating,
          reviewId: newReview._id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      review: reviewWithProduct,
    });

  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create review",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    // Fetch reviews and products separately
    const reviews = await Review.find({
      userid: userId,
      approved: true,
    }).lean();

    // Get product details for each review
    const reviewsWithProducts = await Promise.all(
      reviews.map(async (review) => {
        const product = await Product.findById(review.productId).lean();
        return {
          ...review,
          product
        };
      })
    );

    return NextResponse.json({
      success: true,
      reviews: reviewsWithProducts,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}