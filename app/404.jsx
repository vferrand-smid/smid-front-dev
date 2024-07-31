'use client';

import React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const NotFoundPage = () => {
    const searchParams = useSearchParams();
    const locale = searchParams.get('locale') || 'fr-FR'; // Default to 'fr-FR' if no locale is specified

    return (
        <div>
            <h2>Page Non Trouvée</h2>
            <p>La page que vous recherchez n`&lsquo;`existe pas. Vérifiez l`&lsquo;`URL ou retournez à la page d`&lsquo;`accueil.</p>
        </div>
    );
};

export default function Custom404() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotFoundPage />
        </Suspense>
    );
}
