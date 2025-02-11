import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";

export default function LoginSignupModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Mr");
  const [step, setStep] = useState<"phone" | "otp" | "details" | "success">("phone");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
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

    const res = await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) {
      setStep("otp");
      setTimer(30);
    } else {
      setError(data.message || "Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otp }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) {
      if (data.isNewUser) {
        setStep("details");
      } else {
        setStep("success");
        setTimeout(() => {
          onClose();
          window.location.href = "/dashboard"; // Redirect to dashboard
        }, 2000);
      }
    } else {
      setError(data.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <div className="p-6 bg-white rounded-2xl relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {step === "phone" && (
          <>
            <h2 className="text-2xl font-semibold text-black text-center">Login / Sign Up! 👋</h2>
            <p className="text-gray-500 text-center mt-2">Enter your mobile number</p>
            <div className="mt-4 flex items-center border border-gray-300 rounded-lg px-4 py-3">
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
              className={`w-full py-3 mt-4 text-lg font-medium text-white rounded-lg ${
                phone.length === 10 ? "bg-red-500" : "bg-red-300 cursor-not-allowed"
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
            <h2 className="text-2xl font-semibold text-black text-center">OTP Verification</h2>
            <p className="text-gray-500 text-center mt-2">Enter the 6-digit OTP sent to +91 {phone}</p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="mt-4 w-full border border-gray-300 rounded-lg px-4 py-3 text-black text-center"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              className={`w-full py-3 mt-4 text-lg font-medium text-white rounded-lg ${
                otp.length === 6 ? "bg-red-500" : "bg-red-300 cursor-not-allowed"
              }`}
              onClick={verifyOtp}
              disabled={otp.length !== 6}
            >
              Verify OTP →
            </button>
          </>
        )}

        {step === "success" && (
          <div className="text-center">
            <IoCheckmarkCircle size={80} className="text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold text-black mt-4">Logged In Successfully!</h2>
          </div>
        )}
      </div>
    </Dialog>
  );
}
