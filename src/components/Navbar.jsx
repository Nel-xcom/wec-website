import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/logos/logo-white.png';

// --- DECODING TEXT UTILITY ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DecodingText = ({ text }) => {
    const [display, setDisplay] = useState(text);
    const intervalRef = useRef(null);

    const scramble = () => {
        let iteration = 0;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return text[index];
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );
            if (iteration >= text.length) clearInterval(intervalRef.current);
            iteration += 1 / 3;
        }, 30);
    };

    return (
        <span
            onMouseEnter={scramble}
            className="cursor-pointer hover:text-white transition-colors duration-300 font-medium tracking-wide whitespace-nowrap"
        >
            {display}
        </span>
    );
};

export default function Navbar() {
    return (
        <motion.nav
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
        >
            {/* GLASS CAPSULE - BOTTOM ALIGNED LINKS */}
            <div className="flex items-end gap-10 md:gap-16 px-10 pb-[15px] pt-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] h-20 md:h-24">

                {/* Links Left */}
                <div className="hidden md:flex items-center gap-8 text-[10px] md:text-xs text-slate-400 font-bold mb-1">
                    <a href="#ecosystem"><DecodingText text="ECOSISTEMA" /></a>
                    <a href="#security"><DecodingText text="SEGURIDAD" /></a>
                    <Link to="/"><DecodingText text="NUESTRA MISIÓN" /></Link>
                </div>

                {/* Logo Center */}
                <div className="flex h-full items-center">
                    <Link to="/">
                        <img src={logoWhite} alt="WEC" className="h-14 md:h-16 w-auto opacity-90 hover:opacity-100 transition-opacity hover:scale-105 duration-300" />
                    </Link>
                </div>

                {/* Links Right */}
                <div className="hidden md:flex items-center gap-8 text-[10px] md:text-xs text-slate-400 font-bold mb-1">
                    <Link to="/manifesto"><DecodingText text="MANIFIESTO" /></Link>
                    <Link to="/"><DecodingText text="DESCARGAR APP" /></Link>
                    <Link to="/"><DecodingText text="TÉRMINOS" /></Link>
                </div>

            </div>
        </motion.nav>
    );
}
