import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const WorldMapBackground = () => {
    // Generate random stars on mount
    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // 0-100%
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 3
        }));
    }, []);

    // MAP URL: Using a reliable SVG that is definitely an outline or convertible.
    const MAP_URL = "https://upload.wikimedia.org/wikipedia/commons/e/ec/World_Map_Blank.svg";

    return (
        <motion.div
            className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
        >

            {/* MAP IMAGE LAYER */}
            <img
                src={MAP_URL}
                alt="World Map Background"
                className="w-full h-full object-cover md:object-contain opacity-60"
                style={{
                    // Invert: Grey/Black -> White.
                    // Transparent BG stays Transparent.
                    filter: 'invert(1) drop-shadow(0 0 1px rgba(255,255,255,0.2))',
                    maxWidth: '100%',
                    maxHeight: '100%'
                }}
            />

            {/* Animated Points (Tiny Stars Everywhere) */}
            <div className="absolute inset-0 w-full h-full">
                {stars.map((star) => (
                    <StarPoint key={star.id} {...star} />
                ))}
            </div>
        </motion.div>
    );
};

const StarPoint = ({ x, y, delay, duration }) => {
    return (
        <motion.div
            className="absolute rounded-full bg-white"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: '1.5px', // Tiny
                height: '1.5px',
                boxShadow: `0 0 2px white` // Subtle glow
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 0.7, 0.2, 0.7, 0], // Max opacity 0.7 (More transparent/subtle)
                scale: [0, 1, 0.5, 1, 0]
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
                repeatDelay: Math.random() * 5
            }}
        />
    );
};

export default WorldMapBackground;
