import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Closure() {
    const [isHovered, setIsHovered] = useState(false);

    const manifestoLines = [
        "Hay un tipo de persona que nunca encaja del todo.",
        "Mientras la mayoría se adapta, ellos se inquietan."
    ];

    return (
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pb-20">

            {/* 
          REMOVED IGNITION PULSE OVERLAY 
          to prevent white/black flickering (Change Order 1).
          The background remains the stable digital void.
      */}

            <div className="max-w-5xl space-y-4 mb-24 relative z-10">
                {manifestoLines.map((line, i) => (
                    <motion.h2
                        key={i}
                        className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-white/90"
                        initial={{ opacity: 0.2, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ margin: "-20% 0px -20% 0px" }} // Spotlight effect
                        transition={{ duration: 0.8 }}
                    >
                        {line}
                    </motion.h2>
                ))}

                <motion.p
                    className="text-xl md:text-2xl text-slate-400 font-light italic mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    A los que no se conforman...
                </motion.p>
            </div>

            {/* THE ARTIFACT: Light Emitting Button */}
            <motion.button
                className="group relative px-16 py-6 rounded-full shadow-[0_0_50px_-10px_rgba(213,241,255,0.3)] hover:shadow-[0_0_100px_-5px_rgba(255,255,255,0.5)] transition-all duration-300 z-50"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Gradient Magma Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-wec-blue via-white to-wec-purple rounded-full opacity-100" />

                {/* Refractive Gloss */}
                <div className="absolute inset-0 bg-white/50 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

                <span className="relative z-10 text-black font-extrabold text-xl tracking-widest uppercase flex items-center gap-3">
                    Únete a la Revolución
                    <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
                </span>
            </motion.button>

            <footer className="absolute bottom-6 text-[10px] text-white/20 uppercase tracking-[0.3em]">
                WEC Foundation © 2026 • New World Order
            </footer>

        </section>
    );
}
