'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LanguageRedirect = ({ defaultLocale }) => {
    const router = useRouter();

    useEffect(() => {
        const userLang = navigator.language;
        let preferredLocale = userLang.replace('_', '-');


        const locales = ['en-ZA', 'de-DE', 'arg', 'es-AR', 'en-AU', 'fr-BE', 'nl-BE', 'pt-BR', 'en-CA', 'fr-CA',
            'en-CO', 'es-ES', 'et-EE', 'en-US', 'fr-FR', 'en-IN', 'en-IE', 'it-IT', 'es-MX', 'en-NG', 'en-NZ', 'nl-NL',
            'pl-PL', 'pt-PT', 'en-GB', 'en-SG', 'de-CH', 'fr-CH', 'sv-SE', 'ru-RU', 'ar-AE', 'ar-SA', 'zh-CN', 'de', 'es', 'en', 'fr', 'ru', 'ar'];

        if (!locales.includes(preferredLocale)) {
            preferredLocale = defaultLocale;
        }

        if (router.pathname === '/' && !router.pathname.startsWith(`/${preferredLocale}`)) {
            router.replace(`/${preferredLocale}`);
        }
    }, [router, defaultLocale]);

    return null;
};

export default LanguageRedirect;