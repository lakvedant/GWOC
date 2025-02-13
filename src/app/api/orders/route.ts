import connectDB from "@/lib/db";
import Order, { IOrder } from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const orders = await Order.find({}).sort({
            createdAt: -1,
        }).lean();

        if (!orders || orders.length === 0) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(orders, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch products"}, {status: 500})
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body:IOrder = await req.json();

        if (!body.userId || !body.address || !body.phone || !body.products || !body.amount || !body.deliveryType || !body.paymentType || !body.orderStatus) {
            return NextResponse.json(
                {error: "Missing required fields"},
                {status: 400}
            )
        }

        const orderData = {
            ...body,
        }

        const newOrder = await Order.create(orderData);
        return NextResponse.json(newOrder, {status: 201})
    } catch (error) {
        return NextResponse.json({error: "Failed to add product"}, {status: 500})
    }
}