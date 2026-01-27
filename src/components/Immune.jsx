import { motion } from 'framer-motion';

const Immune = () => {
    return (
        <section style={{ minHeight: '80vh', padding: '6rem 2rem', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '5rem' }}
                >
                    <h2 style={{ fontFamily: "'Nico Moji', sans-serif", fontSize: '3rem', marginBottom: '1rem' }}>
                        Un Ecosistema Blindado
                    </h2>
                    <p style={{ color: '#86868b', fontSize: '1.2rem' }}>
                        Seguridad bancaria. Legalidad transparente. Confianza absoluta.
                    </p>
                </motion.div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    {[
                        { title: "KYC Biométrico", desc: "Sabemos quién es quién. Validación de identidad real.", icon: "🆔" },
                        { title: "Validación de Fondos", desc: "Cero humo. El capital listado existe y está verificado.", icon: "🏦" },
                        { title: "Smart Contracts", desc: "Asesoramiento en transacciones. No estás solo.", icon: "📜" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            style={{
                                width: '300px',
                                padding: '2rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                background: 'rgba(255,255,255,0.02)'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{item.icon}</div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#fff' }}>{item.title}</h3>
                            <p style={{ color: '#86868b' }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Immune;
