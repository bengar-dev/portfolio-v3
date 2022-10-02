/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["i.imgur.com", "i.ibb.co"],
  },
};

module.exports = nextConfig;
