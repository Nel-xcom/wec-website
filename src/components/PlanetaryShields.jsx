import { motion } from 'framer-motion';

const PlanetaryShields = () => {
    return (
        <section style={{ minHeight: '80vh', padding: '6rem 2rem', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            {/* Visual: Force Field Background */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.2, scale: 1 }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    border: '2px solid #D5F1FF',
                    background: 'radial-gradient(circle, rgba(213, 241, 255, 0.1) 0%, transparent 70%)',
                    boxShadow: '0 0 50px rgba(213, 241, 255, 0.2)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            <h2 style={{ fontFamily: "'Nico Moji', sans-serif", fontSize: '3.5rem', marginBottom: '4rem', zIndex: 2, textAlign: 'center' }}>
                Ecosistema Blindado
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', width: '100%', zIndex: 2 }}>
                {[
                    { title: "Validación Biométrica KYC", desc: "Identidades confirmadas en el espectro real.", icon: "🆔" },
                    { title: "Verificación de Fondos", desc: "Capital existente, analizado y libre de anomalías.", icon: "💠" },
                    { title: "Mediación y Smart Contracts", desc: "Protocolos seguros para acuerdos entre partes. Asesoramiento en cada transacción.", icon: "🛡️" }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        style={{
                            background: 'rgba(15, 23, 42, 0.6)',
                            border: '1px solid rgba(213, 241, 255, 0.2)',
                            borderRadius: '16px',
                            padding: '2rem',
                            textAlign: 'left',
                            boxShadow: '0 0 15px rgba(213, 241, 255, 0.05)'
                        }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                        <h3 style={{ fontFamily: 'Open Sans', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>{item.title}</h3>
                        <p style={{ color: '#94a3b8' }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default PlanetaryShields;
