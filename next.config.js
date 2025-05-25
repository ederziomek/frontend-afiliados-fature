/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  // Optional: Add other configurations if needed, like images optimization for static export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

