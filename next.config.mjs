/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages (no worker size limits!)
  output: 'export',
  
  // Configure page extensions to include MDX
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Disable trailing slash for cleaner URLs
  trailingSlash: false,

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
