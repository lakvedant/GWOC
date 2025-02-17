import { NextRequest, NextResponse } from 'next/server';
import Review from '@/models/Review';
import connectDB from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    await connectDB;
    const { productId } = params;

    // Fetch all reviews for the product
    const reviews = await Review.find({ 
      productId: productId,
      approved: true // Only fetch approved reviews
    }).sort({ createdAt: -1 }); // Sort by newest first

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
