import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log("📦 Received request body:", body); // ✅ Log full request body

    // Required fields
    const requiredFields = ['userId', 'address', 'phone', 'products', 'amount', 'deliveryType', 'paymentType'];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        console.error(`⚠️ Missing required field: ${field}`);
        return NextResponse.json({
          success: false,
          message: `Missing required field: ${field}`
        }, { status: 400 });
      }
    }

    // Get latest order number
    const latestOrder = await Order.findOne().sort({ orderID: -1 });
    const nextOrderID = latestOrder ? latestOrder.orderID + 1 : 201;

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

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("🔥 Order creation error:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error creating order'
    }, { status: 500 });
  }
}
