'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaXTwitter, FaPinterest } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-8 border-t">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section - Logo & Socials */}
        <div>
          <h2 className="text-3xl font-bold text-red-600 flex items-center">
            bakingo<span className="text-sm">🍒</span>
          </h2>
          <p className="text-sm mt-2">© 2025</p>
          <p className="mt-3">Show us some love ❤️ & connect with us!</p>
          <div className="flex space-x-3 mt-2 text-xl text-gray-600">
            <Link href="#"><FaInstagram className="hover:text-red-600" /></Link>
            <Link href="#"><FaFacebook className="hover:text-blue-600" /></Link>
            <Link href="#"><FaYoutube className="hover:text-red-600" /></Link>
            <Link href="#"><FaLinkedin className="hover:text-blue-600" /></Link>
            <Link href="#"><FaXTwitter className="hover:text-black" /></Link>
            <Link href="#"><FaPinterest className="hover:text-red-600" /></Link>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div>
          <h3 className="font-semibold text-lg">Know Us</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li><Link href="#">Our Story</Link></li>
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Locate Us</Link></li>
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Media</Link></li>
            <li><Link href="#">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Need Help</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Cancellation and Refund</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms and Conditions</Link></li>
            <li><Link href="#">Customer Grievance</Link></li>
            <li><Link href="#">Sitemap</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">More Info</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li><Link href="#">Corporate Cakes</Link></li>
            <li><Link href="#">Coupons & Offers</Link></li>
            <li><Link href="#">Franchise</Link></li>
            <li><Link href="#">Download App</Link></li>
          </ul>
        </div>
      </div>

      {/* App Download Section */}
      <div className="mt-8 text-center">
        <h3 className="font-semibold text-lg">Experience Bakingo App On Mobile</h3>
        <div className="flex justify-center items-center mt-3 space-x-4">
          <Image src="/qr-code.png" alt="QR Code" width={80} height={80} />
          <div className="flex flex-col space-y-2">
            <Link href="#"><Image src="/google-play.png" alt="Google Play" width={140} height={40} /></Link>
            <Link href="#"><Image src="/app-store.png" alt="App Store" width={140} height={40} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
