import { motion } from 'framer-motion';
import { memo } from 'react';

const Shape = memo(({ className, delay = 0, duration = 60, reverse = false }) => (
    <motion.div
        className={`absolute border border-white/5 rounded-full ${className}`}
        style={{ willChange: "transform" }} // GPU Hint
        initial={{ rotate: 0, opacity: 0 }}
        animate={{
            rotate: reverse ? -360 : 360,
            opacity: [0.03, 0.08, 0.03]
        }}
        transition={{
            rotate: {
                duration: duration,
                repeat: Infinity,
                ease: "linear"
            },
            opacity: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }
        }}
    />
));

const GeometricBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#030303]">
            {/* Ambient Gradient Spot (Subtle) */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-wec-blue/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[150px] rounded-full" />

            {/* Geometric Orbits - Modern & Minimalist */}
            <div className="absolute inset-0 flex items-center justify-center">

                {/* Large Slow Ring */}
                <Shape className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border-dashed" duration={120} />

                {/* Medium Counter-Rotating Ring */}
                <Shape className="w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw]" duration={90} reverse delay={2} />

                {/* Small Inner Ring */}
                <Shape className="w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] border-dotted" duration={60} delay={4} />

                {/* Floating Geometric Primitives (Decorations) */}
                <motion.div
                    className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/5 opacity-5"
                    style={{ willChange: "transform" }} // GPU Hint
                    animate={{ rotate: 360, y: [0, -20, 0] }}
                    transition={{ duration: 40, ease: "linear", y: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-white/5 rotate-45 opacity-5"
                    style={{ willChange: "transform" }} // GPU Hint
                    animate={{ rotate: [45, 225, 45] }}
                    transition={{ duration: 50, ease: "easeInOut", repeat: Infinity }}
                />
            </div>

            {/* Scanline / Grid Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        </div>
    );
};

export default memo(GeometricBackground);
