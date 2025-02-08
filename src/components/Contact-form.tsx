import { useState } from "react";
import { TextField } from "@mui/material";

interface ContactFormProps {
  phone: string;
  onPhoneChange: (value: string) => void;
}

export function ContactForm({ phone, onPhoneChange }: ContactFormProps) {
  const [error, setError] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.startsWith("91")) {
      value = value.slice(2); // Remove extra "91" if mistakenly added
    }
    if (value.length <= 10) {
      onPhoneChange(value);
      setError(value.length !== 10); // Show error if not exactly 10 digits
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <TextField
        id="phone"
        label="Enter your mobile number"
        variant="outlined"
        type="tel"
        value={`+91 ${phone}`}
        onChange={handlePhoneChange}
        placeholder="10-digit mobile number"
        inputProps={{ maxLength: 14 }} // 10 digits + "+91 " prefix
        error={error}
        helperText={error ? "Please enter a valid 10-digit phone number" : ""}
        sx={{ width: "350px" }} // Reduced width
      />
    </div>
  );
}
