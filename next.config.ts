import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/hakkimda', permanent: true },
      { source: '/projects/:slug*', destination: '/proje/:slug*', permanent: true },
    ];
  },
};

export default nextConfig;
