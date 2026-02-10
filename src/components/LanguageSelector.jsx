import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-8 right-8 z-[9999] group cursor-pointer active:scale-95 transition-transform duration-200"
            aria-label="Toggle Language"
        >
            {/* ROTATING BORDER (Subtle version of Hand Button) */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#fcd34d,#3b82f6,#9333ea,#ffffff,#fcd34d)] animate-[spin_4s_linear_infinite] p-[2px] opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="h-full w-full rounded-full bg-black" />
            </div>

            {/* BUTTON CONTENT */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:bg-white/5 overflow-hidden">
                <img
                    src={language === 'es' ? "https://flagcdn.com/w80/es.png" : "https://flagcdn.com/w80/us.png"}
                    alt={language === 'es' ? "Español" : "English"}
                    className="w-8 h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
            </div>
        </button>
    );
};

export default LanguageSelector;
