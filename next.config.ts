import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optional: For production deployment
  output: "standalone", // or 'export' for static sites
};

export default nextConfig;
