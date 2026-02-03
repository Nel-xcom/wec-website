import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';
import Navbar from './Navbar';
import { useRef, useState, useEffect } from 'react';

// --- UTILS ---
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };
    const reset = () => { setPosition({ x: 0, y: 0 }); };
    const { x, y } = position;
    return (
        <motion.button
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={className}
        >
            {children}
        </motion.button>
    );
};

// --- KINETIC TYPOGRAPHY COMPONENT ---
const CrystallizeText = ({ children, className, delay = 0, isShockwave = false }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            className={className}
        >
            <motion.p
                variants={{
                    hidden: { opacity: 0, filter: "blur(10px)", letterSpacing: "0.1em", y: 20 },
                    visible: {
                        opacity: 1,
                        filter: "blur(0px)",
                        letterSpacing: "0em",
                        y: 0,
                        transition: { duration: 1, ease: "easeOut", delay }
                    }
                }}
            >
                {/* Shockwave Wrapper if needed */}
                {isShockwave ? (
                    <motion.span
                        className="relative inline-block text-white font-bold"
                        whileInView={{
                            textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 30px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"],
                        }}
                        transition={{ duration: 0.5, delay: delay + 0.8 }}
                    >
                        {children}
                        <motion.span
                            className="absolute inset-0 bg-white mix-blend-overlay"
                            initial={{ scale: 1, opacity: 0 }}
                            whileInView={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                            transition={{ duration: 0.6, delay: delay + 0.8 }}
                        />
                    </motion.span>
                ) : children}
            </motion.p>
        </motion.div>
    );
};

// --- THE GOLDEN THREAD ---
const GoldenThread = ({ scrollYProgress }) => {
    // Thread fills from 0 to 1
    const height = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="absolute top-0 left-4 md:left-1/2 md:-translate-x-px bottom-0 w-[2px] pointer-events-none h-full z-0 hidden md:block">
            {/* The Track */}
            <div className="w-full h-full bg-slate-800/30" />

            {/* The Living Thread */}
            <motion.div
                style={{ height, opacity }}
                className="absolute top-0 w-full bg-gradient-to-b from-transparent via-cyan-400 to-amber-300 shadow-[0_0_15px_rgba(255,215,0,0.6)]"
            >
                {/* The HEAD particle */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]" />
            </motion.div>
        </div>
    );
};

// --- ATMOSPHERE & PARTICLES ---
const ConstellationMesh = ({ scrollYProgress }) => {
    // Reveal constellation lines near the end
    const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 0.4]);
    return (
        <motion.div style={{ opacity }} className="fixed inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full">
                <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                {/* Add more seemingly random connections */}
            </svg>
        </motion.div>
    );
}

export default function ManifestoPage() {
    const containerRef = useRef(null);
    const { scrollYProgress, scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 1. ATMOSPHERIC EVOLUTION: Black -> Midnight Purple -> Dawn
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#030303", "#050308", "#110518"]
    );

    // 2. PARTICLES DENSITY (Simulated by opacity of a dusty texture)
    const particleOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 0.5]);

    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor }}
            className="relative w-full min-h-[300vh] text-slate-300 font-sans selection:bg-wec-purple/30 selection:text-white flex flex-col items-center overflow-x-hidden transition-colors duration-1000"
        >

            <Navbar />

            {/* THE GOLDEN THREAD */}
            <GoldenThread scrollYProgress={scrollYProgress} />

            {/* DUST PARTICLES */}
            <motion.div
                style={{ opacity: particleOpacity }}
                className="fixed inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"
            />
            <ConstellationMesh scrollYProgress={scrollYProgress} />

            {/* CONTENT PILLAR */}
            <div className="relative z-10 w-full max-w-3xl px-6 pt-40 pb-32 md:pt-60 md:pb-60 space-y-32 md:space-y-48">

                <CrystallizeText className="text-xl md:text-2xl leading-relaxed text-center md:text-left">
                    Hay un tipo de persona que nunca encaja del todo. No porque sea un problema, sino porque el mundo que lo rodea siempre le queda chico.
                </CrystallizeText>

                <CrystallizeText className="text-xl md:text-2xl leading-relaxed text-center md:text-right">
                    Son los que hacen preguntas incómodas, los que desarman las certezas ajenas, los que sienten que rendirse a lo establecido es una forma silenciosa de morir.
                </CrystallizeText>

                <CrystallizeText className="text-xl md:text-2xl leading-relaxed text-center md:text-left">
                    <span className="text-white font-semibold drop-shadow-md">Ellos no buscan aprobación. Buscan propósito.</span> Mientras la mayoría se adapta, ellos se inquietan. Mientras otros aceptan reglas, ellos imaginan cómo reescribirlas.
                </CrystallizeText>

                {/* THE SHOCKWAVE MOMENT */}
                <CrystallizeText className="text-2xl md:text-4xl leading-tight text-center py-20" isShockwave={true}>
                    El futuro no se descubre… se construye.
                </CrystallizeText>

                <CrystallizeText className="text-xl md:text-2xl leading-relaxed text-center md:text-right">
                    Son personas que fallan, sí. Pero cada caída se convierte en un mapa nuevo. Cada error, en una herramienta. Cada "no se puede", en una invitación a intentarlo de todas formas.
                </CrystallizeText>

                <CrystallizeText className="text-xl md:text-2xl leading-relaxed text-center md:text-left">
                    Tienen una visión rara, incómoda, a veces perturbadora para quienes prefieren la comodidad al cambio. Pero esa visión es justamente lo que abre caminos donde antes no los había.
                </CrystallizeText>

                <CrystallizeText className="text-xl md:text-2xl leading-relaxed text-center md:text-right">
                    Y el centro mundial de emprendedores es, en esencia, la obra de ese tipo de personas. Una constelación de mentes inquietas que eligieron no esperar, no pedir, no dudar. Eligieron hacer. Asi es como se concreto el final de una idea y comenzo un sueño.
                </CrystallizeText>

                <div className="pt-20 text-center">
                    <p className="text-2xl md:text-4xl font-light italic text-white/90 mb-12">
                        A los que no se conforman: este es su lugar.
                    </p>

                    {/* REACTIVE CTA */}
                    <MagneticButton className="relative z-20 px-12 py-5 rounded-full bg-white text-black font-extrabold text-lg md:text-xl tracking-widest uppercase hover:bg-wec-blue transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:shadow-[0_0_80px_rgba(255,255,255,0.8)] hover:scale-105">
                        OBTENER ACCESO ANTICIPADO
                    </MagneticButton>
                </div>

            </div>

        </motion.div>
    );
}
