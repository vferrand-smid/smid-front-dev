import { getTranslations } from '@/utils/getTranslations'; // ✅ Vérifie bien que ce fichier existe
import Script from 'next/script';
import { getCanonicalLocale } from '../../utils/locale';
import Footer from '../components/Footer';
import MainWrapper from '../components/MainWrapper';
import './globals.css';

async function getLocale(params) {
    return params?.locale || 'fr-FR'; // ✅ Fallback sur "fr-FR" si `params.locale` n'est pas encore dispo
}

export async function generateMetadata({ params }) {
    const rawLocale = await getLocale({ params });
    const locale = getCanonicalLocale(rawLocale); // ✅ on le normalise ici aussi
    console.log('🌍 Locale finale envoyée à getTranslations:', locale);
    const translations = await getTranslations(locale);

    return {
        title: translations?.metadata?.title || 'Smartphone ID',
        description: translations?.metadata?.description || 'Obtenez rapidement votre photo d’identité sécurisée',
        icons: {
            icon: '/images/favicon.svg',
        },
        openGraph: {
            title: translations?.metadata?.title,
            description: translations?.metadata?.description,
            url: 'https://www.smartphone-id.com/',
            type: 'website',
        },
    };
}

export default async function RootLayout({ children, params }) {
    const locale = getCanonicalLocale(await getLocale({ params }));

    const GTM_ID = process.env.GTM_ID;

    return (
        <html lang={getCanonicalLocale(locale)}>
            <head>
                <link rel='alternate' hrefLang='fr' href='https://www.smartphone-id.com/fr-fr/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-us/' />

                <link rel='alternate' hrefLang='ar' href='https://www.smartphone-id.com/ar/' />
                <link rel='alternate' hrefLang='ar' href='https://www.smartphone-id.com/ar-ae/' />
                <link rel='alternate' hrefLang='ar' href='https://www.smartphone-id.com/ar-sa/' />
                <link rel='alternate' hrefLang='de' href='https://www.smartphone-id.com/de/' />
                <link rel='alternate' hrefLang='de' href='https://www.smartphone-id.com/de-ch/' />
                <link rel='alternate' hrefLang='de' href='https://www.smartphone-id.com/de-de/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-au/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-ca/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-gb/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-ie/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-in/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-NG/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-NZ/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-SG/' />
                <link rel='alternate' hrefLang='en' href='https://www.smartphone-id.com/en-ZA/' />
                <link rel='alternate' hrefLang='es' href='https://www.smartphone-id.com/es-AR/' />
                <link rel='alternate' hrefLang='es' href='https://www.smartphone-id.com/es-CO/' />
                <link rel='alternate' hrefLang='es' href='https://www.smartphone-id.com/es-ES/' />
                <link rel='alternate' hrefLang='es' href='https://www.smartphone-id.com/es-MX/' />
                <link rel='alternate' hrefLang='et' href='https://www.smartphone-id.com/et-EE/' />
                <link rel='alternate' hrefLang='fr' href='https://www.smartphone-id.com/fr/' />
                <link rel='alternate' hrefLang='fr' href='https://www.smartphone-id.com/fr-BE/' />
                <link rel='alternate' hrefLang='fr' href='https://www.smartphone-id.com/fr-ca/' />
                <link rel='alternate' hrefLang='fr' href='https://www.smartphone-id.com/fr-CH/' />
                <link rel='alternate' hrefLang='it' href='https://www.smartphone-id.com/it-IT/' />
                <link rel='alternate' hrefLang='nl' href='https://www.smartphone-id.com/nl-BE/' />
                <link rel='alternate' hrefLang='nl' href='https://www.smartphone-id.com/nl-NL/' />
                <link rel='alternate' hrefLang='pl' href='https://www.smartphone-id.com/pl-PL/' />
                <link rel='alternate' hrefLang='pt' href='https://www.smartphone-id.com/pt-BR/' />
                <link rel='alternate' hrefLang='pt' href='https://www.smartphone-id.com/pt-PT/' />
                <link rel='alternate' hrefLang='ru' href='https://www.smartphone-id.com/ru-RU/' />
                <link rel='alternate' hrefLang='sv' href='https://www.smartphone-id.com/sv-SE/' />
                <link rel='alternate' hrefLang='zh' href='https://www.smartphone-id.com/zh-CN/' />

                {/* <meta property="og:title" content={title}/>
      <meta property="og:description" content={description || "Obtenez rapidement votre photo d'identité sécurisée"}/>
      <meta property="og:url" content="https://www.smartphone-id.com/"/>
      <meta property="og:type" content="website"/>*/}
                {/* Google Tag Manager */}
                <Script id='custom-script'>
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${GTM_ID}');`}
                </Script>
                {/* End Google Tag Manager */}
            </head>

            <body>
                <MainWrapper>{children}</MainWrapper>

                <footer>
                    <Footer />
                </footer>
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                        height='0'
                        width='0'
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
            </body>
        </html>
    );
}
