import { motion } from 'framer-motion';

const EvolutionCTA = () => {
    return (
        <section style={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'radial-gradient(circle at center, rgba(41, 151, 255, 0.1) 0%, #0F0F0F 70%)'
        }}>
            <div style={{ maxWidth: '900px' }}>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                        fontFamily: "'Nico Moji', sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        lineHeight: 1.2,
                        marginBottom: '3rem'
                    }}
                >
                    La evolución del emprendimiento<br /> ya comenzó.
                </motion.h2>

                <p style={{ color: '#86868b', fontSize: '1.5rem', marginBottom: '4rem' }}>
                    La pregunta no es si va a suceder, es si vas a ser parte.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(213, 241, 255, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: 'linear-gradient(135deg, #D5F1FF 0%, #FFBFF6 100%)',
                        color: '#0F0F0F',
                        padding: '20px 50px',
                        borderRadius: '100px',
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: "0 0 20px rgba(213, 241, 255, 0.2)"
                    }}
                >
                    Reclama tu lugar en el ecosistema
                </motion.button>
            </div>
        </section>
    );
};

export default EvolutionCTA;
