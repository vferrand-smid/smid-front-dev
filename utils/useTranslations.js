"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const isBrowser = typeof window !== 'undefined';

export default function useTranslations(defaultLocale = 'fr-FR') {
    const [translations, setTranslations] = useState({});
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();
    const rawLocale = pathname.split("/")[1] || defaultLocale;

    // Normalize locale: fr-fr → fr-FR
    const locale = rawLocale.includes('-') 
        ? `${rawLocale.split('-')[0]}-${rawLocale.split('-')[1].toUpperCase()}`
        : rawLocale;

    useEffect(() => {
        const loadTranslations = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/locales/${locale}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load translations for ${locale}`);
                }
                const data = await response.json();
                setTranslations(data);
            } catch (error) {
                console.error("useTranslations.js - Failed to load translations:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTranslations();
    }, [locale]);

    return { translations, loading };
}

