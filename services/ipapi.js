export const getGeolocationData = async () => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('La réponse du réseaux n\'est pas bonne');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur de récupération des données IP:', error);
        return null;
    }
};
