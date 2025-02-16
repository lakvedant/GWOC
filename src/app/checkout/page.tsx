"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutNav } from "@/components/Checkout-nav";
import { CartSummary } from "@/components/Cart-Summary";
import { PickupForm } from "@/components/Delivery-option";
import { PaymentForm } from "@/components/Payment-Form";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import type { CheckoutState, PaymentType } from "@/types/checkout";
import BillingForm from "@/components/Billing-form";

const initialState: CheckoutState = {
  name: "",
  phone: "",
  instructions: "",
  paymentType: "COD",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, discount, userInfo, clearCart, isAuthenticated } = useCart();
  const [state, setState] = useState<CheckoutState>(initialState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [step, setStep] = useState<"information" | "pickup" | "payment">("information");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    if (!cartItems || cartItems.length === 0) {
      router.push("/");
      return;
    }
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  }, [cartItems, router, isAuthenticated]);

  useEffect(() => {
    if (userInfo) {
      setState((prev) => ({
        ...prev,
        name: userInfo.name || "",
        phone: userInfo.phone || "",
      }));
    }
  }, [userInfo]);

  const handleContactChange = (field: keyof CheckoutState, value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInformationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("pickup");
  };

  const handlePickupProceed = () => {
    setStep("payment");
  };

  const handlePaymentComplete = async (paymentType: PaymentType, upiImage?: string) => {
  if (!userInfo?.userId) {
    console.error("🚨 Missing userId in order submission");
    return alert("User information is missing. Please log in again.");
  }

  if (paymentType === "UPI" && !upiImage) {
    console.error("🚨 UPI payment selected, but no image uploaded.");
    return alert("Please upload a screenshot of your UPI payment before proceeding.");
  }

  try {
    const orderResponse = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userInfo.userId,
        name: state.name,
        phone: state.phone,
        instructions: state.instructions,
        upiImage,
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        amount: subtotal * (1 - discount),
        paymentType, // ✅ Use correct payment type
        orderStatus: "Pending",
      }),
    });

    if (!orderResponse.ok) {
      const error = await orderResponse.json();
      throw new Error(error.message || "Order creation failed");
    }

    clearCart();
    router.push("/checkout/success");
  } catch (error) {
    console.error("🚨 Order creation failed:", error);
    alert(error instanceof Error ? error.message : "Failed to create order.");
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black py-20 px-4 md:px-40">
        <div className="max-w-7xl mx-auto py-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div>
              <CheckoutNav currentStep={step} />
              {step === "information" ? (
                <form onSubmit={handleInformationSubmit} className="space-y-8 mt-6">
                  <BillingForm
                    name={state.name}
                    phone={state.phone}
                    instructions={state.instructions}
                    onNameChange={(value: string) => handleContactChange("name", value)}
                    onPhoneChange={(value: string) => handleContactChange("phone", value)}
                    onInstructionsChange={(value: string) => handleContactChange("instructions", value)}
                  />
                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Continue to Pickup Details
                  </Button>
                </form>
              ) : step === "pickup" ? (
                <div className="mt-6">
                  <PickupForm onProceed={handlePickupProceed} isLoading={isLoading} />
                </div>
              ) : (
                <div className="mt-6">
                  <PaymentForm total={subtotal * (1 - discount)} onPaymentComplete={handlePaymentComplete} />
                </div>
              )}
            </div>
            <div className="lg:pl-8 lg:border-l border-border">
              <CartSummary items={cartItems} subtotal={subtotal} discount={discount} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
