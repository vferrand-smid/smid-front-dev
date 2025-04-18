export function getCanonicalLocale(locale) {
    if (!locale) return 'fr-FR';
    if (locale.includes('_')) {
        locale = locale.replace('_', '-');
    }
    const [lang, region] = locale.split('-');
    return `${lang.toLowerCase()}-${region?.toUpperCase()}`;
}
