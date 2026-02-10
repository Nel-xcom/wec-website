import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useGesture } from '../context/GestureContext';
import { NeuralExchange, BioChart, NetworkUser, NeuralMedia, NeuralValuation, NeuralConnect, NeuralTriangle, NeuralDiamond } from './NeuralArtifacts';

const Hero = () => {
    const {
        isActive,
        isGrabbing,
        posX,
        posY,
        addedObjects,
        mode,
        setMode,
        backgroundTheme,
        // Phase 4
        titleColor,
        selectedObjectId,
        setSelectedObjectId
    } = useGesture();

    // --- TEXT STYLE LOGIC ---
    // Security Style: Text White + Bloom Shadow
    const isSecurityStyle = titleColor === '#ffffff';
    const titleStyle = titleColor === 'gradient'
        ? { backgroundImage: 'linear-gradient(to right, #38bdf8, #c084fc, #fcd34d)', color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }
        : {
            color: titleColor,
            backgroundImage: 'none',
            textShadow: isSecurityStyle ? '0 0 10px rgba(255, 255, 255, 0.3)' : 'none'
        };

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });
    const opacity = useTransform(smoothScroll, [0, 0.4], [1, 0]);
    const scale = useTransform(smoothScroll, [0, 0.4], [1, 0.95]);

    // DIRECT MAPPING (1:1 Logic as requested - No Latency)
    // We use the raw MotionValues from the context directly.
    // No springs, no transforms.

    // --- REVEAL SEQUENCE STATES ---
    const [revealingText1, setRevealingText1] = useState(false);
    const [revealingText2, setRevealingText2] = useState(false);

    // --- REVEAL SEQUENCE LOGIC ---
    useEffect(() => {
        if (mode === 'revealing') {
            const timer1 = setTimeout(() => {
                setRevealingText1(true);
                const timer2 = setTimeout(() => {
                    setRevealingText1(false);
                    const timer3 = setTimeout(() => {
                        setRevealingText2(true);
                        const timer4 = setTimeout(() => {
                            setRevealingText2(false);
                            setMode('final');
                        }, 2000);
                        return () => clearTimeout(timer4);
                    }, 500);
                    return () => clearTimeout(timer3);
                }, 2000);
                return () => clearTimeout(timer2);
            }, 100);
            return () => { clearTimeout(timer1); };
        }
    }, [mode, setMode]);

    // Background Gradient Logic
    const getBackgroundStyle = () => {
        switch (backgroundTheme) {
            case 'deep_blue':
                return "bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white";
            case 'violet_grad':
                return "bg-gradient-to-br from-violet-900 via-black to-blue-900 text-white";
            case 'dark_gray':
                return "bg-neutral-900 text-white";
            default: // 'black' or initial
                return "bg-black text-white";
        }
    };

    // Render Artifact Helper
    const renderArtifact = (subtype) => {
        const props = { className: "w-full h-full" };
        switch (subtype) {
            case 'exchange': return <NeuralExchange {...props} />; // Circle-ish
            case 'bio': return <BioChart {...props} />;
            case 'network': return <NetworkUser {...props} />;
            case 'media': return <NeuralMedia {...props} />; // Rect-ish
            case 'valuation': return <NeuralValuation {...props} />;
            case 'connect': return <NeuralConnect {...props} />; // Graph
            default: return <NeuralConnect {...props} />;
        }
    };

    return (
        <section ref={containerRef} className={`relative h-screen w-full overflow-hidden flex flex-col items-center justify-center transition-colors duration-1000 ${getBackgroundStyle()}`}>

            {/* ADDED OBJECTS (Lights & Shapes) */}
            {addedObjects.map((obj) => (
                <motion.div
                    key={obj.id}
                    // Enable drag only in Editor mode
                    drag={mode === 'editing'}
                    dragMomentum={false}
                    // Click to Select
                    onClick={(e) => {
                        if (mode === 'editing') {
                            e.stopPropagation();
                            setSelectedObjectId(obj.id);
                        }
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: obj.scale,
                        // Highlight if selected
                        filter: selectedObjectId === obj.id ? 'brightness(1.5) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' : 'none'
                    }}
                    className={`absolute ${mode === 'editing' ? 'cursor-move' : 'pointer-events-none'}`}
                    style={{
                        left: `${obj.x}%`,
                        top: `${obj.y}%`,
                        // FIX LIGHT VISIBILITY: Ensure zIndex is logical. 
                        // If standard flow, z-0 is fine.
                        zIndex: obj.category === 'light' ? 1 : 15
                    }}
                >
                    {obj.category === 'neural' ? (
                        // NEURAL SHAPES (Using the Artifacts)
                        // Artifacts are 160x160 default. We scale properly.
                        <div className="relative -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]">
                            {/* Override Artifact opacity to be visible but stylized */}
                            <div className="opacity-80 w-full h-full">
                                {renderArtifact(obj.subtype)}
                            </div>
                        </div>
                    ) : (
                        // LIGHTS (Standard)
                        <div
                            className="-translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
                            style={{
                                width: '40vw',
                                height: '40vw',
                                background: obj.subtype === 'violet'
                                    ? 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(0,0,0,0) 70%)'
                                    : obj.subtype === 'white'
                                        ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 70%)'
                                        : 'radial-gradient(circle, rgba(30,58,138,0.4) 0%, rgba(0,0,0,0) 70%)',
                            }}
                        />
                    )}
                </motion.div>
            ))}

            {/* CLICK BACKGROUND TO DESELECT */}
            {mode === 'editing' && (
                <div className="absolute inset-0 z-0" onClick={() => setSelectedObjectId(null)} />
            )}

            {/* --- REVEAL TEXT STAGE 1 --- */}
            <AnimatePresence>
                {revealingText1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, blur: 10 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400 text-center px-4 tracking-tight drop-shadow-2xl">
                            Emprender ya no es imposible.
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- REVEAL TEXT STAGE 2 --- */}
            <AnimatePresence>
                {revealingText2 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, blur: 10 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-orange-400 text-center px-4 tracking-tight drop-shadow-2xl">
                            Solo faltaba la herramienta correcta.
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAIN CONTENT (Initial / Final / Editing) - MARK: NO BLUR, NO LATENCY */}
            {(mode === 'initial' || mode === 'editing' || mode === 'final') && (
                <motion.div
                    className="text-center flex flex-col items-center z-10 max-w-5xl mt-32 md:mt-40 origin-center transform-style-3d"
                    initial={mode === 'final' ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1, scale: mode === 'editing' ? 0.95 : 1 }} // REMOVED BLUR filter
                    transition={{ duration: 0.5 }}
                    style={{
                        opacity,
                        scale: mode === 'editing' ? 0.95 : scale,
                        x: isActive ? posX : 0, // DIRECT MAPPING (MotionValue)
                        y: isActive ? posY : 0, // DIRECT MAPPING (MotionValue)
                        rotateX: 0,
                        rotateY: 0,
                        willChange: 'transform'
                    }}
                >
                    {/* TITLE LAYER - CUSTOMIZABLE COLOR */}
                    <div style={{ transform: "translateZ(100px)" }}>
                        <motion.h1
                            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] drop-shadow-2xl"
                            style={isSecurityStyle ? {} : titleStyle} // If white, we use inner spans. If custom, use titleStyle.
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        >
                            {isSecurityStyle ? (
                                <>
                                    <span className="text-white text-bloom">Red mundial de </span>
                                    <span
                                        className="text-transparent bg-clip-text bg-gradient-to-r from-wec-blue via-purple-400 to-amber-300 inline-block pb-1"
                                        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                    >
                                        emprendedores
                                    </span>
                                </>
                            ) : (
                                "Red mundial de emprendedores"
                            )}
                        </motion.h1>
                    </div>

                    {/* SUBTITLE LAYER */}
                    <div style={{ transform: "translateZ(60px)" }}>
                        <motion.p
                            className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Ecosistema digital emprendedor, donde la tecnología y la innovación impulsan el crecimiento económico global.
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </section>
    );
};

export default Hero;
