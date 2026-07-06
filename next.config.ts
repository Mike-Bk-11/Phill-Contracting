import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow remote placeholder images used in the starter content.
    // TODO: Replace with your own image domains / assets.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
