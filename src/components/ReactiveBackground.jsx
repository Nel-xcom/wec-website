import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Global mouse position hook - PERFORMANCE: Single listener for all artifacts
const useGlobalMouse = () => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let rafId = null;

        // Throttle via requestAnimationFrame - only update once per frame
        const handleMouseMove = (e) => {
            if (rafId !== null) return;

            rafId = requestAnimationFrame(() => {
                setMouse({ x: e.clientX, y: e.clientY });
                rafId = null;
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    return mouse;
};

// Optimized Artifact Component
const Artifact = ({ delay, x, y, size, type, mouseX, mouseY }) => {
    // Physics for flee effect
    const springConfig = { damping: 20, stiffness: 200 };
    const artifactX = useSpring(0, springConfig);
    const artifactY = useSpring(0, springConfig);

    // Calculate artifact position once
    const artifactPos = useMemo(() => ({
        x: window.innerWidth * (x / 100),
        y: window.innerHeight * (y / 100)
    }), [x, y]);

    useEffect(() => {
        const dx = mouseX - artifactPos.x;
        const dy = mouseY - artifactPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 300) {
            const angle = Math.atan2(dy, dx);
            const moveDistance = (300 - distance) * 0.3;
            artifactX.set(Math.cos(angle) * -moveDistance);
            artifactY.set(Math.sin(angle) * -moveDistance);
        } else {
            artifactX.set(0);
            artifactY.set(0);
        }
    }, [mouseX, mouseY, artifactPos, artifactX, artifactY]);

    return (
        <motion.div
            style={{
                left: `${x}%`,
                top: `${y}%`,
                x: artifactX,
                y: artifactY,
                willChange: 'transform' // PERFORMANCE: GPU optimization
            }}
            className="absolute z-0 pointer-events-none opacity-20"
            animate={{
                rotate: [0, 360],
                y: [0, -20, 0]
            }}
            transition={{
                rotate: { duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear" },
                y: { duration: 5 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            {type === 'tetra' ? (
                <div style={{ width: size, height: size }} className="border border-wec-blue/30 rotate-45" />
            ) : (
                <div style={{ width: size, height: size }} className="border border-wec-purple/30 rounded-full" />
            )}
        </motion.div>
    );
};

export default function ReactiveBackground() {
    const mouse = useGlobalMouse(); // Single global listener

    // Generate random artifacts once - PERFORMANCE: useMemo prevents recreation
    const artifacts = useMemo(() =>
        Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 10 + Math.random() * 40,
            type: Math.random() > 0.5 ? 'tetra' : 'circle'
        })),
        []
    );

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {artifacts.map((art) => (
                <Artifact
                    key={art.id}
                    {...art}
                    mouseX={mouse.x}
                    mouseY={mouse.y}
                />
            ))}
        </div>
    );
}
