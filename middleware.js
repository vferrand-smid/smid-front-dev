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

   // console.log('Detected languages:', languages);

    for (const lang of languages) {
        const canonicalLang = getCanonicalLocale(lang);
       // console.log('Canonical locale:', canonicalLang);
        if (nextToGraphQLLocales[canonicalLang]) {
            //console.log('Locale found in nextToGraphQLLocales:', canonicalLang);
            return canonicalLang;
        }
    }
    //console.warn('No valid locale found in request. Falling back to default locale.');
    return getCanonicalLocale(defaultLocale);
}

export default function middleware(request) {

    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'max-age=3600');

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