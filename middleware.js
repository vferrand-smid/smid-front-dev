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

  /*  for (const lang of languages) {
        try {
            const canonicalLang = getCanonicalLocale(lang);
            logs.push(`middleware.js - Canonical language: ${canonicalLang}`);

            if (lang.includes('_')) {
            console.log(`middleware.js - Checking if ${canonicalLang} exists in nextToGraphQLLocales`);
            if (nextToGraphQLLocales[canonicalLang]) {
                logs.push(`middleware.js - Matched locale: ${nextToGraphQLLocales[canonicalLang]}`);
                console.log(`middleware.js - Locale found: ${nextToGraphQLLocales[canonicalLang]}`);
                return { locale: canonicalLang, logs };
            } else {
                console.log(`${canonicalLang} not found in nextToGraphQLLocales`);
            }
        }
        } catch (e) {
            logs.push(`middleware.js - Invalid locale provided: ${lang} - Error: ${e.message}`);
        }
    }*/

    logs.push(`Default locale: ${defaultLocale}`);
    return { locale: getCanonicalLocale(defaultLocale), logs };
}
export default function middleware(request) {
    console.log("middleware.js - Middleware triggered");
    const { locale, logs } = getLocale(request);
    const url = new URL(request.url);
    console.log(`middleware.js - Request URL: ${request.url}`);
    console.log(`middleware.js - Next.js Locale: ${locale}`);
    console.log(`middleware.js - URL pathname: ${url.pathname}`);


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