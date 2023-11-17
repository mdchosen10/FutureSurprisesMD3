/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    GOOGLE_PLACES_API_KEY:
      process.env.GOOGLE_PLACES_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET_ID:
      process.env.GOOGLE_CLIENT_SECRET_ID,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET:
      process.env.FACEBOOK_CLIENT_SECRET,
    CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
    CHATGPT_MODEL: process.env.CHATGPT_MODEL,
    STRIPE_PUBLISHABLE_KEY:
      process.env.STRIPE_PUBLISHABLE_KEY,
  },
  // output: "export",
  images: { unoptimized: true },
  reactStrictMode: false,
  redirects() {
    return [
      process.env.MAINTENANCE_MODE === "1"
        ? { source: "/((?!maintenance|_next).*)", destination: "/maintenance.html", permanent: false }
        : null,
    ].filter(Boolean);
  }
};

module.exports = nextConfig;
