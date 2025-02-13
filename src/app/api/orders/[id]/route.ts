import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }>
}) {
    try {
        await connectDB();

        const orderId = (await params).id;
        const body = await req.json();

        const updatedOrder = await Order.findByIdAndUpdate(orderId, body, { new: true });

        if (!updatedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const orderId = (await params).id;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>
}) {
    try {
        await connectDB();

        const order = await Order.findById((await params).id).lean();

        if (!order) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(order, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch orders"}, {status: 500})
    }
}