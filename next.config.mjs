import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.local' });
}

console.log("Loading next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'smidbackdev.34-78-133-45.plesk.page',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;