import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { IUser } from "@/models/User";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  phone: string;
  name: string;
  dob?: string;
  email: string;
  gender?: "Male" | "Female" | "Other";
}

interface UserSliderProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

export const EditUser: React.FC<UserSliderProps> = ({ user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState<User>({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    gender: user.gender,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleGenderChange = (value: "Male" | "Female" | "Other") => {
    setEditedUser({ ...editedUser, gender: value });
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <div className="flex flex-col h-full mt-8">
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <Input name="name" value={editedUser.name} onChange={handleChange} required />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <Input 
            name="email" 
            type="email" 
            value={editedUser.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Phone</label>
          <Input 
            name="phone" 
            type="tel" 
            value={editedUser.phone} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Date of Birth</label>
          <Input 
            name="dob" 
            type="date" 
            value={editedUser.dob} 
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Gender</label>
          <Select
            value={editedUser.gender}
            onValueChange={(value: "Male" | "Female" | "Other") => handleGenderChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="px-4 py-2 border-t">
          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};