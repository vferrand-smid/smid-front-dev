"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import useTranslations from "@/utils/useTranslations";
import { getGeolocationData } from "@/services/ipapi";
import { useEffect, useState } from "react";
import { use } from 'react';
import SmartBanner from "@/app/components/SmartBanner";



export default function RootLayout({children, params}) {
    const locale = use(params)?.locale || 'fr-FR';
    const { translations } = useTranslations(locale);
    const [originCountry, setOriginCountry] = useState('');
    const title = translations?.metadata?.title;
    const description = translations?.metadata?.description;
    const [isBannerVisible, setIsBannerVisible] = useState(false); // Gère la visibilité de la bannière

    const GTM_ID = process.env.GTM_ID;
    const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;

    // Récupérer le code pays basé sur l'IP
    useEffect(() => {
        const fetchOriginCountry = async () => {
            const data = await getGeolocationData();

            if (data) {

                if (data.country_code) {
                    setOriginCountry(data.country_code);

                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'page_view',
                        origin_country: data.country_code,
                    });
                    console.log("layout.js - Data pushed to dataLayer:", {
                        event: 'page_view',
                        origin_country: data.country_code,
                    });
                } else {
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
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:url" content="https://www.smartphone-id.com/"/>
            <meta property="og:type" content="website"/>
            {/* Google Tag Manager */}
            <Script id="custom-script">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            {/* End Google Tag Manager */}
        </head>

        <body>

        <main className={`${isBannerVisible ? 'pt-20 md:pt-0' : ''}`}>
            <SmartBanner onVisibilityChange={setIsBannerVisible}/>
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