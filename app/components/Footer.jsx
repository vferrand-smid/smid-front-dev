'use client';

import FooterLogo from "../../public/images/Logo.svg";
import AppStore from "../../public/images/AppStore-vector.svg";
import PlayStore from "../../public/images/Gstore-vector.svg";
import QRcodeApple from "../../public/images/Layer_1.svg";
import QRcodeGoogle from "../../public/images/Layer_1 (1).svg";
import Youtube from "../../public/images/Icon_awesome-youtube.svg";
import Facebook from "../../public/images/Icon_awesome-facebook-f.svg";
import Instagram from "../../public/images/Icon_awesome-instagram.svg";
import LinkedIn from "../../public/images/Icon_awesome-linkedin-in.svg"
import Link from "next/link";
import Image from "next/image";
import React, {useState, useRef, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import useTranslations from "@/utils/useTranslations";
import { Suspense } from 'react';

const flags = {
    'fr-FR': '/images/flags/fr-FR.png',
    'en-GB': '/images/flags/en-GB.png',
    'es-ES': '/images/flags/es-ES.png',
    'en-US': '/images/flags/en-US.png',
    'es-CO': '/images/flags/es-CO.png',
    'pt-BR': '/images/flags/pt-BR.png',
    'nl-ZLD': '/images/flags/nl-ZLD.png',
    'is-IS': '/images/flags/islande.png',
    'da-DK': '/images/flags/danemark.png',
    'fi-FI': '/images/flags/finlande.png',
    // Ajoutez d'autres drapeaux ici
};

const localeToCountry = {
    'fr-FR': 'France',
    'en-GB': 'United Kingdom',
    'es-ES': 'Spain',
    'en-US': 'United States',
    'es-CO': 'Colombia',
    'pt-BR': 'Brazil',
    'nl-ZLD': 'New Zealand',
    'is-IS': 'Iceland',
    'da-DK': 'Denmark',
    'fi-FI': 'Finland',
    // Ajoutez d'autres pays ici
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
        <Suspense>
        <div key={currentLocale}>
            <div className="before-footer-wrap">

                <div className="columns-3 grid grid-cols-3">

                    <div className="column"></div>

                    <div className="footerLogo column">
                        <Link className="p-2 flex justify-center" href="/"
                              aria-label="Page d'accueil du site">
                            <Image

                                src={FooterLogo}
                                alt=""
                                width={280}
                                height={45}
                                href="/"
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
                                <Link className="" href="/"
                                      aria-label="Page de téléchargement Apple Store">
                                    <Image
                                        src={Youtube}
                                        alt=""
                                        href="/"
                                        aria-hidden="true"
                                    />
                                </Link>
                                <Link className="" href="/"
                                      aria-label="Page de téléchargement Apple Store">
                                    <Image
                                        src={Facebook}
                                        alt=""
                                        href="/"
                                        aria-hidden="true"
                                    />
                                </Link>
                                <Link className="" href="/"
                                      aria-label="Page de téléchargement Apple Store">
                                    <Image
                                        src={Instagram}
                                        alt=""
                                        href="/"
                                        aria-hidden="true"
                                    />
                                </Link>
                                <Link className="" href="/"
                                      aria-label="Page de téléchargement Apple Store">
                                    <Image
                                        src={LinkedIn}
                                        alt=""
                                        href="/"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </div>
                            <p className="partie2-p">{translations.Footer["partie2-p"]}</p>
                        </div>
                        <div className="SiteMapList">
                            <Link className="SiteMapList-a"
                                  href="https://www.smartphone-id.com/photos-identite-en-ligne/"
                                  target="_blank">{translations.Footer["SiteMapList-blog"]}</Link>
                            <Link className="SiteMapList-a" href="https://www.smartphone-id.com/photo-identite-bebe/"
                                  target="_blank">{translations.Footer["SiteMapList-propos"]}</Link>
                            <Link className="SiteMapList-a"
                                  href="https://www.smartphone-id.com/e-photo-permis-conduire/"
                                  target="_blank m-0">{translations.Footer["SiteMapList-faq"]}</Link>
                            <Link className="SiteMapList-a"
                                  href="https://www.smartphone-id.com/code-ephoto-titre-de-sejour/"
                                  target="_blank">{translations.Footer["SiteMapList-contact"]}</Link>
                        </div>
                        <div className="applis">
                            <h3 className="applis-h3">{translations.Footer["applis-h3"]}</h3>
                            <p className="applis-p"> {translations.Footer["applis-p"]}</p>
                            <div className="logoStore">
                                <div className="logoStore1">
                                    <Link href="/" aria-label="Page de téléchargement Apple Store">
                                        <Image
                                            src={AppStore}
                                            alt=""
                                            width={200}
                                            href="/"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                    <Link href="/" aria-label="Page de téléchargement Google Store">
                                        <Image
                                            src={PlayStore}
                                            alt=""
                                            width={200}
                                            href="/"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                                <div className="logoStore2">
                                    <Image
                                        className="logoStore2.img"
                                        src={QRcodeApple}
                                        alt=""
                                        width={100}
                                        href="/"
                                        aria-hidden="true"
                                    />

                                    <Image
                                        className="logoStore2.img"
                                        src={QRcodeGoogle}
                                        alt=""
                                        width={100}
                                        href="/"
                                        aria-hidden="true"
                                    />
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
                    <Link href="https://www.smartphone-id.com/politique-confidentialite/"
                          target="_blank">{translations.Footer["partie2-p"]}</Link>
                    <Link href="https://www.smartphone-id.com/cgu/"
                          target="_blank">{translations.Footer["mentions-confidentialité"]}</Link>
                    <Link href="https://www.smartphone-id.com/mentions-legales/"
                          target="_blank m-0">{translations.Footer["mentions-cgu"]}</Link>
                    <Link href="https://www.smartphone-id.com/cookies/"
                          target="_blank">{translations.Footer["mentions-légales"]}</Link>
                </section>
            </div>
        </div>
        </Suspense>
    )
};