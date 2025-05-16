import Image from 'next/image';

import styles from '../styles/Bloc5Services.module.css';

export default function Bloc5Services({ translations, isArabic }) {
    return (
        <div className={`kal-service ${isArabic && 'kal-service-arabic'}`}>
            <aside>
                <Image
                    src={translations['imgService']}
                    alt='Service'
                    width={500}
                    height={500}
                    style={{ objectFit: 'cover' }}
                    priority
                    className={styles.serviceImage}
                />
            </aside>
            <div>
                <h2 className='max-w-[60%] max-lg:max-w-full max-md:!text-center'>
                    {' '}
                    {translations['titre_bloc5_1']} <span className='highlight'>{translations['titre_bloc5_span']}</span>
                </h2>
                <div className='kal-service-list !h-auto max-lg:!m-auto max-lg:!flex-wrap max-md:!grid max-md:!w-fit max-md:grid-cols-1'>
                    {translations['listeService']?.map((service, index) => (
                        <section key={index}>
                            <div>
                                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <g id='check-white'>
                                        <path
                                            id='minus-square-Bold'
                                            d='M15.6 0H8.4C3.768 0 0 3.7692 0 8.4V15.6C0 20.2308 3.768 24 8.4 24H15.6C20.232 24 24 20.2308 24 15.6V8.4C24 3.7692 20.232 0 15.6 0Z'
                                            fill='#2FC977'
                                        ></path>
                                        <path
                                            id='Vector 3 (Stroke)'
                                            fillRule='evenodd'
                                            clipRule='evenodd'
                                            d='M17.6485 8.75137C18.1172 9.22 18.1172 9.9798 17.6485 10.4484L11.6485 16.4484C11.1799 16.9171 10.4201 16.9171 9.95147 16.4484L6.35147 12.8484C5.88284 12.3798 5.88284 11.62 6.35147 11.1514C6.8201 10.6827 7.5799 10.6827 8.04853 11.1514L10.8 13.9028L15.9515 8.75137C16.4201 8.28275 17.1799 8.28275 17.6485 8.75137Z'
                                            fill='white'
                                        ></path>
                                    </g>
                                </svg>
                                <h4>{service['service24h24Et7j7']}</h4>
                            </div>
                            <p>{service['texteService']}</p>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
