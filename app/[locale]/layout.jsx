"use client"

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import useTranslations from "@/utils/useTranslations";
import GeolocationTracker from "../hooks/LayoutClientComponents";
import { use } from 'react';

export default function RootLayout({ children, params }) {
    const locale = use(params)?.locale || 'fr-FR';
    const { translations } = useTranslations(locale);
    const title = translations?.metadata?.title || "Smartphone iD";
    const description = translations?.metadata?.description || "Smartphone iD";
    const GTM_ID = process.env.GTM_ID;

    return (
        <html lang={locale}>

        <head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* Google Tag Manager */}
            <Script id="custom-script" strategy="afterInteractive">
                {`
                        (function(w,d,s,l,i){
                            w[l]=w[l]||[];
                            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                            var f=d.getElementsByTagName(s)[0];
                            var j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                            j.async=true;
                            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                            f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${GTM_ID}');
                    `}
            </Script>
            {/* End Google Tag Manager */}
        </head>

        <body>
        <main>
            <Navbar />
            {children}
            <footer>
                <Footer />
            </footer>
        </main>

        <GeolocationTracker />
        <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0"
                    style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        </body>
        </html>
    );
}
