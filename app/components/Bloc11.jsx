import React from 'react';
import Image from 'next/image';
import useTranslations from "@/utils/useTranslations";
import styles from '../styles/Bloc11.module.css';  // Importation du CSS module

const Bloc11 = ({ page, locale }) => {
    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!translations.Bloc11) {
        return <div className="hidden">Translations for Bloc11 not found</div>;
    }

    const links = [
        {
            href: "https://www.smartphone-id.com/code-ephoto-titre-de-sejour/",
            label: "Titre de Séjour",
            icon: "/images/Bloc11/titre-de-sejour.svg"
        },
        {
            href: "https://www.smartphone-id.com/photo-identite-passeport/",
            label: "Passeport",
            icon: "/images/Bloc11/passeport.svg"
        },
        {
            href: "https://www.smartphone-id.com/en_GB/france-visa-photo-online/",
            label: "Visa",
            icon: "/images/Bloc11/visa.svg"
        },
        {
            href: "https://www.smartphone-id.com/permis-conduire-photo/",
            label: "Permis de conduire",
            icon: "/images/Bloc11/permis-conduire.svg"
        },
        {
            href: "https://www.smartphone-id.com/photo-carte-identite/",
            label: "Carte d'identité",
            icon: "/images/Bloc11/carte-identite.svg"
        },
        {
            href: "https://www.smartphone-id.com/photo-identite-carte-vitale/",
            label: "Carte Vitale",
            icon: "/images/Bloc11/carte-vitale.svg"
        },
    ];

    return (
        <div className={styles.container}>
            <h4 className={styles.heading}>Trouvez vos réponses dans les pages correspondantes</h4>
            <section style={{display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center'}}>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=' w-[160px] h-[180px] p-6 pb-2 flex items-center flex-col gap-5 text-center text-sm font-semibold rounded hover:!text-green-500'
                        style={{border:'2px solid #efefef'}}
                        >
                        <div className={styles.iconContainer}>
                            <Image src={link.icon} alt={link.label} width={64} height={64} />
                        </div>
                        <p >{link.label}</p>
                    </a>
                ))}
            </section>
        </div>
    );
};

export default Bloc11;
