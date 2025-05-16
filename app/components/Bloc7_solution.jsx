import Image from 'next/image';

export default function Bloc7Solution({ translations, isArabic }) {
    return (
        <div className='kal-solution' style={{ direction: isArabic && 'rtl' }}>
            <div>
                <h2 className='max-md:!text-center'>
                    {translations['titre_bloc7_1']}
                    <span className='highlight'>{translations['titre_bloc7_span']}</span>
                    {translations['titre_bloc7_2']}
                </h2>
                <div className='kal-solution-container'>
                    {translations['bloc']?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <Image width={500} height={500} src={item?.img_principal} alt='' />
                            </div>
                            <section className='!items-baseline text-center'>
                                <Image src={item?.img_check} alt='' width={20} height={20} />
                                <p>{item?.titre}</p>
                            </section>
                            <aside>
                                <p>{item?.paragraphe}</p>
                            </aside>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
