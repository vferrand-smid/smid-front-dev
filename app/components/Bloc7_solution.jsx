import React from "react";
import useTranslations from '../../utils/useTranslations';
import Image from "next/image";

const Bloc7Solution = ({ page, locale  }) => {
    const bloc7 = page?.pageDAccueilBloc7 || {};
    const { titre_bloc7_1, titre_bloc7_span, titre_bloc7_2, bloc } = bloc7;
    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }
    return (
        <div className="kal-solution">
            <div>
                <h2>
                    {translations.Bloc7["titre_bloc7_1"]}
                    <span className="highlight">{titre_bloc7_span || 'Default Titre Bloc 7 Span'}</span>
                    {translations.Bloc7["titre_bloc7_2"]}
                </h2>
                <div className="kal-solution-container">
                    {bloc?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <Image
                                    width={500}
                                    height={500}
                                    src={item?.img_principal?.node?.mediaItemUrl || 'default.jpg'}
                                    alt=""
                                />
                            </div>
                            <section>
                                <Image
                                    src={item?.img_check?.node?.mediaItemUrl || 'default.jpg'}
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                                <p>{item?.titre || 'Default Titre'}</p>
                            </section>
                            <aside>
                                <p>{item?.paragraphe || 'Default Paragraphe'}</p>
                            </aside>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Bloc7Solution;
