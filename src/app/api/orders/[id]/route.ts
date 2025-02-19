import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";

// For Next.js route handlers, we need to use this specific params type
type Props = {
    params: {
        id: string;
    }
}

export async function GET(
    request: NextRequest,
    props: Props
) {
    try {
        const orderId = props.params.id;

        // Connect to DB
        await connectDB();

        // Verify ID format
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return NextResponse.json(
                { message: "Invalid order ID format" },
                { status: 400 }
            );
        }

        // Try to find the order
        const order = await Order.findById(orderId);

        // If order exists, populate product details
        if (order) {
            const populatedOrder = await Order.findById(orderId)
                .populate({
                    path: 'products.productId',
                    select: 'name price _id',
                    model: Product
                });

            return NextResponse.json(populatedOrder);
        }

        return NextResponse.json(
            { message: "Order not found" },
            { status: 404 }
        );

    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json({
            message: "Failed to fetch order",
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: error.stack
            } : String(error)
        }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    props: Props
) {
    try {
        await connectDB();

        const orderId = props.params.id;
        const body = await request.json();

        // Verify ID format
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return NextResponse.json(
                { message: "Invalid order ID format" },
                { status: 400 }
            );
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            body,
            { new: true }
        ).populate({
            path: 'products.productId',
            select: 'name price _id',
            model: Product
        });

        if (!updatedOrder) {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({
            message: "Failed to update order",
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: error.stack
            } : String(error)
        }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    props: Props
) {
    try {
        await connectDB();

        const orderId = props.params.id;

        // Verify ID format
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return NextResponse.json(
                { message: "Invalid order ID format" },
                { status: 400 }
            );
        }

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return NextResponse.json(
                { message: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Order deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({
            message: "Failed to delete order",
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: error.stack
            } : String(error)
        }, { status: 500 });
    }
}