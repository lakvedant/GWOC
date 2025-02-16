// types/checkout.ts

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  message?: string;
  title: string;
}

export interface CheckoutState {
  name: string;
  phone: string;
  instructions: string;
  paymentType: PaymentType;
}

export type PaymentType = "COD" | "UPI";

export type OrderStatus = "Pending" | "Accepted" | "Ready" | "Picked" | "Declined";

export interface Order {
  orderID: number;
  userId: string;
  name: string;
  phone: string;
  instructions: string;
  upiImage?: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  amount: number;
  paymentType: PaymentType;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  total: number;
}

// Validation Types
export type ValidationErrors = {
  name?: string;
  phone?: string;
  instructions?: string;
  paymentType?: string;
}

// Component Props Types
export interface ContactFormProps {
  name: string;
  phone: string;
  instructions: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onInstructionsChange: (value: string) => void;
}

export interface PaymentFormProps {
  total: number;
  onPaymentComplete: (paymentType: PaymentType, upiImage?: string) => void;
}

export interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping?: number;
}

export interface PickupFormProps {
  onProceed: () => void;
  isLoading?: boolean;
}

// User related types
export interface UserInfo {
  userId: string;
  name: string;
  phone: string;
  email?: string;
}

// Cart Context Types
export interface CartContextType {
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  clearCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}