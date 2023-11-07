/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: "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",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
