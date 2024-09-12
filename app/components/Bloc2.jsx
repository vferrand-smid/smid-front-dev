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
        <div className="kal-hero-stats">
            <div>
                {translations.Bloc2.repeteur1?.map((item, index) => (
                    <article key={index}>
                                <Image
                                    priority
                                    width={80}
                                    height={80}
                                    src={item.img_repeteur1}
                                    alt=""
                                />
                       
                                <h4 >{item.titre_repeteur1}</h4>
                       
                    </article>
                ))}</div>
        </div>
    );
};

export default Bloc2;
