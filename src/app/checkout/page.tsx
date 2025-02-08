"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckoutNav } from "@/components/Checkout-nav"
import { ContactForm } from "@/components/Contact-form"
import { ShippingForm } from "@/components/Shipping-form"
import { CartSummary } from "@/components/Cart-Summary"
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

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Acme Circles T-Shirt",
    price: 15.0,
    image: "/placeholder.svg?height=64&width=64",
    variant: "Black / S",
  },
]

export default function CheckoutPage() {
  const [state, setState] = useState<CheckoutState>(initialState)
  const [phone, setPhone] = useState("");


  const handleAddressChange = (field: keyof typeof state.shippingAddress, value: string) => {
    setState((prev) => ({ ...prev, shippingAddress: { ...prev.shippingAddress, [field]: value } }))
  }

  const handleSaveInfoChange = (saveInformation: boolean) => {
    setState((prev) => ({ ...prev, saveInformation }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", state)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-white text-black px-40">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <CheckoutNav currentStep="information" />
            <ContactForm phone={phone} onPhoneChange={setPhone} />
            <ShippingForm
              address={state.shippingAddress}
              saveInformation={state.saveInformation}
              onAddressChange={handleAddressChange}
              onSaveInfoChange={handleSaveInfoChange}
            />
            <Button type="submit" size="lg" className="w-full md:w-auto">
              Continue to shipping
            </Button>
          </form>
          <div className="lg:pl-8 lg:border-l border-border">
            <CartSummary items={cartItems} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  )
}
