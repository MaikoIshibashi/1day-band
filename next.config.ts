// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 ESLintエラー無視！
  },
  typescript: {
    ignoreBuildErrors: true, // 👈 型エラーも無視！
  },
};

module.exports = nextConfig;