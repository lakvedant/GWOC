import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-pink-50 to-pink-100 text-gray-700 pt-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
              Bindi&apos;s Cupcakery
            </h2>
            <p className="text-lg italic text-pink-500">Experience Bliss in Every Bite!</p>
            <p className="text-gray-600 leading-relaxed">
              We&apos;re known for our delicious eggless, vegetarian treats! From
              custom cakes and cupcakes to brownies and more, we&apos;ve got the
              perfect treat for every occasion.
            </p>
          </div>

          {/* Our Menu */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-pink-600">Our Menu</h3>
            <ul className="space-y-3 list-none">
              {["Cake Flavours", "Brownie", "Fudge", "Many More...."].map((item) => (
                <ul key={item} className="list-none">
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center space-x-2 list-none"
                  >
                    <span className="h-1 w-1 bg-pink-400 rounded-full"></span>
                    <span>{item}</span>
                  </Link>
                </ul>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-pink-600">Contact Us</h3>
            <div className="space-y-3 -ml-7">
              <div className="flex items-start space-x-3 ">
                <FaMapMarkerAlt className="text-pink-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  Kuber Plaza, 3rd Floor, Block-C, Acharya Niketan, Near Bansal Sweets,
                  Mayur Vihar Phase-1, Delhi, Pin Code - 110091
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-pink-500" />
                <p className="text-gray-600">+91 9876543210</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-pink-500" />
                <p className="text-gray-600">bindicupcakes@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Stay Connected - QR Code Only */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold justify-center text-center text-pink-600 items-end">Stay Connected</h3>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Image
                    src="/qrcodeWhatsapp1.png"
                    alt="QR Code"
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                </div>
                <p className="text-center text-sm mt-4 text-gray-600 font-medium">
                  Scan to connect on WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="relative mt-16 mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-pink-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-pink-50 px-4 text-pink-500">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Footer Bottom with Social Media */}
        <div className="mt-8 space-y-6 text-center">
          {/* Social Media Icons */}
          <div className="flex justify-center items-center space-x-8">
            {[
              { Icon: FaInstagram, label: "Instagram", color: "hover:text-pink-600", href: "https://www.instagram.com/bindis_cupcakery" },
              { Icon: FaFacebook, label: "Facebook", color: "hover:text-blue-600", href: "https://www.facebook.com/bindi.malji/" },
              // { Icon: FaTwitter, label: "Twitter", color: "hover:text-sky-500" },
              // { Icon: FaWhatsapp, label: "WhatsApp", color: "hover:text-green-500" },
              { Icon: FaEnvelope, label: "Email", color: "hover:text-red-500", href: "mailto:mjgandhi2305@gmail.com" },
            ].map(({ Icon, label, color, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className={`text-gray-500 ${color} transform hover:scale-110 transition-all duration-300`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Bindi&apos;s Cupcakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}