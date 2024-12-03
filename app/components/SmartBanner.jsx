'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";

export default function SmartBanner() {
    const [platform, setPlatform] = useState(null);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/android/.test(userAgent)) {
            setPlatform('android');
        } else if (/iphone|ipad|ipod/.test(userAgent)) {
            setPlatform('ios');
        }
    }, []);

    if (!platform) return null;

    if (platform === 'ios') {
        return (
            <meta
                name="apple-itunes-app"
                content="app-id=1527550865, app-argument=https://apps.apple.com/fr/app/smartphone-id-photo-identit%C3%A9/id1527550865"
            />
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex items-center justify-between z-50">
            <div className="flex items-center">
                <Image src="public/images/General/460x0w.webp" alt="Logo App" className="w-12 h-12 mr-4" />
                <div>
                    <strong>Smartphone iD</strong>
                    <p>Obtenez rapidement votre photo d’identité sécurisée</p>
                </div>
            </div>
            <a
                href="https://play.google.com/store/apps/details?id=com.smartphoneid&hl=fr&gl=FR"
                className="bg-white text-blue-600 px-4 py-2 rounded"
            >
                Télécharger
            </a>
        </div>
    );
}
