"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Truck, Store } from "lucide-react"

export const DeliveryOptionForm = ({ 
  onProceed,
  defaultMethod = "delivery",
  deliveryFee = 5.99,
  isLoading = false
}: { 
  onProceed: (method: string) => void;
  defaultMethod?: "delivery" | "pickup";
  deliveryFee?: number;
  isLoading?: boolean;
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState(defaultMethod);

  const handleProceed = () => {
    onProceed(deliveryMethod);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select Delivery Option</h2>
      
      <RadioGroup
        defaultValue={defaultMethod}
        value={deliveryMethod}
        onValueChange={(value) => setDeliveryMethod(value as "delivery" | "pickup")}
        className="flex flex-col gap-6"
      >
        <Card
          className={`p-6 cursor-pointer transition-all duration-200 ${
            deliveryMethod === "delivery" 
              ? "ring-2 ring-primary ring-offset-2" 
              : "hover:shadow-lg"
          }`}
        >
          <label className="flex items-start gap-4 cursor-pointer">
            <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="w-6 h-6 text-primary" />
                <span className="text-xl font-medium">Home Delivery</span>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>Get your items delivered right to your doorstep</p>
                <p className="font-medium text-primary">
                  Delivery fee: ${deliveryFee.toFixed(2)}
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Contactless delivery available</li>
                </ul>
              </div>
            </div>
          </label>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all duration-200 ${
            deliveryMethod === "pickup" 
              ? "ring-2 ring-primary ring-offset-2" 
              : "hover:shadow-lg"
          }`}
        >
          <label className="flex items-start gap-4 cursor-pointer">
            <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Store className="w-6 h-6 text-primary" />
                <span className="text-xl font-medium">Pickup from Store</span>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>Pick up your items from our nearest store</p>
                <p className="font-medium text-green-600">Free pickup</p>
                <ul className="text-sm space-y-1">
                  <li>• Ready for pickup in 2 hours</li>
                </ul>
              </div>
            </div>
          </label>
        </Card>
      </RadioGroup>

      <Button 
        className="w-full mt-6" 
        onClick={handleProceed}
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? "Processing..." : "Proceed to Payment"}
      </Button>
    </div>
  );
};

export default DeliveryOptionForm;