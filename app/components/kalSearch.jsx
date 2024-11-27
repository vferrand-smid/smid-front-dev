import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import useTranslations from '@/utils/useTranslations';

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
				const response = await fetch('https://ipapi.co/country/');
				const countryCode = await response.text();
				setCurrentCountry(countryCode);
			} catch (error) {
				console.error('Error fetching user country:', error);
			}
		};
		fetchUserCountry();
	}, []);

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
					const response = await fetch(`${baseUrlAPI}/country/customized`,
					{
						headers: {
							'language': effectiveLocale.split('-')[0], // Envoi du code de langue (par exemple 'fr' ou 'en')
						},
					}
				);
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
					const response = await fetch(
					`${baseUrlAPI}/price/from-country/${currentCountry}/to/${selectedCountry}`,
					{
						headers: {
							'language': effectiveLocale.split('-')[0], // Envoi du code de langue (par exemple 'fr' ou 'en')
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					console.log("kalSearch.jsx - Documents reçus depuis l'API :", data);

					if (!data.result || !data.result.length) {
						setDocuments([]);
						return;
					}

					const docs = data.result.map(doc => ({
						id: doc.id,
						name: documentTranslations[doc.purpose.label] || doc.purpose.label, // Traduction si disponible
						img: doc.purpose.icon ? doc.purpose.icon.url : "",
					}));
					setDocuments(docs);
				}
			} catch (error) {
				console.error('kalSearch.jsx - Erreur lors de la récupération des documents:', error);
			}
		};

		fetchDocuments();
	}, [currentCountry, selectedCountry, effectiveLocale, documentTranslations, baseUrlAPI]);

	// GTM
	const triggerGTMEventOnPhotoButtonClick = () => {
		if (window && window.dataLayer) {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				event: "chose_destination",
				destination: selectedCountry, // Pays sélectionné
			});
			console.log("GTM Event Triggered on Button Click: ", {
				event: "chose_destination",
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
		setSelectedCountry(country.code); // Met à jour le pays sélectionné
		setIsCountryPopupVisible(false);  // Ferme la popup après la sélection
		setDocuments([]); // Réinitialise la liste des documents pour forcer un nouvel appel API
	};

	// Désactive le bouton si une sélection est manquante
	const isButtonDisabled = !selectedDocument || !currentCountry || !selectedCountry;

	// Mappage des locales vers les langues correspondantes
	const localeToLanguageMap = {
		'ar-SA': 'ar',
		'ar-AE': 'ar',
		'ar': 'ar',
		'de-CH': 'de',
		'de-DE': 'de',
		'de_DE': 'de',
		'de': 'de',
		'en-AU': 'en',
		'en-CA': 'en',
		'en-GB': 'en',
		'en-IE': 'en',
		'en-IN': 'en',
		'en-NG': 'en',
		'en-NZ': 'en',
		'en-SG': 'en',
		'en-US': 'en',
		'en': 'en',
		'en-ZA': 'en',
		'es-AR': 'es',
		'es-CO': 'es',
		'es-ES': 'es',
		'es': 'es',
		'es-MX': 'es',
		'et-EE': 'et',
		'et': 'et',
		'fr-BE': 'fr',
		'fr-CA': 'fr',
		'fr-CH': 'fr',
		'fr-FR': 'fr',
		'fr': 'fr',
		'it-IT': 'it',
		'it': 'it',
		'nl-BE': 'nl',
		'nl-NL': 'nl',
		'nl': 'nl',
		'pl-PL': 'pl',
		'pt-BR': 'pt-BR',
		'pt': 'pt-BR',
		'pt-PT': 'pt-PT',
		'ru-RU': 'ru',
		'ru': 'ru',
		'sv-SE': 'sv',
		'sv': 'sv',
		'zh': 'cn',
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

		const url = selectedDocument && selectedCountry && currentCountry
			? `${baseUrlWEBAPP}/${platform}/photo/${selectedDocument}/${selectedCountry}/${language}`
			: `${baseUrlWEBAPP}/${platform}/${language}`;

		window.open(url, '_blank');
	};

	if (loading) {
		return <div>Loading...</div>; // or any loading indicator you prefer
	}

	// Filtrer les pays en fonction de la requête de recherche
	const filteredCountries = countries.filter(country =>
		country.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="kal-search mr-28">
			{/* COUNTRY */}
			<div>
				<div className="kal-search-country">
					<div>
						<h4 className="flex gap-1 items-baseline">
							1. {translations.kalSearch.titre_1}
							<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg"
								 onClick={() => setIsCountryPopupVisible(!isCountryPopupVisible)}
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
					<section
						className="flex gap-4 items-center p-4 cursor-pointer"
						onClick={() => setIsCountryPopupVisible(!isCountryPopupVisible)}
					>
						{selectedCountry && (
							<>
								<Image
									width={500}
									height={500}
									src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`}
									alt={`${selectedCountry} flag`}
									className="w-10 h-10"
								/>
								<p>{countries.find(c => c.code === selectedCountry)?.name || "Sélectionner un pays"}</p>
							</>
						)}
					</section>
					{/* POP-UP COUNTRY */}
					{isCountryPopupVisible && (
						<main className="kal-search-country-popup" style={{ display: 'flex' }}>
							<div className="kal-search-country-search-container">
								<input
									type="text"
									placeholder="Rechercher un autre pays..."
									className="w-full p-2 border border-gray-300 rounded-md"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)} // Met à jour l'état de la requête de recherche
								/>
							</div>
							<div className="kal-search-country-search-suggestion">
								{filteredCountries.length > 0 ? (
									filteredCountries.map(country => (
										<div
											key={country.code}
											className={`flex items-center p-2 border ${selectedCountry === country.code ? 'border-green-500' : 'border-gray-300'}`}
											onClick={() => handleCountryChange(country)}
										>
											<Image
												width={500}
												height={500} src={country.flag} alt={country.name} className="w-8 h-8" />
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
			</div>

			{/* DOCUMENT */}
			<div>
				<div className="kal-search-document">
					<h4 className="flex gap-1 items-baseline">
						2. {translations.kalSearch.titre_2} <span className="text-red-500">*</span>
						<svg
							width="13"
							height="8"
							viewBox="0 0 13 8"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							onClick={() => setIsDocumentPopupVisible(!isDocumentPopupVisible)}
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
					{/* POP-UP DOCUMENT */}
					<section className="flex gap-4 items-center p-4 cursor-pointer"
							 onClick={() => setIsDocumentPopupVisible(!isDocumentPopupVisible)}>
						{selectedDocument ? (
							<section className="search-document">
								<Image
									width={500}
									height={500}
									src={documents.find(d => d.id === selectedDocument)?.img}
									alt="document icon"
								/>
								{documents.find(d => d.id === selectedDocument)?.name}
							</section>
						) : (
							<section className="search-document"></section>
						)}
					</section>
				</div>

				{/* BOUTON */}
				<button
					onClick={() => {
						console.log('Clic sur le bouton générer');
						handleGenerateUrl();
					}}
					disabled={!selectedDocument || !selectedCountry}
					className={`button-photo ${selectedDocument && selectedCountry ? '' : 'disabled'}`}
				>
					3. {translations.kalSearch.bouton}
				</button>

				{isDocumentPopupVisible && (
					<main className="kal-search-document-popup flex">
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
		</div>
	);
};

export default KalSearch;