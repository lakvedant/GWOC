export interface CartItem {
    id: number
    name: string
    price: number
    image: string
    variant: string
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
  }
  
  