'use client';

import FooterLogo from "../../public/images/Footer/Logo.svg";
import AppStore from "../../public/images/Footer/AppStore-vector.svg";
import PlayStore from "../../public/images/Footer/Gstore-vector.svg";
import QRcodeApple from "../../public/images/Footer/Layer_1.svg";
import QRcodeGoogle from "../../public/images/Footer/Layer_1 (1).svg";
import Youtube from "../../public/images/Footer/Icon_awesome-youtube.svg";
import Facebook from "../../public/images/Footer/Icon_awesome-facebook-f.svg";
import Instagram from "../../public/images/Footer/Icon_awesome-instagram.svg";
import LinkedIn from "../../public/images/Footer/Icon_awesome-linkedin-in.svg"
import Link from "next/link";
import Image from "next/image";
import React, {useState, useRef, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import useTranslations from "@/utils/useTranslations";
// import { Suspense } from 'react';
// import ErrorBoundary from "@/app/components/ErrorBoundary";

const flags = {
    'ar-SA': '/images/flags/ar-SA.png',
    'ar-UAE': '/images/flags/ar-UAE.png',
    'de-CH': '/images/flags/de-CH.png',
    'de-DE': '/images/flags/de-DE.png',
    'en-AU': '/images/flags/en-AU.jpg',
    'en-CA': '/images/flags/en-CA.png',
    'en-GB': '/images/flags/en-GB.png',
    'en-IE': '/images/flags/en-IE.png',
    'en-IN': '/images/flags/en-IN.png',
    'en-NG': '/images/flags/en-NG.png',
    'en-NZ': '/images/flags/en-NZ.png',
    'en-SG': '/images/flags/en-SG.png',
    'en-US': '/images/flags/en-US.png',
    'en-ZA': '/images/flags/en-ZA.png',
    'es-AR': '/images/flags/es-AR.png',
    'es-CO': '/images/flags/es-CO.png',
    'es-ES': '/images/flags/es-ES.png',
    'es-MX': '/images/flags/es-MX.png',
    'et-EE': '/images/flags/et-EE.png',
    'fr-BE': '/images/flags/fr-BE.png',
    'fr-CA': '/images/flags/fr-CA.png',
    'fr-CH': '/images/flags/fr-CH.png',
    'fr-FR': '/images/flags/fr-FR.png',
    'it-IT': '/images/flags/it-IT.png',
    'nl-BE': '/images/flags/nl-BE.png',
    'nl-NL': '/images/flags/nl-NL.png',
    'pl-PL': '/images/flags/pl-PL.png',
    'pt-BR': '/images/flags/pt-BR.png',
    'ru-RU': '/images/flags/ru-RU.png',
    'sv-SE': '/images/flags/sv-SE.png',
    'zh-CN': '/images/flags/zh-CN.png',
    // Ajoutez d'autres drapeaux ici
};

const localeToCountry = {
    'ar-SA': 'العربية',
    'ar-UAE': 'العربية',
    'de-CH': 'switzerland',
    'de-DE': 'Deutchland',
    'en-AU': 'Australia',
    'en-CA': 'Canadian',
    'en-GB': 'United Kingdom',
    'en-IE': 'Ireland',
    'en-IN': 'India',
    'en-NG': 'Nigeria',
    'en-NZ': 'New Zealand',
    'en-SG': 'Senegal',
    'en-US': 'United States',
    'en-ZA': 'South Africa',
    'es-AR': 'Argentina',
    'es-CO': 'Colombia',
    'es-ES': 'España',
    'es-MX': 'Mexico',
    'et-EE': 'Estonie',
    'fr-BE': 'Belgique',
    'fr-CA': 'Canada',
    'fr-CH': 'Suisse',
    'fr-FR': 'France',
    'it-IT': 'Italia',
    'nl-BE': 'vlaams',
    'nl-NL': 'Nederlands',
    'pl-PL': 'Polands',
    'pt-BR': 'Brazil',
    'ru-RU': 'Russia',
    'sv-SE': 'Sweden',
    'zh-CN': '中文 (中国)',
};

export default function Footer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentLocale = searchParams.get('locale') || 'fr-FR';
    const [isOpen, setIsOpen] = useState(false);
    const { translations, loading } = useTranslations(currentLocale);
    const dropdownRef = useRef(null);

    const changeLanguage = (locale) => {
        const params = new URLSearchParams(window.location.search);
        params.set('locale', locale);
        router.push(`${window.location.pathname}?${params.toString()}`);
        setIsOpen(false);
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

    useEffect(() => {
        if (!loading && !translations.Footer) {
            console.error('Footer translations not found:', translations);
        }
    }, [loading, translations]);

   if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

    if (!translations.Footer) {
        console.error('Footer translations not found:', translations);
        return <div>Translations not found</div>;
    }


    return (
        // <ErrorBoundary>
        // <React.Suspense fallback={<div>Loading...</div>}>
        <div key={currentLocale}>
            <div className="before-footer-wrap">

                <div className="columns-3 grid grid-cols-3">

                    <div className="column"></div>

                    <div className="footerLogo column">
                        <Link className="p-2 flex justify-center" href="#"
                              aria-label="Page d'accueil du site">
                            <Image
                                src={FooterLogo}
                                alt=""
                                width={280}
                                height={45}
                                //layout="responsive"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>

                    <div className="menuLangue column">
                        <button className="menuLangue-button" onClick={() => setIsOpen(!isOpen)}>
                            <Image width={100}
                                   height={1000} src={flags[currentLocale]} alt={currentLocale}/>
                            {localeToCountry[currentLocale]}
                        </button>
                        {isOpen && (
                            <ul className="" ref={dropdownRef}>
                                {Object.entries(flags).map(([locale, flagSrc]) => (
                                    <li key={locale} onClick={() => changeLanguage(locale)}>
                                        <Image
                                            height={100}
                                            width={100}
                                            src={flagSrc} alt={localeToCountry[locale]}/>
                                        {localeToCountry[locale]}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>

            </div>

            <div className="partie2">
                <div className="partie2-div">
                    <main className="partie2-main">
                        <div className="partie2-1">
                            <button className="partie2-button">{translations.Footer["partie2-button"]}</button>
                            <div className="kal-footer-social">
                                <Link href={translations.Footer?.["Youtube-link"] || "#"} target="_blank">
                                    <Image src={Youtube} alt="YouTube" aria-hidden="true"/>
                                </Link>
                                <Link href={translations.Footer?.["Facebook-link"] || "#"} target="_blank">
                                    <Image src={Facebook} alt="Facebook" aria-hidden="true"/>
                                </Link>
                                <Link href={translations.Footer?.["Instagram-link"] || "#"} target="_blank">
                                    <Image src={Instagram} alt="Instagram" aria-hidden="true"/>
                                </Link>
                                <Link href={translations.Footer?.["LinkedIn-link"] || "#"} target="_blank">
                                    <Image src={LinkedIn} alt="LinkedIn" aria-hidden="true"/>
                                </Link>
                            </div>

                            <p className="partie2-p">{translations.Footer["partie2-p"]}</p>
                        </div>
                        <div className="SiteMapList">
                            <Link className="SiteMapList-a" href={translations.Footer?.["blog-link"] || "#"}
                                  target="_blank">
                                {translations.Footer["SiteMapList-blog"]}
                            </Link>
                            <Link className="SiteMapList-a" href={translations.Footer?.["propos-link"] || "#"}
                                  target="_blank">
                                {translations.Footer["SiteMapList-propos"]}
                            </Link>
                            <Link className="SiteMapList-a" href={translations.Footer?.["faq-link"] || "#"}
                                  target="_blank">
                                {translations.Footer["SiteMapList-faq"]}
                            </Link>
                            <Link className="SiteMapList-a" href={translations.Footer?.["contact-link"] || "#"}
                                  target="_blank">
                                {translations.Footer["SiteMapList-contact"]}
                            </Link>
                        </div>

                        <div className="applis">
                            <h3 className="applis-h3">{translations.Footer["applis-h3"]}</h3>
                            <p className="applis-p"> {translations.Footer["applis-p"]}</p>
                            <div className="logoStore">
                                <div className="logoStore1">
                                    <Link href={translations.Footer["AppStore-link"] || "#"} target="_blank"
                                          aria-label="Page de téléchargement Apple Store">
                                        <Image
                                            src={AppStore}
                                            alt=""
                                            width={200}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                    <Link href={translations.Footer["PlayStore-link"] || "#"} target="_blank"
                                          aria-label="Page de téléchargement Google Store">
                                        <Image
                                            src={PlayStore}
                                            alt=""
                                            width={200}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                                <div className="logoStore2">
                                    <Link href={translations.Footer["AppStore-link"] || "#"} target="_blank"
                                          aria-label="Page de téléchargement Apple Store">
                                        <Image
                                            className="logoStore2.img"
                                            src={QRcodeApple}
                                            alt=""
                                            width={100}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                    <Link href={translations.Footer["PlayStore-link"] || "#"} target="_blank"
                                          aria-label="Page de téléchargement Google Store">
                                        <Image
                                            className="logoStore2.img"
                                            src={QRcodeGoogle}
                                            alt=""
                                            width={100}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                    <aside className="adresses">
                        <div className="adresses-div">
                            <h3 className="adresses-h3">Smartphone iD FRANCE</h3>
                            <p className="adresses-p"> 38 rue Servan, <br/> 75011 Paris, France </p>
                        </div>
                        <div className="adresses-div">
                            <h3 className="adresses-h3">Smartphone iD SPAIN</h3>
                            <p className="adresses-p"> Calle radas 29 bj, <br/> 08004 Barcelona, Spain </p>
                        </div>
                        <div className="adresses-div">
                        <h3 className="adresses-h3">Smartphone iD IRELAND</h3>
                        </div>
                        <div className="adresses-div">
                            <h3 className="adresses-h3">Smartphone iD AFRICA</h3>
                            <p className="adresses-p"> SIPRES 2, Immeuble Soda Marieme, <br/> Senegal </p>
                        </div>
                    </aside>
                </div>
                <aside className="aside"></aside>
                <section className="mentions">
                    <p>© 2023 Smartphone iD</p>
                    <Link href={translations.Footer["mentions-confidentialité-link"] || "#"} aria-label="Politique de confidentialité"
                          target="_blank">{translations.Footer["mentions-confidentialité"]}</Link>
                    <Link href={translations.Footer["mentions-cgu-link"] || "#"} aria-label="Conditions générales d'utilisation"
                          target="_blank m-0">{translations.Footer["mentions-cgu"]}</Link>
                    <Link href={translations.Footer["mentions-légales-link"] || "#"} aria-label="Mentions légales"
                          target="_blank">{translations.Footer["mentions-légales"]}</Link>
                    <Link href={translations.Footer["cookies-link"] || "#"} aria-label="Cookies"
                          target="_blank">{translations.Footer["cookies"]}</Link>
                </section>
            </div>
        </div>
        // </React.Suspense>
        // </ErrorBoundary>
    )
};