"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cake, GiftIcon, CheckCircle, Phone, ArrowLeft, ChevronLeft } from "lucide-react";
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
  const [confettiComplete, setConfettiComplete] = useState(false);

  useEffect(() => {
    // Launch confetti animation when page loads
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const runConfetti = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff718d', '#fdbb2d', '#ffb7c5'],
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff718d', '#fdbb2d', '#ffb7c5'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      } else {
        setConfettiComplete(true);
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
      `Hello! I've placed order #${orderDetails.orderId} for ₹${orderDetails.totalAmount.toFixed(2)}. Please confirm my ${orderDetails.paymentType === 'COD' ? 'Cash on Delivery' : 'UPI'} order. Thank you!`
    );
    return `https://wa.me/919898058074?text=${message}`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 text-black py-16 px-4 md:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto py-8 flex flex-col items-center relative"
        >
          
          {/* Success Message with Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative z-10"
              >
                <CheckCircle size={90} className="text-green-500" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 0.6, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                <div className="absolute w-24 h-24 bg-green-100 rounded-full opacity-50"></div>
              </motion.div>
            </div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 mb-3"
            >
              Order Placed Successfully!
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg text-gray-600 max-w-md"
            >
              Thank you for your order. We're preparing it with love and care!
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
                rotate: [0, 2, 0, -2, 0] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="relative w-48 h-48">
                <Image
                  src="/images/cake-success.png" 
                  alt="Cake"
                  width={180}
                  height={180}
                  className="object-contain drop-shadow-xl"
                  onError={(e) => {
                    // Fallback if image not found
                    e.currentTarget.style.display = 'none';
                    const fallbackCake = document.getElementById('fallbackCake');
                    if (fallbackCake) {
                      fallbackCake.style.display = 'flex';
                    }
                  }}
                />
                <div id="fallbackCake" style={{display: 'none'}} className="items-center justify-center w-full h-full">
                  <Cake size={120} className="text-pink-400 drop-shadow-lg" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="w-full max-w-2xl bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden mb-10"
          >
            <div className="px-8 py-8">
              <h2 className="text-2xl font-semibold border-b pb-4 mb-6 flex items-center">
                <GiftIcon className="mr-3 text-pink-500" size={24} />
                Order Details
              </h2>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Order Number:</span>
                  <span className="font-semibold text-gray-900">{orderDetails.orderId}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Customer Name:</span>
                  <span className="font-semibold text-gray-900">{orderDetails.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Amount:</span>
                  <span className="font-semibold text-gray-900">₹{orderDetails.totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Payment Method:</span>
                  <span className={`font-semibold ${orderDetails.paymentType === 'UPI' ? 'text-green-600' : 'text-amber-600'}`}>
                    {orderDetails.paymentType}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span className={`font-semibold ${orderDetails.paymentType === 'UPI' ? 'text-green-600' : 'text-blue-600'}`}>
                    {orderDetails.paymentType === 'UPI' ? 'Payment Successful, Preparing Order' : 'Awaiting Confirmation'}
                  </span>
                </div>
              </div>
            </div>

            {/* Different message based on payment type */}
            <div className={`p-5 ${orderDetails.paymentType === 'UPI' ? 'bg-green-50' : 'bg-amber-50'}`}>
              <p className="text-sm">
                {orderDetails.paymentType === 'UPI' 
                  ? "Your payment has been successfully processed. We'll start preparing your delicious order right away!" 
                  : "Your Cash on Delivery order has been received. Click the button below to confirm via WhatsApp."}
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 w-full max-w-2xl"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white p-6 h-auto flex items-center justify-center gap-2 rounded-xl shadow-md">
                  <Phone size={20} />
                  <span className="text-lg">Chat with us on WhatsApp</span>
                </Button>
              </a>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Link href="/" passHref>
                <Button variant="outline" className="w-full border-2 p-6 h-auto flex items-center justify-center gap-2 rounded-xl shadow-sm hover:bg-gray-50">
                  <ArrowLeft size={20} />
                  <span className="text-lg">Continue Shopping</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Celebration fade-in message */}
          {confettiComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-10 text-center text-gray-500 italic"
            >
              We'll start baking your order right away! 🎂✨
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
}