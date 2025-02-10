import Image from "next/image"
import type { CartItem } from "@/types/checkout"

interface CartSummaryProps {
  items: CartItem[]
  subtotal: number
  shipping?: number
}

export function CartSummary({ items, subtotal, shipping }: CartSummaryProps) {
  const total = subtotal + (shipping || 0)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded bg-muted">
              <div className="absolute top-0 right-0 bg-background text-xs px-1 rounded-bl">1</div>
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.variant}</p>
            </div>
            <p className="font-medium">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping ? `$${shipping.toFixed(2)}` : "Calculated at next step"}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span className="flex items-center">
            <span className="text-sm text-muted-foreground mr-1">USD</span>
            <span>${total.toFixed(2)}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

