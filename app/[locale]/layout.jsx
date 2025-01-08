"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import useTranslations from "@/utils/useTranslations";
import {getGeolocationData} from "@/services/ipapi";
import {useEffect, useState} from "react";
import {use} from 'react';
import SmartBanner from "@/app/components/SmartBanner";
import Image from "next/image";


export default function RootLayout({children, params}) {
    const locale = use(params)?.locale || 'fr-FR';
    //const { translations } = useTranslations(locale);
    const [originCountry, setOriginCountry] = useState('');
   // const title = translations?.metadata?.title;
   // const description = translations?.metadata?.description;
    const [isBannerVisible, setIsBannerVisible] = useState(false); // Gère la visibilité de la bannière

    // Objets contenant les titres et descriptions par langue
    const metadata = {
        'ar': {
            title: "صورة الهوية عبر الانترنت  - Smartphone ID",
            description: ""
        },
        'ar-AE': {
            title: "صورة الهوية عبر الانترنت  - Smartphone ID",
            description: ""
        },
        'ar-SA': {
            title: "صورة الهوية السعودية عبر الانترنت  - Smartphone ID",
            description: "أداة سريعة وسهلة للحصول على صور الهوية الشخصية عالية الجودة"
        },
        'de': {
            title: "Deutsches Passfoto online - Smartphone ID",
            description: "Schnelles und einfaches Tool für hochwertige Passfotos"
        },
        'de-CH': {
            title: "Passbilder online für die Schweiz - Smartphone iD",
            description: "Schnelles und einfaches Tool für hochwertige Passfotos"
        },
        'de-DE': {
            title: "Deutsches Passfoto online - Smartphone iD",
            description: "Schnelles und einfaches Tool für hochwertige Passfotos"
        },
        'en': {
        },
        'en-AU': {
            title: "Australian passport photo - Smartphone ID",
            description: "Fast and easy tool for quality passport photos"
        },
        'en-CA': {
            title: "Canadian passport photo - Smartphone ID",
            description: "Fast and easy tool for quality passport photos"
        },
        'en-GB': {
            title: 'UK passport photo online - Smartphone ID',
            description: 'Fast and easy tool for quality passport photos',
        },
        'en-IE': {
            title: "Ireland passport photo - Smartphone ID",
            description: "Fast and easy tool for quality passport photos"
        },
        'en-IN': {
            title: "Passport photos online for India - Smartphone iD",
            description: "Fast and easy tool for quality passport photos"
        },
        'en-NG': {
            title: "Passport photos for Nigeria - Smartphone iD",
            description: "Fast and easy tool for quality passport photos"
        },
        'en-NZ': {
            title: "New Zealand passport photo - Smartphone ID",
            description: "Fast and easy tool for quality passport photos"
        },
        'en-SG': {
            title: "Passport photos online for Singapore - Smartphone iD",
            description: "Fast and easy tool for quality passport photos"
        },
        'en-US': {
            title: "US passport photo online - Smartphone ID",
            description: "Fast and easy tool for quality passport photos"
        },
        'en-ZA': {
            title: "Passport photos online for South Africa - Smartphone iD",
            description: "Fast and easy tool for quality passport photos"
        },
        'es-AR': {
            title: "Foto de identidad Argentina online - Smartphone ID",
            description: "Herramienta rápida y sencilla para fotos de pasaporte de calidad."
        },
        'es-CO': {
            title: "Foto de identidad Colombia online - Smartphone ID",
            description: "Herramienta rápida y sencilla para fotos de pasaporte de calidad."
        },
        'es-ES': {
            title: 'Foto de identidad Española online - Smartphone ID',
            description: 'Herramienta rápida y sencilla para fotos de pasaporte de calidad.',
        },
        'es-MX': {
            title: "Foto de identidad Mexicana online - Smartphone ID",
            description: "Herramienta rápida y sencilla para fotos de pasaporte de calidad."
        },
        'et-EE': {
            title: "Eesti passfoto võrgus - Smartphone ID",
            description: "Kiire ja lihtne vahend kvaliteetseteks dokumendifotodeks"
        },
        'fr': {
            title: "Photo d'identité officielle en ligne - Smartphone ID",
            description: "Obtenez rapidement votre photo d’identité sécurisée"
        },
        'fr-BE': {
            title: "Photo d'identité officielle en ligne - Smartphone iD",
            description: "Obtenez rapidement votre photo d’identité sécurisée"
        },
        'fr-CA': {
            title: "Photo d'identité officielle en ligne - Smartphone iD",
            description: "Obtenez rapidement votre photo d’identité sécurisée"
        },
        'fr-CH': {
            title: "Photo d'identité officielle en ligne - Smartphone iD",
            description: "Obtenez rapidement votre photo d’identité sécurisée"
        },
        'fr-FR': {
            title: 'Photo d’identité française en ligne - Smartphone ID',
            description: 'Outil rapide et facile pour des photos d’identité de qualité.',
        },
        'it-IT': {
            title: "Foto d’identità Italiana online - Smartphone ID",
            description: "Strumento facile e veloce per fototessere di qualità."
        },
        'nl-BE': {
            title: "Kwalitatieve pasfoto's voor België - Smartphone iD",
            description: "Een snel en eenvoudig hulpmiddel voor pasfoto's van hoge kwaliteit"
        },
        'nl-NL': {
            title: "Pasfoto's - Smartphone ID",
            description: "Een snel en eenvoudig hulpmiddel voor pasfoto's van hoge kwaliteit"
        },
        'pl-PL': {
            title: "Zdjęcie Paszportowe online - Smartphone ID",
            description: "Szybkie i proste narzędzie do wysokiej jakości zdjęć paszportowych"
        },
        'pt-BR': {
            title: "Foto para passaporte Bresileiro - Smartphone ID",
            description: "Ferramenta rápida e fácil para obter fotos de qualidade para passaporte"
        },
        'pt-PT': {
            title: "Foto para passaporte Portugal - Smartphone iD",
            description: "Ferramenta rápida e fácil para fotos de passaporte de qualidade."
        },
        'ru-RU': {
            title: "Фотографии на документы - Smartphone ID",
            description: "Быстрый и простой инструмент для получения качественных фотографий на паспорт"
        },
        'sv-SE': {
            title: "Skaffa svenska passbilder online - Smartphone iD",
            description: "Snabbt och enkelt verktyg för kvalitets passfoton"
        },
        'zh-CN': {
            title: "Smartphone ID",
            description: "Fast and easy tool for quality passport photos"
        },
    };

// Récupération des métadonnées basées sur la locale, avec un fallback sur 'fr-FR'
    const {title, description} = metadata[locale] || metadata['fr-FR'];

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
            <link rel="alternate" hrefLang="ar" href="https://www.smartphone-id.com/ar/"/>
            <link rel="alternate" hrefLang="ar" href="https://www.smartphone-id.com/ar-AE/"/>
            <link rel="alternate" hrefLang="ar" href="https://www.smartphone-id.com/ar-SA/"/>
            <link rel="alternate" hrefLang="de" href="https://www.smartphone-id.com/de/"/>
            <link rel="alternate" hrefLang="de" href="https://www.smartphone-id.com/de-CH/"/>
            <link rel="alternate" hrefLang="de" href="https://www.smartphone-id.com/de-DE/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-AU/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-CA/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-GB/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-IE/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-IN/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-NG/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-NZ/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-SG/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-US/"/>
            <link rel="alternate" hrefLang="en" href="https://www.smartphone-id.com/en-ZA/"/>
            <link rel="alternate" hrefLang="es" href="https://www.smartphone-id.com/es-AR/"/>
            <link rel="alternate" hrefLang="es" href="https://www.smartphone-id.com/es-CO/"/>
            <link rel="alternate" hrefLang="es" href="https://www.smartphone-id.com/es-ES/"/>
            <link rel="alternate" hrefLang="es" href="https://www.smartphone-id.com/es-MX/"/>
            <link rel="alternate" hrefLang="et" href="https://www.smartphone-id.com/et-EE/"/>
            <link rel="alternate" hrefLang="fr" href="https://www.smartphone-id.com/fr/"/>
            <link rel="alternate" hrefLang="fr" href="https://www.smartphone-id.com/fr-BE/"/>
            <link rel="alternate" hrefLang="fr" href="https://www.smartphone-id.com/fr-CA/"/>
            <link rel="alternate" hrefLang="fr" href="https://www.smartphone-id.com/fr-CH/"/>
            <link rel="alternate" hrefLang="fr" href="https://www.smartphone-id.com/fr-FR/"/>
            <link rel="alternate" hrefLang="it" href="https://www.smartphone-id.com/it-IT/"/>
            <link rel="alternate" hrefLang="nl" href="https://www.smartphone-id.com/nl-BE/"/>
            <link rel="alternate" hrefLang="nl" href="https://www.smartphone-id.com/nl-NL/"/>
            <link rel="alternate" hrefLang="pl" href="https://www.smartphone-id.com/pl-PL/"/>
            <link rel="alternate" hrefLang="pt" href="https://www.smartphone-id.com/pt-BR/"/>
            <link rel="alternate" hrefLang="pt" href="https://www.smartphone-id.com/pt-PT/"/>
            <link rel="alternate" hrefLang="ru" href="https://www.smartphone-id.com/ru-RU/"/>
            <link rel="alternate" hrefLang="sv" href="https://www.smartphone-id.com/sv-SE/"/>
            <link rel="alternate" hrefLang="zh" href="https://www.smartphone-id.com/zh-CN/"/>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:url" content="https://www.smartphone-id.com/"/>
            <meta property="og:type" content="website"/>
            {/* Google Tag Manager */}
            <Script id="custom-script" strategy="lazyOnload">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            {/* End Google Tag Manager */}

            {/* Meta Pixel Code */}
            <Script
                id="script-meta"
                strategy="afterInteractive" // Assure-toi que le script s'exécute après que la page ait été rendue
            >
                {`
          !function(f,b,e,v,n,t,s){
            if(f.fbq) return; 
            n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq) f._fbq=n; 
            n.push=n;n.loaded=!0;n.version='2.0'; 
            n.queue=[]; 
            t=b.createElement(e); 
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1118162633030928');
          fbq('track', 'PageView');
        `}
            </Script>


            {/* End Meta Pixel Code */}

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
        <noscript>
            <Image height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=1118162633030928&ev=PageView&noscript=1"
                   alt="meta"/>
        </noscript>
        </body>
        </html>
    );
};