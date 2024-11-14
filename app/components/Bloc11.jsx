import React from 'react';
import Image from 'next/image';
import useTranslations from "@/utils/useTranslations";
import styles from '../styles/Bloc11.module.css';
import Link from "next/link";

const Bloc11 = ({page, locale}) => {
    const {translations, loading} = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!translations.Bloc11) {
        return <div className="hidden">Translations for Bloc11 not found</div>;
    }

    return (

        <div className={styles.container}>

            <h4 className={styles.heading}>{translations.Bloc11["titre"]}</h4>
            <section style={{display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center'}}>
                {translations.Bloc11.liens.map((item, index) => (
                    <Link

                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=' w-[160px] h-[180px] p-6 pb-2 flex items-center flex-col gap-5 text-center text-sm font-semibold rounded hover:!text-green-500'
                        style={{border:'2px solid #efefef'}}
                        >
                        <div className={styles.iconContainer}>
                            <Image src={item.icon} alt={item.link} width={64} height={64}/>
                        </div>
                        <p className={styles.label}>{item.link}</p>
                    </Link>

                ))}
            </section>
        </div>

    );
};

export default Bloc11;
