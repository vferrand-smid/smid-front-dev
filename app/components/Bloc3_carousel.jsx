'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Bloc3.module.css';

export default function Carousel({ translations, isArabic }) {
    const [currentDesktop, setCurrentDesktop] = useState(0);
    const [currentMobile, setCurrentMobile] = useState(0);

    useEffect(() => {
        if (translations.repeteur_etape?.length) {
            const interval = setInterval(() => {
                setCurrentDesktop((prev) => (prev + 1) % translations.repeteur_etape.length);
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [translations]);

    useEffect(() => {
        if (translations.repeteurEtapeMobile?.length) {
            const interval = setInterval(() => {
                setCurrentMobile((prev) => (prev + 1) % translations.repeteurEtapeMobile.length);
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [translations]);

    const handleArrowClickDesktop = (direction) => {
        setCurrentDesktop((prev) =>
            direction === 'left'
                ? (prev - 1 + translations.repeteur_etape.length) % translations.repeteur_etape.length
                : (prev + 1) % translations.repeteur_etape.length
        );
    };

    const handleArrowClickMobile = (direction) => {
        setCurrentMobile((prev) =>
            direction === 'left'
                ? (prev - 1 + translations.repeteurEtapeMobile.length) % translations.repeteurEtapeMobile.length
                : (prev + 1) % translations.repeteurEtapeMobile.length
        );
    };

    const ArrowButton = ({ direction, onClick }) => (
        <button onClick={onClick} className='kal-photo-carousel-btn'>
            {isArabic ? (direction === 'left' ? rightArrow : leftArrow) : direction === 'left' ? leftArrow : rightArrow}
        </button>
    );

    return (
        <div className='kal-photo' style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            <div>
                <h2>
                    <span className='highlight'>{translations.titre_bloc3_span}</span>
                    {translations.titre_bloc3}
                </h2>
                <div>
                    <section className='kal-photo-carousel-wrapper'>
                        <article className='hidden sm:block'>
                            {translations.repeteur_etape?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`transition-shadow duration-1000 ease-in-out ${index === currentDesktop ? 'flex justify-center' : 'hidden'}`}
                                >
                                    <Image
                                        src={item.image_repeteur_etape}
                                        alt={item.titre_check || `Image step ${index + 1}`}
                                        width={500}
                                        height={300}
                                        loading='lazy'
                                        className='entered lazyloaded'
                                    />
                                </div>
                            ))}

                            <div className='mt-4 flex items-center justify-between'>
                                <ArrowButton direction='left' onClick={() => handleArrowClickDesktop('left')} />
                                <ArrowButton direction='right' onClick={() => handleArrowClickDesktop('right')} />
                            </div>
                        </article>

                        <article className='block sm:hidden'>
                            {translations.repeteurEtapeMobile?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`transition-opacity duration-1000 ease-in-out ${index === currentMobile ? 'block' : 'hidden'}`}
                                >
                                    <Image
                                        src={item.image_repeteur_etape}
                                        alt={item.titre_check || `Image step ${index + 1}`}
                                        width={500}
                                        height={300}
                                        loading='lazy'
                                        className='entered lazyloaded'
                                    />
                                </div>
                            ))}
                            <div className='mt-4 flex items-center justify-between'>
                                <ArrowButton direction='left' onClick={() => handleArrowClickMobile('left')} />
                                <ArrowButton direction='right' onClick={() => handleArrowClickMobile('right')} />
                            </div>
                        </article>

                        <article className='kal-photo-carousel-content mb-5 h-32'>
                            {translations.repeteur_etape?.map((item, index) => (
                                <div key={index} className={`${index === currentDesktop ? 'block' : 'hidden'}`}>
                                    <div className='flex items-center gap-2'>
                                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M15.6 0H8.4C3.768 0 0 3.7692 0 8.4V15.6C0 20.2308 3.768 24 8.4 24H15.6C20.232 24 24 20.2308 24 15.6V8.4C24 3.7692 20.232 0 15.6 0Z'
                                                fill='#2FC977'
                                            />
                                            <path
                                                d='M17.6485 8.75137C18.1172 9.22 18.1172 9.9798 17.6485 10.4484L11.6485 16.4484C11.1799 16.9171 10.4201 16.9171 9.95147 16.4484L6.35147 12.8484C5.88284 12.3798 5.88284 11.62 6.35147 11.1514C6.8201 10.6827 7.5799 10.6827 8.04853 11.1514L10.8 13.9028L15.9515 8.75137C16.4201 8.28275 17.1799 8.28275 17.6485 8.75137Z'
                                                fill='white'
                                            />
                                        </svg>
                                        <h3>{item.titre_check}</h3>
                                    </div>
                                    <p className='kal-photo-carousel-content-desktop'>{item.texte_etape}</p>
                                    <p className='kal-photo-carousel-content-mobile'>
                                        {translations.repeteurEtapeMobile?.[index]?.texte_etape}
                                    </p>
                                </div>
                            ))}
                        </article>
                    </section>

                    <div>
                        {translations.repeteurCkeckBlack?.map((item, index) => (
                            <div key={index}>
                                <Image
                                    className={styles.benefitImage}
                                    src={item.imageCkeckBlack}
                                    alt='Benefit Image'
                                    width={200}
                                    height={200}
                                />
                                <div className='flex items-center gap-2'>
                                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M13 0H7C3.14 0 0 3.141 0 7V13C0 16.859 3.14 20 7 20H13C16.86 20 20 16.859 20 13V7C20 3.141 16.86 0 13 0Z'
                                            fill='black'
                                        />
                                        <path
                                            d='M14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L9.70711 13.7071C9.31658 14.0976 8.68342 14.0976 8.29289 13.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L9 11.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289Z'
                                            fill='white'
                                        />
                                    </svg>
                                    <p>{item.texteCheckBlack}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const leftArrow = (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M20.8 31.5L11.2 31.5C5.30019 31.5 0.5 26.6983 0.500001 20.8L0.500002 11.2C0.500002 5.30169 5.30019 0.499998 11.2 0.499998L20.8 0.499999C26.6998 0.5 31.5 5.3017 31.5 11.2L31.5 20.8C31.5 26.6983 26.6998 31.5 20.8 31.5Z'
            fill='white'
            stroke='black'
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.6347 21.6192C19.1218 21.1116 19.1218 20.2884 18.6347 19.7808L14.5277 15.5L18.6347 11.2192C19.1218 10.7116 19.1218 9.88844 18.6347 9.38076C18.1476 8.87308 17.3579 8.87308 16.8708 9.38076L11.6642 14.8077C11.293 15.1946 11.293 15.8054 11.6642 16.1923L16.8708 21.6192C17.3579 22.1269 18.1476 22.1269 18.6347 21.6192Z'
            fill='black'
        />
    </svg>
);

const rightArrow = (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M11.2 0.5H20.8C26.6998 0.5 31.5 5.3017 31.5 11.2V20.8C31.5 26.6983 26.6998 31.5 20.8 31.5H11.2C5.30019 31.5 0.5 26.6983 0.5 20.8V11.2C0.5 5.3017 5.30019 0.5 11.2 0.5Z'
            fill='white'
            stroke='black'
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.3653 10.3808C12.8782 10.8884 12.8782 11.7116 13.3653 12.2192L17.4723 16.5L13.3653 20.7808C12.8782 21.2884 12.8782 22.1116 13.3653 22.6192C13.8524 23.1269 14.6421 23.1269 15.1292 22.6192L20.3358 17.1923C20.707 16.8054 20.707 16.1946 20.3358 15.8077L15.1292 10.3808C14.6421 9.87308 13.8524 9.87308 13.3653 10.3808Z'
            fill='black'
        />
    </svg>
);

// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import styles from '../styles/Bloc3.module.css';

// export default function Carousel({ translations, isArabic }) {
//     const [currentDesktop, setCurrentDesktop] = useState(0); // État pour le carrousel desktop
//     const [currentMobile, setCurrentMobile] = useState(0); // État pour le carrousel mobile

//     // Défilement automatique pour la version desktop
//     useEffect(() => {
//         if (translations.repeteur_etape?.length) {
//             const interval = setInterval(() => {
//                 setCurrentDesktop((prevCurrent) => (prevCurrent + 1) % translations.repeteur_etape.length);
//             }, 1500);
//             return () => clearInterval(interval);
//         }
//     }, [translations]);

//     // Défilement automatique pour la version mobile
//     useEffect(() => {
//         if (translations.repeteurEtapeMobile?.length) {
//             const interval = setInterval(() => {
//                 setCurrentMobile((prevCurrent) => (prevCurrent + 1) % translations.repeteurEtapeMobile.length);
//             }, 1500);
//             return () => clearInterval(interval);
//         }
//     }, [translations]);

//     // Gestion des boutons de navigation pour la version mobile
//     const handleArrowClickMobile = (direction) => {
//         setCurrentDesktop((prevCurrent) =>
//             direction === 'left'
//                 ? (prevCurrent - 1 + translations.repeteurEtapeMobile.length) % translations.repeteurEtapeMobile.length
//                 : (prevCurrent + 1) % translations.repeteurEtapeMobile.length
//         );
//     };

//     // Gestion des boutons de navigation pour la version desktop
//     const handleArrowClickDesktop = (direction) => {
//         setCurrentMobile((prevCurrent) =>
//             direction === 'left'
//                 ? (prevCurrent - 1 + translations.repeteur_etape.length) % translations.repeteur_etape.length
//                 : (prevCurrent + 1) % translations.repeteur_etape.length
//         );
//     };

//     const leftArrow = (
//         <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
//             <path
//                 d='M20.8 31.5L11.2 31.5C5.30019 31.5 0.5 26.6983 0.500001 20.8L0.500002 11.2C0.500002 5.30169 5.30019 0.499998 11.2 0.499998L20.8 0.499999C26.6998 0.5 31.5 5.3017 31.5 11.2L31.5 20.8C31.5 26.6983 26.6998 31.5 20.8 31.5Z'
//                 fill='white'
//                 stroke='black'
//             ></path>
//             <path
//                 fillRule='evenodd'
//                 clipRule='evenodd'
//                 d='M18.6347 21.6192C19.1218 21.1116 19.1218 20.2884 18.6347 19.7808L14.5277 15.5L18.6347 11.2192C19.1218 10.7116 19.1218 9.88844 18.6347 9.38076C18.1476 8.87308 17.3579 8.87308 16.8708 9.38076L11.6642 14.8077C11.293 15.1946 11.293 15.8054 11.6642 16.1923L16.8708 21.6192C17.3579 22.1269 18.1476 22.1269 18.6347 21.6192Z'
//                 fill='black'
//             ></path>
//         </svg>
//     );

//     const rightArrow = (
//         <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
//             <path
//                 d='M11.2 0.5H20.8C26.6998 0.5 31.5 5.3017 31.5 11.2V20.8C31.5 26.6983 26.6998 31.5 20.8 31.5H11.2C5.30019 31.5 0.5 26.6983 0.5 20.8V11.2C0.5 5.3017 5.30019 0.5 11.2 0.5Z'
//                 fill='white'
//                 stroke='black'
//             ></path>
//             <path
//                 fillRule='evenodd'
//                 clipRule='evenodd'
//                 d='M13.3653 10.3808C12.8782 10.8884 12.8782 11.7116 13.3653 12.2192L17.4723 16.5L13.3653 20.7808C12.8782 21.2884 12.8782 22.1116 13.3653 22.6192C13.8524 23.1269 14.6421 23.1269 15.1292 22.6192L20.3358 17.1923C20.707 16.8054 20.707 16.1946 20.3358 15.8077L15.1292 10.3808C14.6421 9.87308 13.8524 9.87308 13.3653 10.3808Z'
//                 fill='black'
//             ></path>
//         </svg>
//     );

//     return (
//         <div className='kal-photo' style={{ direction: isArabic && 'rtl' }}>
//             <div>
//                 <h2 className=''>
//                     <span className='highlight'>{translations.titre_bloc3_span}</span>
//                     {translations.titre_bloc3}
//                 </h2>
//                 <div>
//                     {/* PARTIE GAUCHE / HAUT */}
//                     <section className='kal-photo-carousel-wrapper'>
//                         {/* Carrousel Desktop */}
//                         {/* <article className='kal-photo-carousel max-sm:hidden'> */}
//                         <article className='hidden sm:block'>
//                             {translations.repeteur_etape?.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     style={{ display: index === currentDesktop ? 'block' : 'none' }}
//                                     className='transition-shadow duration-1000 ease-in-out'
//                                 >
//                                     <Image
//                                         src={item.image_repeteur_etape}
//                                         alt={item.titre_check || `Image step ${index + 1}`}
//                                         width={500}
//                                         height={300}
//                                         loading='lazy'
//                                         className='entered lazyloaded'
//                                     />
//                                 </div>
//                             ))}
//                         </article>

//                         {/* Carrousel Mobile */}
//                         {/* <article className='kal-photo-carousel sm:hidden'> */}
//                         <article className='block sm:hidden'>
//                             {translations.repeteurEtapeMobile?.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     style={{ display: index === currentMobile ? 'block' : 'none' }}
//                                     className='transition-opacity duration-1000 ease-in-out'
//                                 >
//                                     <Image
//                                         src={item.image_repeteur_etape}
//                                         alt={item.titre_check || `Image step ${index + 1}`}
//                                         width={500}
//                                         height={300}
//                                         loading='lazy'
//                                         className='entered lazyloaded'
//                                     />
//                                 </div>
//                             ))}
//                         </article>

//                         {/* Indicateurs et boutons de navigation */}
//                         <article className='kal-photo-carousel-indicator'>
//                             <nav
//                                 className='kal-photo-carousel-btn'
//                                 id='left'
//                                 onClick={() => handleArrowClick('left', window.innerWidth < 640)}
//                             >
//                                 {/* SVG du bouton gauche */}
//                                 {!isArabic ? leftArrow : rightArrow}
//                             </nav>
//                             <div>
//                                 {translations.repeteur_etape?.map((_, index) => (
//                                     <section
//                                         key={index}
//                                         // className={index === (window.innerWidth < 640 ? currentMobile : currentDesktop) ? 'selected' : ''}
//                                         className={`hidden sm:block ${index === currentDesktop ? 'selected' : ''} sm:hidden ${index === currentMobile ? 'selected' : ''} `}
//                                         style={{
//                                             backgroundColor:
//                                                 index === (window.innerWidth < 640 ? currentMobile : currentDesktop)
//                                                     ? 'green'
//                                                     : 'lightgrey',
//                                         }}
//                                     />
//                                 ))}
//                             </div>
//                             <nav
//                                 className='kal-photo-carousel-btn'
//                                 id='right'
//                                 onClick={() => handleArrowClick('right', window.innerWidth < 640)}
//                             >
//                                 {/* SVG du bouton droit */}
//                                 {!isArabic ? rightArrow : leftArrow}
//                             </nav>
//                         </article>

//                         {/* Contenu associé au carrousel */}
//                         <article className='kal-photo-carousel-content mb-5 h-32'>
//                             {translations.repeteur_etape?.map((item, index) => (
//                                 <div key={index} style={{ display: index === currentDesktop ? 'block' : 'none' }}>
//                                     <div>
//                                         <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
//                                             <g id='check-white'>
//                                                 <path
//                                                     id='minus-square-Bold'
//                                                     d='M15.6 0H8.4C3.768 0 0 3.7692 0 8.4V15.6C0 20.2308 3.768 24 8.4 24H15.6C20.232 24 24 20.2308 24 15.6V8.4C24 3.7692 20.232 0 15.6 0Z'
//                                                     fill='#2FC977'
//                                                 ></path>
//                                                 <path
//                                                     id='Vector 3 (Stroke)'
//                                                     fillRule='evenodd'
//                                                     clipRule='evenodd'
//                                                     d='M17.6485 8.75137C18.1172 9.22 18.1172 9.9798 17.6485 10.4484L11.6485 16.4484C11.1799 16.9171 10.4201 16.9171 9.95147 16.4484L6.35147 12.8484C5.88284 12.3798 5.88284 11.62 6.35147 11.1514C6.8201 10.6827 7.5799 10.6827 8.04853 11.1514L10.8 13.9028L15.9515 8.75137C16.4201 8.28275 17.1799 8.28275 17.6485 8.75137Z'
//                                                     fill='white'
//                                                 ></path>
//                                             </g>
//                                         </svg>
//                                         <h3>{item.titre_check}</h3>
//                                     </div>
//                                     <p className='kal-photo-carousel-content-desktop'>{item.texte_etape}</p>
//                                     <p className='kal-photo-carousel-content-mobile'>
//                                         {translations.repeteurEtapeMobile?.[index]?.texte_etape}
//                                     </p>
//                                 </div>
//                             ))}
//                         </article>
//                     </section>

//                     {/* PARTIE DROITE / BAS */}
//                     <div>
//                         {translations.repeteurCkeckBlack?.map((item, index) => (
//                             <div key={index}>
//                                 <Image
//                                     className={styles.benefitImage}
//                                     src={item.imageCkeckBlack}
//                                     alt='Benefit Image'
//                                     width={200}
//                                     height={200}
//                                 />
//                                 <div>
//                                     <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
//                                         <g id='check-white'>
//                                             <path
//                                                 id='minus-square-Bold'
//                                                 d='M13 0H7C3.14 0 0 3.141 0 7V13C0 16.859 3.14 20 7 20H13C16.86 20 20 16.859 20 13V7C20 3.141 16.86 0 13 0Z'
//                                                 fill='black'
//                                             ></path>
//                                             <path
//                                                 id='Vector 3 (Stroke)'
//                                                 fillRule='evenodd'
//                                                 clipRule='evenodd'
//                                                 d='M14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L9.70711 13.7071C9.31658 14.0976 8.68342 14.0976 8.29289 13.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L9 11.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289Z'
//                                                 fill='white'
//                                             ></path>
//                                         </g>
//                                     </svg>
//                                     <p>{item.texteCheckBlack}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
