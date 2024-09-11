"use client";

import React from 'react';
import styles from '../styles/Bloc1.module.css';
import Image from "next/image";
import useTranslations from "@/utils/useTranslations";
import KalSearch from "@/app/components/kalSearch";

const Bloc1 = ({ page, locale  }) => {
    const { translations, loading } = useTranslations(locale);

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
        <div className={styles.kalHero}>

            <div className={styles.kalHeroContent}>
                <div className="md:grid md:grid-cols-3">
                    <div className="md:col-span-2">
                        <h1 className={styles.kalHeroContentH1}>
                            {translations.Bloc1["titre_bloc1"]}
                        </h1>
                        <div className={styles.bloc1Partie1}>
                            {translations.Bloc1.repeteurCheckGreenBloc1?.map((item, index) => (
                                <div className={styles.repeteurCheckGreenBloc1} key={index}>
                                    <Image
                                        src={item.mediaItemUrl}
                                        alt=""
                                        width={20}
                                        height={20}
                                        priority
                                        className={styles.repeteurCheckGreenBloc1Img}
                                    />
                                    <h4 className="">{item.texte_check_green}</h4>
                                </div>
                            ))}
                            {page?.pageDAccueilBloc1?.titre_h4_bloc1 && (
                                <div className="flex">
                                    <h4 className={styles.bloc1Partie1H4}>{page.pageDAccueilBloc1.titre_h4_bloc1}</h4>
                                </div>
                            )}
                        </div>

                        <div className={styles.kalHeroAside}>
                            {translations.Bloc1.repeteurCheckWhiteBloc1?.map((item, index) => (
                                <div className={styles.repeteurCheckWhiteBloc1} key={index}>
                                    <div className={styles.repeteurCheckWhiteBloc1Div1}>
                                        <Image
                                            className={styles.repeteurCheckWhiteBloc1Img}
                                            src={item.mediaItemUrl}
                                            alt=""
                                            width={20}
                                            height={20}
                                            //layout="responsive"
                                            priority
                                        />
                                    </div>
                                    <div className={styles.repeteurCheckWhiteBloc1Div2}>
                                        <h4 className={styles.repeteurCheckWhiteBloc1H4}>{item.texte_check_white}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.kalSearch}>
                            <KalSearch/>
                        </div>
                    </div>
                    <div className="md:flex md:items-end">
                        <div className={styles.girl}>
                            <Image
                                className={styles.girlImg}
                                src={translations.Bloc1.girl}
                                alt="Hero Girl"
                                width={300}
                                height={300}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Bloc1;
