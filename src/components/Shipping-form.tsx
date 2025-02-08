import { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Autocomplete, CircularProgress } from "@mui/material";
import type { ShippingAddress } from "@/types/checkout";

interface ShippingFormProps {
  address: ShippingAddress;
  saveInformation: boolean;
  onAddressChange: (field: keyof ShippingAddress, value: string) => void;
  onSaveInfoChange: (checked: boolean) => void;
}

export function ShippingForm({ address, saveInformation, onAddressChange, onSaveInfoChange }: ShippingFormProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ label: string; value: string; details?: any }[]>([]);
  const [loading, setLoading] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Fetch address suggestions, limited to Gujarat
  const fetchAddressSuggestions = async (searchTerm: string) => {
    if (!searchTerm) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}&countrycodes=IN&bounded=1&viewbox=68.0,24.0,74.5,21.0&addressdetails=1`
      );
      const data = await response.json();

      const results = data
        .filter((item: any) => item.address.state === "Gujarat")
        .map((item: any) => ({
          label: item.display_name,
          value: item.display_name,
          details: item.address,
        }));

      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle selection of address and auto-fill details
  const handleAddressSelect = (selectedValue: any) => {
    if (!selectedValue) return;

    const { value, details } = selectedValue;
    setQuery(value);
    onAddressChange("address", value);

    if (details) {
      console.log("Selected Address Details:", details); // Debugging line

      const city = details.city || details.town || details.village || details.state_district || "";
      const pinCode = details.postcode || "";
      
      onAddressChange("city", city);
      onAddressChange("state", "Gujarat");
      onAddressChange("zipCode", pinCode);
      setPinError(pinCode.length !== 6);
    }

    setSuggestions([]);
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    onAddressChange("zipCode", value);
    setPinError(value.length !== 6);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Shipping Address</h2>
      <div className="space-y-4">
        {/* Address Autocomplete with Gujarat restriction */}
        <Autocomplete
          freeSolo
          options={suggestions}
          getOptionLabel={(option) => typeof option === "string" ? option : option.label}
          onInputChange={(_, value) => {
            setQuery(value);
            fetchAddressSuggestions(value);
          }}
          onChange={(_, value) => value && handleAddressSelect(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Street Address"
              variant="outlined"
              value={query}
              fullWidth
              sx={{ backgroundColor: "white" }}
              InputProps={{
                ...params.InputProps,
                endAdornment: loading ? <CircularProgress size={20} /> : null,
              }}
            />
          )}
        />

        {/* House/Floor No & Society Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            id="houseNo"
            label="House/Floor No."
            variant="outlined"
            value={address.apartment}
            onChange={(e) => onAddressChange("apartment", e.target.value)}
            fullWidth
            sx={{ backgroundColor: "white" }}
          />
          <TextField
            id="society"
            label="Society Name"
            variant="outlined"
            value={address.society || ""}
            onChange={(e) => onAddressChange("society", e.target.value)}
            fullWidth
            sx={{ backgroundColor: "white" }}
          />
        </div>

        {/* City & State (Auto-filled) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            id="city"
            label="City"
            variant="outlined"
            value={address.city}
            onChange={(e) => onAddressChange("city", e.target.value)}
            fullWidth
            sx={{ backgroundColor: "white" }}
          />

          {/* State is fixed to Gujarat */}
          <TextField
            id="state"
            label="State"
            variant="outlined"
            value="Gujarat"
            fullWidth
            disabled
            sx={{ backgroundColor: "white" }}
          />
        </div>

        {/* PIN Code & Save Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 max-w-[647px]">
          <TextField
            id="zipCode"
            label="PIN Code"
            variant="outlined"
            value={address.zipCode}
            onChange={handlePinChange}
            placeholder="6-digit PIN code"
            sx={{ backgroundColor: "white", flex: "1 1 auto" }}
            error={pinError}
            helperText={pinError ? "Enter a valid 6-digit PIN code" : ""}
          />
          <FormControlLabel
            control={<Checkbox checked={saveInformation} onChange={(e) => onSaveInfoChange(e.target.checked)} />}
            label="Save this information for next time"
          />
        </div>
      </div>
    </div>
  );
}
