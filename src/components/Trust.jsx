import { motion } from 'framer-motion';

const Trust = () => {
    return (
        <section style={{ padding: '8rem 2rem', background: '#0e0e0e' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>

                    {/* Column 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}
                    >
                        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 600 }}>Identidad (KYC)</h4>
                        <p style={{ fontSize: '1.2rem', color: '#86868b', marginBottom: '1rem' }}>Certeza Biológica.</p>
                        <span style={{ color: '#555', fontSize: '0.9rem' }}>Validación de identidad que elimina el anonimato malicioso. Sabemos con quién tratamos.</span>
                    </motion.div>

                    {/* Column 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}
                    >
                        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 600 }}>Solidez (Fondos)</h4>
                        <p style={{ fontSize: '1.2rem', color: '#86868b', marginBottom: '1rem' }}>Transparencia de Activos.</p>
                        <span style={{ color: '#555', fontSize: '0.9rem' }}>Validación de fondos en tiempo real. Un entorno libre de promesas vacías.</span>
                    </motion.div>

                    {/* Column 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}
                    >
                        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 600 }}>Arbitraje (Mediación)</h4>
                        <p style={{ fontSize: '1.2rem', color: '#86868b', marginBottom: '1rem' }}>Justicia Digital.</p>
                        <span style={{ color: '#555', fontSize: '0.9rem' }}>Mediación y asesoramiento en transacciones. El sistema protege el acuerdo.</span>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Trust;
