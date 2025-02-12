import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import { IoClose } from "react-icons/io5";

export default function LoginSignupModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const sendOtp = async () => {
    setError("");
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await fetch("/api/auth/sendOtp", {
        method: "POST",
        body: JSON.stringify({ phone }),
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();
      
      if (res.ok && response.data) {
        setVerificationId(response.data.verificationId);
        setStep("otp");
        setTimer(30);
      } else {
        setError(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const res = await fetch("/api/auth/verifyOtp", {
        method: "POST",
        body: JSON.stringify({ verificationId, otp }),
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();
      
      if (res.ok) {
        setStep("success");
        setTimeout(() => {
          onClose();
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        style: {
          borderRadius: '16px',
          padding: '0',
          margin: '16px',
          maxWidth: '400px'
        }
      }}
    >
      <div className="p-6 bg-white rounded-2xl relative">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-pink-600 transition-colors" 
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        {step === "phone" && (
          <>
            <h2 className="text-2xl font-semibold text-pink-600 text-center">
              Login / Sign Up! 👋
            </h2>
            <p className="text-gray-500 text-center mt-2">
              Enter your mobile number
            </p>
            <div className="mt-4 flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-pink-500 transition-colors">
              <span className="text-gray-700 font-medium">+91</span>
              <input
                type="text"
                placeholder="10 digit mobile number"
                className="ml-3 w-full outline-none bg-transparent text-black placeholder-gray-400"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              className={`w-full py-3 mt-4 text-lg font-medium text-white rounded-lg transition-all duration-200 ${
                phone.length === 10 
                  ? "bg-pink-500 hover:bg-pink-600" 
                  : "bg-pink-300 cursor-not-allowed"
              }`}
              onClick={sendOtp}
              disabled={phone.length !== 10}
            >
              Get OTP →
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-2xl font-semibold text-pink-600 text-center">
              OTP Verification
            </h2>
            <p className="text-gray-500 text-center mt-2">
              Enter the 6-digit OTP sent to +91 {phone}
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-3 text-black text-center focus:border-pink-500 outline-none transition-colors"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              className={`w-full py-3 mt-4 text-lg font-medium text-white rounded-lg transition-all duration-200 ${
                otp.length === 6 
                  ? "bg-pink-500 hover:bg-pink-600" 
                  : "bg-pink-300 cursor-not-allowed"
              }`}
              onClick={verifyOtp}
              disabled={otp.length !== 6}
            >
              Verify OTP →
            </button>
            {timer > 0 ? (
              <p className="text-gray-500 text-sm text-center mt-3">
                Resend OTP in {timer}s
              </p>
            ) : (
              <button
                className="w-full text-pink-500 hover:text-pink-600 text-sm mt-3 transition-colors"
                onClick={sendOtp}
              >
                Resend OTP
              </button>
            )}
          </>
        )}

        {step === "success" && (
          <div className="text-center py-6">
            <div className="mx-auto w-24 h-24 relative">
              <svg 
                className="w-full h-full" 
                viewBox="0 0 100 100"
              >
                <circle
                  className="text-green-50 stroke-2"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="none"
                  r="38"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-green-500 stroke-2"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="none"
                  r="38"
                  cx="50"
                  cy="50"
                  style={{
                    strokeDasharray: '240',
                    strokeDashoffset: '240',
                    animation: 'circle-draw 0.5s ease-out forwards',
                  }}
                />
                <path
                  className="text-green-500 stroke-2"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="none"
                  d="M28 50L45 67L72 40"
                  style={{
                    strokeDasharray: '100',
                    strokeDashoffset: '100',
                    animation: 'check-draw 0.5s ease-out 0.5s forwards',
                  }}
                />
              </svg>
            </div>
            <style jsx>{`
              @keyframes circle-draw {
                to {
                  stroke-dashoffset: 0;
                }
              }
              @keyframes check-draw {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
            <h2 className="text-2xl font-semibold text-green-500 mt-4">
              Login Successful!
            </h2>
            <p className="text-gray-500 mt-2">
              Redirecting you to dashboard...
            </p>
          </div>
        )}
      </div>
    </Dialog>
  );
}