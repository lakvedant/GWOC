import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "api.qrserver.com", 
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  },
};

export default nextConfig;
