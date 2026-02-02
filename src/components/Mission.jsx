import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import phoneImage from '../assets/images/second-sect.webp';

const Philosophy = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Text Animations (Restored "Scroll-telling" feel)
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);

    // Phone Animations
    // Starts huge (zoomed in), shrinks to fit, rotates significantly
    const phoneScale = useTransform(scrollYProgress, [0.1, 0.6], [2.5, 1]);
    const phoneY = useTransform(scrollYProgress, [0.1, 0.6], [100, 0]);
    const phoneRotate = useTransform(scrollYProgress, [0.1, 0.7], [30, -5]); // Dynamic rotation

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '150vh', // Tall section for scroll space
                background: '#000',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 2rem',
                overflow: 'hidden'
            }}
        >
            <div style={{
                maxWidth: '1200px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center'
            }}>

                {/* Left Column: Restored Philosophy Text */}
                <div style={{ zIndex: 2 }}>
                    <motion.div style={{ opacity: textOpacity, y: textY }}>
                        <p style={{
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 600,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            color: '#fff',
                            marginBottom: '2rem'
                        }}>
                            <span style={{ color: '#86868b' }}>Talent is distributed across the planet.</span><br />
                            <span style={{ color: '#f5f5f7' }}>But opportunity is not.</span>
                        </p>

                        <p style={{
                            fontSize: '1.2rem',
                            color: '#86868b',
                            lineHeight: 1.6,
                            maxWidth: '450px'
                        }}>
                            We built the bridge. So you can build the future.
                            Connect with capital, talent, and markets instantly.
                        </p>
                    </motion.div>
                </div>

                {/* Right Column: Phone Image */}
                <div style={{
                    height: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: '1000px'
                }}>
                    <motion.div
                        style={{
                            scale: phoneScale,
                            y: phoneY,
                            rotateY: phoneRotate,
                            width: '100%',
                            maxWidth: '300px', // Smaller image as requested
                            height: 'auto',
                        }}
                    >
                        <img
                            src={phoneImage}
                            alt="WEC App Interface"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '30px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            }}
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Philosophy;
