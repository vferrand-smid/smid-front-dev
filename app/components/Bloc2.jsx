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
        <div className="container
            flex md:grid
            md:grid-cols-3 flex-col
            md:w-screen px-5 gap-5">
                {translations.Bloc2.repeteur1?.map((item, index) => (
                    <div className="repeteur_bloc2
                     flex items-center
                        md:relative md:text-left md:items-center relative" key={index}>
                            <div className="repeteur_bloc2_img_container
                                flex justify-center items-center w-[70px] h-[70px] md:w-[80px] md:h-[80px]">
                                <Image
                                    className="repeteur_bloc2_img
                                   object-contain
                                    md:ml-7"
                                    priority
                                    width={80}
                                    height={80}
                                    src={item.img_repeteur1}
                                    alt=""
                                />
                            </div>
                            <div className="repeteur_bloc2_text
                           ml-5 md:mt-5">
                                <h4 className="text-xl md:text-xl text-black">{item.titre_repeteur1}</h4>
                            </div>
                        {index < translations.Bloc2.repeteur1.length - 1 && (
                            <div className="separator
                            w-[2px] h-[50px] bg-gray-300 absolute right-[-20px] top-1/2 transform -translate-y-1/2"></div>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default Bloc2;
