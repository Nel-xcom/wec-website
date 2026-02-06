import { useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/logos/logo-white.png';

// --- DECODING TEXT UTILITY ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DecodingText = memo(({ text }) => {
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
});

DecodingText.displayName = 'DecodingText';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle menu
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <motion.nav
            className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
            style={{ willChange: 'transform, opacity' }}
        >
            {/* GLASS CAPSULE - BOTTOM ALIGNED LINKS */}
            <div className="relative flex items-center justify-between md:items-end gap-10 md:gap-16 px-6 md:px-10 py-3 md:pb-[15px] md:pt-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] h-16 md:h-24 w-full max-w-[90%] md:w-auto md:max-w-none">

                {/* Left Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8 text-[10px] md:text-xs text-slate-400 font-bold mb-1">
                    <Link to="/ecosystem"><DecodingText text="ECOSISTEMA" /></Link>
                    <Link to="/security"><DecodingText text="SEGURIDAD" /></Link>
                    <Link to="/mission"><DecodingText text="NUESTRA MISIÓN" /></Link>
                </div>

                {/* Logo Center (Mobile Left / Desktop Center) */}
                <div className="flex h-full items-center mr-auto md:mr-0">
                    <Link to="/">
                        <img src={logoWhite} alt="WEC" className="h-10 md:h-16 w-auto opacity-90 hover:opacity-100 transition-opacity hover:scale-105 duration-300" loading="lazy" />
                    </Link>
                </div>

                {/* Right Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8 text-[10px] md:text-xs text-slate-400 font-bold mb-1">
                    <Link to="/manifesto"><DecodingText text="MANIFIESTO" /></Link>
                    <Link to="/download"><DecodingText text="DESCARGAR APP" /></Link>
                    <Link to="/"><DecodingText text="TÉRMINOS" /></Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none z-50"
                    aria-label="Menu"
                >
                    <motion.span
                        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="w-6 h-0.5 bg-white block rounded-full"
                    />
                    <motion.span
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-4 h-0.5 bg-white block rounded-full"
                    />
                    <motion.span
                        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="w-6 h-0.5 bg-white block rounded-full"
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-24 left-4 right-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:hidden flex flex-col items-center gap-6 shadow-2xl"
                >
                    <Link to="/ecosystem" onClick={toggleMenu} className="text-white font-bold tracking-widest text-lg">ECOSISTEMA</Link>
                    <Link to="/security" onClick={toggleMenu} className="text-white font-bold tracking-widest text-lg">SEGURIDAD</Link>
                    <Link to="/manifesto" onClick={toggleMenu} className="text-white font-bold tracking-widest text-lg">MANIFIESTO</Link>
                    <div className="w-full h-px bg-white/10 my-2" />
                    <Link to="/" onClick={toggleMenu} className="text-slate-400 text-sm">DESCARGAR APP</Link>
                    <Link to="/mission" onClick={toggleMenu} className="text-slate-400 text-sm">NUESTRA MISIÓN</Link>
                </motion.div>
            )}
        </motion.nav>
    );
}

// PERFORMANCE: Memoize to prevent re-renders
export default memo(Navbar);
