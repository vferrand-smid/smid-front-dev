import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Utilisé pour récupérer l'URL actuelle

const isBrowser = typeof window !== 'undefined';

export default function useTranslations(defaultLocale = 'fr-FR') {
    const [translations, setTranslations] = useState({});
    const [loading, setLoading] = useState(true);

    // Utilise usePathname pour extraire la locale du chemin
    const pathname = isBrowser ? window.location.pathname : '';
    const locale = pathname.split('/')[1] || defaultLocale; // Extrait la locale de l'URL ou utilise la valeur par défaut

    useEffect(() => {
        const loadTranslations = async () => {
            setLoading(true); // Indiquer que le chargement est en cours
            try {
                const response = await fetch(`/locales/${locale}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load translations for ${locale}`);
                }
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


/*
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
}*/
