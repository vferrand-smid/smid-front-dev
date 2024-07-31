import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import nextToGraphQLLocales from './app/lib/locales';

const defaultLocale = 'fr-FR';

function getCanonicalLocale(locale) {
    console.log(`Original locale: ${locale}`);
    return locale.replace('_', '-');
}

function getLocale(request) {
    const headers = Object.fromEntries(request.headers.entries());
    console.log("Request headers in getLocale:", headers);

    const negotiator = new Negotiator({ headers });
    const languages = negotiator.languages();
    console.log(`Languages extracted by Negotiator: ${languages.join(', ')}`);
    let logs = [`Filtered languages from request: ${languages.join(', ')}`];

    for (const lang of languages) {
        try {
            const canonicalLang = getCanonicalLocale(lang);
            logs.push(`Canonical language: ${canonicalLang}`);
            console.log(`Checking if ${canonicalLang} exists in nextToGraphQLLocales`);
            if (nextToGraphQLLocales[canonicalLang]) {
                logs.push(`Matched locale: ${nextToGraphQLLocales[canonicalLang]}`);
                console.log(`Locale found: ${nextToGraphQLLocales[canonicalLang]}`);
                return { locale: canonicalLang, logs };
            } else {
                console.log(`${canonicalLang} not found in nextToGraphQLLocales`);
            }
        } catch (e) {
            logs.push(`Invalid locale provided: ${lang} - Error: ${e.message}`);
        }
    }

    logs.push(`Default locale: ${defaultLocale}`);
    return { locale: getCanonicalLocale(defaultLocale), logs };
}

export default function middleware(request) {
    console.log("Middleware triggered");
    const { locale, logs } = getLocale(request);
    const url = new URL(request.url);
    console.log(`Request URL: ${request.url}`);
    console.log(`Next.js Locale: ${locale}`);
    console.log(`URL pathname: ${url.pathname}`);

    if (!url.searchParams.has('locale')) {
        url.searchParams.set('locale', locale);
        const response = NextResponse.redirect(url.toString());
        response.headers.set('X-Logs', logs.join(' | '));
        logs.forEach(log => console.log(log));
        return response;
    }

    console.log(`URL with locale param: ${url.toString()}`);
    logs.forEach(log => console.log(log));

    const response = NextResponse.rewrite(url.toString());
    response.headers.set('X-Logs', logs.join(' | '));

    return response;
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};