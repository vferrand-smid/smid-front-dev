import React from 'react';
import styles from '../styles/Bloc6Documents.module.css';
import Image from "next/image";
import useTranslations from "@/utils/useTranslations";
import useIsArabic from '../hooks/useIsArabic';

const Bloc6Documents = ({ locale }) => {
    const { translations, loading } = useTranslations(locale);
    const isArabic = useIsArabic()

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!translations.Bloc6) {
        return <div>Data not available</div>;
    }

    const { titre_bloc6_1, titre_bloc6_span, titre_bloc6_2, documents, bloc_photo } = translations.Bloc6;

    return (
        <div className={`kal-document ${isArabic &&'kal-document-arabic'}`}>
            <div>
            <h2 className='max-md:!text-center' style={{direction:isArabic&&'rtl'}}> {titre_bloc6_1}{" "} <span className={styles.highlight}>{titre_bloc6_span}</span> {titre_bloc6_2}
            </h2>

            <div className={styles.selectDocument}>
                {documents?.map((item, index) => {
                    if (!item.img_doc || !item.titre_doc) {
                        return null;
                    }

                    return (
                        <section key={index} className={`${styles.selectDocumentItem} flex flex-col items-center sm:w-[150px] w-full`}>
                            <div>
                                <Image
                                    width={120}  // Ajuste la largeur de l'image
                                    height={80} // Ajuste la hauteur de l'image
                                    src={item.img_doc}
                                    alt={item.titre_doc}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <p>{item.titre_doc}</p>
                        </section>
                    );
                })}
            </div>
            </div>
            <div className='kal-document-2'>
                {bloc_photo?.map((item, index) => {
                    if (!item.planche_photo || !item.impressionPhoto) {
                        return null;
                    }

                    return (
                        <React.Fragment key={index}>
                            <div >
                                <Image
                                    src={item.planche_photo}
                                    alt=""
                                    width={120}
                                    height={80}
                                    style={{ objectFit: 'contain' }}
                                />
                                {item.impressionPhoto &&
                                    <h3>{item.impressionPhoto}</h3>}
                                {item.paragraphe && (
                                    <div >
                                        <p>{item.paragraphe}</p>
                                        <div ></div>
                                    </div>
                                )}
                            </div>
                            {item.partenaires?.length > 0 && (
                                <section>
                                    {item.partenaires.map((partenaire, partenaireIndex) => {
                                        const imgUrl = partenaire.img_partenaire;
                                        if (!imgUrl) {
                                            return null;
                                        }
                                        return (
                                            <div  key={partenaireIndex}>
                                                <div >
                                                    <Image
                                                        src={imgUrl}
                                                        alt=""
                                                        width={80}
                                                        height={80}
                                                        style={{ objectFit: 'contain' }}
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
