import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Simplified World Map Path (Mercator)
// This is a rough approximation for background visual purposes.
const WORLD_PATH = "M50 150 L55 145 L60 148 L65 140 L70 142 L75 135 L80 138 L85 130 L90 132 L95 125 L100 128 L105 120 L110 122 L115 115 L120 118 L125 110 L130 112 L135 105 L140 108 L145 100 L150 102 L155 95 L160 98 L165 90 L170 92 L175 85 L180 88 L185 80 L190 82 L195 75 L200 78 L205 70 L210 72 L215 65 L220 68 L225 60 L230 62 L235 55 L240 58 L245 50 L250 52 L255 45 L260 48 L265 40 L270 42 L275 35 L280 38 L285 30 L290 32 L295 25 L300 28 L305 20 L310 22 L315 15 L320 18 L325 10 L330 12 L335 5 L340 8 L345 0";
// Wait, that path is just a zigzag. I need a REAL map path.
// I will use a simplified set of paths for continents.

const CONTINENTS = [
    // North America (Rough)
    "M50,45 L80,40 L110,45 L100,70 L80,80 L60,70 Z",
    // South America
    "M90,90 L120,90 L110,140 L100,160 L90,130 Z",
    // Europe/Asia
    "M140,50 L200,45 L260,50 L280,80 L240,100 L200,90 L160,80 L140,65 Z",
    // Africa
    "M135,90 L170,90 L180,130 L160,150 L140,130 Z",
    // Australia
    "M240,120 L270,120 L260,140 L240,135 Z"
];

const POINTS = [
    { x: 70, y: 60, delay: 0 }, // NY
    { x: 60, y: 65, delay: 2 }, // SF
    { x: 100, y: 110, delay: 4 }, // Brazil
    { x: 150, y: 60, delay: 1 }, // London
    { x: 160, y: 70, delay: 3 }, // Berlin
    { x: 200, y: 80, delay: 5 }, // Delhi
    { x: 250, y: 70, delay: 2 }, // Tokyo
    { x: 245, y: 90, delay: 0.5 }, // Shanghai
    { x: 250, y: 130, delay: 3.5 }, // Sydney
    { x: 160, y: 120, delay: 1.5 }, // Cape Town
    { x: 80, y: 50, delay: 2.2 }, // Toronto
    { x: 220, y: 110, delay: 4.1 }, // Singapore
];

const WorldMapBackground = ({ theme = 'default' }) => {
    // Generate subtle grid points for the "Map" feel if we want dots
    // But user asked for "Map with Transparency".

    // Theme Colors
    const strokeColor = theme === 'violet_grad' ? '#a78bfa' : '#38bdf8'; // Purple or Sky Blue

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
            <svg viewBox="0 0 320 180" className="w-full h-full object-cover opacity-20">
                {/* Continents Outline */}
                {CONTINENTS.map((d, i) => (
                    <path
                        key={i}
                        d={d}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="0.5"
                        opacity="0.4"
                    />
                ))}

                {/* Grid Lines (Lat/Long) */}
                <path d="M0,90 L320,90" stroke={strokeColor} strokeWidth="0.2" opacity="0.2" strokeDasharray="2 2" />
                <path d="M160,0 L160,180" stroke={strokeColor} strokeWidth="0.2" opacity="0.2" strokeDasharray="2 2" />
            </svg>

            {/* Animated Points */}
            {/* We use a separate SVG or div overlay to position points easily */}
            <div className="absolute inset-0">
                {POINTS.map((p, i) => (
                    <StarPoint key={i} x={p.x} y={p.y} delay={p.delay} color={strokeColor} />
                ))}
            </div>
        </div>
    );
};

const StarPoint = ({ x, y, delay, color }) => {
    // Convert coordinate scaling (320x180 svg space to %)
    const left = (x / 320) * 100 + '%';
    const top = (y / 180) * 100 + '%';

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                left,
                top,
                width: '4px',
                height: '4px',
                backgroundColor: color,
                boxShadow: `0 0 4px ${color}`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
                repeatDelay: Math.random() * 5
            }}
        />
    );
};

export default WorldMapBackground;
