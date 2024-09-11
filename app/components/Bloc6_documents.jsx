import React from 'react';
import styles from '../styles/Bloc6Documents.module.css';
import Image from "next/image";
import useTranslations from "@/utils/useTranslations";

const Bloc6Documents = ({ locale }) => {
    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!translations.Bloc6) {
        return <div>Data not available</div>;
    }

    const { titre_bloc6_1, titre_bloc6_span, titre_bloc6_2, documents, bloc_photo } = translations.Bloc6;

    return (
        <div className={styles.kalDocument}>
            <h2> {titre_bloc6_1}{" "} <span className={styles.highlight}>{titre_bloc6_span}</span> {titre_bloc6_2}
            </h2>

            <div className={styles.selectDocument}>
                {documents?.map((item, index) => {
                    if (!item.img_doc || !item.titre_doc) {
                        return null;
                    }

                    return (
                        <section key={index} className={styles.selectDocumentItem}>
                            <div>
                                <Image
                                    width={500}
                                    height={500}
                                    src={item.img_doc}
                                    alt=""
                                />
                            </div>
                            <p>{item.titre_doc}</p>
                        </section>
                    );
                })}
            </div>

            <div className={styles.kalDocument2}>
                {bloc_photo?.map((item, index) => {
                    if (!item.planche_photo || !item.impressionPhoto) {
                        return null;
                    }

                    return (
                        <React.Fragment key={index}>
                            <div className={styles.planchePhoto}>
                                <Image
                                    src={item.planche_photo}
                                    alt=""
                                    width={120}
                                    height={80}
                                />
                                {item.impressionPhoto &&
                                    <h3>{item.impressionPhoto}</h3>}
                                {item.paragraphe && (
                                    <div className={styles.paragraphe}>
                                        <p>{item.paragraphe}</p>
                                        {/*<div className={styles.paragrapheBordure}></div>*/}
                                    </div>
                                )}
                            </div>
                            {item.partenaires?.length > 0 && (
                                <section className={styles.partenaires}>
                                    {item.partenaires.map((partenaire, partenaireIndex) => {
                                        const imgUrl = partenaire.img_partenaire;
                                        if (!imgUrl) {
                                            return null;
                                        }
                                        return (
                                            <div className={styles.partenairesCard} key={partenaireIndex}>
                                                <div className={styles.partenairesCardImage}>
                                                    <Image
                                                        className={styles.partenairesImage}
                                                        src={imgUrl}
                                                        alt=""
                                                        width={80}
                                                        height={80}
                                                    />
                                                </div>
                                                {partenaire.nom_partenaire && <p>{partenaire.nom_partenaire}</p>}
                                            </div>
                                        );
                                    })}
                                </section>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Bloc6Documents;
