import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
        GTM_ID: process.env.GTM_ID,
        GA_PROPERTY_ID: process.env.GA_PROPERTY_ID,
    },
    images: {
        unoptimized: true, // Remplacez par false si vous voulez utiliser l'optimisation Next.js
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.dev.smartphone-id.com',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '**',
            },
        ],
    },
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

// Ajout de l'analyseur de bundle
export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true', // Active l'analyse si ANALYZE=true
})(nextConfig);
