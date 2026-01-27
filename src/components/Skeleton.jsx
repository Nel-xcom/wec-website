import { motion } from 'framer-motion';

const Skeleton = () => {
    return (
        <section style={{ minHeight: '100vh', padding: '6rem 2rem', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '6rem', textAlign: 'center' }}
                >
                    <h2 style={{ fontFamily: "'Nico Moji', sans-serif", fontSize: '2.5rem', marginBottom: '1rem' }}>
                        El Esqueleto
                    </h2>
                    <p style={{ color: '#86868b', fontSize: '1.2rem' }}>
                        La estructura que sostiene el sueño. Sin capital ni mercado, la idea colapsa.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                    {/* Marketplace Card */}
                    <div className="glass" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#f5f5f7' }}>A. Marketplace</h3>
                        <p style={{ color: '#86868b', marginBottom: '2rem' }}>
                            "Tu ventana al mundo. No busques clientes, deja que el mercado te encuentre."
                        </p>
                        <div style={{
                            height: '200px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Placeholder for sliding cards visual */}
                            <span style={{ fontSize: '3rem', opacity: 0.5 }}>🏢 🛒 🌐</span>
                        </div>
                    </div>

                    {/* Capital Card */}
                    <div className="glass" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#f5f5f7' }}>B. Find Capital</h3>
                        <p style={{ color: '#86868b', marginBottom: '2rem' }}>
                            "El combustible del sistema. Conectamos tu visión con el capital que la merece."
                        </p>
                        <div style={{
                            height: '200px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Placeholder for parallax cards visual */}
                            <span style={{ fontSize: '3rem', opacity: 0.5 }}>💰 📈 🚀</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skeleton;
