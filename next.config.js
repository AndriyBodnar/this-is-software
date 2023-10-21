/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
      },
      {
        protocol: "http",
        hostname: "openweathermap.org",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
