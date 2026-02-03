
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/Components/Welcome/data';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Try to get language from localStorage or default to 'en'
    const [lang, setLangState] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('app_lang') || 'en';
        }
        return 'en';
    });

    const setLang = (newLang) => {
        setLangState(newLang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('app_lang', newLang);
        }
    };

    const t = translations[lang];
    const isBn = lang === 'bn';

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, isBn }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
