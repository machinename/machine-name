// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GOOGLE_ADSENSE_ID: process.env.GOOGLE_ADSENSE_CLIENT,
    },
};

export default nextConfig;