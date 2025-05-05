/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['zustand'],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp']
  }
};

export default withNextIntl(nextConfig);
