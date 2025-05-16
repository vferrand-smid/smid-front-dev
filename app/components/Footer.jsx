'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AppStoreImg from '../../public/images/Footer/AppStore_icon_EN.svg';
import PlayStoreImg from '../../public/images/Footer/GStore_icon_EN.svg';
import Facebook from '../../public/images/Footer/Icon_awesome-facebook-f.svg';
import Instagram from '../../public/images/Footer/Icon_awesome-instagram.svg';
import LinkedIn from '../../public/images/Footer/Icon_awesome-linkedin-in.svg';
import Youtube from '../../public/images/Footer/Icon_awesome-youtube.svg';
import QRcodeGoogle from '../../public/images/Footer/Layer_1 (1).svg';
import QRcodeApple from '../../public/images/Footer/Layer_1.svg';
import FooterLogo from '../../public/images/Footer/Logo.svg';

const flags = {
    'es-ar': '/images/flags/es-AR.png',
    'en-au': '/images/flags/en-AU.jpg',
    'fr-be': '/images/flags/fr-BE.png',
    'nl-be': '/images/flags/nl-BE.png',
    'pt-br': '/images/flags/pt-BR.png',
    'fr-ca': '/images/flags/fr-CA.png',
    'en-ca': '/images/flags/en-CA.png',
    'es-co': '/images/flags/es-CO.png',
    'de-de': '/images/flags/de-DE.png',
    'et-ee': '/images/flags/et-EE.png',
    'es-es': '/images/flags/es-ES.png',
    'fr-fr': '/images/flags/fr-FR.png',
    'en-in': '/images/flags/en-IN.png',
    'en-ie': '/images/flags/en-IE.png',
    'it-it': '/images/flags/it-IT.png',
    'es-mx': '/images/flags/es-MX.png',
    'nl-nl': '/images/flags/nl-NL.png',
    'en-nz': '/images/flags/en-NZ.png',
    'en-ng': '/images/flags/en-NG.png',
    'pl-pl': '/images/flags/pl-PL.png',
    'pt-pt': '/images/flags/pt-PT.png',
    'ru-ru': '/images/flags/ru-RU.png',
    'zh-cn': '/images/flags/zh-CN.png',
    'sv-se': '/images/flags/sv-SE.png',
    'fr-ch': '/images/flags/fr-CH.png',
    'de-ch': '/images/flags/de-CH.png',
    'en-sg': '/images/flags/en-SG.png',
    'en-za': '/images/flags/en-ZA.png',
    'ar-sa': '/images/flags/ar-SA.png',
    'ar-ae': '/images/flags/ar-UAE.png',
    'en-gb': '/images/flags/en-GB.png',
    'en-us': '/images/flags/en-US.png',
    // Ajoutez d'autres drapeaux ici
};

const localeToCountry = {
    'es-ar': 'Argentina',
    'en-au': 'Australia',
    'fr-be': 'Belgique',
    'nl-be': 'België',
    'pt-br': 'Brasil',
    'fr-ca': 'Canada-FR',
    'en-ca': 'Canada',
    'es-co': 'Colombia',
    'de-de': 'Deutschland',
    'et-ee': 'Eesti',
    'es-es': 'España',
    'fr-fr': 'France',
    'en-in': 'India',
    'en-ie': 'Ireland',
    'it-it': 'Italia',
    'es-mx': 'Mexico',
    'nl-nl': 'Nederland',
    'en-nz': 'New Zealand',
    'en-ng': 'Nigeria',
    'pl-pl': 'Polska',
    'pt-pt': 'Portugal',
    'ru-ru': 'Россия',
    'zh-cn': '中华人民共和国',
    'sv-se': 'Sverige',
    'fr-ch': 'Suisse',
    'de-ch': 'Schweiz',
    'en-sg': 'Singapore',
    'en-za': 'South Africa',
    'ar-sa': 'المملكة العربية السعودية',
    'ar-ae': 'الإمارات العربية المتحدة',
    'en-gb': 'United Kingdom',
    'en-us': 'United States',
};

export default function Footer({ translations, isArabic }) {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'fr-FR'; // Récupère la locale depuis l'URL
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    const changeLanguage = (newLocale) => {
        // Extraire le chemin actuel sans la locale actuelle
        let segments = pathname.split('/');

        // Vérifier si le premier segment est une locale valide (par exemple fr-FR, en-US, etc.)
        if (segments[1].match(/^[a-z]{2}-[A-Z]{2}$/)) {
            // Remplacer la locale actuelle par la nouvelle
            segments[1] = newLocale;
        } else {
            // Ajouter la nouvelle locale si elle n'est pas présente
            segments.unshift(newLocale);
        }

        // Construire la nouvelle URL
        const newPathname = segments.join('/');

        // Rediriger vers la nouvelle URL et rafraîchir la page
        router.push(newPathname).then(() => {
            router.refresh(); // Forcer le rafraîchissement de la page
        });

        setIsOpen(false); // Fermer le menu de sélection de langue
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        // <ErrorBoundary>
        // <React.Suspense fallback={<div>Loading...</div>}>
        <div key={currentLocale} className='' style={{ textAlign: isArabic && 'right' }}>
            <div className='before-footer-wrap !h-auto max-md:!py-8 max-md:!pb-0'>
                <div className='grid columns-3 grid-cols-3 max-lg:flex-col max-lg:items-center max-lg:pb-5'>
                    <div className='column'></div>

                    <div className='footerLogo column'>
                        <Link className='m-auto flex justify-center p-2' href='#' aria-label="Page d'accueil du site">
                            <Image
                                src={FooterLogo}
                                alt=''
                                width={280}
                                height={45}
                                //layout="responsive"
                                aria-hidden='true'
                            />
                        </Link>
                    </div>

                    <div className='menuLangue column'>
                        <button
                            className='menuLangue-button relative w-9/12 max-w-md max-lg:m-auto max-lg:mt-5'
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <Image width={100} height={1000} src={flags[currentLocale]} alt={currentLocale} />
                            {localeToCountry[currentLocale]}
                            {isOpen && (
                                <ul
                                    className='max-h-60 !max-w-md -translate-x-3 overflow-auto'
                                    style={{ width: 'inherit' }}
                                    ref={dropdownRef}
                                >
                                    {Object.entries(flags).map(([locale, flagSrc]) => (
                                        <li
                                            className='flex cursor-pointer items-center gap-4 rounded p-2 hover:bg-slate-200'
                                            key={locale}
                                            onClick={() => changeLanguage(locale)}
                                        >
                                            <Image
                                                //style={{ width: 20, height: 15 }}
                                                height={10}
                                                width={20}
                                                src={flagSrc}
                                                alt={localeToCountry[locale]}
                                            />
                                            <p>{localeToCountry[locale]}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className='partie2 max-lg:text-center'>
                <div className='partie2-div'>
                    <main className='partie2-main max-lg:grid-cols-2 max-md:flex max-md:flex-col max-md:gap-5'>
                        <div className='partie2-1 max-lg:items-center max-lg:text-center'>
                            <button className='partie2-button'>{translations['partie2-button'] || '...'}</button>
                            <div className='kal-footer-social'>
                                <Link href={translations['Youtube-link'] || '#'} target='_blank'>
                                    <Image src={Youtube} alt='YouTube' aria-hidden='true' />
                                </Link>
                                <Link href={translations['Facebook-link'] || '#'} target='_blank'>
                                    <Image src={Facebook} alt='Facebook' aria-hidden='true' />
                                </Link>
                                <Link href={translations['Instagram-link'] || '#'} target='_blank'>
                                    <Image src={Instagram} alt='Instagram' aria-hidden='true' />
                                </Link>
                                <Link href={translations['LinkedIn-link'] || '#'} target='_blank'>
                                    <Image src={LinkedIn} alt='LinkedIn' aria-hidden='true' />
                                </Link>
                            </div>

                            <p className='partie2-p max-lg:text-center'>{translations['partie2-p']}</p>
                        </div>
                        <div className='SiteMapList text-white'>
                            <Link className='SiteMapList-a' href={translations['blog-link'] || '#'} target='_blank'>
                                {translations['SiteMapList-blog']}
                            </Link>
                            <Link className='SiteMapList-a' href={translations['propos-link'] || '#'} target='_blank'>
                                {translations['SiteMapList-propos']}
                            </Link>
                            <Link className='SiteMapList-a' href={translations['faq-link'] || '#'} target='_blank'>
                                {translations['SiteMapList-faq']}
                            </Link>
                            <Link className='SiteMapList-a' href={translations['contact-link'] || '#'} target='_blank'>
                                {translations['SiteMapList-contact']}
                            </Link>
                        </div>

                        <div className='applis max-lg:col-start-[-3] max-lg:col-end-[-1] max-lg:mb-5 max-lg:items-center max-lg:justify-center'>
                            <h3 className='applis-h3'>{translations['applis-h3']}</h3>
                            <p className='applis-p max-lg:!text-center'> {translations['applis-p']}</p>
                            <div className='logoStore max-md:flex-col'>
                                <div className='logoStore1 !gap-2'>
                                    <Link
                                        href={translations['AppStore-link'] || '#'}
                                        target='_blank'
                                        aria-label='Page de téléchargement Apple Store'
                                    >
                                        <Image src={AppStoreImg} alt='' width={150} height={150} aria-hidden='true' />
                                    </Link>
                                    <Link
                                        href={translations['PlayStore-link'] || '#'}
                                        target='_blank'
                                        aria-label='Page de téléchargement Google Store'
                                    >
                                        <Image src={PlayStoreImg} alt='' width={150} height={150} aria-hidden='true' />
                                    </Link>
                                </div>
                                <div className='logoStore2 max-lg:hidden'>
                                    <Link
                                        href={translations['AppStore-link'] || '#'}
                                        target='_blank'
                                        aria-label='Page de téléchargement Apple Store'
                                    >
                                        <Image
                                            className='logoStore2.img'
                                            src={QRcodeApple}
                                            alt=''
                                            width={110}
                                            height={110}
                                            aria-hidden='true'
                                        />
                                    </Link>
                                    <Link
                                        href={translations['PlayStore-link'] || '#'}
                                        target='_blank'
                                        aria-label='Page de téléchargement Google Store'
                                    >
                                        <Image
                                            className='logoStore2.img'
                                            src={QRcodeGoogle}
                                            alt=''
                                            width={110}
                                            height={110}
                                            aria-hidden='true'
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                    <aside className='adresses text-white max-md:flex max-md:flex-col max-md:items-center max-md:gap-5 max-md:text-center'>
                        <div className='adresses-div'>
                            <h3 className='adresses-h3'>Smartphone iD FRANCE</h3>
                            <p className='adresses-p'>
                                {' '}
                                38 rue Servan, <br /> 75011 Paris, France{' '}
                            </p>
                        </div>
                        <div className='adresses-div'>
                            <h3 className='adresses-h3'>Smartphone iD SPAIN</h3>
                            <p className='adresses-p'>
                                {' '}
                                Calle radas 29 bj, <br /> 08004 Barcelona, Spain{' '}
                            </p>
                        </div>
                        <div className='adresses-div'>
                            <h3 className='adresses-h3'>Smartphone iD IRELAND</h3>
                        </div>
                        <div className='adresses-div'>
                            <h3 className='adresses-h3'>Smartphone iD AFRICA</h3>
                            <p className='adresses-p'>
                                {' '}
                                SIPRES 2, Immeuble Soda Marieme, <br /> Senegal{' '}
                            </p>
                        </div>
                    </aside>
                </div>
                <aside className='aside'></aside>
                <section className='mentions text-white max-lg:flex-col max-lg:items-center'>
                    <p>© 2024 Smartphone iD</p>
                    <Link
                        href={translations['mentions-confidentialite-link'] || '#'}
                        aria-label='Politique de confidentialité'
                        target='_blank'
                    >
                        {translations['mentions-confidentialite']}
                    </Link>
                    <Link
                        href={translations['mentions-cgu-link'] || '#'}
                        aria-label="Conditions générales d'utilisation"
                        target='_blank m-0'
                    >
                        {translations['mentions-cgu']}
                    </Link>
                    <Link href={translations['mentions-legales-link'] || '#'} aria-label='Mentions légales' target='_blank'>
                        {translations['mentions-legales']}
                    </Link>
                    <Link href={translations['cookies-link'] || '#'} aria-label='Cookies' target='_blank'>
                        {translations['cookies']}
                    </Link>
                </section>
            </div>
        </div>
    );
}
