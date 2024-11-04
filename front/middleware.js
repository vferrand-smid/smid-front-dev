import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import nextToGraphQLLocales from './app/lib/locales';

const defaultLocale = 'fr-FR'; // Locale par défaut
const languageToLocaleMap = {
    fr: 'fr-FR',
    en_US: 'en-US',
    en_IE: 'en-IE',
    en: 'en-US',
    de: 'de-DE',
    ar: 'ar-UAE',
    // Ajoutez d'autres langues si nécessaire
};

function getCanonicalLocale(locale) {
    if (locale.includes('_')) {
        locale = locale.replace('_', '-');
    }
    return languageToLocaleMap[locale] || locale;
}

function getLocale(request) {
    const headers = Object.fromEntries(request.headers.entries());
    const negotiator = new Negotiator({ headers });
    const languages = negotiator.languages();

    for (const lang of languages) {
        const canonicalLang = getCanonicalLocale(lang);
        if (nextToGraphQLLocales[canonicalLang]) {
            return canonicalLang;
        }
    }

    return getCanonicalLocale(defaultLocale);
}

export default function middleware(request) {
    const url = new URL(request.url);
    const { pathname } = url;
    const segments = pathname.split('/');
    const localeFromPath = segments[1]; // Extraire la locale de l'URL
    const locale = getLocale(request);

    // Si l'utilisateur accède à la racine, rediriger vers la locale par défaut
    if (pathname === '/' || pathname === '') {
        const newUrl = new URL(`/${locale}`, request.url);
        return NextResponse.redirect(newUrl);
    }

    // Vérification si le premier segment est une locale valide
    if (localeFromPath.match(/^[a-z]{2}-[A-Z]{2}$/)) {
        // Si la locale dans l'URL est correcte, continuer la requête
        return NextResponse.next();
    } else {
        // Si la locale n'est pas présente ou est incorrecte, ajouter ou remplacer la locale dans l'URL
        segments[1] = locale; // Remplacer ou ajouter la locale
        const newPathname = segments.join('/');
        const newUrl = new URL(newPathname, request.url);
        return NextResponse.redirect(newUrl); // Rediriger vers l'URL avec la locale corrigée
    }
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};




/*
import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import nextToGraphQLLocales from './app/lib/locales';

const defaultLocale = 'fr-FR';
const languageToLocaleMap = {
    fr: 'fr-FR',
    en: 'en-US',
    de: 'de-DE',
    ar: 'ar-UAE',
    // Ajoute d'autres langues si nécessaire
};

function getCanonicalLocale(locale) {
    console.log(`middleware.js - Original locale: ${locale}`);

    if (locale.includes('_')) {
        locale = locale.replace('_', '-');
    }

    // Vérifie si c'est une langue seule (par exemple "fr", "en", etc.)
    if (languageToLocaleMap[locale]) {
        return languageToLocaleMap[locale];
    }

    return locale;
}

function getLocale(request) {
    const headers = Object.fromEntries(request.headers.entries());
    console.log("middleware.js - Request headers in getLocale:", headers);

    const negotiator = new Negotiator({ headers });
    const languages = negotiator.languages();
    console.log(`middleware.js - Languages extracted by Negotiator: ${languages.join(', ')}`);
    let logs = [`Filtered languages from request: ${languages.join(', ')}`];

    for (const lang of languages) {
        try {
            const canonicalLang = getCanonicalLocale(lang);
            logs.push(`middleware.js - Canonical language: ${canonicalLang}`);

            if (nextToGraphQLLocales[canonicalLang]) {
                logs.push(`middleware.js - Matched locale: ${nextToGraphQLLocales[canonicalLang]}`);
                console.log(`middleware.js - Locale found: ${nextToGraphQLLocales[canonicalLang]}`);
                return { locale: canonicalLang, logs };
            } else {
                console.log(`${canonicalLang} not found in nextToGraphQLLocales`);
            }
        } catch (e) {
            logs.push(`middleware.js - Invalid locale provided: ${lang} - Error: ${e.message}`);
        }
    }

    logs.push(`Default locale: ${defaultLocale}`);
    return { locale: getCanonicalLocale(defaultLocale), logs };
}

export default function middleware(request) {
    const { locale, logs } = getLocale(request);
    const url = new URL(request.url);

    if (!url.searchParams.has('locale')) {
        url.searchParams.set('locale', locale);
        const response = NextResponse.redirect(url.toString());
        response.headers.set('X-Logs', logs.join(' | '));
        logs.forEach(log => console.log(log));
        return response;
    }

    if (url.pathname === '/404' || url.pathname === '/_not-found') {
        return NextResponse.rewrite(new URL('/loading', request.url));
    }

    console.log(`middleware.js - URL with locale param: ${url.toString()}`);
    logs.forEach(log => console.log(log));

    const response = NextResponse.rewrite(url.toString());
    response.headers.set('X-Logs', logs.join(' | '));

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
*/
