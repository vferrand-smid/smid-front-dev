'use client';

import { useEffect, useState } from "react";
import { getGeolocationData } from "@/services/ipapi";

export default function GeolocationTracker() {
    const [originCountry, setOriginCountry] = useState('');

    useEffect(() => {
        const fetchOriginCountry = async () => {
            console.log("Fetching geolocation data...");
            const data = await getGeolocationData();

            if (data) {
                console.log("Geolocation data received:", data);

                if (data.country_code) {
                    setOriginCountry(data.country_code);
                    console.log("Origin country set to:", data.country_code);

                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: 'page_view',
                        origin_country: data.country_code,
                    });
                    console.log("Data pushed to dataLayer:", {
                        event: 'page_view',
                        origin_country: data.country_code,
                    });
                } else {
                    console.log("Country code not found in data:", data);
                }
            } else {
                console.error("Failed to fetch geolocation data.");
            }
        };

        fetchOriginCountry();
    }, []);

    return null;  // Ce composant n'a pas besoin de rendre quoi que ce soit.
}
