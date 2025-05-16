import Image from 'next/image';
import React from 'react';
import styles from '../styles/Bloc6Documents.module.css';

export default function Bloc6Documents({ translations, isArabic }) {
    return (
        <div className={`kal-document ${isArabic && 'kal-document-arabic'}`}>
            <div>
                <h2 className='max-md:!text-center' style={{ direction: isArabic && 'rtl' }}>
                    {' '}
                    {translations['titre_bloc6_1']} <span className={styles.highlight}>{translations['titre_bloc6_span']}</span>{' '}
                    {translations['titre_bloc6_2']}
                </h2>

                <div className={styles.selectDocument}>
                    {translations['documents']?.map((item, index) => {
                        if (!item.img_doc || !item.titre_doc) {
                            return null;
                        }

                        return (
                            <section key={index} className={`${styles.selectDocumentItem} flex w-full flex-col items-center sm:w-[150px]`}>
                                <div>
                                    <Image
                                        width={120} // Ajuste la largeur de l'image
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
                {translations['bloc_photo']?.map((item, index) => {
                    if (!item.planche_photo || !item.impressionPhoto) {
                        return null;
                    }

                    return (
                        <React.Fragment key={index}>
                            <div>
                                <Image src={item.planche_photo} alt='' width={120} height={80} style={{ objectFit: 'contain' }} />
                                {item.impressionPhoto && <h3>{item.impressionPhoto}</h3>}
                                {item.paragraphe && (
                                    <div>
                                        <p>{item.paragraphe}</p>
                                        <div></div>
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
                                            <div key={partenaireIndex}>
                                                <div>
                                                    <Image src={imgUrl} alt='' width={80} height={80} style={{ objectFit: 'contain' }} />
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
}
