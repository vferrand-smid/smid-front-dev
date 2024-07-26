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





/*
// @ts-check

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/!**
 * @type {import('next').NextConfig}
 *!/

const nextConfig = {
    i18n: {
        locales: ['en-ZA', 'de-DE.json', 'arg', 'es-AR', 'en-AU', 'fr-BE', 'nl-BE', 'pt-BR', 'en-CA', 'fr-CA',
            'en-CO', 'es-ES', 'et-EE', 'en-US', 'fr-FR', 'en-IN', 'en-IE', 'it-IT', 'es-MX', 'en-NG', 'en-NZ', 'nl-NL',
            'pl-PL', 'pt-PT', 'en-GB', 'en-SG', 'de-CH', 'fr-CH', 'sv-SE', 'ru-RU', 'ar-AE', 'ar-SA', 'zh-CN'],
        defaultLocale: 'fr-FR',
    },
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias['@'] = path.resolve(__dirname);
        }
        return config;
    },
    env: {
        WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'smidbackdev.34-78-133-45.plesk.page',
                port: '',
                pathname: '/wp-content/uploads/!**',
            },
        ],
    },
};

export default nextConfig*/