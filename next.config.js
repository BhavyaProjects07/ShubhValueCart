/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // keep disabled (stable builds)
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all external images
      },
    ],
  },

  async redirects() {
    return [
      // 🔥 FORCE NON-WWW → WWW (CRITICAL FOR SEO)
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "shubhavaluecart.in",
          },
        ],
        destination: "https://www.shubhavaluecart.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;