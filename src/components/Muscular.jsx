import { motion } from 'framer-motion';

const Muscular = () => {
    return (
        <section style={{ minHeight: '100vh', padding: '6rem 2rem', position: 'relative' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{ fontFamily: "'Nico Moji', sans-serif", fontSize: '3rem', marginBottom: '2rem' }}>
                        Nadie cambia el mundo solo.
                    </h2>
                    <p style={{ color: '#86868b', fontSize: '1.4rem', lineHeight: 1.6, marginBottom: '4rem' }}>
                        Forma tu startup como se forman los grandes imperios: con las personas correctas.<br />
                        <span style={{ color: '#f5f5f7' }}>Encuentra co-fundadores, talento técnico y creativos alineados a tu misión.</span>
                    </p>
                </motion.div>

                {/* Connection Animation Placeholder */}
                <div style={{
                    height: '400px',
                    width: '100%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    opacity: 0.5,
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <p style={{ color: '#2997ff' }}>[System: Connecting Nodes...]</p>
                </div>
            </div>
        </section>
    );
};

export default Muscular;
