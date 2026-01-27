import { motion } from 'framer-motion';

const Nervous = () => {
    return (
        <section style={{ minHeight: '80vh', padding: '6rem 2rem', position: 'relative' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{ fontFamily: "'Nico Moji', sans-serif", fontSize: '3rem', marginBottom: '1rem' }}>
                        Tu Copiloto Intelectual
                    </h2>
                    <div style={{ width: '100px', height: '4px', background: 'linear-gradient(90deg, #D5F1FF, #FFBFF6)', marginBottom: '2rem' }} />

                    <p style={{ color: '#86868b', fontSize: '1.4rem', lineHeight: 1.6, maxWidth: '600px' }}>
                        IA integrada para eliminar la fricción diaria. Desde la redacción de contratos hasta el análisis de mercado.<br /><br />
                        <span style={{ color: '#f5f5f7' }}>Deja que el sistema piense en los detalles para que tú pienses en la visión.</span>
                    </p>
                </motion.div>

                {/* Brain Waves Visual Placeholder */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '5%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(213, 241, 255, 0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    zIndex: -1
                }} />
            </div>
        </section>
    );
};

export default Nervous;
