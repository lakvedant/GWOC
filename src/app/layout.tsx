// layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/CartProvider"
import { Cormorant_Garamond, Italiana, Montserrat } from "next/font/google"
import ImagekitProviders from "@/components/Admin/Imagekit-Providers"
import LoadingWrapper from "@/components/LoaderWrapper" // Adjust import path

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bindi's Cupcakery",
  description: "crafting sweet moments since 2015",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} ${italiana.variable} ${montserrat.variable} ${dancingScript.variable} antialiased`}
      >
        <LoadingWrapper>
          <ImagekitProviders>
            <CartProvider>{children}</CartProvider>
          </ImagekitProviders>
        </LoadingWrapper>
      </body>
    </html>
  )
}