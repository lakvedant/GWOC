import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    // Validate required fields
    const requiredFields = ['userId', 'address', 'phone', 'products', 'amount', 'deliveryType', 'paymentType'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({
          success: false,
          message: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }

    // Get the latest order number
    const latestOrder = await Order.findOne().sort({ orderID: -1 });
    const nextOrderID = latestOrder ? latestOrder.orderID + 1 : 201;

    // Create new order with all fields
    const order = new Order({
      orderID: nextOrderID,
      userId: body.userId,
      address: body.address,
      phone: body.phone,
      products: body.products,
      amount: parseFloat(body.amount),
      deliveryType: body.deliveryType,
      paymentType: body.paymentType,
      orderStatus: 'Accepted',
      orderDate: new Date(),
      lastUpdateDate: new Date()
    });

    await order.save();

    return NextResponse.json({
      success: true,
      order
    }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error creating order'
    }, { status: 500 });
  }
}