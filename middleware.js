import { getCanonicalLocale } from '@/utils/getCanonicalLocale';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';

export function getLocaleFromRequest(request) {
    const headers = Object.fromEntries(request.headers.entries());
    const negotiator = new Negotiator({ headers });
    const languages = negotiator.languages();

    for (const lang of languages) {
        const canonical = getCanonicalLocale(lang);
        if (canonical) return canonical;
    }

    return 'fr-FR'; // fallback
}

export default function middleware(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const segments = pathname.split('/');
    const current = segments[1]; // ex: "fr-fr"

    // redirige la racine
    if (pathname === '/' || pathname === '') {
        const locale = getLocaleFromRequest(request);
        return NextResponse.redirect(new URL(`/${locale.toLowerCase()}`, request.url)); // SEO format
    }

    // continue si la locale est déjà au bon format
    if (/^[a-z]{2}-[a-z]{2}$/.test(current)) {
        return NextResponse.next();
    }

    // sinon redirige avec une locale canonique
    const locale = getLocaleFromRequest(request);
    segments[1] = locale.toLowerCase();
    const newUrl = new URL(segments.join('/'), request.url);
    return NextResponse.redirect(newUrl);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
