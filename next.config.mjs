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
                hostname: process.env.WORDPRESS_IMAGE_HOST,
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },

  /*  experimental: {
        missingSuspenseWithCSRBailout: false,
    },*/

    async redirects() {
        return [
            {
                source: '/_not-found',
                destination: '/page',
                permanent: true,
            },
            {
                source: '/404',
                destination: '/page',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
