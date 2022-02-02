module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  env: {
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  },
}
