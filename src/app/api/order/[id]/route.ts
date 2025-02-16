// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import Order, { IOrder } from "@/models/Order";
// import { dbConnect } from "@/lib/db";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect(); // Ensure database connection
    
//     const { id } = params;
    
//     if (!id) {
//       return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ success: false, message: "Invalid Order ID" }, { status: 400 });
//     }

//     const order: IOrder | null = await Order.findById(id).populate("products.productId");

//     if (!order) {
//       return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, order }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
//   }
// }