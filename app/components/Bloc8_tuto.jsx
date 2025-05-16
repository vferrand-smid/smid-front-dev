import Image from 'next/image';

export default function Bloc8Tuto({ translations, isArabic }) {
    return (
        <div className='kal-tuto' style={{ direction: isArabic && 'rtl' }}>
            <div>
                <h3 className='max-md:!text-center'>
                    {translations['titre_bloc8_1']} <span className='highlight'>{translations['titre_bloc8_span']}</span>
                    {translations['titre_bloc8_2']}
                </h3>
                <div className='kal-tuto-container'>
                    <div className='kal-tuto-iframe' dangerouslySetInnerHTML={{ __html: translations['video'] }}></div>

                    <div className='kal-tuto-content'>
                        <h4>{translations['titre_encart']}</h4>
                        <div className='kal-tuto-content-item'>
                            {translations['bloc_conseils']?.map((item, index) => (
                                <div key={index}>
                                    <Image width={500} height={500} src={item.check} alt='' />
                                    <p>
                                        <span className='number'>0{item.chiffre}.</span> {item.texte}
                                        <strong className='ml-1 !inline'>{item.texte_span}</strong>
                                    </p>
                                </div>
                            ))}
                        </div>
                        <a
                            href={translations['bouton_plus']?.url}
                            target={'_blank'}
                            className='kal-tuto-button transition hover:text-green-500'
                        >
                            {translations['bouton_plus']?.title}
                        </a>
                        <a className='tuto-link transition hover:text-green-500' target={'_blank'} href={translations['lienBebe']?.url}>
                            <p style={{ textAlign: 'center' }}>{translations['lienBebe']?.title}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
