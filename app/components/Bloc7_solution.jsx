import React from "react";
import useTranslations from '../../utils/useTranslations';
import Image from "next/image";

const Bloc7Solution = ({ locale }) => {
    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!translations.Bloc7) {
        return <div>Data not available</div>;
    }

    const { titre_bloc7_1, titre_bloc7_span, titre_bloc7_2, bloc } = translations.Bloc7;

    return (
        <div className="kal-solution">
            <div>
                <h2 className="max-md:!text-center">
                    {titre_bloc7_1}
                    <span className="highlight">{titre_bloc7_span || 'Default Titre Bloc 7 Span'}</span>
                    {titre_bloc7_2}
                </h2>
                <div className="kal-solution-container">
                    {bloc?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <Image
                                    width={500}
                                    height={500}
                                    src={item?.img_principal || 'default.jpg'}
                                    alt=""
                                />
                            </div>
                            <section className="text-center !items-baseline">
                                <Image
                                    src={item?.img_check || 'default.jpg'}
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

