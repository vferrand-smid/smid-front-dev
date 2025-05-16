import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Bloc11.module.css';

export default function Bloc11({ translations, isArabic }) {
    return (
        <div className={styles.container}>
            <h4 className={styles.heading}>{translations['titre']}</h4>
            <section style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {translations['liens'].map((item, index) => (
                    <Link
                        key={index}
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex h-[180px] w-[160px] flex-col items-center gap-5 rounded p-6 pb-2 text-center text-sm font-semibold hover:!text-green-500'
                        style={{ border: '2px solid #efefef' }}
                    >
                        <div className={styles.iconContainer}>
                            <Image src={item.icon} alt={item.link} width={64} height={64} />
                        </div>
                        <p className={styles.label}>{item.link}</p>
                    </Link>
                ))}
            </section>
        </div>
    );
}
