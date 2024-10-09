import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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

	const searchParams = useSearchParams(); // Récupérer les paramètres d'URL
	const urlLocale = searchParams.get('locale'); // Récupérer la locale depuis l'URL si présente

	// Locale effective (URL ou prop)
	const effectiveLocale = locale || urlLocale;

	// Traductions selon la locale
	const { translations, loading } = useTranslations(effectiveLocale);

	// Utilisation directe de la locale de l'URL pour récupérer les deux dernières lettres (code pays) pour selectedCountry
	useEffect(() => {
		if (effectiveLocale) {
			const country = effectiveLocale.split('-')[1]?.toUpperCase(); // Extraire les deux dernières lettres
			console.log("kalSearch.jsx - effective locale (selectedCountry):", country);
			setSelectedCountry(country);
		}
	}, [effectiveLocale]);

	// Définir currentCountry également à partir de la locale (logique similaire)
	useEffect(() => {
		if (effectiveLocale) {
			const countryCode = effectiveLocale.split('-')[1]?.toUpperCase(); // Utilisation du code pays
			console.log("kalSearch.jsx - effective locale (currentCountry):", countryCode);
			setCurrentCountry(countryCode); // Utilisation du code pays pour currentCountry
		}
	}, [effectiveLocale]);

	// Récupération des pays depuis l'API
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
				} else {
					console.error('Erreur API :', response.statusText);
				}
			} catch (error) {
				console.error('Erreur lors de la récupération des pays:', error);
			}
		};
		fetchCountries();
	}, []);

	// Récupération des documents selon le pays sélectionné
	useEffect(() => {
		// Vérification approfondie de currentCountry et selectedCountry avant de lancer l'API
		if (!currentCountry || !selectedCountry) {
			console.log('currentCountry ou selectedCountry non défini, impossible d\'appeler l\'API');
			return;
		}

		console.log("kalSearch.jsx - Tentative d'appel à l'API :", currentCountry, selectedCountry);
		const fetchDocuments = async () => {
			try {
				const response = await fetch(
					`https://smartphoneid-api--master-2yx5ebbula-ew.a.run.app/price/from-country/${selectedCountry}/to/${selectedCountry}`,
					{
						headers: {
							'language': effectiveLocale.split('-')[0], // Envoi du code de langue (par exemple 'fr' ou 'en')
						},
					}
				);
				console.log("kalSearch.jsx - Réponse de l'API :", response);

				if (response.ok) {
					const data = await response.json();
					console.log("kalSearch.jsx - Documents reçus depuis l'API :", data);

					// Vérification si data.result est défini
					if (!data.result || !data.result.length) {
						console.error("Aucun document trouvé dans les résultats de l'API.");
						setDocuments([]);
						return;
					}

					const docs = data.result.map(doc => ({
						id: doc.id,
						name: documentTranslations[doc.purpose.label] || doc.purpose.label, // Traduction si disponible
						img: doc.purpose.icon ? doc.purpose.icon.url : "",
					}));
					setDocuments(docs);
				} else {
					console.error('Erreur API :', response.statusText);
				}
			} catch (error) {
				console.error('Erreur lors de la récupération des documents:', error);
			}
		};

		fetchDocuments();
	}, [currentCountry, selectedCountry, effectiveLocale, documentTranslations]);

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

	if (loading) {
		return <div>Loading...</div>; // or any loading indicator you prefer
	}

	// Filtrer les pays en fonction de la requête de recherche
	const filteredCountries = countries.filter(country =>
		country.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="kal-search">
			{/* COUNTRY */}
			<div>
				<div className="kal-search-country">
					<div>
						<h4 className="flex gap-1 items-baseline">
							{translations.kalSearch['titre_1']}
							<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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
											<img src={country.flag} alt={country.name} className="w-8 h-8" />
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
						{translations.kalSearch['titre_2']} <span className="text-red-500">*</span>
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
								d="M12.6192 0.365305C12.1116 -0.121769 11.2884 -0.121769 10.7808 0.365305L6.5
                  4.4723L2.21924 0.365304C1.71156 -0.121769 0.888443 -0.12177 0.380762 0.365304C-0.126921
                  0.852378 -0.126921 1.64208 0.380762 2.12915L5.80769 7.33579C6.19459 7.70699 6.8054
                  7.70699 7.19231 7.33579L12.6192 2.12916C13.1269 1.64208 13.1269 0.852379 12.6192 0.365305Z"
								fill="#2FC977"
							/>
						</svg>
					</h4>
					{/* POP-UP DOCUMENT */}
					<section className="flex gap-4 items-center p-4 cursor-pointer" onClick={() => setIsDocumentPopupVisible(!isDocumentPopupVisible)}>
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
					className={`button-photo message ${selectedDocument ? '' : 'opacity-60 cursor-not-allowed'}`}
					onClick={async () => {
						const platform = window.innerWidth > 700 ? 'desktop' : 'mobile';

						const url = selectedDocument && selectedCountry && currentCountry
							? `https://smartphone-id-app.com/${platform}/photo/${selectedDocument}/${selectedCountry}/${currentCountry.toLowerCase()}`
							: `https://smartphone-id-app.com/${platform}/`;

						console.log("URL générée:", url);  // Debugging: vérifier l'URL générée
						window.open(url, '_blank');
					}}
					disabled={isButtonDisabled}
				>
					{translations.kalSearch['bouton']}
				</button>

				{isDocumentPopupVisible && (
					<main className="kal-search-document-popup flex">
						<div className="kal-search-document-search-suggestion overflow-y-auto grid grid-cols-2 gap-2 p-2">
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







/*
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
    const { translations, loading } = useTranslations(locale);

	const languageCountryMap = {
		'ar-SA': 'SA',
		'ar-AE': 'AE',
		'ar': 'AE',
		'de-CH': 'CH',
		'de-DE': 'DE',
		'de': 'DE',
		'en-AU': 'AU',
		'en-CA': 'CA',
		'en-GB': 'GB',
		'en-IE': 'IE',
		'en-IN': 'IN',
		'en-NG': 'NG',
		'en-NZ': 'NZ',
		'en-SG': 'SG',
		'en-US': 'US',
		'en': 'US',
		'en-ZA': 'ZA',
		'es-AR': 'AR',
		'es-CO': 'CO',
		'es-ES': 'ES',
		'es': 'ES',
		'es-MX': 'MX',
		'et-EE': 'EE',
		'et': 'EE',
		'fr-BE': 'BE',
		'fr-CA': 'CA',
		'fr-CH': 'CH',
		'fr-FR': 'FR',
		'fr': 'FR',
		'it-IT': 'IT',
		'it': 'IT',
		'nl-BE': 'BE',
		'nl-NL': 'NL',
		'nl': 'NL',
		'pl-PL': 'PL',
		'pt-BR': 'BR',
		'pt': 'BR',
		'pt-PT': 'PT',
		'ru-RU': 'RU',
		'ru': 'RU',
		'sv-SE': 'SE',
		'sv': 'SE',
		'zh': 'CN',
		'zh-CN': 'CN'
		// Ajoute ici d'autres langues et pays si nécessaire
	};

	// Récupération du pays utilisateur (Navigateur)
	useEffect(() => {
		const detectBrowserLanguage = () => {
			const browserLanguage = navigator.language || navigator.languages[0]; // Utiliser la langue du navigateur
			const languageCode = browserLanguage.split('-')[0]; // Extraire le code de langue (par exemple, 'fr' de 'fr-FR')

			console.log("Langue détectée via le navigateur:", browserLanguage);

			// Utiliser languageCountryMap pour mapper la langue à un code de pays si nécessaire
			const country = languageCountryMap[browserLanguage] || languageCountryMap[languageCode] || 'US'; // Par défaut, 'US' si la langue n'est pas trouvée
			setCurrentCountry(browserLanguage);
			setSelectedCountry(country);
		};

		detectBrowserLanguage(); // Appeler la fonction lors du chargement du composant
	}, []);

	// Récupération du pays utilisateur (IP)
	/!*useEffect(() => {
		const fetchUserLocation = async () => {
			try {
				const response = await fetch('https://ipapi.co/json/');
				const data = await response.json();
				console.log("Données IP:", data);
				// Récupérer la langue et extraire les deux premières lettres
				const languages = data.languages ? data.languages.split(',')[0] : 'en';
				const languageCode = languages.substring(0, 2); // Prendre les deux premières lettres
				console.log("Langue détectée:", languageCode);

				// Utiliser le code de pays ou de langue selon le besoin
				if (data.country_code === 'AR') {
					setCurrentCountry('es-AR');
					setSelectedCountry('AR');
				} else {
					setCurrentCountry(languageCode);
					setSelectedCountry(data.country_code);
				}
			} catch (error) {
				console.error('Erreur lors de la récupération des données via IP:', error);
			}
		};
		fetchUserLocation();
	}, []);*!/

	// Récupération des pays depuis l'API
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
				} else {
					console.error('Erreur API: Réponse non OK', response.status);
				}
			} catch (error) {
				console.error('Erreur lors de la récupération des pays:', error);
			}
		};
		fetchCountries();
	}, []);

	useEffect(() => {
		const fetchDocumentTranslations = async () => {
			try {
				const response = await fetch(`https://bo.smartphone-id.com/translations/purposes?lang=${locale.split('-')[0]}`);
				const data = await response.json();
				setDocumentTranslations(data.purposes); // Assigner les traductions à l'état
			} catch (error) {
				console.error('Erreur lors de la récupération des traductions de documents:', error);
			}
		};

		fetchDocumentTranslations(); // Appeler la fonction pour charger les traductions
	}, [locale]);

	// Récupération des documents selon le pays sélectionné
	useEffect(() => {
		const fetchDocuments = async () => {
			if (selectedCountry) {
				try {
					const response = await fetch(
						`https://smartphoneid-api--master-2yx5ebbula-ew.a.run.app/price/from-country/${currentCountry}/to/${selectedCountry}`
					);
					if (response.ok) {
						const data = await response.json();
						if (data.result) {
							const docs = data.result.map(doc => ({
								id: doc.id,
								name: documentTranslations[doc.purpose.label] || doc.purpose.label, // Utiliser la traduction si disponible
								img: doc.purpose.icon == null ? '' : doc.purpose.icon.url,
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
	}, [selectedCountry, currentCountry, locale, documentTranslations]);


	const handleCountrySelect = (country )=> {
        setSelectedCountry(country.code);
        setIsCountryPopupVisible(false);
		setSelectedDocument(null);
	};

    const handleDocumentSelect = (doc) => {
        setSelectedDocument(doc.id);
        setIsDocumentPopupVisible(false);
    };

	// Désactive le bouton si une sélection est manquante;
	const isButtonDisabled = !selectedDocument || !currentCountry || !selectedCountry;

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

	// Filtrer les pays en fonction de la requête de recherche
	const filteredCountries = countries.filter(country =>
		country.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (

		<div className="kal-search">


				{/!* COUNTRY *!/}

				<div>
					<div className='kal-search-country'>
						<div>
							<h4 className='flex gap-1 items-baseline'>
								{translations.kalSearch['titre_1']}
								<svg width="13" height="8" viewBox="0 0 13 8" fill="none"
									 xmlns="http://www.w3.org/2000/svg">
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
						<section className="flex gap-4 items-center p-4 cursor-pointer"
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
									<p>{countries.find(c => c.code.toUpperCase() === selectedCountry)?.name || "Sélectionner un pays"}</p>
								</>
							)}
						</section>
						{isCountryPopupVisible && (
							<main
								className="kal-search-country-popup" style={{display: 'flex'}}>
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

					{/!* POP-UP COUNTRY *!/}


				</div>

			{/!* DOCUMENT *!/}

			<div>
				<div className='kal-search-document'>
					<h4 className='flex gap-1 items-baseline'>
						{translations.kalSearch['titre_2']} <span className="text-red-500">*</span>
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
								d="M12.6192 0.365305C12.1116 -0.121769 11.2884 -0.121769 10.7808 0.365305L6.5
									4.4723L2.21924 0.365304C1.71156 -0.121769 0.888443 -0.12177 0.380762 0.365304C-0.126921
									0.852378 -0.126921 1.64208 0.380762 2.12915L5.80769 7.33579C6.19459 7.70699 6.8054
									7.70699 7.19231 7.33579L12.6192 2.12916C13.1269 1.64208 13.1269 0.852379 12.6192 0.365305Z"
								fill="#2FC977"
							/>
						</svg>
					</h4>
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
							) :
							<section className="search-document"></section>
						}
					</section>
				</div>


				{/!* POP-UP DOCUMENT *!/}


				<button
					className={`button-photo message ${selectedDocument ? '' : 'opacity-60 cursor-not-allowed'}`}
					onClick={async () => {
						const platform = window.innerWidth > 700 ? 'desktop' : 'mobile';

						// Récupérer le pays via l'IP au moment du clic
						let countryCodeFromIP = currentCountry;  // Utiliser l'état actuel si déjà défini
						if (!currentCountry) {
							try {
								const response = await fetch('https://ipapi.co/country/');
								countryCodeFromIP = await response.text();
								setCurrentCountry(countryCodeFromIP);  // Mettre à jour l'état si nécessaire
								console.log("Pays récupéré via IP:", countryCodeFromIP);  // Debugging: vérifier le pays récupéré
							} catch (error) {
								console.error('Erreur lors de la récupération du pays via IP:', error);
							}
						}

						// Construire l'URL en utilisant uniquement le pays détecté via l'IP
						const url = selectedDocument && selectedCountry && countryCodeFromIP
							? `https://smartphone-id-app.com/${platform}/photo/${selectedDocument}/${selectedCountry}/${countryCodeFromIP.toLowerCase()}`
							: `https://smartphone-id-app.com/${platform}/`;

						console.log("URL générée:", url);  // Debugging: vérifier l'URL générée
						window.open(url, '_blank');
					}}
					disabled={isButtonDisabled}
				>
					{translations.kalSearch['bouton']}
				</button>

				{isDocumentPopupVisible && (
					<main
						className="kal-search-document-popup flex">
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

			{/!* BOUTON *!/}


		</div>
	);

};

export default KalSearch;*/
