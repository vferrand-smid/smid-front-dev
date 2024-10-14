import Image from "next/image";
import useTranslations from "@/utils/useTranslations";
import useIsArabic from "../hooks/useIsArabic";

const Bloc2 = ({ locale }) => {
    const { translations, loading } = useTranslations(locale);
    const isArabic = useIsArabic()

    if (loading) {
        return <div className="hidden">Loading...</div>;
    }

    if (!translations.Bloc2) {
        return <div className="hidden">Translations for Bloc2 not found</div>;
    }

    return (
        <div className={`kal-hero-stats ${isArabic && 'kal-hero-stats-arabic'}`}>
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