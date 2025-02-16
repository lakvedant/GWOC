"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, AlertCircle } from "lucide-react";
import { IUser } from "@/models/User";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddNewCustomerProps {
    onSave: (data: IUser) => void;
    onClose: () => void;
}

export default function AddNewCustomer({ onSave, onClose }: AddNewCustomerProps) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IUser>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            dob: "",
            gender: undefined,
            orders: [],
            products: [],
        },
    });

    // Watch gender field for controlled select component
    const currentGender = watch("gender");

    const onSubmit = async (data: IUser) => {
        setLoading(true);
        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const newUser = await response.json();
            
            // Reset form
            const fields = ['name', 'email', 'phone', 'dob', 'gender'];
            fields.forEach(field => setValue(field, ''));

            onSave(newUser);
        } catch (error) {
            console.error("Failed to create customer", error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
            <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                        type="text"
                        className="w-full"
                        placeholder="Enter customer name"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                        <Alert variant="destructive" className="py-2 px-3">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.name.message}</AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                        type="email"
                        className="w-full"
                        placeholder="customer@example.com"
                        {...register("email", { 
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                    />
                    {errors.email && (
                        <Alert variant="destructive" className="py-2 px-3">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.email.message}</AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                        type="tel"
                        className="w-full"
                        placeholder="Enter phone number"
                        {...register("phone", { 
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Please enter a valid 10-digit phone number"
                            }
                        })}
                    />
                    {errors.phone && (
                        <Alert variant="destructive" className="py-2 px-3">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errors.phone.message}</AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Date of Birth Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <Input
                        type="date"
                        className="w-full"
                        {...register("dob")}
                    />
                </div>

                {/* Gender Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Gender</label>
                    <Select
                        value={currentGender}
                        onValueChange={(value: "Male" | "Female" | "Other") => setValue("gender", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            <span>Creating Customer...</span>
                        </>
                    ) : (
                        "Add Customer"
                    )}
                </Button>
            </div>
        </form>
    );
}