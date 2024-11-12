"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useTranslations from "@/utils/useTranslations";

/*export const metadata = {

    title: "Smartphone iD",
    description: "Smartphone iD",
};*/

export default function RootLayout({children, params}) {
    const locale = params?.locale || 'fr-FR';
    const { translations } = useTranslations(locale);

    const title = translations?.metadata?.title || "Smartphone iD";
    const description = translations?.metadata?.description || "Smartphone iD";

    return (

        <html lang={locale}>
        <head>
            <title>{title}</title>
            <meta name="description" content={description}/>
        </head>
        <body>

        <main>

            <Navbar/>

            {children}


            <footer>
                <Footer/>
            </footer>
        </main>

        </body>
        </html>
    );
};