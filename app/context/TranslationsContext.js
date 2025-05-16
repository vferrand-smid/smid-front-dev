// context/TranslationsContext.js
'use client';
import { createContext, useContext } from 'react';

const TranslationsContext = createContext({});

export function TranslationsProvider({ value, children }) {
    return <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>;
}

export function useTranslations() {
    return useContext(TranslationsContext);
}
