"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckoutNav } from "@/components/Checkout-nav"
import { ContactForm } from "@/components/Contact-form"
import { ShippingForm } from "@/components/Shipping-form"
import { CartSummary } from "@/components/Cart-Summary"
import { DeliveryOptionForm } from "@/components/Delivery-option"
import { PaymentForm } from "@/components/Payment-Form"
import { useRouter } from "next/navigation"
import type { CheckoutState, CartItem } from "../../types/checkout"

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
    country: "US",
  },
  saveInformation: false,
}

interface StoredCartData {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export default function CheckoutPage() {
  const router = useRouter()
  const [state, setState] = useState<CheckoutState>(initialState)
  const [phone, setPhone] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"information" | "shipping" | "delivery" | "payment">("information")
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [shipping, setShipping] = useState(0)
  const [discount, setDiscount] = useState(0)

  // Load cart data when component mounts
  useEffect(() => {
    const loadCartData = () => {
      const storedData = localStorage.getItem('cartData')
      if (storedData) {
        try {
          const parsedData: StoredCartData = JSON.parse(storedData)
          setCartItems(parsedData.items)
          setDiscount(parsedData.discount)
        } catch (error) {
          console.error('Failed to parse cart data:', error)
          router.push('/cart') // Redirect to cart if data is invalid
        }
      } else {
        router.push('/cart') // Redirect to cart if no data exists
      }
    }

    loadCartData()
  }, [router])

  const handleAddressChange = (field: keyof typeof state.shippingAddress, value: string) => {
    setState((prev) => ({ ...prev, shippingAddress: { ...prev.shippingAddress, [field]: value } }))
  }

  const handleSaveInfoChange = (saveInformation: boolean) => {
    setState((prev) => ({ ...prev, saveInformation }))
  }

  const handleSubscribeChange = (subscribeToNews: boolean) => {
    setState((prev) => ({ ...prev, subscribeToNews }))
  }

  const handleInformationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("delivery")
  }

  const handleDeliveryProceed = (method: string) => {
    setDeliveryMethod(method)
    setShipping(method === "express" ? 10 : 5)
    setStep("payment")
  }

  const handlePaymentComplete = async (paymentMethod: string) => {
    try {
      const orderData = {
        items: cartItems,
        subtotal,
        shipping,
        discount,
        total: total + shipping,
        paymentMethod,
        deliveryMethod,
        contact: {
          email,
          phone,
        },
        shippingAddress: state.shippingAddress,
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Clear cart data after successful order
      localStorage.removeItem('cartData')
      
      // Redirect to success page
      router.push('/checkout/success')
    } catch (error) {
      console.error('Failed to create order:', error)
    }
  }

  // Calculate totals based on cart items state
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount
  
  // If no items in cart, redirect to cart page
  if (cartItems.length === 0) {
    return null // Return null while redirecting
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
                  phone={phone}
                  onPhoneChange={setPhone}
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
                  total={total + shipping}
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
              discount={discountAmount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}