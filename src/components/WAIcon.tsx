"use client";

import { Button as BaseButton } from "@/components/ui/button";
import Image from "next/image";

const WHATSAPP_NUMBER = "919898058074";
const MESSAGE = encodeURIComponent("Hey! I want to know more");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

export default function WhatsAppChat() {
  return (
    <BaseButton
    onClick={() => window.open(WHATSAPP_URL, "_blank")}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-110 z-50"
      aria-label="Open WhatsApp chat"
    >
      <Image src="/waicon.png" alt="WhatsApp chat" width={50} height={50} />
    </BaseButton>
  );
}
