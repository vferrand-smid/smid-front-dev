import {withSentryConfig} from '@sentry/nextjs';
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
    reactStrictMode: true, // Facultatif, mais recommandé
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
export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "van3ssacod3",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Automatically annotate React components to show their full name in breadcrumbs and session replay
reactComponentAnnotation: {
enabled: true,
},

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});