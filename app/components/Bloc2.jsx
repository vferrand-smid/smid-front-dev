import Image from 'next/image';

export default function Bloc2({ translations, isArabic }) {
    return (
        <div className={`kal-hero-stats ${isArabic && 'kal-hero-stats-arabic'}`}>
            <div>
                {translations.repeteur1?.map((item, index) => (
                    <article key={index}>
                        <Image priority width={80} height={80} src={item.img_repeteur1} alt='' />

                        <h4>{item.titre_repeteur1}</h4>
                    </article>
                ))}
            </div>
        </div>
    );
}
