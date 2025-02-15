import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Get next order ID
    const latestOrder = await Order.findOne().sort({ orderID: -1 }).lean();
    const nextOrderID = (Array.isArray(latestOrder) ? 200 : (latestOrder?.orderID || 200)) + 1;

    const newOrder = {
      orderID: nextOrderID,
      userId: new mongoose.Types.ObjectId(body.userId),
      address: {
        street: body.address.street,
        house: body.address.house || '',
        society: body.address.society || 'N/A',
        city: body.address.city,
        state: body.address.state,
        pincode: body.address.pincode,
        country: body.address.country,
      },
      phone: body.phone,
      products: body.products.map((product: { productId: number; quantity: any; }) => ({
        productId: new mongoose.Types.ObjectId(product.productId),
        quantity: product.quantity
      })),
      amount: body.amount,
      deliveryType: body.deliveryType,
      paymentType: body.paymentType,
      orderStatus: "Accepted"
    };

    const order = await Order.create(newOrder);
    return NextResponse.json({ success: true, order });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create order'
    }, { status: 500 });
  }
}