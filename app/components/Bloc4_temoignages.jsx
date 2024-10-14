import { useEffect } from 'react';
import Image from 'next/image';
import useTranslations from '../../utils/useTranslations';
import styles from '../styles/Bloc4.module.css';
import useIsArabic from '../hooks/useIsArabic';

const Bloc4Temoignages = ({ page, locale }) => {
    const { temoignages, media, partenaires } = page.pageDAccueilBloc4;
    const { translations, loading } = useTranslations(locale);
    const isArabic = useIsArabic()

    useEffect(() => {
        const initializeCarousel = () => {
            const carousel = document.querySelector(".kal-testimonials-carousel");
            if (!carousel) return;

            const arrowBtns = document.querySelectorAll(".kal-testimonials-carousel-btn");
            const firstCardWidth = () => {
                const firstCard = carousel.querySelector(".kal-testimonials-card");
                return firstCard ? firstCard.offsetWidth : 0;
            };

            let cardPerView = 3;

            const carouselChildrens = [...carousel.children];
            carouselChildrens.slice(-cardPerView).reverse().forEach((card) => {
                carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
            });

            carouselChildrens.slice(0, cardPerView).forEach((card) => {
                carousel.insertAdjacentHTML("beforeend", card.outerHTML);
            });

            let timeoutId = setInterval(() => {
                carousel.scrollLeft += firstCardWidth();
            }, 2500);

            arrowBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth() : firstCardWidth();
                    clearInterval(timeoutId);
                    timeoutId = setInterval(() => {
                        carousel.scrollLeft += firstCardWidth();
                    }, 2500);
                });
            });

            const infiniteScroll = () => {
                if (carousel.scrollLeft === 0) {
                    carousel.classList.add("no-transition");
                    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
                    carousel.classList.remove("no-transition");
                } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                    carousel.classList.add("no-transition");
                    carousel.scrollLeft = carousel.offsetWidth;
                    carousel.classList.remove("no-transition");
                }
                clearInterval(timeoutId);
                timeoutId = setInterval(() => {
                    carousel.scrollLeft += firstCardWidth();
                }, 2500);
            };

            carousel.addEventListener("scroll", infiniteScroll);
        };

        setTimeout(initializeCarousel,2000)
    }, [temoignages]);

    useEffect(()=>{
        const initializeCarousel=()=>{        
            const Mcarousel = document.querySelector(".kal-testimonials-media");
            if(!Mcarousel) return
            const MarrowBtns = document.querySelectorAll(".kal-testimonials-media-btn");
            const MfirstCardWidth = () => Mcarousel.querySelector("section").offsetWidth;
          
            let McardPerView = Math.round(Mcarousel.offsetWidth / MfirstCardWidth());
          
            const McarouselChildrens = [...Mcarousel.children];
            // Insert copies of the last few cards to beginning of carousel for infinite scrolling
            McarouselChildrens.slice(-McardPerView)
              .reverse()
              .forEach((card) => {
                Mcarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
              });
          
            // Insert copies of the first few cards to end of carousel for infinite scrolling
            McarouselChildrens.slice(0, McardPerView).forEach((card) => {
              Mcarousel.insertAdjacentHTML("beforeend", card.outerHTML);
            });
            let MtimeoutId = setInterval(() => {
              Mcarousel.scrollLeft += MfirstCardWidth();
            }, 2500);
          
            MarrowBtns.forEach((btn) => {
              btn.addEventListener("click", () => {
                Mcarousel.scrollLeft +=
                  btn.id == "left" ? -MfirstCardWidth() : MfirstCardWidth();
          
                clearInterval(MtimeoutId);
                MtimeoutId = setInterval(() => {
                  Mcarousel.scrollLeft += MfirstCardWidth();
                }, 2500);
              });
            });
            const MinfiniteScroll = () => {
              // If the Mcarousel is at the beginning, scroll to the end
              if (Mcarousel.scrollLeft === 0) {
                Mcarousel.classList.add("no-transition");
                Mcarousel.scrollLeft = Mcarousel.scrollWidth - 2 * Mcarousel.offsetWidth;
                Mcarousel.classList.remove("no-transition");
              }
              // If the Mcarousel is at the end, scroll to the beginning
              else if (
                Math.ceil(Mcarousel.scrollLeft) ===
                Mcarousel.scrollWidth - Mcarousel.offsetWidth
              ) {
                Mcarousel.classList.add("no-transition");
                Mcarousel.scrollLeft = Mcarousel.offsetWidth;
                Mcarousel.classList.remove("no-transition");
              }
          
              // Clear existing timeout & start autoplay if mouse is not hovering over carousel
              clearInterval(MtimeoutId);
              MtimeoutId = setInterval(() => {
                Mcarousel.scrollLeft += MfirstCardWidth();
              }, 2500);
            };
            Mcarousel.addEventListener("scroll", MinfiniteScroll);
        }
        setTimeout(initializeCarousel,2000)

    },[media])

    useEffect(()=>{
        const initializeCarousel=()=>{
            const Pcarousel = document.querySelector(".kal-testimonials-partner");
            if(!Pcarousel) return
            const ParrowBtns = document.querySelectorAll(".kal-testimonials-partner-btn");
            const PfirstCardWidth = () => Pcarousel.querySelector("section").offsetWidth;
          
            let PcardPerView = Math.round(Pcarousel.offsetWidth / PfirstCardWidth());
          
            const PcarouselChildrens = [...Pcarousel.children];
            // Insert copies of the last few cards to beginning of carousel for infinite scrolling
            PcarouselChildrens.slice(-PcardPerView)
              .reverse()
              .forEach((card) => {
                Pcarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
              });
          
            // Insert copies of the first few cards to end of carousel for infinite scrolling
            PcarouselChildrens.slice(0, PcardPerView).forEach((card) => {
              Pcarousel.insertAdjacentHTML("beforeend", card.outerHTML);
            });
            let PtimeoutId = setInterval(() => {
              Pcarousel.scrollLeft += PfirstCardWidth();
            }, 2500);
          
            ParrowBtns.forEach((btn) => {
              btn.addEventListener("click", () => {
                Pcarousel.scrollLeft +=
                  btn.id == "left" ? -PfirstCardWidth() : PfirstCardWidth();
          
                clearInterval(PtimeoutId);
                PtimeoutId = setInterval(() => {
                  Pcarousel.scrollLeft += PfirstCardWidth();
                }, 2500);
              });
            });
            const PinfiniteScroll = () => {
              // If the Pcarousel is at the beginning, scroll to the end
              if (Pcarousel.scrollLeft === 0) {
                Pcarousel.classList.add("no-transition");
                Pcarousel.scrollLeft = Pcarousel.scrollWidth - 2 * Pcarousel.offsetWidth;
                Pcarousel.classList.remove("no-transition");
              }
              // If the Pcarousel is at the end, scroll to the beginning
              else if (
                Math.ceil(Pcarousel.scrollLeft) ===
                Pcarousel.scrollWidth - Pcarousel.offsetWidth
              ) {
                Pcarousel.classList.add("no-transition");
                Pcarousel.scrollLeft = Pcarousel.offsetWidth;
                Pcarousel.classList.remove("no-transition");
              }
          
              // Clear existing timeout & start autoplay if mouse is not hovering over carousel
              clearInterval(PtimeoutId);
              PtimeoutId = setInterval(() => {
                Pcarousel.scrollLeft += PfirstCardWidth();
              }, 2500);
            };
            Pcarousel.addEventListener("scroll", PinfiniteScroll);
        }
        setTimeout(initializeCarousel,2000)
    },[partenaires])

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

    if (!translations.Bloc4) {
        console.error('Bloc4 translations not found:', translations);
        return <div>Translations not found</div>;
    }

    return (
        <div className={`${styles.kalTestimonials} ${isArabic && 'kal-testimonials-arabic'}`} style={{textAlign:isArabic&&'right'}}>
            <h2 className='mb-10 max-md:!text-center'>
                {translations.Bloc4.titre_bloc4_1}
                <span className="highlight" >{translations.Bloc4.titre_bloc4_span}</span>
                {translations.Bloc4.titre_bloc4_2}
            </h2>

            <div className="kal-testimonials-carousel-wrapper">

                <nav className="kal-testimonials-carousel-btn" id="left">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20.8 31.5L11.2 31.5C5.30019 31.5 0.5 26.6983 0.500001 20.8L0.500002 11.2C0.500002 5.30169 5.30019 0.499998 11.2 0.499998L20.8 0.499999C26.6998 0.5 31.5 5.3017 31.5 11.2L31.5 20.8C31.5 26.6983 26.6998 31.5 20.8 31.5Z"
                            fill="white"
                            stroke="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.6347 21.6192C19.1218 21.1116 19.1218 20.2884 18.6347 19.7808L14.5277 15.5L18.6347 11.2192C19.1218 10.7116 19.1218 9.88844 18.6347 9.38076C18.1476 8.87308 17.3579 8.87308 16.8708 9.38076L11.6642 14.8077C11.293 15.1946 11.293 15.8054 11.6642 16.1923L16.8708 21.6192C17.3579 22.1269 18.1476 22.1269 18.6347 21.6192Z"
                            fill="black"
                        />
                    </svg>
                </nav>

                <div className="kal-testimonials-carousel">
                    {translations.Bloc4.temoignages?.map((temoignage, index) => (
                        <div key={index} className="kal-testimonials-card">
                            <div>
                                <svg
                                    width="124"
                                    height="24"
                                    viewBox="0 0 124 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.5546 0.872679C11.7402 0.509053 12.2598 0.509054 12.4454 0.87268L15.4816 6.82226C15.5543 6.96461 15.6906 7.06366 15.8484 7.08877L22.4451 8.13791C22.8483 8.20203 23.0088 8.69617 22.7203 8.98503L18.0002 13.7112C17.8873 13.8243 17.8352 13.9846 17.8601 14.1424L18.9008 20.7404C18.9644 21.1437 18.544 21.4491 18.1802 21.264L12.2267 18.2353C12.0843 18.1629 11.9157 18.1629 11.7733 18.2353L5.81983 21.264C5.45596 21.4491 5.03562 21.1437 5.09922 20.7404L6.1399 14.1424C6.16481 13.9846 6.11273 13.8243 5.99979 13.7112L1.27967 8.98503C0.991184 8.69618 1.15174 8.20203 1.55491 8.13791L8.15155 7.08877C8.30939 7.06366 8.44572 6.96461 8.51838 6.82225L11.5546 0.872679Z"
                                        fill="#2FC977"
                                    />
                                    <path
                                        d="M61.5546 0.872679C61.7402 0.509053 62.2598 0.509054 62.4454 0.87268L65.4816 6.82226C65.5543 6.96461 65.6906 7.06366 65.8484 7.08877L72.4451 8.13791C72.8483 8.20203 73.0088 8.69617 72.7203 8.98503L68.0002 13.7112C67.8873 13.8243 67.8352 13.9846 67.8601 14.1424L68.9008 20.7404C68.9644 21.1437 68.544 21.4491 68.1802 21.264L62.2267 18.2353C62.0843 18.1629 61.9157 18.1629 61.7733 18.2353L55.8198 21.264C55.456 21.4491 55.0356 21.1437 55.0992 20.7404L56.1399 14.1424C56.1648 13.9846 56.1127 13.8243 55.9998 13.7112L51.2797 8.98503C50.9912 8.69618 51.1517 8.20203 51.5549 8.13791L58.1516 7.08877C58.3094 7.06366 58.4457 6.96461 58.5184 6.82225L61.5546 0.872679Z"
                                        fill="#2FC977"
                                    />
                                    <path
                                        d="M36.5546 0.872679C36.7402 0.509053 37.2598 0.509054 37.4454 0.87268L40.4816 6.82226C40.5543 6.96461 40.6906 7.06366 40.8484 7.08877L47.4451 8.13791C47.8483 8.20203 48.0088 8.69617 47.7203 8.98503L43.0002 13.7112C42.8873 13.8243 42.8352 13.9846 42.8601 14.1424L43.9008 20.7404C43.9644 21.1437 43.544 21.4491 43.1802 21.264L37.2267 18.2353C37.0843 18.1629 36.9157 18.1629 36.7733 18.2353L30.8198 21.264C30.456 21.4491 30.0356 21.1437 30.0992 20.7404L31.1399 14.1424C31.1648 13.9846 31.1127 13.8243 30.9998 13.7112L26.2797 8.98503C25.9912 8.69618 26.1517 8.20203 26.5549 8.13791L33.1516 7.08877C33.3094 7.06366 33.4457 6.96461 33.5184 6.82225L36.5546 0.872679Z"
                                        fill="#2FC977"
                                    />
                                    <path
                                        d="M86.5546 0.872679C86.7402 0.509053 87.2598 0.509054 87.4454 0.87268L90.4816 6.82226C90.5543 6.96461 90.6906 7.06366 90.8484 7.08877L97.4451 8.13791C97.8483 8.20203 98.0088 8.69617 97.7203 8.98503L93.0002 13.7112C92.8873 13.8243 92.8352 13.9846 92.8601 14.1424L93.9008 20.7404C93.9644 21.1437 93.544 21.4491 93.1802 21.264L87.2267 18.2353C87.0843 18.1629 86.9157 18.1629 86.7733 18.2353L80.8198 21.264C80.456 21.4491 80.0356 21.1437 80.0992 20.7404L81.1399 14.1424C81.1648 13.9846 81.1127 13.8243 80.9998 13.7112L76.2797 8.98503C75.9912 8.69618 76.1517 8.20203 76.5549 8.13791L83.1516 7.08877C83.3094 7.06366 83.4457 6.96461 83.5184 6.82225L86.5546 0.872679Z"
                                        fill="#2FC977"
                                    />
                                    <path
                                        d="M111.555 0.872679C111.74 0.509053 112.26 0.509054 112.445 0.87268L115.482 6.82226C115.554 6.96461 115.691 7.06366 115.848 7.08877L122.445 8.13791C122.848 8.20203 123.009 8.69617 122.72 8.98503L118 13.7112C117.887 13.8243 117.835 13.9846 117.86 14.1424L118.901 20.7404C118.964 21.1437 118.544 21.4491 118.18 21.264L112.227 18.2353C112.084 18.1629 111.916 18.1629 111.773 18.2353L105.82 21.264C105.456 21.4491 105.036 21.1437 105.099 20.7404L106.14 14.1424C106.165 13.9846 106.113 13.8243 106 13.7112L101.28 8.98503C100.991 8.69618 101.152 8.20203 101.555 8.13791L108.152 7.08877C108.309 7.06366 108.446 6.96461 108.518 6.82225L111.555 0.872679Z"
                                        fill="#2FC977"
                                    />
                                </svg>
                                <p>{temoignage.nom}</p>
                                <h4>{temoignage.titre}</h4>
                                <p>{temoignage.texte}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <nav className="kal-testimonials-carousel-btn" id="right">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.2 0.5H20.8C26.6998 0.5 31.5 5.3017 31.5 11.2V20.8C31.5 26.6983 26.6998 31.5 20.8 31.5H11.2C5.30019 31.5 0.5 26.6983 0.5 20.8V11.2C0.5 5.3017 5.30019 0.5 11.2 0.5Z"
                            fill="white"
                            stroke="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.3653 10.3808C12.8782 10.8884 12.8782 11.7116 13.3653 12.2192L17.4723 16.5L13.3653 20.7808C12.8782 21.2884 12.8782 22.1116 13.3653 22.6192C13.8524 23.1269 14.6421 23.1269 15.1292 22.6192L20.3358 17.1923C20.707 16.8054 20.707 16.1946 20.3358 15.8077L15.1292 10.3808C14.6421 9.87308 13.8524 9.87308 13.3653 10.3808Z"
                            fill="black"
                        />
                    </svg>
                </nav>


            </div>
            <div className="kal-testimonials-background"></div>


            {translations.Bloc4.media?.some(mediaItem => mediaItem.img && mediaItem.text) && (
                <div className="kal-testimonials-media-wrapper" style={{flexDirection:isArabic&& 'row-reverse'}}>
                    <h3 className='text-2xl max-md:!text-center'>{translations?.Bloc4?.nos_medias}</h3>
                    <nav className="kal-testimonials-media-btn" id="left">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{rotate:isArabic&&'180deg'}}

                    >
                        <path
                            d="M20.8 31.5L11.2 31.5C5.30019 31.5 0.5 26.6983 0.500001 20.8L0.500002 11.2C0.500002 5.30169 5.30019 0.499998 11.2 0.499998L20.8 0.499999C26.6998 0.5 31.5 5.3017 31.5 11.2L31.5 20.8C31.5 26.6983 26.6998 31.5 20.8 31.5Z"
                            fill="white"
                            stroke="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.6347 21.6192C19.1218 21.1116 19.1218 20.2884 18.6347 19.7808L14.5277 15.5L18.6347 11.2192C19.1218 10.7116 19.1218 9.88844 18.6347 9.38076C18.1476 8.87308 17.3579 8.87308 16.8708 9.38076L11.6642 14.8077C11.293 15.1946 11.293 15.8054 11.6642 16.1923L16.8708 21.6192C17.3579 22.1269 18.1476 22.1269 18.6347 21.6192Z"
                            fill="black"
                        />
                    </svg>
                    </nav>
                    <div className="kal-testimonials-media">
                        {translations.Bloc4.media.map((mediaItem, index) => (
                            mediaItem.img && mediaItem.text && ( // Affiche uniquement si les deux champs sont remplis
                                <section key={index}>
                                    <Image
                                        width={500}
                                        height={500}
                                        src={mediaItem.img}
                                        alt={mediaItem.text}
                                    />
                                    <p>{mediaItem.text}</p>
                                </section>
                            )
                        ))}
                    </div>
                    <nav className="kal-testimonials-media-btn" id="right">

                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{rotate:isArabic&&'180deg'}}

                    >
                        <path
                            d="M11.2 0.5H20.8C26.6998 0.5 31.5 5.3017 31.5 11.2V20.8C31.5 26.6983 26.6998 31.5 20.8 31.5H11.2C5.30019 31.5 0.5 26.6983 0.5 20.8V11.2C0.5 5.3017 5.30019 0.5 11.2 0.5Z"
                            fill="white"
                            stroke="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.3653 10.3808C12.8782 10.8884 12.8782 11.7116 13.3653 12.2192L17.4723 16.5L13.3653 20.7808C12.8782 21.2884 12.8782 22.1116 13.3653 22.6192C13.8524 23.1269 14.6421 23.1269 15.1292 22.6192L20.3358 17.1923C20.707 16.8054 20.707 16.1946 20.3358 15.8077L15.1292 10.3808C14.6421 9.87308 13.8524 9.87308 13.3653 10.3808Z"
                            fill="black"
                        />
                    </svg>
                </nav>
                
                <div style={{display:'none'}}>
      <nav className="kal-testimonials-media-btn" id="left">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M20.8 31.5L11.2 31.5C5.30019 31.5 0.5 26.6983 0.500001 20.8L0.500002 11.2C0.500002 5.30169 5.30019 0.499998 11.2 0.499998L20.8 0.499999C26.6998 0.5 31.5 5.3017 31.5 11.2L31.5 20.8C31.5 26.6983 26.6998 31.5 20.8 31.5Z" fill="white" stroke="black"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M18.6347 21.6192C19.1218 21.1116 19.1218 20.2884 18.6347 19.7808L14.5277 15.5L18.6347 11.2192C19.1218 10.7116 19.1218 9.88844 18.6347 9.38076C18.1476 8.87308 17.3579 8.87308 16.8708 9.38076L11.6642 14.8077C11.293 15.1946 11.293 15.8054 11.6642 16.1923L16.8708 21.6192C17.3579 22.1269 18.1476 22.1269 18.6347 21.6192Z" fill="black"></path>
        </svg>
      </nav>
      <nav className="kal-testimonials-media-btn" id="right" >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2 0.5H20.8C26.6998 0.5 31.5 5.3017 31.5 11.2V20.8C31.5 26.6983 26.6998 31.5 20.8 31.5H11.2C5.30019 31.5 0.5 26.6983 0.5 20.8V11.2C0.5 5.3017 5.30019 0.5 11.2 0.5Z" fill="white" stroke="black"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M13.3653 10.3808C12.8782 10.8884 12.8782 11.7116 13.3653 12.2192L17.4723 16.5L13.3653 20.7808C12.8782 21.2884 12.8782 22.1116 13.3653 22.6192C13.8524 23.1269 14.6421 23.1269 15.1292 22.6192L20.3358 17.1923C20.707 16.8054 20.707 16.1946 20.3358 15.8077L15.1292 10.3808C14.6421 9.87308 13.8524 9.87308 13.3653 10.3808Z" fill="black"></path>
        </svg>
      </nav>
    </div>

                </div>
            )}



            <div className="kal-testimonials-partner-wrapper">
                <h3 className='text-2xl max-md:!text-center'> {translations.Bloc4.nos_partenaires}</h3>
                <nav className="kal-testimonials-partner-btn" id="left">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg" 
                        style={{rotate:isArabic&&'180deg'}}

                    >
                        <path
                            d="M20.8 31.5L11.2 31.5C5.30019 31.5 0.5 26.6983 0.500001 20.8L0.500002 11.2C0.500002 5.30169 5.30019 0.499998 11.2 0.499998L20.8 0.499999C26.6998 0.5 31.5 5.3017 31.5 11.2L31.5 20.8C31.5 26.6983 26.6998 31.5 20.8 31.5Z"
                            fill="white"
                            stroke="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.6347 21.6192C19.1218 21.1116 19.1218 20.2884 18.6347 19.7808L14.5277 15.5L18.6347 11.2192C19.1218 10.7116 19.1218 9.88844 18.6347 9.38076C18.1476 8.87308 17.3579 8.87308 16.8708 9.38076L11.6642 14.8077C11.293 15.1946 11.293 15.8054 11.6642 16.1923L16.8708 21.6192C17.3579 22.1269 18.1476 22.1269 18.6347 21.6192Z"
                            fill="black"
                        />
                    </svg>
                </nav>
                <div className="kal-testimonials-partner ">
                    {translations.Bloc4.partenaires?.map((partenaire, index) => (

                        <section key={index} className="flex justify-center items-center">
                            <Image
                                width={500}
                                height={500}
                                src={partenaire.img}
                                alt={partenaire.text}
                                className="object-contain"
                            />
                        </section>

                    ))}
                </div>
                <nav className="kal-testimonials-partner-btn" id="right">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg" 
                        style={{rotate:isArabic&&'180deg'}}

                    >
                        <path
                            d="M11.2 0.5H20.8C26.6998 0.5 31.5 5.3017 31.5 11.2V20.8C31.5 26.6983 26.6998 31.5 20.8 31.5H11.2C5.30019 31.5 0.5 26.6983 0.5 20.8V11.2C0.5 5.3017 5.30019 0.5 11.2 0.5Z"
                            fill="white"
                            stroke="black"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.3653 10.3808C12.8782 10.8884 12.8782 11.7116 13.3653 12.2192L17.4723 16.5L13.3653 20.7808C12.8782 21.2884 12.8782 22.1116 13.3653 22.6192C13.8524 23.1269 14.6421 23.1269 15.1292 22.6192L20.3358 17.1923C20.707 16.8054 20.707 16.1946 20.3358 15.8077L15.1292 10.3808C14.6421 9.87308 13.8524 9.87308 13.3653 10.3808Z"
                            fill="black"
                        />
                    </svg>
                </nav>

                <div style={{display:'none'}}>
      <nav className="kal-testimonials-partner-btn" id="left">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M20.8 31.5L11.2 31.5C5.30019 31.5 0.5 26.6983 0.500001 20.8L0.500002 11.2C0.500002 5.30169 5.30019 0.499998 11.2 0.499998L20.8 0.499999C26.6998 0.5 31.5 5.3017 31.5 11.2L31.5 20.8C31.5 26.6983 26.6998 31.5 20.8 31.5Z" fill="white" stroke="black"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M18.6347 21.6192C19.1218 21.1116 19.1218 20.2884 18.6347 19.7808L14.5277 15.5L18.6347 11.2192C19.1218 10.7116 19.1218 9.88844 18.6347 9.38076C18.1476 8.87308 17.3579 8.87308 16.8708 9.38076L11.6642 14.8077C11.293 15.1946 11.293 15.8054 11.6642 16.1923L16.8708 21.6192C17.3579 22.1269 18.1476 22.1269 18.6347 21.6192Z" fill="black"></path>
        </svg>
      </nav>
      <nav className="kal-testimonials-partner-btn" id="right">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M11.2 0.5H20.8C26.6998 0.5 31.5 5.3017 31.5 11.2V20.8C31.5 26.6983 26.6998 31.5 20.8 31.5H11.2C5.30019 31.5 0.5 26.6983 0.5 20.8V11.2C0.5 5.3017 5.30019 0.5 11.2 0.5Z" fill="white" stroke="black"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M13.3653 10.3808C12.8782 10.8884 12.8782 11.7116 13.3653 12.2192L17.4723 16.5L13.3653 20.7808C12.8782 21.2884 12.8782 22.1116 13.3653 22.6192C13.8524 23.1269 14.6421 23.1269 15.1292 22.6192L20.3358 17.1923C20.707 16.8054 20.707 16.1946 20.3358 15.8077L15.1292 10.3808C14.6421 9.87308 13.8524 9.87308 13.3653 10.3808Z" fill="black"></path>
        </svg>
      </nav>
    </div>

            </div>
        </div>
    );
};

export default Bloc4Temoignages;