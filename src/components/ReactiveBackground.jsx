import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Artifact Component
const Artifact = ({ delay, x, y, size, type }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Physics for flee effect
    const springConfig = { damping: 20, stiffness: 200 };
    const artifactX = useSpring(useMotionValue(0), springConfig);
    const artifactY = useSpring(useMotionValue(0), springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = document.body.getBoundingClientRect();
            // Simple distance check could happen here, or global event
            // using window event for comprehensive field effect
            const dx = e.clientX - (window.innerWidth * (x / 100)); // approx pos
            const dy = e.clientY - (window.innerHeight * (y / 100));
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 300) {
                const angle = Math.atan2(dy, dx);
                // Flee vector
                const moveDistance = (300 - distance) * 0.3;
                artifactX.set(Math.cos(angle) * -moveDistance);
                artifactY.set(Math.sin(angle) * -moveDistance);
            } else {
                artifactX.set(0);
                artifactY.set(0);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y, artifactX, artifactY]);

    return (
        <motion.div
            style={{
                left: `${x}%`,
                top: `${y}%`,
                x: artifactX,
                y: artifactY
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
    // Generate random artifacts
    const artifacts = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 10 + Math.random() * 40,
        type: Math.random() > 0.5 ? 'tetra' : 'circle'
    }));

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {artifacts.map((art) => (
                <Artifact key={art.id} {...art} />
            ))}
        </div>
    );
}
