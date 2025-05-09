import fs from 'fs';
import path from 'path';

export async function getTranslations(locale = 'fr-FR') {
    console.log('📚 Locale reçue dans getTranslations:', locale);
    
    locale = locale.includes('-') 
        ? `${locale.split('-')[0]}-${locale.split('-')[1].toUpperCase()}`
        : locale;

    try {
        console.log('✅ Locale normalisée:', locale);
        const filePath = path.join(process.cwd(), 'public/locales', `${locale}.json`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Erreur lors du chargement des traductions pour ${locale}:`, error);
        return {}; // Retourne un objet vide en cas d'erreur
    }
}

