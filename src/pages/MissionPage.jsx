import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState as React_useState, memo, useCallback } from 'react';
import Navbar from '../components/Navbar';
import GeometricBackground from '../components/GeometricBackground';
import { useLanguage } from '../context/LanguageContext';

// --- OPTIMIZED LIVING CORE ---
// Memoized to prevent re-renders by parent.
const LivingCore = memo(({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0]);

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.div
                style={{ scale, opacity, willChange: 'transform, opacity' }} // GPU Hint
                className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
            >
                {/* Optimized Blur: Using opacity layers instead of heavy filters where possible */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-wec-blue/20 via-purple-500/20 to-amber-500/10 blur-[30px] animate-pulse" />

                {/* CSS Animations (defined in index.css) are lighter than Framer Motion loops */}
                <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_20s_linear_infinite] opacity-30" />
                <div className="absolute inset-4 border border-wec-blue/10 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-40" />
                <div className="absolute inset-8 border border-purple-500/10 rounded-full animate-[spin_25s_linear_infinite] opacity-50" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
            </motion.div>
        </div>
    );
});

// --- OPTIMIZED WORD REVEAL (CSS BASED) ---
// Memoized component.
const LuminousText = memo(({ children, className, delay = 0, trigger, speed = 0.08 }) => {
    const words = typeof children === 'string' ? children.split(" ") : [children];

    return (
        <span className={`${className} inline-block leading-tight`}>
            <style>
                {`
                @keyframes revealLight {
                    0% { opacity: 0; filter: blur(8px); color: #475569; }
                    100% { opacity: 1; filter: blur(0px); color: #ffffff; text-shadow: 0 0 15px rgba(255,255,255,0.2); }
                }
                .word-reveal {
                    opacity: 0;
                    filter: blur(8px);
                    color: #475569;
                    animation-fill-mode: forwards;
                }
                `}
            </style>
            {typeof children === 'string' ? (
                words.map((word, i) => (
                    <span
                        key={i}
                        className="word-reveal inline-block mr-[0.25em]"
                        style={{
                            animationName: trigger ? 'revealLight' : 'none',
                            animationDuration: '0.8s',
                            animationTimingFunction: 'ease-out',
                            animationDelay: `${delay + (i * speed)}s`
                        }}
                    >
                        {word}
                    </span>
                ))
            ) : children}
        </span>
    );
});

// --- SCROLLYTELLING TEXT BLOCK ---
const ManifestoBlock = memo(({ children, align = "center", id }) => {
    return (
        <div id={id} className={`flex flex-col ${align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center"} max-w-4xl mx-auto py-16 px-6 relative z-10 min-h-[30vh] justify-center`}>
            {children}
        </div>
    );
});

export default function MissionPage() {
    const containerRef = useRef(null);
    const { t } = useLanguage();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [startSequence, setStartSequence] = React_useState(false);
    const [isMobile, setIsMobile] = React_useState(false);

    // Detect Mobile with Debounce
    useEffect(() => {
        let timeoutId;
        const checkMobile = () => {
            // Debounce resize check
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth < 768);
            }, 100);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true }); // Passive listener
        return () => {
            window.removeEventListener('resize', checkMobile);
            clearTimeout(timeoutId);
        };
    }, []);

    // Auto-Scroll Sequence
    useEffect(() => {
        let animationFrameId; // Track ID for cleanup

        // 1. FORCE TOP POSITION on mount and before starting
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);

        const startDelay = setTimeout(() => {
            setStartSequence(true);

            // 2. CONTINUOUS SMOOTH SCROLL
            // MOBILE: Very Slow (90s). DESKTOP: Fast (55s).
            const isMob = window.innerWidth < 768;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const duration = isMob ? 90000 : 55000;
            const startTime = performance.now();

            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Linear progression for steady reading flow
                const currentScroll = totalHeight * progress;

                window.scrollTo(0, currentScroll);

                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animateScroll);
                }
            };

            animationFrameId = requestAnimationFrame(animateScroll);

        }, 100);  // START IMMEDIATELY (100ms)

        return () => {
            clearTimeout(startDelay);
            if (animationFrameId) cancelAnimationFrame(animationFrameId); // STOP SCROLL ON UNMOUNT
            window.history.scrollRestoration = 'auto'; // Cleanup
        };
    }, []);

    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 0.6]);

    return (
        <div ref={containerRef} className="relative min-h-[450vh] bg-[#030303] text-slate-300 selection:bg-wec-purple/30 selection:text-white pb-32 overflow-x-hidden">
            <Navbar />

            {/* DYNAMIC BACKGROUND */}
            <div className="fixed inset-0 z-0">
                <GeometricBackground />
                <motion.div
                    style={{ opacity: backgroundOpacity, willChange: 'opacity' }} // GPU Hint
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-wec-blue/5 pointer-events-none"
                />
            </div>

            <LivingCore scrollYProgress={scrollYProgress} />

            {/* CONTENT STREAM */}
            <div className="relative z-10 pt-40 md:pt-60">

                {/* 1. INERTIA */}
                <ManifestoBlock align="center" id="section-1">
                    <div className="text-sm md:text-base font-mono mb-6 uppercase tracking-[0.2em] text-slate-500">
                        <LuminousText trigger={startSequence} delay={0} speed={0.03}>
                            {t('mission_label')}
                        </LuminousText>
                    </div>

                    <div className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                        <LuminousText trigger={startSequence} delay={0.5} speed={0.1}>
                            {t('mission_title')}
                        </LuminousText>
                    </div>

                    <div className="mt-8 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                        <LuminousText trigger={startSequence} delay={1.5} speed={0.05}>
                            {t('mission_desc')}
                        </LuminousText>
                    </div>
                </ManifestoBlock>

                {/* 2. SYMBIOSIS */}
                <ManifestoBlock align="left" id="section-2">
                    <motion.div
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }}
                        className="w-12 h-1 bg-gradient-to-r from-wec-blue to-transparent mb-8 origin-left"
                    />
                    <div className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
                        {/* MOBILE: Appears at 3s (very early) / DESKTOP: 6s */}
                        <LuminousText trigger={startSequence} delay={isMobile ? 3 : 6} speed={0.08}>
                            {t('mission_symbiosis')}
                        </LuminousText>
                    </div>
                </ManifestoBlock>

                {/* 3. ENGINE */}
                <ManifestoBlock align="right" id="section-3">
                    <div className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
                        {/* MOBILE: 6s / DESKTOP: 12s */}
                        <LuminousText trigger={startSequence} delay={isMobile ? 6 : 12} speed={0.08}>
                            {t('mission_engine')}
                        </LuminousText>
                    </div>
                    <motion.div
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }}
                        className="w-12 h-1 bg-gradient-to-l from-amber-500 to-transparent mt-8 origin-right"
                    />
                </ManifestoBlock>

                {/* 4. CONVERGENCE */}
                <ManifestoBlock align="center" id="section-4">
                    <div className="relative p-10 md:p-16 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none" />

                        <div className="text-2xl md:text-4xl font-medium leading-relaxed tracking-tight mb-10 relative z-10">
                            {/* MOBILE: 10s / DESKTOP: 17s */}
                            <LuminousText trigger={startSequence} delay={isMobile ? 10 : 17} speed={0.05}>
                                {t('mission_convergence')}
                            </LuminousText>
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={startSequence ? { opacity: 1 } : {}}
                            transition={{ delay: isMobile ? 12 : 21, duration: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg tracking-widest uppercase hover:bg-gradient-to-r hover:from-wec-blue hover:via-purple-400 hover:to-amber-300 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                        >
                            {t('mission_btn')}
                        </motion.button>
                    </div>
                </ManifestoBlock>

            </div>

        </div>
    );
}
