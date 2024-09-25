import React from 'react';
import useTranslations from '../../utils/useTranslations';
import Image from "next/image";

const Bloc8Tuto = ({ locale }) => {
    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!translations.Bloc8) {
        return <div>Data not available</div>;
    }

    const { video, titre_bloc8_span, titre_encart, bloc_conseils, bouton_plus, lienBebe } = translations.Bloc8;

    return (
        <div className="kal-tuto">
            <div>
                <h3 className='max-md:!text-center'>{translations.Bloc8["titre_bloc8_1"]} <span className="highlight">{titre_bloc8_span}</span>{translations.Bloc8["titre_bloc8_2"]}</h3>
                <div className="kal-tuto-container">
                    <div className="kal-tuto-iframe"  dangerouslySetInnerHTML={{__html: video}}>
                    </div>

                    <div className="kal-tuto-content">
                        <h4>{titre_encart}</h4>
                        <div className="kal-tuto-content-item">
                            {bloc_conseils?.map((item, index) => (
                                <div key={index}>
                                    <Image
                                        width={500}
                                        height={500}
                                        src={item.check}
                                        alt=""
                                    />
                                    <p>
                                        <span className="number">0{item.chiffre}.</span> {item.texte}
                                        <strong className='!inline ml-1'>{item.texte_span}</strong>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <a href={bouton_plus?.url} target={"_blank"} className="kal-tuto-button hover:text-green-500 transition">{bouton_plus?.title}</a>
                        <a className="tuto-link hover:text-green-500 transition" target={"_blank"} href={lienBebe?.url}>
                            <p style={{textAlign: 'center'}}>
                                {lienBebe?.title}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bloc8Tuto;
