'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = ({ page }) => {

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (page?.pageDAccueilBloc3?.repeteur_etape?.length) {
            const interval = setInterval(() => {
                setCurrent((prevCurrent) => (prevCurrent + 1) % page.pageDAccueilBloc3.repeteur_etape.length);
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [page]);

    const handleArrowClick = (direction) => {
        setCurrent((prevCurrent) =>
            direction === "left"
                ? (prevCurrent - 1 + page.pageDAccueilBloc3.repeteur_etape.length) % page.pageDAccueilBloc3.repeteur_etape.length
                : (prevCurrent + 1) % page.pageDAccueilBloc3.repeteur_etape.length
        );
    };

    if (!page) return null;

    return (
        <div className="container">
            <div className="content">
                <h2 className="title">
                    <span className="highlight">{page.pageDAccueilBloc3.titre_bloc3_span}</span>
                    {page.pageDAccueilBloc3.titre_bloc3}
                </h2>
                <div className="grid-containt">
                    <div className="left">
                        <div className="carousel-wrapper">
                            <div className="photo-carousel">
                                {page?.pageDAccueilBloc3?.repeteur_etape?.map((item, index) => (
                                    <div key={index}
                                         className={`flex-shrink-0 w-full ${index === current ? 'block' : 'hidden'}`}>
                                        <Image
                                            width={500}
                                            height={500}
                                            priority
                                            className="w-full h-auto object-contain"
                                            src={item.image_repeteur_etape.node.mediaItemUrl}
                                            alt="Step Image"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="carousel-indicator">
                                <button
                                    className="carousel-btn"
                                    onClick={() => handleArrowClick("left")}>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20.8 31.5L11.2 31.5C5.30019 31.5 0.5 26.6983 0.500001 20.8L0.500002 11.2C0.500002 5.30169 5.30019 0.499998 11.2 0.499998L20.8 0.499999C26.6998 0.5 31.5 5.3017 31.5 11.2L31.5 20.8C31.5 26.6983 26.6998 31.5 20.8 31.5Z"
                                            fill="white" stroke="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M18.6347 21.6192C19.1218 21.1116 19.1218 20.2884 18.6347 19.7808L14.5277 15.5L18.6347 11.2192C19.1218 10.7116 19.1218 9.88844 18.6347 9.38076C18.1476 8.87308 17.3579 8.87308 16.8708 9.38076L11.6642 14.8077C11.293 15.1946 11.293 15.8054 11.6642 16.1923L16.8708 21.6192C17.3579 22.1269 18.1476 22.1269 18.6347 21.6192Z"
                                              fill="black"/>
                                    </svg>
                                </button>
                                {page?.pageDAccueilBloc3?.repeteur_etape?.map((_, index) => (
                                    <section key={index}
                                             className={`h-1.5 w-12 bg-gray-300 ${index === current ? 'bg-green-400' : ''}`}></section>
                                ))}
                                <button
                                    className="carousel-btn"
                                    onClick={() => handleArrowClick("right")}>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.2 0.5H20.8C26.6998 0.5 31.5 5.3017 31.5 11.2V20.8C31.5 26.6983 26.6998 31.5 20.8 31.5H11.2C5.30019 31.5 0.5 26.6983 0.5 20.8V11.2C0.5 5.3017 5.30019 0.5 11.2 0.5Z"
                                            fill="white" stroke="black"/>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M13.3653 10.3808C12.8782 10.8884 12.8782 11.7116 13.3653 12.2192L17.4723 16.5L13.3653 20.7808C12.8782 21.2884 12.8782 22.1116 13.3653 22.6192C13.8524 23.1269 14.6421 23.1269 15.1292 22.6192L20.3358 17.1923C20.707 16.8054 20.707 16.1946 20.3358 15.8077L15.1292 10.3808C14.6421 9.87308 13.8524 9.87308 13.3653 10.3808Z"
                                              fill="black"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="carousel-content text-black">
                            {page?.pageDAccueilBloc3?.repeteur_etape?.map((item, index) => (
                                <div key={index}
                                     className={`flex flex-col items-center text-center gap-3 ${index === current ? 'block' : 'hidden'}`}>
                                    <div className="flex items-center gap-3">
                                        <img className="icon w-5 h-5" src={item.check_green.node.mediaItemUrl}
                                             alt="Check Icon"/>
                                        <p className="step-title text-xl font-semibold">{item.titre_check}</p>
                                    </div>
                                    <p className="step-text font-light">{item.texte_etape}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* PARTIE GAUCHE */}
                    <div className="right ml-14">
                        <div className="benefits">
                            {page?.pageDAccueilBloc3?.repeteurCkeckBlack?.map((item, index) => (
                                <div className="benefit flex items-center gap-3 mb-6" key={index}>
                                    <img className="benefit-image"
                                         src={item.imageCkeckBlack.node.mediaItemUrl} alt="Benefit Image"/>
                                    <div className="benefit-details flex items-center gap-3">
                                        <Image
                                            width={500}
                                            height={500}
                                            className="icon" src={item.checkBlack?.node.mediaItemUrl}
                                             alt="Check Black"/>
                                        <p className="benefit-text">{item.texteCheckBlack}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
