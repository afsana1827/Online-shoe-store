/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "freepngimg.com",
      "lh3.googleusercontent.com",
      "fhyf-demo.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
