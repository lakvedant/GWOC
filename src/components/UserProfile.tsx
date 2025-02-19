import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogIn, LogOut } from "lucide-react";
import LoginSignupModal from "./Login";
import Link from "next/link";

interface UserInfo {
  name: string;
  email: string;
}

const UserDropdown = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  if (!userInfo) {
    return (
      <motion.div className="flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 hover:bg-pink-100 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <LogIn size={20} />
          <span>Login</span>
        </Button>

        <LoginSignupModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </motion.div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 hover:bg-pink-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <User size={20} />
          <span className="max-w-[100px] truncate">{userInfo.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent align="end" className="w-56 bg-pink-50 shadow-lg rounded-xl border">
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <DropdownMenuSeparator />

              <Link href="/dashboard">
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-pink-100 transition">
                  <User size={16} />
                  <span>Your Profile</span>
                </DropdownMenuItem>
              </Link>


              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="flex items-center gap-2 text-red-600 cursor-pointer hover:bg-red-50 transition"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default UserDropdown;
