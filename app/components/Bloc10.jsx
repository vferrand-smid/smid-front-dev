'use client';

import React, { useState } from 'react';
import styles from '../styles/Bloc10.module.css';
import Image from "next/image";
import useTranslations from "@/utils/useTranslations";

const StarIcon = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="46"
        height="44"
        viewBox="0 0 46 44"
        fill="none"
        className={filled ? 'text-[#2FC977]' : 'text-gray-400'}
    >
        <path
            d="M22.1093 0.745359C22.4804 0.018108 23.5196 0.0181086 23.8907 0.74536L30.263 13.2319C30.4083 13.5166 30.681 13.7147 30.9967 13.7649L44.8412 15.9668C45.6476 16.095 45.9687 17.0833 45.3917 17.661L35.4855 27.58C35.2596 27.8062 35.1554 28.1267 35.2052 28.4425L37.3893 42.2899C37.5165 43.0964 36.6759 43.7072 35.9481 43.3369L23.4534 36.9807C23.1685 36.8357 22.8315 36.8357 22.5466 36.9807L10.0519 43.3369C9.32414 43.7072 8.48345 43.0964 8.61066 42.2899L10.7948 28.4425C10.8446 28.1267 10.7404 27.8062 10.5145 27.58L0.608277 17.661C0.0313087 17.0833 0.352424 16.095 1.15877 15.9668L15.0033 13.7649C15.319 13.7147 15.5917 13.5166 15.737 13.2319L22.1093 0.745359Z"
            fill="currentColor"
        />
    </svg>
);


const Bloc10 = ({ page, locale  }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [averageRating, setAverageRating] = useState(3.9);
    const [voteCount, setVoteCount] = useState(248);
    const { translations, loading } = useTranslations(locale);

    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (value) => {
        if (!hasRated) {
            setRating(value);
            setHasRated(true);
            // Soumettre la note et mettre à jour la moyenne et le nombre de votes
            // À remplacer par un appel à votre API pour gérer les votes
            setAverageRating(((averageRating * voteCount + value) / (voteCount + 1)).toFixed(1));
            setVoteCount(voteCount + 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }
    if (!translations.Bloc10) {
        return <div className="hidden">Translations for Bloc10 not found</div>;
    }

    return (
        <div className={styles.container}>
            {hasRated && <p className={styles.thankYouMsg}>{translations.Bloc10["thankYouMsg"]}</p>}
            <p className={styles.heading}>{translations.Bloc10["heading"]}</p>
            <p className={styles.subtitle}>{translations.Bloc10["sousTitre"]}</p>
            <div className={styles.iconsContainer}>
                <ul className={styles.iconsList}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <li
                            key={value}
                            className={`${styles.icon} ${value <= (hoverRating || rating) ? styles.highlighted : styles.defaultIcon}`}
                            onMouseEnter={() => handleMouseEnter(value)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(value)}
                            style={{ cursor: hasRated ? 'default' : 'pointer' }}
                        >
                            <StarIcon filled={value <= (hoverRating || rating)} />
                        </li>
                    ))}
                </ul>
            </div>
            <p className={styles.resultsText}>
                <span>{voteCount}</span> {translations.Bloc10["personne"]}<span>{averageRating}</span>{translations.Bloc10["etoiles"]}.
            </p>
        </div>
    );
};



export default Bloc10;