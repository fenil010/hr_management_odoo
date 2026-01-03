import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    proxyResolution: true,
  },
};

export default nextConfig;
