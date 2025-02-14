import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Parse the request body
    const body = await req.json();

    // Get the latest order number
    const latestOrder = await Order.findOne().sort({ orderID: -1 });
    const nextOrderID = latestOrder ? latestOrder.orderID + 1 : 201;

    const {
      userId,
      address,
      phone,
      products,
      amount,
      deliveryType,
      paymentType,
    } = body;

    // Create new order
    const order = new Order({
      orderID: nextOrderID,
      userId,
      address,
      phone,
      products,
      amount,
      deliveryType,
      paymentType,
      orderStatus: 'Accepted'
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
      message: 'Error creating order' 
    }, { status: 500 });
  }
}