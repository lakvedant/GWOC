"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ContactFormProps {
  name: string;
  phone: string;
  instructions: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onInstructionsChange: (value: string) => void;
}

export function ContactForm({
  name,
  phone,
  instructions,
  onNameChange,
  onPhoneChange,
  onInstructionsChange,
}: ContactFormProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructions">Special Instructions</Label>
          <Textarea
            id="instructions"
            placeholder="Add any special instructions for your order..."
            value={instructions}
            onChange={(e) => onInstructionsChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to receive updates about my order via SMS
          </label>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContactForm;