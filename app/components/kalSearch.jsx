'use client';
import { getGeolocationData } from '@/services/ipapi';
import useTranslations from '@/utils/useTranslations';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const KalSearch = ({ page, locale }) => {
    const [currentCountry, setCurrentCountry] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [countries, setCountries] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [documentTranslations, setDocumentTranslations] = useState({});
    const [isCountryPopupVisible, setIsCountryPopupVisible] = useState(false);
    const [isDocumentPopupVisible, setIsDocumentPopupVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const baseUrlAPI = process.env.NEXT_PUBLIC_API;
    const baseUrlWEBAPP = process.env.NEXT_PUBLIC_WEBAPP;
    const countryPopupRef = useRef(null);
    const documentPopupRef = useRef(null);

    // Utilisation de usePathname pour récupérer la locale depuis l'URL
    const pathname = usePathname();
    const urlLocale = pathname.split('/')[1] || 'fr-FR'; // Valeur par défaut si la locale n'est pas présente
    const effectiveLocale = locale || urlLocale;

    // Traductions selon la locale
    const { translations, loading } = useTranslations(effectiveLocale);

    // Récupération du pays de l'utilisateur via IP (côté client uniquement)
    useEffect(() => {
        const fetchUserCountry = async () => {
            try {
                const data = await getGeolocationData(); // Appelle la fonction centralisée
                console.log('kalSearch.jsx - ', data);
                if (data && data.country_code) {
                    setCurrentCountry(data.country_code); // Met à jour le code pays
                } else {
                    console.error('Impossible de récupérer le code pays.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données de géolocalisation :', error);
            }
        };

        fetchUserCountry();
    }, []); // Exécution unique au montage du composant

    // Utilisation directe de la locale de l'URL pour récupérer les deux dernières lettres (code pays) pour selectedCountry
    useEffect(() => {
        if (effectiveLocale) {
            const country = effectiveLocale.split('-')[1]?.toUpperCase(); // Extraire les deux dernières lettres
            setSelectedCountry(country);
        }
    }, [effectiveLocale]);

    // Récupération des pays depuis l'API
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${baseUrlAPI}/country/customized`, {
                    headers: {
                        language: effectiveLocale.split('-')[0], // Envoi du code de langue (par exemple 'fr' ou 'en')
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const countries = data.Countries.map((country) => ({
                        name: country.country_name,
                        flag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.country_code}.svg`,
                        code: country.country_code,
                    }));
                    setCountries(countries);
                }
            } catch (error) {
                console.error('kalSearch.jsx - Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, [baseUrlAPI, effectiveLocale]);

    // Récupération des documents selon le pays sélectionné
    useEffect(() => {
        if (!currentCountry || !selectedCountry) {
            return;
        }
        const fetchDocuments = async () => {
            try {
                const response = await fetch(`${baseUrlAPI}/price/from-country/${currentCountry}/to/${selectedCountry}`, {
                    headers: {
                        language: effectiveLocale.split('-')[0], // Envoi du code de langue (par exemple 'fr' ou 'en')
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    if (!data.result || !data.result.length) {
                        setDocuments([]);
                        return;
                    }

                    const docs = data.result.map((doc) => ({
                        id: doc.id,
                        name: documentTranslations[doc.purpose.label] || doc.purpose.label, // Traduction si disponible
                        img: doc.purpose.icon ? doc.purpose.icon.url : '',
                    }));
                    setDocuments(docs);
                } else {
                    setDocuments([]); // Réinitialise la liste si l'API ne répond pas correctement
                }
            } catch (error) {
                console.error('kalSearch.jsx - Erreur lors de la récupération des documents:', error);
                setDocuments([]);
            }
        };

        fetchDocuments();
    }, [currentCountry, selectedCountry, effectiveLocale, documentTranslations, baseUrlAPI]);

    // Gère la gestion de la fermeture des pop-ups lorsque l'utilisateur clique en dehors de celle-ci
    // Gère la gestion de la fermeture des popups
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Vérifie si le clic est en dehors des popups
            if (countryPopupRef.current && !countryPopupRef.current.contains(event.target)) {
                setIsCountryPopupVisible(false);
            }
            if (documentPopupRef.current && !documentPopupRef.current.contains(event.target)) {
                setIsDocumentPopupVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // GTM
    const triggerGTMEventOnPhotoButtonClick = () => {
        if (window && window.dataLayer) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'chose_destination',
                destination: selectedCountry, // Pays sélectionné
            });
            console.log('GTM Event Triggered on Button Click: ', {
                event: 'chose_destination',
                destination: selectedCountry,
            });
        }
    };

    // Sélection d'un document
    const handleDocumentSelect = (doc) => {
        setSelectedDocument(doc.id);
        setIsDocumentPopupVisible(false);
    };

    // Gestion du changement de pays via le pop-up
    const handleCountryChange = (country) => {
        if (selectedCountry === country.code) {
            setIsCountryPopupVisible(false); // Fermer la popup même si le pays est le même
            return; // Ne pas réinitialiser les documents
        }
        setSelectedCountry(country.code); // Met à jour le pays sélectionné
        setIsCountryPopupVisible(false); // Ferme la popup après la sélection
        setDocuments([]); // Réinitialise la liste des documents pour forcer un nouvel appel API
        setSelectedDocument(null); // Réinitialise le document sélectionné
    };

    // Désactive le bouton si une sélection est manquante
    const isButtonDisabled = !selectedDocument || !currentCountry || !selectedCountry;

    // Mappage des locales vers les langues correspondantes
    const localeToLanguageMap = {
        'ar-SA': 'ar',
        'ar-AE': 'ar',
        ar: 'ar',
        'de-CH': 'de',
        'de-DE': 'de',
        de_DE: 'de',
        de: 'de',
        'en-AU': 'en',
        'en-CA': 'en',
        'en-GB': 'en',
        'en-IE': 'en',
        'en-IN': 'en',
        'en-NG': 'en',
        'en-NZ': 'en',
        'en-SG': 'en',
        'en-US': 'en',
        en: 'en',
        'en-ZA': 'en',
        'es-AR': 'es',
        'es-CO': 'es',
        'es-ES': 'es',
        es: 'es',
        'es-MX': 'es',
        'et-EE': 'et',
        et: 'et',
        'fr-BE': 'fr',
        'fr-CA': 'fr',
        'fr-CH': 'fr',
        'fr-FR': 'fr',
        fr: 'fr',
        'it-IT': 'it',
        it: 'it',
        'nl-BE': 'nl',
        'nl-NL': 'nl',
        nl: 'nl',
        'pl-PL': 'pl',
        'pt-BR': 'pt-BR',
        pt: 'pt-BR',
        'pt-PT': 'pt-PT',
        'ru-RU': 'ru',
        ru: 'ru',
        'sv-SE': 'sv',
        sv: 'sv',
        zh: 'cn',
        'zh-CN': 'cn',
        // Ajoute d'autres locales ici si nécessaire
    };

    // Logique pour générer l'URL uniquement lors du clic
    const handleGenerateUrl = async () => {
        // Déclencher l'événement GTM
        triggerGTMEventOnPhotoButtonClick();

        const platform = window.innerWidth > 700 ? 'desktop' : 'mobile';
        let language = localeToLanguageMap[effectiveLocale] || effectiveLocale.split('-')[0]; // Utilise le mappage si disponible, sinon utilise la partie langue
        let countryCode = currentCountry?.toLowerCase(); // Code du pays en minuscule

        // Utilisation du code pays pour les majuscules
        if (selectedCountry) {
            countryCode = selectedCountry.toLowerCase();
        }

        const url =
            selectedDocument && selectedCountry && currentCountry
                ? `${baseUrlWEBAPP}/${platform}/photo/${selectedDocument}/${selectedCountry}/${language}`
                : `${baseUrlWEBAPP}/${platform}/${language}`;

        window.open(url, '_blank');
    };

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

    // Filtrer les pays en fonction de la requête de recherche
    const filteredCountries = countries.filter((country) => country.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className='kal-search isolate mr-28 mt-10 box-border flex w-full flex-col gap-2.5 rounded-lg border-2 border-gray-300 bg-white p-2.5 md:w-[700px] lg:flex-row'>
            {/* COUNTRY */}
            <div className='relative flex w-full flex-[5]'>
                <div className='kal-search-country flex w-full flex-col gap-2.5 border-gray-300 pr-5 lg:border-r-2 lg:pl-0 lg:pr-0'>
                    <div
                        className='cursor-pointer'
                        onClick={() => {
                            setIsCountryPopupVisible(!isCountryPopupVisible);
                            console.log('État de la popup :', !isCountryPopupVisible); // Log de test
                        }}
                    >
                        <h4 className='flex items-baseline gap-1 font-semibold leading-normal text-black'>
                            1. {translations.kalSearch.titre_1} <span className='flex text-red-500'>*</span>
                            <svg
                                className='m-2 cursor-pointer'
                                width='13'
                                height='8'
                                viewBox='0 0 13 8'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M12.6192 0.365305C12.1116 -0.121769 11.2884 -0.121769 10.7808 0.365305L6.5 4.4723L2.21924 0.365304C1.71156 -0.121769 0.888443 -0.12177 0.380762 0.365304C-0.126921 0.852378 -0.126921 1.64208 0.380762 2.12915L5.80769 7.33579C6.19459 7.70699 6.8054 7.70699 7.19231 7.33579L12.6192 2.12916C13.1269 1.64208 13.1269 0.852379 12.6192 0.365305Z'
                                    fill='#2FC977'
                                />
                            </svg>
                        </h4>
                    </div>
                    <section
                        className='box-border flex h-[60px] w-full cursor-pointer items-center gap-2.5 p-2.5'
                        onClick={() => setIsCountryPopupVisible(!isCountryPopupVisible)}
                    >
                        {selectedCountry && (
                            <>
                                <Image
                                    width={500}
                                    height={500}
                                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`}
                                    alt={`${selectedCountry} flag`}
                                    className='h-full max-h-[30px] w-full max-w-[30px] object-contain'
                                />
                                <p>{countries.find((c) => c.code === selectedCountry)?.name || 'Sélectionner un pays'}</p>
                            </>
                        )}
                    </section>
                    {/* POP-UP COUNTRY */}
                    {isCountryPopupVisible && (
                        <main
                            className='kal-search-country-popup max-lg:z-2 absolute bottom-0 left-0 z-20 -ml-3 flex max-h-[400px] min-h-[400px] w-full flex-1 translate-y-full transform flex-col gap-2.5 rounded-b-lg border-2 border-t-0 border-gray-300 bg-white max-lg:w-[calc(100%+24px)] lg:w-[calc(100%+12px)]'
                            ref={countryPopupRef}
                        >
                            <div className='kal-search-country-search-container m-2.5 box-border flex items-center justify-between rounded-lg border-2 border-gray-300 bg-gray-300 p-2.5 transition-all duration-200 focus-within:border-green-500'>
                                <input
                                    type='text'
                                    placeholder='Rechercher un autre pays...'
                                    className='w-full max-w-[80%] flex-1 rounded-md border border-none border-gray-300 bg-transparent p-0 text-base text-gray-600 outline-none'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} // Met à jour l'état de la requête de recherche
                                />
                            </div>
                            <div className='kal-search-country-search-suggestion no-scrollbar line-height-1 grid grid-cols-2 gap-2.5 overflow-y-auto p-2.5'>
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                        <div
                                            key={country.code}
                                            className={`flex cursor-pointer items-center gap-2.5 rounded-sm border-2 border-gray-300 p-2.5 text-sm transition-all duration-200 ${selectedCountry === country.code ? 'border-green-500' : 'border-gray-300'}`}
                                            onClick={() => handleCountryChange(country)}
                                        >
                                            <Image
                                                width={300}
                                                height={300}
                                                src={country.flag}
                                                alt={country.name}
                                                className='h-full max-h-[20px] w-full max-w-[20px] object-contain'
                                            />
                                            <span className='ml-2'>{country.name}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className='col-span-2 text-center text-base font-normal leading-[1.33] text-gray-700'>
                                        Aucun pays trouvé
                                    </p>
                                )}
                            </div>
                        </main>
                    )}
                </div>
            </div>

            {/* DOCUMENT */}
            <div className='relative flex flex-[6] flex-col gap-3 lg:flex-row'>
                <div className='kal-search-document relative flex w-full flex-1 flex-col gap-2.5'>
                    <div
                        className='cursor-pointer'
                        onClick={() => {
                            // Fermer la liste des pays si elle est ouverte
                            if (isCountryPopupVisible) {
                                setIsCountryPopupVisible(false);
                            }
                            // Ouvrir/fermer la liste des documents
                            setIsDocumentPopupVisible(!isDocumentPopupVisible);
                        }}
                    >
                        <h4 className='flex items-baseline gap-1 font-semibold leading-normal text-black'>
                            2. {translations.kalSearch.titre_2} <span className='text-red-500'>*</span>
                            <svg
                                className='m-2 cursor-pointer'
                                width='13'
                                height='8'
                                viewBox='0 0 13 8'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                onClick={() => setIsDocumentPopupVisible(!isDocumentPopupVisible)}
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M12.6192 0.365305C12.1116 -0.121769 11.2884 -0.121769 10.7808 0.365305L6.5
									  4.4723L2.21924 0.365304C1.71156 -0.121769 0.888443 -0.12177 0.380762 0.365304C-0.126921
									  0.852378 -0.126921 1.64208 0.380762 2.12915L5.80769 7.33579C6.19459 7.70699 6.8054
									  7.70699 7.19231 7.33579L12.6192 2.12916C13.1269 1.64208 13.1269 0.852379 12.6192 0.365305Z'
                                    fill='#2FC977'
                                />
                            </svg>
                        </h4>
                    </div>
                    {/* POP-UP DOCUMENT */}
                    <section
                        className='box-border flex h-[60px] w-full cursor-pointer gap-2.5 p-2.5'
                        onClick={() => setIsDocumentPopupVisible(!isDocumentPopupVisible)}
                    >
                        {selectedDocument ? (
                            <div className='flex items-center gap-2.5'>
                                <Image
                                    width={500}
                                    height={500}
                                    src={documents.find((d) => d.id === selectedDocument)?.img}
                                    alt='document icon'
                                    className={`h-[40px] w-full max-w-[40px] object-contain`}
                                />
                                {documents.find((d) => d.id === selectedDocument)?.name}
                            </div>
                        ) : (
                            <div>
                                <p className='custom-1101 text-base font-normal leading-[1.33] text-gray-700'>
                                    {translations.kalSearch.document || 'Choose the document'}
                                </p>
                            </div>
                        )}
                    </section>
                </div>

                {/* BOUTON */}
                <button
                    onClick={() => {
                        handleGenerateUrl();
                        if (window.fbq) {
                            window.fbq('track', 'PixelButtonClick', {
                                content_name: 'Clique Bouton Photo',
                                category: 'User Interaction',
                            });
                        }
                    }}
                    disabled={!selectedDocument || !selectedCountry}
                    className={`button-photo h-fit cursor-pointer self-center rounded-full bg-black p-2 text-center text-sm font-semibold text-white ${
                        selectedDocument && selectedCountry
                            ? '' // Bouton actif : aucun style supplémentaire
                            : 'pointer-events-none cursor-not-allowed opacity-50' // Bouton désactivé
                    }`}
                >
                    3. {translations.kalSearch.bouton}
                </button>

                {isDocumentPopupVisible && (
                    <main
                        className='kal-search-document-popup max-lg:z-2 absolute bottom-0 left-0 z-20 -ml-3 flex max-h-[400px] min-h-[400px] w-full flex-1 translate-y-full transform flex-col gap-2.5 rounded-b-lg border-2 border-t-0 border-gray-300 bg-white max-lg:w-[calc(100%+24px)] max-lg:translate-y-[85%] lg:w-[calc(100%+24px)]'
                        ref={documentPopupRef}
                    >
                        <div className='kal-search-document-search-suggestion no-scrollbar grid w-full auto-rows-[150px] grid-cols-2 gap-2.5 overflow-y-auto p-2.5 hover:border-green-500/50'>
                            {documents.length > 0 ? (
                                documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className={`md flex cursor-pointer flex-col items-center gap-4 rounded-sm border border-gray-300 p-2 text-center leading-none transition-all duration-200 hover:border-green-500/50 lg:p-2.5 lg:text-base ${selectedDocument === doc.id ? 'border-green-500' : 'border-gray-300'}`}
                                        onClick={() => handleDocumentSelect(doc)}
                                    >
                                        <Image
                                            width={500}
                                            height={500}
                                            src={doc.img}
                                            alt={doc.name}
                                            className='h-[70px] w-[70px] flex-shrink-0 flex-grow-0 object-contain'
                                        />
                                        <span className='ml-2'>{doc.name}</span>
                                    </div>
                                ))
                            ) : (
                                <p className='hidden text-center'>Aucun document disponible</p>
                            )}
                        </div>
                    </main>
                )}
            </div>
        </div>
    );
};

export default KalSearch;
