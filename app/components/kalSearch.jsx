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

	// Utilisation de usePathname pour récupérer la locale depuis l'URL
	const pathname = usePathname();
	const urlLocale = pathname.split('/')[1] || 'fr-FR'; // Valeur par défaut si la locale n'est pas présente

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
				const response = await fetch('https://smartphoneid-api--master-2yx5ebbula-ew.a.run.app/country/customized',
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
				console.error('Error fetching countries:', error);
			}
		};
		fetchCountries();
	}, []);

	// Récupération des documents selon le pays sélectionné
	useEffect(() => {
		if (!currentCountry || !selectedCountry) {
			console.log('currentCountry ou selectedCountry non défini, impossible d\'appeler l\'API');
			return;
		}

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

				if (response.ok) {
					const data = await response.json();
					console.log("kalSearch.jsx - Documents reçus depuis l'API :", data);

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
							{translations.kalSearch.titre_1}
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