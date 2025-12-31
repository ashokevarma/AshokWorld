/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure page extensions to include MDX
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Disable image optimization for Cloudflare (use Cloudflare Images instead)
  images: {
    unoptimized: true,
  },

  // Webpack configuration
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },

  // ESLint configuration
  eslint: {
    // Don't fail build on lint errors during development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },

  // TypeScript configuration
  typescript: {
    // Don't fail build on type errors during development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
