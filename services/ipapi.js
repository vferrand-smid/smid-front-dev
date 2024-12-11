export const getGeolocationData = async () => {
    try {
        const response = await fetch('https://freegeoip.app/json/');
        if (!response.ok) {
            throw new Error("Erreur lors de l'appel à FreeGeoIP");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de récupération des données IP :', error);
        return null;
    }
};