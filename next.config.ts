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
      {
        // Uploaded project photos (Vercel Blob).
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
