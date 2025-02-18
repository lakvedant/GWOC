import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['source.unsplash.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
  // Add async redirects to ensure proper routing
  async redirects() {
    return [];
  },
  // Make sure there are no unintended rewrites
  async rewrites() {
    return [];
  },
};

export default nextConfig;