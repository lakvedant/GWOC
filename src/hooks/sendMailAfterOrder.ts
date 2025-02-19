"use server";
import { compileWelcomeTemplate2, sendMail } from "@/lib/mail";
import Order, { IOrder } from "@/models/Order";
import mongoose from "mongoose";

type Props = {
    orderId: mongoose.Types.ObjectId;
  };

const sendOrderConfirmation = async ({ orderId }: Props) => {
    const order: IOrder | null = await Order.findById(orderId).populate('products.productId').exec();

    if (!order) {
      throw new Error("Order not found");
    }
  
    // Extract the necessary details from the order
    const { name, phone, instructions, products, amount, paymentType } = order;

  // Compile the email template with order details
  const emailBody = compileWelcomeTemplate2(order.orderID, name, phone, instructions, products, amount, paymentType);

  // Define the owner's email (replace with the actual owner's email address)
  const ownerEmail = "owner@example.com";

  // Send the email to the owner
  await sendMail({
    too: ownerEmail,
    name: "Owner",
    subject: `New Order Confirmation - Order ID: ${order.orderID}`,
    body: emailBody,
  });
};

export default sendOrderConfirmation;
