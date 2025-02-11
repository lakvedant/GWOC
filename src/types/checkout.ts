// types/checkout.ts

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  variant: string
  quantity: number
  title: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  society?: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface CheckoutState {
  email: string
  subscribeToNews: boolean
  shippingAddress: ShippingAddress
  saveInformation: boolean
  phone?: string
  deliveryMethod?: string
}

export interface OrderSummary {
  subtotal: number
  shipping?: number
  discount?: number
  total: number
}

export interface PaymentDetails {
  method: 'cod' | 'upi'
  status: 'pending' | 'completed' | 'failed'
  upiId?: string
  transactionId?: string
}

export interface Order {
  id: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  contact: {
    email: string
    phone: string
  }
  payment: PaymentDetails
  deliveryMethod: string
  orderSummary: OrderSummary
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
  updatedAt: string
}

export type DeliveryMethod = {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: string
}

export interface CheckoutFormData {
  email: string
  phone: string
  subscribeToNews: boolean
  shippingAddress: ShippingAddress
  deliveryMethod: string
  paymentMethod: 'cod' | 'upi'
  saveInformation: boolean
}

export type ValidationErrors = {
  [K in keyof CheckoutFormData]?: string
}

export interface CouponCode {
  code: string
  discountPercentage: number
  valid: boolean
}