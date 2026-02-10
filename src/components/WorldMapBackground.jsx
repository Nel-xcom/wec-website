import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Better World Map Paths (Simplified D3 Geo Projection)
const CONTINENTS = [
    // North America
    "M 50 20 L 110 20 L 120 40 L 100 60 L 90 80 L 70 90 L 50 80 L 40 50 L 30 30 Z",
    // South America
    "M 90 90 L 120 90 L 130 110 L 120 150 L 110 170 L 100 150 L 90 120 Z",
    // Europe
    "M 140 20 L 180 20 L 190 40 L 170 50 L 150 50 L 140 30 Z",
    // Africa
    "M 130 60 L 170 60 L 180 90 L 170 130 L 150 140 L 140 100 Z",
    // Asia
    "M 180 20 L 260 20 L 280 40 L 290 80 L 270 100 L 240 110 L 200 90 L 190 50 Z",
    // Australia
    "M 240 120 L 280 120 L 290 140 L 270 150 L 250 140 Z"
];
// Note: These are still abstract polygons but larger and more "blocky" to be visible.

const POINTS = [
    { x: 80, y: 50, delay: 0 },   // NYC
    { x: 60, y: 60, delay: 2 },   // SF
    { x: 110, y: 120, delay: 4 }, // Brazil
    { x: 160, y: 35, delay: 1 },  // London
    { x: 170, y: 40, delay: 3 },  // Berlin
    { x: 220, y: 70, delay: 5 },  // India
    { x: 270, y: 60, delay: 2 },  // Tokyo
    { x: 260, y: 80, delay: 0.5 },// China
    { x: 270, y: 130, delay: 3.5 },// Sydney
    { x: 160, y: 110, delay: 1.5 },// South Africa
];

const WorldMapBackground = ({ theme = 'default' }) => {
    // Theme Colors
    // If 'default' (black), we use a dim blue/white
    const isViolet = theme === 'violet_grad';
    const strokeColor = isViolet ? '#a78bfa' : '#7dd3fc'; // Light Purple or Sky Blue
    const fillColor = isViolet ? '#8b5cf6' : '#0ea5e9';

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
            <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
                <defs>
                    <radialGradient id="mapGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor={fillColor} stopOpacity="0.1" />
                        <stop offset="100%" stopColor={fillColor} stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Grid Lines (Themed) */}
                <path d="M0,45 L320,45 M0,90 L320,90 M0,135 L320,135" stroke={strokeColor} strokeWidth="0.1" opacity="0.1" />
                <path d="M80,0 L80,180 M160,0 L160,180 M240,0 L240,180" stroke={strokeColor} strokeWidth="0.1" opacity="0.1" />

                {/* Continents */}
                {CONTINENTS.map((d, i) => (
                    <motion.path
                        key={i}
                        d={d}
                        fill={fillColor}
                        fillOpacity="0.05"
                        stroke={strokeColor}
                        strokeWidth="0.8"
                        filter="url(#glow)"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 1, pathLength: 1 }}
                        transition={{ duration: 2, delay: i * 0.2 }}
                    />
                ))}
            </svg>

            {/* Animated Points */}
            <div className="absolute inset-0">
                {POINTS.map((p, i) => (
                    <StarPoint key={i} x={p.x} y={p.y} delay={p.delay} color={strokeColor} />
                ))}
            </div>
        </div>
    );
};

const StarPoint = ({ x, y, delay }) => {
    const left = (x / 320) * 100 + '%';
    const top = (y / 180) * 100 + '%';

    return (
        <motion.div
            className="absolute rounded-full bg-white"
            style={{
                left,
                top,
                width: '2px', // Smaller
                height: '2px', // Smaller
                // Intense White Glow
                boxShadow: `0 0 4px white, 0 0 8px white`
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
