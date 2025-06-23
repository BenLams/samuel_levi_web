import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/submit-registration',
        destination: 'http://localhost:3000/api/submit-registration', // Adjust to your server URL
      },
    ];
  },
};