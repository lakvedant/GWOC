import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  /* config options here */
  images: {
    domains: ['source.unsplash.com',  "api.qrserver.com", 
    ],
    
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