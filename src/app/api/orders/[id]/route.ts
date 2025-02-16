import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

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
        return NextResponse.json({ message: "Failed to update Order", error }, { status: 500 });
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
        return NextResponse.json({ message: "Failed to delete Order", error }, { status: 500 });
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Log the incoming ID
        const orderId = (await params).id;
        // console.log('Requested Order ID:', orderId);

        // Connect to DB and log connection state
        await connectDB();
        // console.log('MongoDB Connection State:', mongoose.connection.readyState);

        // Verify ID format
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            console.log('Invalid ObjectId format');
            return NextResponse.json(
                { message: "Invalid order ID format" },
                { status: 400 }
            );
        }

        // Try to find the order and log the query
        const order = await Order.findById(orderId);
        // console.log('Found Order:', order);

        // If order exists, try population
        if (order) {
            const populatedOrder = await Order.findById(orderId)
                .populate({
                    path: 'products.productId',
                    select: 'name price _id',
                    model: Product
                });
            // console.log('Populated Order:', populatedOrder);

            return NextResponse.json(populatedOrder);
        }

        return NextResponse.json(
            { message: "Order not found" },
            { status: 404 }
        );

    } catch (error) {
        // Enhanced error logging
        console.error('Full error:', error);
        console.error('Error name:', error instanceof Error ? error.name : 'Unknown');
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
        
        return NextResponse.json({
            message: "Failed to fetch Orders",
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: error.stack
            } : String(error)
        }, { status: 500 });
    }
}