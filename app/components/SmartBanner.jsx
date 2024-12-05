'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import Head from "next/head";
import useTranslations from "@/utils/useTranslations";

export default function SmartBanner({ locale }) {
    const [platform, setPlatform] = useState(null);
    const { translations } = useTranslations(locale);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        console.log('SmartBanner.jsx - User Agent:', navigator.userAgent.toLowerCase());
        if (userAgent.includes('android')) {
            setPlatform('android');
        } else if (/iphone|ipad|ipod/.test(userAgent)) {
            setPlatform('ios');
        } else {
            console.log('Non-supported platform detected');
        }
    }, []);

    if (!platform) return null;

    if (platform === 'ios') {
        return (
            <Head>
                <meta
                    name="apple-itunes-app"
                    content="app-id=1527550865, app-argument=https://apps.apple.com/fr/app/smartphone-id-photo-identit%C3%A9/id1527550865"
                />
            </Head>
                );
                }

                return (
                <div className="fixed top-0 left-0 right-0 bg-white text-black p-4 flex items-center justify-between z-50 shadow-lg">
                    <div className="flex items-center">
                        <Image
                            width={100}
                            height={100}
                            src="/images/General/460x0w.webp" alt="Logo App" className="w-12 h-12 mr-4"/>
                        <div>
                            <strong className="text-sm">Smartphone iD</strong>
                            <p className="text-xs">Obtenez rapidement votre photo d’identité sécurisée</p>
                        </div>
                    </div>
                    <a href="https://play.google.com/store/apps/details?id=com.smartphoneid&hl=fr&gl=FR"
                        className="bg-white text-black px-4 py-2 rounded">
                        Télécharger
                    </a>
                </div>
                );
                }
