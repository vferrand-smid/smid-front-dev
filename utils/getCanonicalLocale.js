// utils/getCanonicalLocale.js
export function getCanonicalLocale(lang) {
    if (!lang) return 'fr-FR';

    const lowerLang = lang.toLowerCase();

    // Corrige la casse uniquement (fr-ca -> fr-CA)
    const parts = lowerLang.split('-');
    if (parts.length === 2) {
        return `${parts[0]}-${parts[1].toUpperCase()}`;
    }

    // Si c’est une langue seule → fallback vers version canonique
    const fallbackMap = {
        fr: 'fr-FR',
        en: 'en-US',
        de: 'de-DE',
        es: 'es-ES',
        // Ajoute selon besoin
    };

    return fallbackMap[lowerLang] || 'fr-FR';
}
