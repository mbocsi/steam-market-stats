/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.steamcommunity.com", "cdn.akamai.steamstatic.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://steamcommunity.com/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
