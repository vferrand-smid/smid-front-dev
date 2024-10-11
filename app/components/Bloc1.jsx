"use client";

import React from 'react';
import styles from '../styles/Bloc1.module.css';
import Image from "next/image";
import useTranslations from "@/utils/useTranslations";
import KalSearch from "@/app/components/kalSearch";
import useIsArabic from '../hooks/useIsArabic';

const Bloc1 = ({ page, locale  }) => {
    const { translations, loading } = useTranslations(locale);
    const isArabic = useIsArabic()

    if (loading) {
        return <div className="hidden">Loading...</div>;
    }

    if (!translations.Bloc1) {
        return <div className="hidden">Translations for Bloc1 not found</div>;
    }

    if (!page?.pageDAccueilBloc1) {
        return <div className="hidden">No data available for Bloc1</div>;
    }

    return (
        <div className={`kal-hero ${isArabic && 'kal-hero-arabic'}`}>

                    <div >
                        <h1>
                            {translations.Bloc1["titre_bloc1"]}
                        </h1>
                        <section >
                            {translations.Bloc1.repeteurCheckGreenBloc1?.map((item, index) => (
                                <div  key={index}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="check-white">
                        <path id="minus-square-Bold" d="M15.6 0H8.4C3.768 0 0 3.7692 0 8.4V15.6C0 20.2308 3.768 24 8.4 24H15.6C20.232 24 24 20.2308 24 15.6V8.4C24 3.7692 20.232 0 15.6 0Z" fill="#2FC977"></path>
                        <path id="Vector 3 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M17.6485 8.75137C18.1172 9.22 18.1172 9.9798 17.6485 10.4484L11.6485 16.4484C11.1799 16.9171 10.4201 16.9171 9.95147 16.4484L6.35147 12.8484C5.88284 12.3798 5.88284 11.62 6.35147 11.1514C6.8201 10.6827 7.5799 10.6827 8.04853 11.1514L10.8 13.9028L15.9515 8.75137C16.4201 8.28275 17.1799 8.28275 17.6485 8.75137Z" fill="white"></path>
                    </g>
                </svg>
                                    <h4>{item.texte_check_green}</h4>
                                </div>
                            ))}
                                    <p className={styles.bloc1Partie1H4}> {translations.Bloc1["titre_h4_bloc1"]}</p>
                        </section>

                        <aside >
                            {translations.Bloc1.repeteurCheckWhiteBloc1?.map((item, index) => (
                                <div  key={index}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="check-white">
                        <path id="minus-square-Bold" d="M13 0H7C3.14 0 0 3.141 0 7V13C0 16.859 3.14 20 7 20H13C16.86 20 20 16.859 20 13V7C20 3.141 16.86 0 13 0Z" fill="white"></path>
                        <path id="Vector 3 (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L9.70711 13.7071C9.31658 14.0976 8.68342 14.0976 8.29289 13.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L9 11.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289Z" fill="black"></path>
                    </g>
                </svg>
                                        <p className={styles.repeteurCheckWhiteBloc1H4}>{item.texte_check_white}</p>
                                </div>
                            ))}
                        </aside>

                            <KalSearch/>

                        <article >
                            <Image
                                src={translations.Bloc1.girl}
                                alt="Hero Girl"
                                width={497}
                                height={600}
                                priority
                            />
                    </article>
                    </div>
                    
            </div>

    );
};

export default Bloc1;
