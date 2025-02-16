"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Store } from "lucide-react"

export const PickupForm = ({ 
  onProceed,
  isLoading = false
}: { 
  onProceed: () => void;
  isLoading?: boolean;
}) => {
  const storeAddress = {
    street: "123 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    coordinates: "37.7937007,-122.3971633"  // Example coordinates
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Store Pickup Details</h2>
      
      <Card className="p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Store className="w-6 h-6 text-primary" />
              <span className="text-xl font-medium">Pickup Location</span>
            </div>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium">Store Address:</p>
              <address className="not-italic">
                {storeAddress.street}<br />
                {storeAddress.city}, {storeAddress.state} {storeAddress.zip}
              </address>
              <ul className="text-sm space-y-1 mt-4">
                <li>• Ready for pickup in 2 hours</li>
                <li>• Store hours: 9 AM - 9 PM daily</li>
                <li>• Please bring a valid ID for pickup</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-6 h-64 w-full rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full border-0"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${storeAddress.coordinates}`}
          allowFullScreen
        />
      </div>

      <Button 
        className="w-full" 
        onClick={onProceed}
        disabled={isLoading}
        size="lg"
      >
        {isLoading ? "Processing..." : "Proceed to Payment"}
      </Button>
    </div>
  );
};

export default PickupForm;