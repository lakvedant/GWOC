import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import FileUpload from "@/components/Admin/FileUpload";
import { PaymentType } from "@/types/checkout";
import Image from "next/image";

interface PaymentFormProps {

  total: number;

  onPaymentComplete: (paymentType: PaymentType, upiImage?: string) => Promise<void>;

}

export function PaymentForm({ total, onPaymentComplete }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi">("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [paymentImage, setPaymentImage] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const upiId = "lakvedant-1@okhdfcbank";
  const payeeName = "Bindi Cupcakery";
  const transactionNote = "Payment for Order";

  useEffect(() => {
    if (paymentMethod === "upi") {
      setIsBlurred(true);
      const timer = setTimeout(() => setIsBlurred(false), 800);
      
      // Generate UPI URL
      const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${total}&tn=${encodeURIComponent(transactionNote)}&cu=INR`;
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
      setQrCodeUrl(qrApiUrl);

      return () => clearTimeout(timer);
    }
  }, [paymentMethod, total]);

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setPaymentImage(response.filePath);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
  
      if (paymentMethod === "upi" && !paymentImage) {
        throw new Error("Please upload payment screenshot");
      }
  
      // ✅ Convert payment method to match the expected enum values
      const formattedPaymentType: PaymentType = paymentMethod === "upi" ? "UPI" : "COD";
  
      await onPaymentComplete(formattedPaymentType, paymentImage);
    } catch (error) {
      console.error("Payment failed:", error);
      alert(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value: "cod" | "upi") => {
            setPaymentMethod(value);
            setPaymentImage("");
            setUploadProgress(0);
          }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 border p-4 rounded-lg">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex-1">
              <div className="flex flex-col">
                <span className="font-medium">Cash on Delivery</span>
                <span className="text-sm text-muted-foreground">Pay when you receive your order</span>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 border p-4 rounded-lg">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi" className="flex-1">
              <div className="flex flex-col">
                <span className="font-medium">UPI Payment</span>
                <span className="text-sm text-muted-foreground">Pay instantly using UPI</span>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === "upi" && (
        <div className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              {qrCodeUrl ? (
                <Image
                  fill
                  src={qrCodeUrl}
                  alt="UPI QR Code"
                  className={`w-full h-full transition-all duration-200 ${isBlurred ? "blur-sm scale-102" : "blur-0 scale-100"}`}
                />
              ) : (
                <p>Loading QR Code...</p>
              )}
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="font-medium">Scan QR code to pay ₹{total.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">or pay using UPI ID:</p>
            <p className="font-mono bg-muted p-2 rounded select-all">{upiId}</p>
          </div>
          
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Please complete the payment in your UPI app and upload the payment screenshot before confirming
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Screenshot</label>
                <FileUpload 
                  fileType="image" 
                  onSuccess={handleUploadSuccess} 
                  onProgress={handleUploadProgress} 
                />
                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Button
        className="w-full"
        onClick={handlePayment}
        disabled={isProcessing || (paymentMethod === "upi" && !paymentImage)}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </div>
        ) : paymentMethod === "cod" ? (
          "Place Order (Cash on Delivery)"
        ) : (
          "Confirm Payment"
        )}
      </Button>
    </div>
  );
}