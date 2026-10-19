/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com', 'avatars.githubusercontent.com', 'cdn.brandfolder.io'],
  },
  webpack: (config, { isServer }) => {
    // Exclude mcp-server directory from compilation
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/mcp-server/**', '**/node_modules/**'],
    }
    return config
  },
}

module.exports = nextConfig