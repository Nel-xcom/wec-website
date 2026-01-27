import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
    const ref = useRef(null);

    // Scroll dissolve for text
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const filter = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(10px)"]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <motion.section
            ref={ref}
            style={{ opacity, filter, scale }}
            className="relative w-full min-h-screen flex flex-col justify-center items-center px-4"
        >

            {/* TEXT CONTENT */}
            <motion.div
                className="text-center flex flex-col items-center z-10 max-w-5xl mt-32 md:mt-40" // Push content down
            >
                <motion.h1
                    className="molten-silver text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] drop-shadow-2xl"
                    initial={{ opacity: 0, filter: "blur(20px)", letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "-0.02em" }}
                    transition={{ delay: 0.3, duration: 1.2, ease: "circOut" }}
                >
                    Red mundial de emprendedores
                </motion.h1>

                <motion.p
                    className="volcanic-ash text-sm md:text-base max-w-2xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                >
                    Capital, talento y mercado. La infraestructura que democratiza oportunidades.
                </motion.p>

                <motion.button
                    className="mt-12 px-10 py-4 rounded-full bg-white text-black font-bold text-base md:text-lg tracking-widest uppercase hover:bg-wec-blue transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Registrate
                </motion.button>
            </motion.div>

            {/* AMBIENT LIGHT HINT */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1400px] pointer-events-none -z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-wec-black via-transparent to-transparent opacity-50" />
            </div>

        </motion.section>
    );
}
