import React, { createContext, useContext, useState, useEffect } from 'react';

// DICTIONARY
// Ideally this grows into separate files, but for now we centralize it here.
const translations = {
    es: {
        // NAV
        nav_ecosystem: "ECOSISTEMA",
        nav_security: "SEGURIDAD",
        nav_mission: "NUESTRA MISIÓN",
        nav_manifesto: "MANIFIESTO",
        nav_download: "DESCARGAR APP",
        nav_terms: "TÉRMINOS",
        // HERO
        hero_title_prefix: "Red mundial de",
        hero_title_highlight: "emprendedores",
        hero_subtitle: "Ecosistema digital emprendedor, donde la tecnología y la innovación impulsan el crecimiento económico global.",
        hero_reveal_1: "Emprender ya no es imposible.",
        hero_reveal_2: "Solo faltaba la herramienta correcta.",
        // GENERIC
        loading: "Cargando..."
    },
    en: {
        // NAV
        nav_ecosystem: "ECOSYSTEM",
        nav_security: "SECURITY",
        nav_mission: "OUR MISSION",
        nav_manifesto: "MANIFESTO",
        nav_download: "DOWNLOAD APP",
        nav_terms: "TERMS",
        // HERO
        hero_title_prefix: "Global network of",
        hero_title_highlight: "entrepreneurs",
        hero_subtitle: "Digital entrepreneurial ecosystem, where technology and innovation drive global economic growth.",
        hero_reveal_1: "Entrepreneurship is no longer impossible.",
        hero_reveal_2: "The only missing piece was the right tool.",
        // GENERIC
        loading: "Loading..."
    }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    // Default to ES, or detect browser? User said currently hardcoded ES.
    // We start with ES.
    const [language, setLanguage] = useState('es');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
