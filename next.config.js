/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.foursquare.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
