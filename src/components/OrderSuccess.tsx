"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cake, GiftIcon, CheckCircle, Phone, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    totalAmount: 0,
    paymentType: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    // Launch confetti animation when page loads
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const runConfetti = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff718d', '#fdbb2d'],
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff718d', '#fdbb2d'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };

    runConfetti();

    // Try to get order details from URL or local storage
    const id = searchParams.get("orderId") || localStorage.getItem("lastOrderId") || "ORD" + Math.floor(100000 + Math.random() * 900000);
    const amount = parseFloat(searchParams.get("amount") || localStorage.getItem("lastOrderAmount") || "0");
    const payment = searchParams.get("paymentType") || localStorage.getItem("lastOrderPaymentType") || "COD";
    const customerName = searchParams.get("name") || localStorage.getItem("lastOrderName") || "Customer";
    const customerPhone = searchParams.get("phone") || localStorage.getItem("lastOrderPhone") || "";

    setOrderDetails({
      orderId: id,
      totalAmount: amount,
      paymentType: payment,
      name: customerName,
      phone: customerPhone,
    });

    // Store for potential refreshes
    localStorage.setItem("lastOrderId", id);
    localStorage.setItem("lastOrderAmount", amount.toString());
    localStorage.setItem("lastOrderPaymentType", payment);
    localStorage.setItem("lastOrderName", customerName);
    localStorage.setItem("lastOrderPhone", customerPhone);

  }, [searchParams]);

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hello! I've placed an order #${orderDetails.orderId} for ₹${orderDetails.totalAmount.toFixed(2)}. Please confirm my order. Thank you!`
    );
    return `https://wa.me/919898058074?text=${message}`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black py-20 px-4 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto py-8 flex flex-col items-center">
          {/* Success Message with Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center mb-8"
          >
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative z-10"
              >
                <CheckCircle size={80} className="text-green-500" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                transition={{ delay: 0.6, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                <div className="absolute w-20 h-20 bg-green-100 rounded-full opacity-50"></div>
              </motion.div>
            </div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl font-bold text-green-600 mb-2"
            >
              Order Placed Successfully!
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg text-gray-600 max-w-md"
            >
              Thank you for your order. We've received your request and are preparing it with care!
            </motion.p>
          </motion.div>

          {/* Animated Cake */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-12"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 3, 0, -3, 0] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="relative w-40 h-40">
                <Image
                  src="/images/cake-success.png" 
                  alt="Cake"
                  width={160}
                  height={160}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback if image not found
                    e.currentTarget.style.display = 'none';
                    const fallbackCake = document.getElementById('fallbackCake');
                    if (fallbackCake) {
                      fallbackCake.style.display = 'block';
                    }
                  }}
                />
                <div id="fallbackCake" style={{display: 'none'}} className="flex items-center justify-center w-full h-full">
                  <Cake size={100} className="text-pink-400" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-8"
          >
            <div className="px-6 py-8">
              <h2 className="text-2xl font-semibold border-b pb-4 mb-4 flex items-center">
                <GiftIcon className="mr-2 text-pink-500" size={24} />
                Order Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">{orderDetails.orderId}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Name:</span>
                  <span className="font-medium">{orderDetails.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₹{orderDetails.totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className={`font-medium ${orderDetails.paymentType === 'UPI' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {orderDetails.paymentType}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-blue-600">
                    {orderDetails.paymentType === 'UPI' ? 'Payment Successful, Preparing Order' : 'Awaiting Confirmation'}
                  </span>
                </div>
              </div>
            </div>

            {/* Different message based on payment type */}
            <div className={`p-4 ${orderDetails.paymentType === 'UPI' ? 'bg-green-50' : 'bg-amber-50'}`}>
              <p className="text-sm">
                {orderDetails.paymentType === 'UPI' 
                  ? "Your payment has been successfully processed. We're preparing your order now!" 
                  : "Your COD order has been received. We'll confirm it shortly!"}
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
          >
            {orderDetails.paymentType === 'COD' && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white p-6 h-auto flex items-center justify-center gap-2 rounded-xl">
                    <Phone size={20} />
                    <span className="text-lg">Confirm via WhatsApp</span>
                  </Button>
                </a>
              </motion.div>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link href="/" passHref>
                <Button variant="outline" className="w-full border-2 p-6 h-auto flex items-center justify-center gap-2 rounded-xl">
                  <ArrowLeft size={20} />
                  <span className="text-lg">Back to Home</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}