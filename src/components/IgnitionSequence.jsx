import { motion } from 'framer-motion';

const IgnitionSequence = () => {
    return (
        <section style={{
            height: '80vh',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'radial-gradient(circle at center, rgba(15, 15, 15, 0) 0%, #0F0F0F 100%)' // Tunnel fade
        }}>

            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                style={{
                    fontFamily: "'Nico Moji', sans-serif",
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    marginBottom: '2rem',
                    color: '#fff'
                }}
            >
                La secuencia de ignición<br /> ha comenzado.
            </motion.h2>

            <p style={{ fontSize: '1.5rem', color: '#D5F1FF', maxWidth: '800px', marginBottom: '4rem', opacity: 0.8 }}>
                La era de la exclusividad ha terminado. Una nueva galaxia de oportunidades te espera. ¿Vas a quedarte en tierra observando o vas a pilotar tu propio destino?
            </p>

            {/* Propulsion Button */}
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(41, 151, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                    background: 'linear-gradient(to bottom, #fff, #D5F1FF)',
                    color: '#0F0F0F',
                    border: 'none',
                    padding: '20px 60px',
                    borderRadius: '4px', // More boxy/tech feel
                    fontSize: '1.5rem',
                    fontFamily: "'Nico Moji', sans-serif",
                    cursor: 'pointer',
                    boxShadow: "0 0 20px rgba(41, 151, 255, 0.3)",
                    letterSpacing: '2px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                INICIAR DESPEGUE
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.8), transparent)',
                        translateX: '-100%'
                    }}
                    animate={{ translateX: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
            </motion.button>

        </section>
    );
};

export default IgnitionSequence;
