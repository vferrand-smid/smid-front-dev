/* eslint-disable */
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/logo-smartphone-id.jpg";
import Hamburger from "../../public/images/hamburger.svg";
import Croix from "../../public/images/xmark-solid.svg";
import {useState} from "react";
import { useRouter } from "next/navigation";
import useTranslations from '@/utils/useTranslations';


export default function Navbar({locale}) {
    const { translations, loading } = useTranslations(locale);
    console.log(translations);
    const [isClick, setisClick] = useState(false);
    const toggleNavbar = () => {
        setisClick(!isClick);
    };
    const router = useRouter();

    return (
        <>
            <nav>

                <div className="mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center justify-between h-16">

                        <div className="flex items-center">

                            <div className="navLogo">
                                <Link href="/" aria-label="Page d'accueil du site">
                                    <Image
                                        src={Logo}
                                        alt=""
                                        href="/"
                                        //layout="intrinsic"
                                        aria-hidden="true"
                                        priority
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className="flex items-center">
                                {translations.NavBar && (
                                    <>
                                        <Link className="p-2 m-0" href={translations.NavBar["url_1"]} target="_blank">{translations.NavBar["link_1"]}</Link>
                                        <Link className="p-2 m-0" href={translations.NavBar["url_2"]} target="_blank">{translations.NavBar["link_2"]}</Link>
                                        <Link className="p-2 m-0" href={translations.NavBar["url_3"]} target="_blank">{translations.NavBar["link_3"]}</Link>
                                        <Link className="p-2 m-0" href={translations.NavBar["url_4"]} target="_blank">{translations.NavBar["link_4"]}</Link>
                                        <Link className="p-2 m-0" href={translations.NavBar["url_5"]} target="_blank">{translations.NavBar["link_5"]}</Link>
                                        <Link className="p-2 m-0" href={translations.NavBar["url_6"]} target="_blank">{translations.NavBar["link_6"]}</Link>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mobile-menu">
                            <button aria-label="toggle button" aria-expanded="false" id="menu-btn"
                                    className="btn-menu"
                                    onClick={toggleNavbar}>
                                {isClick ? (
                                    <Image
                                        src={Croix}
                                        alt=""
                                        className="h-6 w-6"
                                        width={32}
                                        height={32}
                                        //layout="responsive"
                                    />
                                ) : (
                                    <Image
                                        src={Hamburger}
                                        alt=""
                                        className="h-6 w-6"
                                       // layout="responsive"
                                    />
                                )}
                            </button>

                        </div>


                    </div>

                    {isClick && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                                {translations.NavBar && (
                                    <>
                                        <Link className="lien-mobile" href={translations.NavBar["url_1"]} target="_blank">{translations.NavBar["link_1"]}</Link>
                                        <Link className="lien-mobile" href={translations.NavBar["url_2"]} target="_blank">{translations.NavBar["link_2"]}</Link>
                                        <Link className="lien-mobile" href={translations.NavBar["url_3"]} target="_blank">{translations.NavBar["link_3"]}</Link>
                                        <Link className="lien-mobile" href={translations.NavBar["url_4"]} target="_blank">{translations.NavBar["link_4"]}</Link>
                                        <Link className="lien-mobile" href={translations.NavBar["url_5"]} target="_blank">{translations.NavBar["link_5"]}</Link>
                                        <Link className="lien-mobile" href={translations.NavBar["url_6"]} target="_blank">{translations.NavBar["link_6"]}</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
