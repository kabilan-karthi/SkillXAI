// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable browser + server source maps (mainly affects prod)
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },

  // Your existing image config
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;
