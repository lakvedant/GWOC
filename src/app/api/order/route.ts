import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    await dbConnect(); // ✅ Ensure DB is connected

    let body;
    try {
      body = await req.json();
    } catch (jsonError) {
      console.error("❌ Invalid JSON format:", jsonError);
      return NextResponse.json({
        success: false,
        message: "Invalid JSON format"
      }, { status: 400 });
    }

    console.log("📦 Received request body:", body); // ✅ Debug request payload

    // Required fields validation
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

    // Validate products array
    if (!Array.isArray(body.products) || body.products.length === 0) {
      console.error("⚠️ Invalid or empty products array");
      return NextResponse.json({
        success: false,
        message: "Products must be a non-empty array"
      }, { status: 400 });
    }

    // Ensure amount is a valid number
    const amount = parseFloat(body.amount);
    if (isNaN(amount) || amount <= 0) {
      console.error("⚠️ Invalid amount value:", body.amount);
      return NextResponse.json({
        success: false,
        message: "Invalid amount value"
      }, { status: 400 });
    }

    // Get latest order number
    let nextOrderID = 201; // Default for first order
    try {
      const latestOrder = await Order.findOne().sort({ orderID: -1 }).lean();
      if (latestOrder && latestOrder.orderID) {
        nextOrderID = latestOrder.orderID + 1;
      }
    } catch (orderFetchError) {
      console.error("⚠️ Error fetching latest order:", orderFetchError);
      return NextResponse.json({
        success: false,
        message: "Error retrieving latest order ID"
      }, { status: 500 });
    }

    const order = new Order({
      orderID: nextOrderID,
      userId: body.userId,
      address: body.address,
      phone: body.phone,
      products: body.products,
      amount,
      deliveryType: body.deliveryType,
      paymentType: body.paymentType.toUpperCase() === 'COD' ? 'COD' : 'UPI',
      orderStatus: 'Accepted',
      orderDate: new Date(),
      lastUpdateDate: new Date()
    });

    await order.save();

    console.log("✅ Order created successfully:", order);

    return NextResponse.json({ success: true, order }, { status: 201 });

  } catch (error) {
    console.error("🔥 Order creation error:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Error creating order"
    }, { status: 500 });
  }
}
