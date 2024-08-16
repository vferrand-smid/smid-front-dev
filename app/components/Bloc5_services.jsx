import Image from "next/image";
import styles from "../styles/Bloc5Services.module.css";
import useTranslations from "@/utils/useTranslations";

const Bloc5Services = ({ locale }) => {
    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!translations.Bloc5) {
        return <div>Data not available</div>;
    }

    const { imgService, listeService, titre_bloc5_1, titre_bloc5_span } = translations.Bloc5;

    return (
        <div className={styles.kalService}>
            <aside className={styles.imageContainer}>
                <Image
                    src={imgService}
                    alt="Service"
                    layout="fill"
                    objectFit="cover"
                    priority
                    className={styles.serviceImage}
                />
            </aside>
            <div>
                <h2> {titre_bloc5_1} <span className={styles.highlight}>{titre_bloc5_span}</span></h2>
                <div className={styles.kalServiceList}>
                    {listeService?.map((service, index) => (
                        <section key={index}>
                            <div>
                                <Image
                                    src={service?.check}
                                    alt="Check"
                                    priority
                                    width={24}
                                    height={24}
                                    objectFit="cover"
                                    className={styles.kalServiceListImage}
                                />
                                <h4>{service.service24h24Et7j7}</h4>
                            </div>
                            <p>{service.texteService}</p>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bloc5Services;
