import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false, // Nonaktifkan indikator "Static route"
  },
};

export default nextConfig;
