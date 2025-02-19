import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Phone, Calendar, CreditCard, Share2 } from "lucide-react";

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

  const handleWhatsAppConfirmation = () => {
    const message = encodeURIComponent(
      `Hello! I have placed order #${orderDetails.orderId} with Cash on Delivery payment. Amount: ₹${orderDetails.amount}. Please confirm my order. Thank you!`
    );
    window.open(`https://wa.me/+919898058074?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white px-4 py-8 md:py-12">
      <div className="max-w-lg mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mt-2">
            Hi {orderDetails.name}, your order is confirmed
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Share2 className="w-4 h-4" />
                <span>Order ID</span>
              </div>
              <span className="font-semibold">#{orderDetails.orderId}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </div>
              <span className="font-semibold">{orderDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>Amount</span>
              </div>
              <span className="font-semibold text-green-600">₹{orderDetails.amount}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>Phone</span>
              </div>
              <span className="font-semibold">{orderDetails.phone}</span>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="relative mb-8">
          <div className="h-1 bg-gray-200 rounded-full">
            <div className="h-1 bg-green-500 rounded-full w-1/3"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className="text-green-600 font-medium">Confirmed</div>
            <div className="text-gray-400">Processing</div>
            <div className="text-gray-400">Delivered</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {orderDetails.paymentType === "COD" && (
            <Button
              onClick={handleWhatsAppConfirmation}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Confirm on WhatsApp</span>
            </Button>
          )}

          <Button
            onClick={onReturnHome}
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-lg flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Button>
        </div>

        {orderDetails.paymentType === "UPI" && (
          <div className="mt-6 text-center text-green-600 font-medium">
            Your payment is confirmed. We &apos;ll process your order shortly!
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessView;