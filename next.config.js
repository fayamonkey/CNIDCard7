/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Output static exports for GitHub Pages if needed
  // output: process.env.EXPORT_MODE === 'static' ? 'export' : undefined,
}

module.exports = nextConfig 