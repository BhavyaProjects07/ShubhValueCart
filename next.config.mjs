/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
      {
        source: "/shop",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
      {
        source: "/about",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
      {
        source: "/product/:path*",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "X-Robots-Tag", value: "index, follow" }],
      },
    ];
  },

  async redirects() {
    return [
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
