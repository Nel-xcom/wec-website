import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Engineering = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const codeOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    const codeY = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);

    const techStack = [
        { name: "FastAPI", detail: "Python 3.11+", icon: "⚡" },
        { name: "Flutter", detail: "iOS + Android Native", icon: "📱" },
        { name: "PostgreSQL 15", detail: "Transaccional", icon: "🗄️" },
        { name: "i18n", detail: "20 Idiomas Soportados", icon: "🌍" },
        { name: "Security", detail: "bcrypt + JWT", icon: "🔒" },
        { name: "Architecture", detail: "Microservices", icon: "🏗️" }
    ];

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '100vh',
                background: '#0F0F0F',
                padding: '6rem 2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
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
                        marginBottom: '1.5rem'
                    }}>
                        Construido bajo<br />Presión Extrema
                    </h2>
                    <p style={{
                        fontSize: '1.3rem',
                        color: '#86868b',
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: 1.6
                    }}>
                        Backend FastAPI. Frontend Flutter. 20 Idiomas nativos. Seguridad bcrypt (12 rounds).<br />
                        <span style={{ color: '#f5f5f7' }}>Cada línea de código fue escrita para soportar la carga de millones.</span><br />
                        <strong style={{ color: '#2997ff' }}>No hay atajos.</strong>
                    </p>
                </motion.div>

                {/* Tech Stack Grid */}
                <motion.div
                    style={{ opacity: codeOpacity, y: codeY }}
                    className="tech-grid"
                >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                                    {tech.icon}
                                </div>
                                <h4 style={{
                                    color: '#f5f5f7',
                                    fontSize: '1.2rem',
                                    marginBottom: '0.25rem',
                                    fontWeight: 600
                                }}>
                                    {tech.name}
                                </h4>
                                <p style={{ color: '#86868b', fontSize: '0.9rem' }}>
                                    {tech.detail}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Code Snippet Aesthetic */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '2rem',
                        fontFamily: "'Courier New', monospace",
                        fontSize: '0.9rem',
                        color: '#86868b',
                        overflow: 'auto',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}
                >
                    <pre style={{ margin: 0, lineHeight: 1.6 }}>
                        <code>
                            <span style={{ color: '#2997ff' }}>// Ingeniería sin concesiones</span>{'\n'}
                            <span style={{ color: '#f5576c' }}>const</span> <span style={{ color: '#f5f5f7' }}>ecosystem</span> = {'{\n'}
                            {'  '}screens: <span style={{ color: '#fee140' }}>109</span>,{'\n'}
                            {'  '}backend: <span style={{ color: '#4facfe' }}>'FastAPI'</span>,{'\n'}
                            {'  '}frontend: <span style={{ color: '#4facfe' }}>'Flutter'</span>,{'\n'}
                            {'  '}languages: <span style={{ color: '#fee140' }}>20</span>,{'\n'}
                            {'  '}security: <span style={{ color: '#4facfe' }}>'bcrypt(12) + JWT'</span>,{'\n'}
                            {'  '}architecture: <span style={{ color: '#4facfe' }}>'Microservices'</span>,{'\n'}
                            {'  '}philosophy: <span style={{ color: '#4facfe' }}>'Hardcore'</span>{'\n'}
                            {'};'}
                        </code>
                    </pre>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ textAlign: 'center', marginTop: '4rem' }}
                >
                    <p style={{
                        color: '#86868b',
                        fontSize: '1.1rem',
                        fontStyle: 'italic'
                    }}>
                        "La calidad no es un acto, es un hábito." — Aristóteles
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Engineering;
