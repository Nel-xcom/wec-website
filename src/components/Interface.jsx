import { motion } from 'framer-motion';

const Interface = () => {
    return (
        <section style={{ padding: '8rem 2rem', background: '#000', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                style={{ marginBottom: '4rem' }}
            >
                <h2 style={{ fontSize: '1rem', color: '#2997ff', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem' }}>The Interface</h2>
                <p style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#f5f5f7', fontWeight: 600, maxWidth: '800px', margin: '0 auto', lineHeight: 1.1 }}>
                    Designed for <span style={{ color: '#86868b' }}>pure focus.</span>
                </p>
                <p style={{ fontSize: '1.2rem', color: '#86868b', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0 auto' }}>
                    Dark mode by default. Information density calibrated for high-performance decision making.
                </p>
            </motion.div>

            {/* Cinematic App Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{
                    maxWidth: '1000px',
                    height: '600px',
                    margin: '0 auto',
                    background: '#1d1d1f',
                    borderRadius: '30px',
                    border: '1px solid #333',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 0 100px rgba(0,0,0,0.5)'
                }}
            >
                {/* Abstract UI representation */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#333', fontSize: '2rem', fontWeight: 700 }}>
                    [ App Interface Visual ]
                </div>
                {/* Gloss effect */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)' }} />
            </motion.div>
        </section>
    );
};

export default Interface;
