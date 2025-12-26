import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
};

export default nextConfig;

