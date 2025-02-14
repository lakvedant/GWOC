import Image from "next/image";
import type { CartItem } from "@/types/checkout";
import { IKImage } from "imagekitio-next";

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount?: number;
  shipping?: number;
}

export function CartSummary({ items, subtotal, discount = 0, shipping = 0 }: CartSummaryProps) {
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className="relative h-16 w-16 overflow-hidden rounded bg-muted">
              <div className="absolute top-0 right-0 bg-background text-xs px-1 rounded-bl">
                {item.quantity}
              </div>
              {item.image ? (
                <IKImage
                  path={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({(discount * 100).toFixed(0)}%)</span>
            <span>-₹{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium text-base">
          <span>Total</span>
          <span className="flex items-center">
            <span className="text-sm text-muted-foreground mr-1"></span>
            <span>₹{total.toFixed(2)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
