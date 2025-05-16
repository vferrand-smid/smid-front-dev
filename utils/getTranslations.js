import fs from 'fs';
import path from 'path';

export async function getTranslations(locale = 'fr-FR') {
    console.log('📚 Locale reçue dans getTranslations:', locale);

    try {
        const filePath = path.join(process.cwd(), 'public/locales', `${locale}.json`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`❌ Erreur chargement ${locale}.json`, error);
        return {};
    }
}
