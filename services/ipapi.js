import NodeCache from 'node-cache';

const ipCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 }); // TTL = 1 heure

export const getGeolocationData = async () => {
    const cachedData = ipCache.get('geolocation'); // Vérifier si les données sont en cache

    if (cachedData) {
        console.log('ipapi.js - Données récupérées depuis le cache');
        return cachedData; // Retourner les données du cache
    }

    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Erreur lors de l\'appel à IPAPI');
        }

        const data = await response.json();

        ipCache.set('geolocation', data); // Stocker les données dans le cache

        console.log('ipapi.js - Données récupérées depuis l\'API');
        return data;
    } catch (error) {
        console.error('Erreur de récupération des données IP :', error);
        return null;
    }
};
