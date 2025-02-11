import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface CheckoutNavProps {

  currentStep: "information" | "shipping" | "delivery" | "payment"

}

export function CheckoutNav({ currentStep }: CheckoutNavProps) {
  const steps = ["information", "delivery", "payment"]
  const currentIndex = steps.indexOf(currentStep)

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
          <Link
            href={`/checkout/${step}`}
            className={`capitalize ${currentIndex === index ? "text-primary font-medium" : ""}`}
          >
            {step}
          </Link>
        </div>
      ))}
    </nav>
  )
}

