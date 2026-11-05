/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product photos uploaded through the admin panel (stored on Sanity)
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // Set UNOPTIMIZED_IMAGES=1 on servers that can't run Next's native image library (e.g. Hostinger).
    unoptimized: process.env.UNOPTIMIZED_IMAGES === "1",
  },
};

export default nextConfig;
