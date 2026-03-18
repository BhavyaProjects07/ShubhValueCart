/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // ❌ DISABLE TURBOPACK COMPLETELY
    },
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allow ALL external HTTPS images
      },
    ],
  },
};

export default nextConfig;