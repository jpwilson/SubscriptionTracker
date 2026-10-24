/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com', 'avatars.githubusercontent.com', 'cdn.brandfolder.io'],
  },
  async redirects() {
    return [
      {
        // Truebill was renamed Rocket Money in 2022, so a separate "vs Truebill"
        // page would be the same comparison under an old name. The URL was in
        // the old sitemap, so it redirects rather than 404s.
        source: '/vs-truebill',
        destination: '/vs-rocket-money',
        permanent: true,
      },
    ]
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