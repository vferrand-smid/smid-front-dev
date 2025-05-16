'use client';

import { useTranslations } from '@/app/context/TranslationsContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SmartBanner({ onVisibilityChange, locale }) {
    const [platform, setPlatform] = useState(null); // Détecte la plateforme (iOS ou Android)
    const [isVisible, setIsVisible] = useState(true); // Contrôle la visibilité de la bannière
    const translations = useTranslations();

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
        <div className='fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white p-4 shadow-md md:hidden'>
            <button
                onClick={handleClose}
                aria-label='Fermer la bannière'
                className='mr-2 bg-transparent text-xl font-bold text-gray-500 hover:text-black'
            >
                ✖
            </button>
            <div className='flex items-center'>
                <Image src='/images/General/460x0w.webp' alt='Logo App' width={48} height={48} className='mr-4' priority={true} />
                <div>
                    <strong className='text-sm'>Smartphone iD</strong>
                    <p className='text-xs'>{translations?.SmartBanner?.phrase}</p>
                </div>
            </div>

            <Link
                href={platform === 'ios' ? translations?.Footer?.['AppStore-link'] || '#' : translations?.Footer?.['PlayStore-link'] || '#'}
                className='rounded bg-primary px-4 py-2 text-sm font-bold text-white shadow'
            >
                {translations?.SmartBanner?.download}
            </Link>
        </div>
    );
}
