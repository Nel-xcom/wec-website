import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WorldMapBackground = () => {
    // 1. RESTORE STARS (Random Generation)
    const stars = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 3
        }));
    }, []);

    // 2. LIGHTING STATE
    const [activeCountry, setActiveCountry] = useState(0);
    const COUNTRIES = [
        { id: 'us', x: 28, y: 35 },
        { id: 'br', x: 32, y: 65 },
        { id: 'eu', x: 50, y: 30 },
        { id: 'af', x: 53, y: 55 },
        { id: 'cn', x: 75, y: 38 },
        { id: 'au', x: 85, y: 75 },
        { id: 'in', x: 70, y: 45 },
        { id: 'ru', x: 65, y: 20 },
        { id: 'ca', x: 20, y: 25 },
        { id: 'ar', x: 30, y: 80 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCountry(prev => (prev + 1) % COUNTRIES.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    // MAP URL (The one that worked)
    const MAP_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/World_map_blank_black_lines_4500px_monochrome.png/1280px-World_map_blank_black_lines_4500px_monochrome.png";

    return (
        <motion.div
            className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {/* MAP CANVAS */}
            <div className="relative w-full h-full max-w-[1400px]">
                {/* MAP IMAGE */}
                <img
                    src={MAP_URL}
                    alt="World Map"
                    className="w-full h-full object-contain opacity-40"
                    style={{
                        filter: 'invert(1)', // Black lines -> White lines
                        mixBlendMode: 'screen'
                    }}
                />

                {/* STARS (Restored) */}
                <div className="absolute inset-0">
                    {stars.map((star) => (
                        <StarPoint key={star.id} {...star} />
                    ))}
                </div>

                {/* LIGHTING SPOTS (Overlay) */}
                {/* "Iluminando usando el color gradient... uno a la vez" */}
                <div className="absolute inset-0">
                    {COUNTRIES.map((country, index) => (
                        <LightSpot
                            key={country.id}
                            x={country.x}
                            y={country.y}
                            isActive={index === activeCountry}
                        />
                    ))}
                </div>
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
                boxShadow: `0 0 2px white`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 0.7, 0.2, 0.7, 0],
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

const LightSpot = ({ x, y, isActive }) => {
    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                x: '-50%',
                y: '-50%',
                width: '80px', // Smaller spot to match "Paises" better
                height: '80px',
                // Emprendedores Gradient
                background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.15) 50%, rgba(0,0,0,0) 80%)',
                filter: 'blur(15px)',
                mixBlendMode: 'screen'
            }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.2 : 0.8
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
        />
    );
};

export default WorldMapBackground;
