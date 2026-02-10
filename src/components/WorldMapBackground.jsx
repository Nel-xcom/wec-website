import React from 'react';
import { motion } from 'framer-motion';

const WorldMapBackground = () => {
    // We use a high-resolution Outline Map image from Wikimedia Commons.
    // "World_map_blank_black_lines_4500px_monochrome.png"
    // This provides "Exact Curvature" and "Lines not too thick" (we scale it down).
    // We invert it to make lines White.
    const MAP_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/World_map_blank_black_lines_4500px_monochrome.png/1280px-World_map_blank_black_lines_4500px_monochrome.png";

    return (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">

            {/* MAP IMAGE LAYER */}
            <img
                src={MAP_URL}
                alt="World Map Background"
                className="w-full h-full object-cover md:object-contain opacity-20"
                style={{
                    // Invert: Black Lines -> White Lines
                    // Background is usually transparent in these PNGs. If white, invert makes it black (transparent in Screen mode).
                    filter: 'invert(1)',
                    mixBlendMode: 'screen', // Ensures strictly light adds to background
                    maxWidth: '100%',
                    maxHeight: '100%'
                }}
            />

            {/* Animated Points (Brilliant White) - Calibrated locations roughly to the image */}
            <div className="absolute inset-0 w-full h-full max-w-[1280px] mx-auto relative">
                {POINTS.map((p, i) => (
                    <StarPoint key={i} x={p.x} y={p.y} delay={p.delay} />
                ))}
            </div>
        </div>
    );
};

// Points coordinated roughly 0-100% of the map container
const POINTS = [
    { x: 28, y: 35, delay: 0 },   // N. America
    { x: 22, y: 45, delay: 2 },
    { x: 32, y: 75, delay: 4 },   // S. America
    { x: 48, y: 32, delay: 1 },   // Europe 
    { x: 52, y: 35, delay: 3 },
    { x: 55, y: 55, delay: 1.5 }, // Africa
    { x: 75, y: 35, delay: 2 },   // Asia
    { x: 80, y: 45, delay: 0.5 },
    { x: 85, y: 75, delay: 3.5 }, // Australia
    { x: 18, y: 25, delay: 1.2 }, // Alaska
];

const StarPoint = ({ x, y, delay }) => {
    return (
        <motion.div
            className="absolute rounded-full bg-white"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: '3px',
                height: '3px',
                boxShadow: `0 0 5px white, 0 0 10px white`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0.4, 1, 0],
                scale: [0, 1.5, 0.8, 2, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
                repeatDelay: Math.random() * 3
            }}
        />
    );
};

export default WorldMapBackground;
