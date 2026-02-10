import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// CONTINENT PATHS (Approximation for Lighting Zones)
// We align these roughly with the background image.
// Since we use an external image for the "Exact Outline", these paths act as the "Light Source".
// They don't need to be 100% pixel perfect borders if the light is subtle/gradient.
const REGIONS = [
    { id: 'na', path: "M 150 50 L 350 50 L 300 180 L 120 150 Z" }, // Rough NA
    { id: 'sa', path: "M 250 200 L 350 200 L 320 450 L 220 350 Z" }, // Rough SA
    { id: 'eu', path: "M 450 50 L 600 50 L 550 150 L 420 120 Z" }, // Rough EU
    { id: 'af', path: "M 450 150 L 600 150 L 550 400 L 420 300 Z" }, // Rough AF
    { id: 'as', path: "M 600 50 L 900 50 L 850 250 L 600 200 Z" }, // Rough Asia
    { id: 'au', path: "M 750 350 L 900 350 L 850 450 L 750 420 Z" }  // Rough Aus
];
// Actually, using "Square" paths for lighting looks bad.
// I will use a BLURRED circle for each "Country" logic?
// User said "Paises".
// I will use a set of POINTS representing countries and light them up with a large radial gradient.
const COUNTRIES = [
    { id: 'us', x: 20, y: 30 },
    { id: 'br', x: 32, y: 70 },
    { id: 'fr', x: 48, y: 28 },
    { id: 'za', x: 55, y: 75 },
    { id: 'cn', x: 75, y: 35 },
    { id: 'au', x: 85, y: 75 },
    { id: 'in', x: 70, y: 45 },
    { id: 'ru', x: 70, y: 20 },
    { id: 'ca', x: 20, y: 20 },
    { id: 'ar', x: 30, y: 85 },
];

const WorldMapBackground = ({ theme }) => {
    const [activeCountry, setActiveCountry] = useState(0);

    // CYCLE COUNTRIES
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCountry(prev => (prev + 1) % COUNTRIES.length);
        }, 2000); // Change every 2 seconds
        return () => clearInterval(interval);
    }, []);

    const MAP_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/World_map_blank_black_lines_4500px_monochrome.png/1280px-World_map_blank_black_lines_4500px_monochrome.png";

    return (
        <motion.div
            className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden h-screen w-full"
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        >
            {/* MAP IMAGE LAYER (The Exact Outline) */}
            <img
                src={MAP_URL}
                alt="World Map"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                style={{
                    filter: 'invert(1)',
                    mixBlendMode: 'screen'
                }}
            />

            {/* LIGHTING LAYER */}
            {/* We use a Radial Gradient traversing the map positions */}
            <div className="absolute inset-0 w-full h-full">
                {COUNTRIES.map((country, index) => (
                    <LightSpot
                        key={country.id}
                        x={country.x}
                        y={country.y}
                        isActive={index === activeCountry}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const LightSpot = ({ x, y, isActive }) => {
    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: '150px', // Large glow area
                height: '150px',
                x: '-50%',
                y: '-50%',
                // EMPRENDEDORES GRADIENT: Blue -> Purple -> Pink
                // We use a bubbling radial gradient
                background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(147,51,234,0.2) 40%, rgba(236,72,153,0) 70%)',
                filter: 'blur(20px)',
                mixBlendMode: 'screen' // Additive light
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: isActive ? 0.6 : 0, // High transparency (low opacity value, but visible)
                scale: isActive ? 1.5 : 0.5
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        />
    );
};

export default WorldMapBackground;
