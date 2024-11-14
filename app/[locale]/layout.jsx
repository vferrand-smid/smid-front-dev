"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import useTranslations from "@/utils/useTranslations";
import { getGeolocationData } from "@/services/ipapi";
import { useEffect, useState } from "react";
import { use } from 'react';



export default function RootLayout({children, params}) {
    const locale = use(params)?.locale || 'fr-FR';
    const { translations } = useTranslations(locale);
    const [originCountry, setOriginCountry] = useState('');
    const title = translations?.metadata?.title || "Smartphone iD";
    const description = translations?.metadata?.description || "Smartphone iD";

    const GTM_ID = process.env.GTM_ID;
    const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;

    // Récupérer le code pays basé sur l'IP
    useEffect(() => {
        const fetchOriginCountry = async () => {
            console.log("layout.js - Fetching geolocation data...");
            const data = await getGeolocationData();

            if (data) {
                console.log("layout.js - Geolocation data received:", data);

                if (data.country_name) {
                    setOriginCountry(data.country_name);
                    console.log("layout.js - Origin country set to:", data.country_name);

                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'page_view',
                        origin_country: data.country_name,
                    });
                    console.log("layout.js - Data pushed to dataLayer:", {
                        event: 'page_view',
                        origin_country: data.country_name,
                    });
                } else {
                    console.log("layout.js - Country code not found in data:", data);
                }
            } else {
                console.error("layout.js - Failed to fetch geolocation data.");
            }
        };

        fetchOriginCountry();
    }, []);

    return (

        <html lang={locale}>

        <head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            {/* Both scripts with afterInteractive strategy */}
            <Script id="gtm-init" strategy="afterInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <Script id="dataLayer-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || []; window.dataLayer.push({event: 'page_view', origin_country: '${originCountry}', ga_property_id: '${GA_PROPERTY_ID}'});`}
            </Script>
        </head>

        <body>

        <main>

            <Navbar/>

            {children}


            <footer>
                <Footer/>
            </footer>
        </main>
        <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0"
                    style={{display: 'none', visibility: 'hidden'}}></iframe>
        </noscript>
        </body>
        </html>
    );
};