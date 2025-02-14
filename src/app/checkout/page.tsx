"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckoutNav } from "@/components/Checkout-nav";
import { ContactForm } from "@/components/Contact-form";
import { ShippingForm } from "@/components/Shipping-form";
import { CartSummary } from "@/components/Cart-Summary";
import { DeliveryOptionForm } from "@/components/Delivery-option";
import { PaymentForm } from "@/components/Payment-Form";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import type { CheckoutState, ShippingAddress } from "@/types/checkout";
import LoginSignupModal from "@/components/Login";

const initialState: CheckoutState = {
  email: "",
  subscribeToNews: false,
  shippingAddress: {
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  },
  saveInformation: false,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, discount, userInfo, clearCart, isAuthenticated } = useCart();
  const [state, setState] = useState<CheckoutState>(initialState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [step, setStep] = useState<"information" | "shipping" | "delivery" | "payment">("information");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [shipping, setShipping] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    if (!cartItems || cartItems.length === 0) {
      router.push('/checkout');
      return;
    }

    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  }, [cartItems, router, isAuthenticated]);

  useEffect(() => {
    if (userInfo) {
      setState(prev => ({
        ...prev,
        email: userInfo.email || "",
        shippingAddress: {
          ...prev.shippingAddress,
          firstName: userInfo.name.split(' ')[0] || "",
          lastName: userInfo.name.split(' ').slice(1).join(' ') || "",
        }
      }));
    }
  }, [userInfo]);

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setState(prevState => ({
      ...prevState,
      shippingAddress: {
        ...prevState.shippingAddress,
        [field]: value
      }
    }));
  };

  const handleSaveInfoChange = (saveInformation: boolean) => {
    setState((prev) => ({ ...prev, saveInformation }));
  };

  const handleInformationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("delivery");
  };

  const handleDeliveryProceed = (method: string) => {
    setDeliveryMethod(method);
    setShipping(method === "express" ? 10 : 5);
    setStep("payment");
  };

  const handlePaymentComplete = async (paymentMethod: string) => {
    try {
      const addressData = {
        address: state.shippingAddress.address,
        apartment: state.shippingAddress.apartment,
        city: state.shippingAddress.city,
        state: state.shippingAddress.state,
        zipCode: state.shippingAddress.zipCode,
      };
  
      const orderData = {
        userId: userInfo?.userId,
        address: addressData,
        phone: userInfo?.phone,
        products: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        amount: subtotal * (1 - discount) + shipping,
        deliveryType: deliveryMethod,
        paymentType: paymentMethod.toUpperCase() === 'COD' ? 'COD' : 'UPI',
        orderStatus: 'Accepted'
      };
  
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }
  
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black px-4 md:px-40 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 md:px-40">
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div>
            <CheckoutNav currentStep={step} />
            
            {step === "information" ? (
              <form onSubmit={handleInformationSubmit} className="space-y-8 mt-6">
                <ContactForm 
                  phone={userInfo?.phone || ""}
                  onPhoneChange={() => {}} // Phone is managed by userInfo now
                />
                <ShippingForm
                  address={state.shippingAddress}
                  saveInformation={state.saveInformation}
                  onAddressChange={handleAddressChange}
                  onSaveInfoChange={handleSaveInfoChange}
                />
                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Continue to Delivery Options
                </Button>
              </form>
            ) : step === "delivery" ? (
              <div className="mt-6">
                <DeliveryOptionForm onProceed={handleDeliveryProceed} />
              </div>
            ) : (
              <div className="mt-6">
                <PaymentForm 
                  total={subtotal * (1 - discount) + shipping}
                  onPaymentComplete={handlePaymentComplete}
                />
              </div>
            )}
          </div>

          <div className="lg:pl-8 lg:border-l border-border">
            <CartSummary 
              items={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
            />
          </div>
        </div>
      </div>

    </div>
  );
}