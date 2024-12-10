'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import useTranslations from "@/utils/useTranslations";

export default function SmartBanner({ onVisibilityChange, locale }) {
    const [platform, setPlatform] = useState(null); // Détecte la plateforme (iOS ou Android)
    const [isVisible, setIsVisible] = useState(true); // Contrôle la visibilité de la bannière
    const {translations, loading} = useTranslations(locale);


    useEffect(() => {
        // Détecte la plateforme de l'utilisateur
        const userAgent = navigator.userAgent.toLowerCase();
        if (/android/.test(userAgent)) {
            setPlatform('android');
        } else if (/iphone|ipad|ipod/.test(userAgent)) {
            setPlatform('ios');
        }

        // Informe le parent que la bannière est visible ou non
        onVisibilityChange(true);

        // Nettoyage si la bannière est masquée
        return () => {
            onVisibilityChange(false);
        };
    }, [onVisibilityChange]);

    const handleClose = () => {
        setIsVisible(false); // Cache la bannière
        onVisibilityChange(false); // Informe le parent que la bannière est fermée
    };

    // Si aucune plateforme détectée ou si la bannière est fermée, ne rien afficher
    if (!platform || !isVisible) return null;

    return (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">
            <button
                onClick={handleClose}
                aria-label="Fermer la bannière"
                className="mr-2 bg-transparent text-gray-500 hover:text-black text-xl font-bold"
            >
                ✖
            </button>
            <div className="flex items-center">
                <Image
                    src="/images/General/460x0w.webp"
                    alt="Logo App"
                    width={48}
                    height={48}
                    className="mr-4"
                />
                <div>
                    <strong className="text-sm">Smartphone iD</strong>
                    <p className="text-xs">{translations?.SmartBanner?.phrase}</p>
                </div>
            </div>

            <Link
                href={
                    platform === 'ios'
                        ? 'https://apps.apple.com/fr/app/smartphone-id-photo-identit%C3%A9/id1527550865'
                        : 'https://play.google.com/store/apps/details?id=com.smartphoneid&hl=fr&gl=FR'
                }
                className="bg-primary text-white px-4 py-2 rounded text-sm font-bold shadow"
            >
                {translations?.SmartBanner?.download}
            </Link>
        </div>
    );
}
