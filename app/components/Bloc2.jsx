import Image from "next/image";
import useTranslations from "@/utils/useTranslations";

const Bloc2 = ({ locale }) => {
    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div className="hidden">Loading...</div>;
    }

    if (!translations.Bloc2) {
        return <div className="hidden">Translations for Bloc2 not found</div>;
    }

    return (
        <div className="container">
            {translations.Bloc2.repeteur1?.map((item, index) => (
                <div className="repeteur_bloc2" key={index}>
                    <div className="repeteur_bloc2_img_container">
                        <Image
                            className="repeteur_bloc2_img"
                            priority
                            width={100}
                            height={100}
                            src={item.img_repeteur1}
                            alt=""
                        />
                    </div>
                    <div className="repeteur_bloc2_text">
                        <h4>{item.titre_repeteur1}</h4>
                    </div>
                    {index < translations.Bloc2.repeteur1.length - 1 && (
                        <div className="separator"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Bloc2;
