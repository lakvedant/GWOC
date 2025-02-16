import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function PUT() {
    try {
        await connectDB();

        // Update all users who do not have an 'orders' field
        const result =await User.updateMany({}, { $set: { orders: [] } });


        return NextResponse.json({ 
            success: true, 
            modifiedCount: result.modifiedCount, 
            message: `${result.modifiedCount} users updated`
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating users:", error);
        return NextResponse.json({ success: false, message: "Failed to update users" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();

        // Fetch all users ensuring orders field is included
        const users = await User.find({}).lean();

        return NextResponse.json({ 
            success: true, 
            users 
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch users" }, { status: 500 });
    }
}
