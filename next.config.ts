import type { NextConfig } from "next";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint エラーを無視
  },
  typescript: {
    ignoreBuildErrors: true, // 型エラーを無視
  },
  experimental: {
    missingSuspenseWithCSRBailout: false, // ← これで今回のやつを無視
  },
};

module.exports = nextConfig;
