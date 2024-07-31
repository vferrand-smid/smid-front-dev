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

export default function Navbar() {
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
                                <Link className="p-2 m-0" href="https://www.smartphone-id.com/photos-identite-en-ligne/"
                                      target="_blank">Permis de conduire</Link>

                                <Link className="p-2 m-0" href="https://www.smartphone-id.com/photo-identite-bebe/"
                                      target="_blank">Passeport</Link>

                                <Link className="p-2 m-0" href="https://www.smartphone-id.com/e-photo-permis-conduire/"

                                      target="_blank m-0">Carte National d'identité</Link>

                                <Link className="p-2 m-0" href="https://www.smartphone-id.com/code-ephoto-titre-de-sejour/"
                                      target="_blank">Titre de séjour</Link>

                                <Link className="p-2 m-0" href="https://www.smartphone-id.com/code-ephoto-titre-de-sejour/"
                                      target="_blank">Visa</Link>

                                <Link className="p-2 m-0" href="https://www.smartphone-id.com/code-ephoto-titre-de-sejour/"
                                      target="_blank">Carte vitale</Link>
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
                                <Link className="lien-mobile "
                                      href="https://www.smartphone-id.com/photos-identite-en-ligne/"
                                      target="_blank">Photo d'identité en
                                    ligne</Link>

                                <Link className="lien-mobile" href="https://www.smartphone-id.com/photo-identite-bebe/"
                                      target="_blank">Photo d'identité de
                                    bébé</Link>

                                <Link className="lien-mobile"
                                      href="https://www.smartphone-id.com/e-photo-permis-conduire/"
                                      target="_blank">ePhoto permis de
                                    conduire</Link>

                                <Link className="lien-mobile"
                                      href="https://www.smartphone-id.com/code-ephoto-titre-de-sejour/" target="_blank">ePhoto
                                    titre de
                                    séjour</Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
