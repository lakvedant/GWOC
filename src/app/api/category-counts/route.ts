import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();

    const categoryCounts = await Product.aggregate([
      {
        $match: { available: true }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    return NextResponse.json(categoryCounts);
  } catch (error) {
    console.error('Error fetching category counts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}