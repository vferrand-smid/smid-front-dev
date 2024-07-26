import Image from "next/image";
import styles from "../styles/Bloc5Services.module.css";

const Bloc5Services = ({ page }) => {
    // Vérifiez si les données nécessaires sont disponibles
    if (!page?.pageDAccueilBloc5) {
        return <div>Data not available</div>;
    }

    const { listeService } = page.pageDAccueilBloc5;

    return (
        <div className={styles.kalService}>
            <aside className={styles.imageContainer}>
                <Image
                    src={page.pageDAccueilBloc5.imgService?.node?.mediaItemUrl}
                    alt="Service"
                    layout="fill"
                    objectFit="cover"
                    priority
                    className={styles.serviceImage}
                />
            </aside>
            <div>
                <h2> {page.pageDAccueilBloc5.titre_bloc5_1} <span
                    className={styles.highlight}>{page.pageDAccueilBloc5.titre_bloc5_span}</span></h2>
                <div className={styles.kalServiceList}>
                    {listeService?.map((service, index) => (
                        <section key={index}>
                            <div>
                                <Image
                                    src={service?.check?.node?.mediaItemUrl}
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
