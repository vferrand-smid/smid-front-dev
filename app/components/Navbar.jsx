/* eslint-disable */
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/Header/logo-smartphone-id-sm.png";
import Hamburger from "../../public/images/Header/hamburger.svg";
import Croix from "../../public/images/Header/xmark-solid.svg";
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
            <nav className="w-full bg-white z-50 top-0 shadow">

                <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">

                    {/* Logo section */}
                    <div className="flex items-center ">

                        <div className="navLogo w-[120px] h-[20px] md:w-[143px] md:h-[23px]">
                            <Link href="/" aria-label="Page d'accueil du site">
                                <Image
                                    src={Logo}
                                    alt=""
                                    //layout="intrinsic"
                                    aria-hidden="true"
                                    priority
                                />
                            </Link>
                        </div>

                    </div>

                    {/* Desktop Links */}
                   <div className="hidden md:flex space-x-6 items-center">
                        {translations.NavBar?.liens.map((item, index) => (
                                <Link key={index} className="p-2" href={item.url}
                                      target="_blank">{item.link}</Link>

                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="mobile-menu md:hidden flex items-center">
                        <button aria-label="toggle button" aria-expanded="false" id="menu-btn"
                                className="btn-menu cursor-pointer inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                                onClick={toggleNavbar}>
                            {isClick ? (
                                <Image
                                    src={Croix}
                                    alt=""
                                    className="h-6 w-6 absolute top-4 right-4"
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


                    {/* Mobile Menu Links */}
                    {isClick && (
                        <div className="md:hidden flex justify-center bg-white shadow-lg">
                            <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6 text-center">
                                {translations.NavBar && (
                                    <>
                                        <Link className="lien-mobile p-2 block" href={translations.NavBar["url_1"]}
                                              target="_blank">{translations.NavBar["link_1"]}</Link>
                                        <Link className="lien-mobile p-2 block" href={translations.NavBar["url_2"]}
                                              target="_blank">{translations.NavBar["link_2"]}</Link>
                                        <Link className="lien-mobile p-2 block" href={translations.NavBar["url_3"]}
                                              target="_blank">{translations.NavBar["link_3"]}</Link>
                                        <Link className="lien-mobile p-2 block" href={translations.NavBar["url_4"]}
                                              target="_blank">{translations.NavBar["link_4"]}</Link>
                                        <Link className="lien-mobile p-2 block" href={translations.NavBar["url_5"]}
                                              target="_blank">{translations.NavBar["link_5"]}</Link>
                                        <Link className="lien-mobile p-2 block" href={translations.NavBar["url_6"]}
                                              target="_blank">{translations.NavBar["link_6"]}</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
    );
}
