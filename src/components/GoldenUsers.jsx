import { motion } from 'framer-motion';
import { useEarlyAccess } from '../context/EarlyAccessContext';

const Manifesto = () => {
    const { openForm } = useEarlyAccess();
    return (
        <section style={{
            minHeight: '100vh',
            background: '#0F0F0F',
            padding: '6rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Gradient Background Overlay */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(circle, rgba(213, 241, 255, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
                filter: 'blur(80px)'
            }} />

            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                {/* Main Manifesto Text */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 style={{
                        fontFamily: "'Nico Moji', sans-serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        marginBottom: '3rem',
                        background: 'linear-gradient(135deg, #D5F1FF 0%, #FFBFF6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Esto no es<br />para todos.
                    </h2>
                </motion.div>

                {/* Kinetic Text Lines */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ marginBottom: '3rem' }}
                >
                    <p style={{
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                        lineHeight: 1.8,
                        color: '#f5f5f7',
                        marginBottom: '1.5rem',
                        fontWeight: 300
                    }}>
                        Es para los que <span style={{ color: '#2997ff', fontWeight: 600 }}>construyen cuando nadie mira</span>.
                    </p>
                    <p style={{
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                        lineHeight: 1.8,
                        color: '#f5f5f7',
                        marginBottom: '1.5rem',
                        fontWeight: 300
                    }}>
                        Para los que <span style={{ color: '#2997ff', fontWeight: 600 }}>no aceptan límites geográficos</span>.
                    </p>
                    <p style={{
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                        lineHeight: 1.8,
                        color: '#f5f5f7',
                        marginBottom: '1.5rem',
                        fontWeight: 300
                    }}>
                        Para los <span style={{ color: '#2997ff', fontWeight: 600 }}>obsesionados con la ejecución</span>.
                    </p>
                </motion.div>

                {/* Conditional Call */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ marginBottom: '3rem' }}
                >
                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                        lineHeight: 1.8,
                        color: '#86868b',
                        fontStyle: 'italic'
                    }}>
                        Si tu visión es global,<br />
                        Si tu ambición supera tu código postal,<br />
                        Si entiendes que el <span style={{ color: '#f5f5f7' }}>ecosistema es ventaja competitiva</span>...
                    </p>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        alignItems: 'center'
                    }}
                >
                    <h3 style={{
                        fontFamily: "'Nico Moji', sans-serif",
                        fontSize: 'clamp(2rem, 3vw, 3rem)',
                        color: '#f5f5f7',
                        marginBottom: '1rem'
                    }}>
                        Únete.
                    </h3>

                    <button style={{
                        background: 'linear-gradient(135deg, #D5F1FF 0%, #FFBFF6 100%)',
                        color: '#0F0F0F',
                        padding: '18px 48px',
                        borderRadius: '980px',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 12px 32px rgba(213, 241, 255, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px)';
                            e.target.style.boxShadow = '0 16px 40px rgba(213, 241, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 12px 32px rgba(213, 241, 255, 0.3)';
                        }}
                        onClick={openForm}
                    >
                        Obtener acceso anticipado
                    </button>

                    <a href="#" style={{
                        color: '#86868b',
                        fontSize: '1rem',
                        textDecoration: 'none',
                        borderBottom: '1px solid #86868b',
                        paddingBottom: '2px',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.color = '#f5f5f7';
                            e.target.style.borderBottomColor = '#f5f5f7';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#86868b';
                            e.target.style.borderBottomColor = '#86868b';
                        }}
                    >
                        Leer el Manifiesto Completo →
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Manifesto;
