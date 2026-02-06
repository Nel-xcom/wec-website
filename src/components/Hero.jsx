import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, memo } from 'react';

function Hero() {
    const ref = useRef(null);

    // Scroll dissolve for text - OPTIMIZED
    // Removed 'filter: blur()' transition to prevent layout thrashing.
    // Replaced with opacity and scale only, which are compositor-friendly.
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"] // Passive by default in Framer Motion
    });

    // Smooth out the scroll value
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

    const opacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);
    const scale = useTransform(smoothScroll, [0, 0.4], [1, 0.95]);
    // const filter = ... REMOVED: Blur is too expensive for scroll-linked animation on low-end.

    return (
        <motion.section
            ref={ref}
            style={{ opacity, scale, willChange: 'opacity, transform' }} // GPU Hint
            className="relative w-full min-h-screen flex flex-col justify-center items-center px-4"
        >

            {/* TEXT CONTENT - Rendered on its own layer */}
            <motion.div
                className="text-center flex flex-col items-center z-10 max-w-5xl mt-32 md:mt-40"
                style={{ willChange: 'transform' }}
            >
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-wec-blue via-purple-400 to-amber-300"
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
                    className="mt-12 px-10 py-4 rounded-full bg-white text-black font-bold text-base md:text-lg tracking-widest uppercase hover:bg-gradient-to-r hover:from-wec-blue hover:via-purple-400 hover:to-amber-300 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Obtener acceso anticipado
                </motion.button>
            </motion.div>

            {/* AMBIENT LIGHT HINT */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1400px] pointer-events-none -z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-wec-black via-transparent to-transparent opacity-50" />
            </div>

        </motion.section>
    );
}

// PERFORMANCE: Memoize to prevent re-renders
export default memo(Hero);
