import { useState, useEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

export default function useTranslations(defaultLocale = 'fr-FR') {
    const [translations, setTranslations] = useState({});
    const [loading, setLoading] = useState(true);
    const locale = isBrowser ? new URLSearchParams(window.location.search).get('locale') || defaultLocale : defaultLocale;

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const response = await fetch(`/locales/${locale}.json`);
                const data = await response.json();
                console.log(`useTranslations.js - Fetched translations for ${locale}:`, data);
                setTranslations(data);
            } catch (error) {
                console.error('useTranslations.js - Failed to load translations:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTranslations();
    }, [locale]);

    return { translations, loading };
}