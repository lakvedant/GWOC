// types/checkout.ts

export interface CartItem {
  title: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant: string;
  message?: string;
}

export interface ShippingAddress {
  address: string
  society?: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface CheckoutState {
  shippingAddress: {
    address: string;
    apartment: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  saveInformation: boolean;
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