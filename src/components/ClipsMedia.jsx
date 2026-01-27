import { motion } from 'framer-motion';
import { useState } from 'react';

const ClipsMedia = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const clips = [
        {
            id: 1,
            title: "Marketplace en Acción",
            description: "Negocios verificados conectándose en tiempo real",
            duration: "90s"
        },
        {
            id: 2,
            title: "Pitch Deck Estructurado",
            description: "De caos a claridad en 16 pasos",
            duration: "90s"
        },
        {
            id: 3,
            title: "Matching Global",
            description: "Talento sin fronteras",
            duration: "90s"
        }
    ];

    return (
        <section style={{
            minHeight: '100vh',
            background: '#0F0F0F',
            padding: '6rem 2rem',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{
                        fontFamily: "'Nico Moji', sans-serif",
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        background: 'linear-gradient(135deg, #D5F1FF 0%, #FFBFF6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem'
                    }}>
                        Contenido que Retiene,<br />Algoritmo que Aprende
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#86868b',
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        Videos verticales de 90 segundos. Feed personalizado.<br />
                        El formato que construyó imperios digitales, ahora al servicio del emprendimiento.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    {clips.map((clip, index) => (
                        <motion.div
                            key={clip.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setActiveIndex(index)}
                            style={{
                                width: '280px',
                                height: '500px',
                                background: activeIndex === index
                                    ? 'linear-gradient(135deg, rgba(213, 241, 255, 0.1) 0%, rgba(255, 191, 246, 0.1) 100%)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(12px)',
                                border: activeIndex === index
                                    ? '2px solid rgba(255, 191, 246, 0.5)'
                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '24px',
                                padding: '2rem',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            {/* Video Placeholder */}
                            <div style={{
                                flex: 1,
                                background: 'linear-gradient(180deg, rgba(41, 151, 255, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                fontSize: '4rem'
                            }}>
                                ▶️
                            </div>

                            {/* Content */}
                            <div>
                                <div style={{
                                    color: '#2997ff',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    marginBottom: '0.5rem'
                                }}>
                                    {clip.duration}
                                </div>
                                <h4 style={{
                                    color: '#f5f5f7',
                                    fontSize: '1.3rem',
                                    fontWeight: 600,
                                    marginBottom: '0.5rem'
                                }}>
                                    {clip.title}
                                </h4>
                                <p style={{
                                    color: '#86868b',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5
                                }}>
                                    {clip.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Algorithm Note */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{
                        textAlign: 'center',
                        marginTop: '4rem',
                        padding: '2rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <p style={{
                        color: '#86868b',
                        fontSize: '1rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <span style={{ color: '#2997ff', fontWeight: 600 }}>Powered by Machine Learning:</span><br />
                        El feed se adapta a tus intereses. Menos ruido, más señal.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ClipsMedia;
