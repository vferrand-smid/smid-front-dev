import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useTranslations from '@/utils/useTranslations';

const KalSearch = ({ page, locale }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [countries, setCountries] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isCountryPopupVisible, setIsCountryPopupVisible] = useState(false);
    const [isDocumentPopupVisible, setIsDocumentPopupVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
    const { translations, loading } = useTranslations(locale);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://smartphoneid-api--master-2yx5ebbula-ew.a.run.app/country/customized');
                if (response.ok) {
                    const data = await response.json();
                    const countries = data.Countries.map(country => ({
                        name: country.country_name,
                        flag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.country_code}.svg`,
                        code: country.country_code,
                    }));
                    setCountries(countries);
                }
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
                    const response = await fetch(`https://smartphoneid-api--master-2yx5ebbula-ew.a.run.app/price/from-country/current/to/${selectedCountry}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.result) {
                            const docs = data.result.map(doc => ({
                                name: doc.purpose.label,
                                img: doc.purpose.icon == null ? '' : doc.purpose.icon.url,
                                id: doc.id,
                            }));
                            setDocuments(docs);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching documents:', error);
                }
            }
        };

        fetchDocuments();
    }, [selectedCountry]);

    const handleCountrySelect = country => {
        setSelectedCountry(country.code);
        setIsCountryPopupVisible(false);
    };

    const handleDocumentSelect = doc => {
        setSelectedDocument(doc.id);
        setIsDocumentPopupVisible(false);
    };

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

	// Filtrer les pays en fonction de la requête de recherche
	const filteredCountries = countries.filter(country =>
		country.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (

		<div className="kal-search md:flex-row md:items-center md:justify-between p-4 md:max-sm:w-[400px] md:w-[750px] md:h-[115px] rounded-lg border-2 border-[#efefef] bg-white ">

			<div className="md:max-sm:grid md:max-sm:grid-rows-3 md:max-sm:justify-items-start md:max-sm:gap-4 md:flex md:flex-row w-full">

				{/* COUNTRY */}

				<div className="kal-search-countrys md:max-sm:fex w-full sm:w-auto sm:border-b-2 md:border-r-2 sm:border-b-gray-100 md:border-r-gray-100 relative pr-5">
					<div>
						<h4 className="text-left md:mt-4 md:ml-3 text-black font-['Georama'] text-[.9375rem] font-semibold leading-[normal]">
							{translations.kalSearch['titre_1']}
							<svg
								width="13"
								height="8"
								viewBox="0 0 13 8"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="inline ml-2 mr-4"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.6192 0.365305C12.1116 -0.121769 11.2884 -0.121769 10.7808 0.365305L6.5
									4.4723L2.21924 0.365304C1.71156 -0.121769 0.888443 -0.12177 0.380762 0.365304C-0.126921
									0.852378 -0.126921 1.64208 0.380762 2.12915L5.80769 7.33579C6.19459 7.70699 6.8054
									7.70699 7.19231 7.33579L12.6192 2.12916C13.1269 1.64208 13.1269 0.852379 12.6192 0.365305Z"
									fill="#2FC977"
								/>
							</svg>
						</h4>

					</div>


					{/* POP-UP COUNTRY */}

					<section className="flex gap-4 items-center p-4 cursor-pointer"
						onClick={() => setIsCountryPopupVisible(!isCountryPopupVisible)}
					>
						{selectedCountry && (
							<>
								<Image
									width={500}
									height={500}
									src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`}
									alt="country flag"
									className="w-10 h-10"
								/>
								<span
									className="text-base">{countries.find(c => c.code === selectedCountry)?.name}</span>
							</>
						)}
					</section>
					{isCountryPopupVisible && (
						<main className="kal-search-country-popup absolute shadow-lg rounded-lg p-2 mt-2 mr-4 z-10 bg-white">
							<div className="kal-search-country-search-container mb-4">
								<input
									type="text"
									placeholder="Rechercher un autre pays..."
									className="w-full p-2 border border-gray-300 rounded-md"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)} // Met à jour l'état de la requête de recherche
								/>
							</div>
							<div className="kal-search-country-search-suggestion overflow-y-auto grid grid-cols-2 gap-2 p-2">
								{filteredCountries.length > 0 ? (
									filteredCountries.map(country => (
										<div
											key={country.code}
											className={`flex items-center p-2 border ${selectedCountry === country.code ? 'border-green-500' : 'border-gray-300'}`}
											onClick={() => handleCountrySelect(country)}
										>
											<img src={country.flag} alt={country.name} className="w-8 h-8"/>
											<span className="ml-2">{country.name}</span>
										</div>
									))
								) : (
									<p className="col-span-2 text-center">Aucun pays trouvé</p>
								)}
							</div>
						</main>
					)}
				</div>

				{/* DOCUMENT */}

				<div className="kal-search-document relative pr-5">
					<div>
						<h4 className="text-left mt-4 text-black font-['Georama'] text-[.9375rem] font-semibold leading-[normal]">
							{translations.kalSearch['titre_2']} <span className="text-red-500">*</span>
							<svg
								width="13"
								height="8"
								viewBox="0 0 13 8"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="inline ml-2"
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
									src={documents.find(d => d.id === selectedDocument)?.img}
									alt="document icon"
									className="w-10 h-10"
								/>
								<span
									className="text-base">{documents.find(d => d.id === selectedDocument)?.name}</span>
							</>
						)}
						Choisissez le document
					</section>

					{/* POP-UP DOCUMENT */}

					{isDocumentPopupVisible && (
						<main className="kal-search-document-popup absolute shadow-lg rounded-lg p-2 mt-2 mr-4 z-10 bg-white">
							<div
								className="kal-search-document-search-suggestion overflow-y-auto grid grid-cols-2 gap-2 p-2">
								{documents.map(doc => (
									<div
										key={doc.id}
										className={`flex flex-col items-center p-2 border ${selectedDocument === doc.id ? 'border-green-500' : 'border-gray-300'}`}
										onClick={() => handleDocumentSelect(doc)}
									>
										<Image
											width={500}
											height={500}
											src={doc.img}
											alt={doc.name}
											className="w-10 h-10 object-contain"
										/>
										<span className="ml-2">{doc.name}</span>
									</div>
								))}
							</div>
						</main>
					)}
				</div>

				{/* BOUTON */}

				<button	className={`flex-shrink-0 h-[3.25rem] self-center rounded-[26px] bg-black text-white w-[148px] mx-auto ${selectedDocument ? '' : 'opacity-60 cursor-not-allowed'}`}
					onClick={() => {
						const platform = window.innerWidth > 700 ? 'desktop' : 'mobile';
						const userLanguage = navigator.language;
						const languageCode = userLanguage ? userLanguage.split('-')[0] : 'en';

						const url = selectedDocument && selectedCountry
							? `https://smartphone-id-app.com/${platform}/photo/${selectedDocument}/${selectedCountry}/${languageCode}`
							: `https://smartphone-id-app.com/${platform}/${languageCode}`;

						window.open(url, '_blank');
					}}
				>
					{translations.kalSearch['bouton']}
				</button>

			</div>

		</div>
	);

};

export default KalSearch;
