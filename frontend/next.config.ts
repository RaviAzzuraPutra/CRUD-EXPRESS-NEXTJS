import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
})

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false, // Nonaktifkan indikator "Static route"
  },
};

export default withPWA(nextConfig);
