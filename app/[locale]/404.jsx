'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ErrorBoundary from "@/app/components/ErrorBoundary";

const NotFoundPage = () => {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'fr-FR'; // Extraire la locale depuis le chemin de l'URL ou utiliser 'fr-FR' par défaut

    console.log("Rendering NotFoundPage with locale:", locale);

    return (
        <div>
            <h2>Page Non Trouvée</h2>
            <p>La page que vous recherchez est introuvable. Vérifiez le chemin ou retournez à la page d’accueil.</p>
        </div>
    );
};

export default function Custom404() {
    console.log("Rendering Custom404 with Suspense");
    return (
        <ErrorBoundary>
            <React.Suspense fallback={<div>Loading...</div>}>
                <NotFoundPage />
            </React.Suspense>
        </ErrorBoundary>
    );
}