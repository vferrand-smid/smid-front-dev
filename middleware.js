import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import nextToGraphQLLocales from './app/lib/locales';

const defaultLocale = 'fr-FR'; // Locale par défaut
const languageToLocaleMap = {
    fr: 'fr-FR',
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


    // Vérification si le premier segment est une locale valide
    if (localeFromPath.match(/^[a-z]{2}-[A-Z]{2}$/)) {
        // Si la locale dans l'URL est correcte, continuer la requête
        return NextResponse.next();
    }

    const locale = getLocale(request);
    segments[1] = locale; // Remplacer ou ajouter la locale
    const newPathname = segments.join('/');
    const newUrl = new URL(newPathname, request.url);
    return NextResponse.redirect(newUrl); // Rediriger vers l'URL avec la locale corrigée


}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};