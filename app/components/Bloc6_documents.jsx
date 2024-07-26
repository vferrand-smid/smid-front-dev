import React from 'react';
import styles from '../styles/Bloc6Documents.module.css';
import Image from "next/image";

const Bloc6Documents = ({ page }) => {
    return (
        <div className={styles.kalDocument}>
            <h2>
                {page.pageDAccueilBloc6.titre_bloc6_1}{" "}
                <span className={styles.highlight}>{page.pageDAccueilBloc6.titre_bloc6_span}</span>
                {page.pageDAccueilBloc6.titre_bloc6_2}
            </h2>

            <div className={styles.selectDocument}>
                {page?.pageDAccueilBloc6?.documents?.map((item, index) => {
                    // Vérifiez si img_doc et titre_doc ne sont pas vides
                    if (!item.img_doc?.node?.mediaItemUrl || !item.titre_doc) {
                        return null;
                    }

                    return (
                        <section key={index} className= {styles.selectDocumentItem}>
                            <div>
                                <Image
                                    width={500}
                                    height={500}
                                    src={item.img_doc.node.mediaItemUrl} alt="" />
                            </div>
                            <p>{item.titre_doc}</p>
                        </section>
                    );
                })}
            </div>

            <div className= {styles.kalDocument2}>
                {page?.pageDAccueilBloc6?.bloc_photo?.map((item, index) => {
                    // Vérifiez si planche_photo et impressionPhoto ne sont pas vides
                    if (!item.planche_photo?.node?.mediaItemUrl || !item.impressionPhoto) {
                        return null;
                    }
                    return (
                        <React.Fragment key={index}>
                            <div>
                                <Image
                                    src={item.planche_photo.node.mediaItemUrl}
                                    alt=""
                                    width={120}
                                    height={80}
                                />
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
                                        const imgUrl = partenaire.img_partenaire?.node?.mediaItemUrl;
                                        if (!imgUrl) {
                                            return null;
                                        }
                                        return (
                                            <div key={partenaireIndex}>
                                                <div>
                                                    <Image
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
