'use client';

import React, { useState } from 'react';
import styles from '../styles/Bloc9Accordeon.module.css';
import useTranslations from "@/utils/useTranslations";

const Bloc9Accordeon = ({ locale }) => {

    const [activeTab, setActiveTab] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const renderQuestions = (questions) => {
        if (!questions || questions.length === 0) {
            return null;
        }

        return questions.map((item, index) => {
            const titre = item.titre_accordeon || item.titreAccordeon;
            const texte = item.texte_accordeon || item.texteAccordeon;

            if (!titre || !texte) {
                return null;
            }
            return (
                <div key={index} className={styles.questionContainer}>
                    <div className={styles.question} onClick={() => toggleAccordion(index)}>
                        <p>{titre}</p>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={activeIndex === index ? styles.iconOpen : styles.icon}
                        >
                            <path
                                d="M10.4 0H5.6C2.512 0 0 2.5128 0 5.6V10.4C0 13.4872 2.512 16 5.6 16H10.4C13.488 16 16 13.4872 16 10.4V5.6C16 2.5128 13.488 0 10.4 0Z"
                                fill="currentColor"
                            />
                            <path
                                d="M8 5V11"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M11 8L5 8"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <div className={`${styles.answer} ${activeIndex === index ? styles.active : ''}`}>
                        <p dangerouslySetInnerHTML={{ __html: texte }}></p>
                    </div>
                </div>
            );
        }).filter(question => question !== null);
    };

    const { translations, loading } = useTranslations(locale);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!translations.Bloc9) {
        return <div>Translations for Bloc9 not found</div>;
    }

    const tabs = [
        {
            name: translations.Bloc9.ID,
            content: renderQuestions(translations.Bloc9.photo_didentite)
        },
        {
            name: translations.Bloc9.ePhoto,
            content: renderQuestions(translations.Bloc9.codeEphoto)
        }
    ].filter(tab => tab.content !== null && tab.content.length > 0);

    return (
        <div className={styles.accordion}>
            <div>
                <h3>
                    <span className={styles.highlight}>{translations.Bloc9.titre_bloc9_span}</span>
                    {translations.Bloc9.titre_bloc9}
                </h3>

                <div className={styles.accordionContainer}>
                    <div className={styles.tabList}>
                        {tabs.map((tab, index) => (
                            <div
                                key={index}
                                className={`${styles.tab} ${activeTab === index ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab(index)}
                            >
                                <p>{tab.name}</p>
                                <svg
                                    width="10"
                                    height="16"
                                    viewBox="0 0 10 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0.449607 0.468629C-0.149869 1.09347 -0.149869 2.10653 0.449607 2.73137L5.50437 8L0.449607 13.2686C-0.149869 13.8935 -0.149869 14.9065 0.449607 15.5314C1.04908 16.1562 2.02102 16.1562 2.6205 15.5314L9.18195 8.69231C9.55315 8.30541 9.55315 7.6946 9.18195 7.30769L2.6205 0.468629C2.02102 -0.15621 1.04908 -0.15621 0.449607 0.468629Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>
                    <div className={styles.tabContent}>
                        {tabs.length > 0 ? tabs[activeTab].content : <p>No content available</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bloc9Accordeon;
