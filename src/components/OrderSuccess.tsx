import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface OrderSuccessViewProps {
  orderDetails: {
    orderId: string;
    amount: number;
    paymentType: string;
    name: string;
    phone: string;
  };
  onReturnHome: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  orderDetails,
  onReturnHome,
}) => {
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white p-10 text-gray-800">
      {/* Success Header */}
      <div className="flex items-center space-x-4 mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h1 className="text-4xl font-bold">Order Placed Successfully!</h1>
      </div>
      <p className="text-lg mb-8">Thank you, {orderDetails.name}! Your order is confirmed.</p>

      {/* Order Information */}
      <div className="w-full max-w-4xl grid grid-cols-3 gap-8 text-lg">
        <div>
          <p className="text-gray-500">Order ID:</p>
          <p className="font-semibold">#{orderDetails.orderId}</p>
        </div>
        <div>
          <p className="text-gray-500">Order Date:</p>
          <p className="font-semibold">{orderDate}</p>
        </div>
        <div>
          <p className="text-gray-500">Total Amount:</p>
          <p className="font-bold text-pink-600">₹{orderDetails.amount}</p>
        </div>
        <div>
          <p className="text-gray-500">Payment Method:</p>
          <p className="font-semibold">
            {orderDetails.paymentType === "COD" ? "Cash on Delivery" : "UPI Payment"}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Phone:</p>
          <p className="font-semibold">{orderDetails.phone}</p>
        </div>
      </div>

      {/* Order Status */}
      <div className="w-full max-w-4xl mt-10">
        <p className="text-lg font-semibold mb-2">Order Status</p>
        <div className="flex items-center w-full">
          <div className="h-2 bg-green-500 flex-1"></div>
          <div className="h-2 bg-gray-300 flex-1"></div>
          <div className="h-2 bg-gray-300 flex-1"></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Placed</span>
          <span>Processing</span>
          <span>Delivered</span>
        </div>
      </div>

      {/* Back to home button */}
      <Button
        onClick={onReturnHome}
        className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Return to Home
      </Button>
    </div>
  );
};
