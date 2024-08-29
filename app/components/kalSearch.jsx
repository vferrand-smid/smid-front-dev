import React, { useState, useEffect } from 'react';
import styles from '../styles/KalSearch.module.css';
import Image from "next/image";
import useTranslations from '@/utils/useTranslations';

const KalSearch = ({ page, locale  }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [countries, setCountries] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isCountryPopupVisible, setIsCountryPopupVisible] = useState(false);
    const [isDocumentPopupVisible, setIsDocumentPopupVisible] = useState(false);
    const { translations, loading } = useTranslations(locale);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const language = document.documentElement.lang;
                let response = await fetch(
                    "https://smartphoneid-api--master-2yx5ebbula-ew.a.run.app/country/customized",
                    {
                        headers: {
                            language: language.split("-")[0],
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                console.log('Countries data:', data); // Log the data
                const countries = data.Countries.map((country) => ({
                    name: country?.country_name,
                    flag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country?.country_code}.svg`,
                    code: country.country_code,
                }));
                setCountries(countries);

                const currentCountry = await fetch("https://ipapi.co/country/");
                if (!currentCountry.ok) {
                    throw new Error(`HTTP error! status: ${currentCountry.status}`);
                }
                const countryCode = await currentCountry.text();
                console.log('Current country:', countryCode); // Log the current country
                setSelectedCountry(countryCode);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchDocuments = async () => {
            if (selectedCountry) {
                try {
                    const language = document.documentElement.lang;
                    let response = await fetch(
                        `https://smartphoneid-api--master-2yx5ebbula-ew.a.run.app/price/from-country/current/to/${selectedCountry}`,
                        {
                            headers: {
                                language: language.split("-")[0],
                            },
                        }
                    );
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    let data = await response.json();
                    console.log('Documents data:', data); // Log the data
                    const docs = data.result.map((doc) => ({
                        name: doc.purpose.label,
                        img: doc.purpose.icon == null ? "" : doc.purpose.icon.url,
                        id: doc.id,
                    }));
                    setDocuments(docs);
                } catch (error) {
                    console.error('Error fetching documents:', error);
                }
            }
        };

        fetchDocuments();
    }, [selectedCountry]);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country.code);
        setIsCountryPopupVisible(false);
    };

    const handleDocumentSelect = (doc) => {
        setSelectedDocument(doc.id);
        setIsDocumentPopupVisible(false);
    };

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

    return (
        <div className={styles['kal-search']}>
            <div className="flex flex-col md:flex-row w-full">
                <div className={`${styles['kal-search-country']}`}>
                    <div>
                        <h4>{translations.kalSearch["titre_1"]}
                            <svg
                                width="13"
                                height="8"
                                viewBox="0 0 13 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.6192 0.365305C12.1116 -0.121769 11.2884 -0.121769 10.7808 0.365305L6.5 4.4723L2.21924 0.365304C1.71156 -0.121769 0.888443 -0.12177 0.380762 0.365304C-0.126921 0.852378 -0.126921 1.64208 0.380762 2.12915L5.80769 7.33579C6.19459 7.70699 6.8054 7.70699 7.19231 7.33579L12.6192 2.12916C13.1269 1.64208 13.1269 0.852379 12.6192 0.365305Z"
                                    fill="#2FC977"
                                />
                            </svg>
                        </h4>
                    </div>
                    <section className="flex gap-4 items-center p-4 cursor-pointer"
                             onClick={() => setIsCountryPopupVisible(!isCountryPopupVisible)}>
                        {selectedCountry && (
                            <>
                                <Image
                                    width={500}
                                    height={500}
                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`}
                                    alt="country flag"/>
                                <span>{countries.find(c => c.code === selectedCountry)?.name}</span>
                            </>
                        )}
                    </section>
                    {isCountryPopupVisible && (
                        <main className={styles['kal-search-country-popup']}>
                            <div className={styles['kal-search-country-search-container']}>
                            <input type="text" placeholder="Rechercher un autre pays..." />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                            <div className={styles['kal-search-country-search-suggestion']}>
                                {countries.map((country) => (
                                    <div key={country.code} className={`${selectedCountry === country.code ? 'border-green-500' : 'border-gray-300'}`} onClick={() => handleCountrySelect(country)}>
                                        <Image
                                            width={500}
                                            height={500}
                                            src={country.flag} alt={country.name} />
                                        <span>{country.name}</span>
                                    </div>
                                ))}
                            </div>
                        </main>
                    )}
                </div>
                <div className={`${styles['kal-search-document']}`}>
                    <div>
                        <h4>{translations.kalSearch["titre_2"]} <span className="text-red-500">*</span>
                            <svg
                                width="13"
                                height="8"
                                viewBox="0 0 13 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.6192 0.365305C12.1116 -0.121769 11.2884 -0.121769 10.7808 0.365305L6.5 4.4723L2.21924 0.365304C1.71156 -0.121769 0.888443 -0.12177 0.380762 0.365304C-0.126921 0.852378 -0.126921 1.64208 0.380762 2.12915L5.80769 7.33579C6.19459 7.70699 6.8054 7.70699 7.19231 7.33579L12.6192 2.12916C13.1269 1.64208 13.1269 0.852379 12.6192 0.365305Z"
                                    fill="#2FC977"
                                />
                            </svg>
                        </h4>
                    </div>
                    <section className="flex gap-4 items-center p-4 cursor-pointer"
                             onClick={() => setIsDocumentPopupVisible(!isDocumentPopupVisible)}>
                        {selectedDocument && (
                            <>
                                <Image
                                    width={500}
                                    height={500}
                                    src={documents.find(d => d.id === selectedDocument)?.img} alt="document icon"/>
                                <span>{documents.find(d => d.id === selectedDocument)?.name}</span>
                            </>
                        )}
                    </section>
                    {isDocumentPopupVisible && (
                        <main className={styles['kal-search-document-popup']}>
                            <div className={styles['kal-search-document-search-suggestion']}>
                                {documents.map((doc) => (
                                    <div key={doc.id} className={`${selectedDocument === doc.id ? 'border-green-500' : 'border-gray-300'}`} onClick={() => handleDocumentSelect(doc)}>
                                        <Image
                                            width={500}
                                            height={500}
                                            src={doc.img} alt={doc.name} className="w-16 h-16 object-contain" />
                                        <span>{doc.name}</span>
                                    </div>
                                ))}
                            </div>
                        </main>
                    )}
                </div>
            </div>
            <button className={`button-photo ${selectedDocument ? '' : 'disabled'}`} onClick={() => {
                const platform = window.innerWidth > 700 ? "desktop" : "mobile";
                const url = selectedDocument && selectedCountry
                    ? `https://smartphone-id-app.com/${platform}/photo/${selectedDocument}/${selectedCountry}`
                    : `https://smartphone-id-app.com/${platform}`;
                window.open(url, "_blank");
            }}>
                {translations.kalSearch["bouton"]}
            </button>
        </div>
    );
};

export default KalSearch;