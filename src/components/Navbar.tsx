'use client'
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartSlider } from "./CartSlider";
import Link from "next/link";
import LoginSignupModal from "./Login";


export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between h-20"> {/* Increased height */}
          {/* Logo on the left */}
          <Link href="/">
            <div className="flex-shrink-0">
              <Image src="/logo.png" alt="logo" width={170} height={170} />
            </div>
          </Link>

          {/* Navigation links in the middle */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-gray-900 px-4 py-2 text-lg font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 px-4 py-2 text-lg font-medium">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-gray-900 px-4 py-2 text-lg font-medium">
                Services
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-4 py-2 text-lg font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Icons: Cart & Profile */}
          <div className="flex items-center space-x-4">
            {/* Profile Icon (Opens Login Modal) */}
            <button onClick={() => setIsLoginOpen(true)} className="text-gray-700 hover:text-gray-900">
              <User className="h-7 w-7" />
            </button>

            {/* Shopping Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-7 w-7 text-gray-700 hover:text-gray-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96">
                <SheetTitle>Cart</SheetTitle>
                <CartSlider />
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none">
              <svg className="h-7 w-7" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginOpen && <LoginSignupModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
};

export default Navbar;
