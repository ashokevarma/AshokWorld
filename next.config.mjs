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
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration  
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
