import React from 'react';
import useTranslations from '../../utils/useTranslations';
import Image from "next/image";

const Bloc8Tuto = ({ page, locale }) => {
    const videoEmbed = page.pageDAccueilBloc8.video;
    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

return (
    <div className="kal-tuto">
        <div>
        <h3>{translations.Bloc8["titre_bloc8_1"]} <span className="highlight">{page.pageDAccueilBloc8.titre_bloc8_span}</span>{translations.Bloc8["titre_bloc8_2"]}</h3>
        <div className="kal-tuto-container">

            <div className="kal-tuto-iframe">
                <div className="iframe" dangerouslySetInnerHTML={{__html: videoEmbed}}/>
            </div>

            <div className="kal-tuto-content">
                <h4>
                    {page.pageDAccueilBloc8.titre_encart}
                </h4>
                <div className="kal-tuto-content-item">
                    {page?.pageDAccueilBloc8?.bloc_conseils?.map((item, index) => (
                        <div key={index}>
                            <Image
                                width={500}
                                height={500}
                                src={item.check?.node?.mediaItemUrl} alt=""/>
                            <p>
                                <span className="number">0{item.chiffre}.</span> {item.texte}
                                <strong>{item.texte_span}</strong>
                            </p>
                        </div>
                    ))}
                </div>
                <a href={page?.pageDAccueilBloc8?.bouton_plus?.url} className="kal-tuto-button">{page?.pageDAccueilBloc8?.bouton_plus?.title}</a>
                <a className="tuto-link" href={page?.pageDAccueilBloc8?.lienBebe?.url}>
                    <p style={{textAlign: 'center'}}>
                        {page?.pageDAccueilBloc8?.lienBebe?.title}
                    </p>
                </a>
            </div>
        </div>
        </div>
    </div>
)
}

export default Bloc8Tuto;