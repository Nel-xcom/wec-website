import { motion } from 'framer-motion';

const GravitationalCore = () => {
    return (
        <section style={{
            minHeight: '100vh',
            padding: '6rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '1400px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>

                {/* Visual Background: Orbiting Spheres (Simulated with CSS/Framer) */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                    {/* Sphere 1 */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            top: '20%',
                            left: '20%',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle at 30% 30%, rgba(41, 151, 255, 0.1), transparent 60%)',
                            boxShadow: '0 0 40px rgba(41, 151, 255, 0.1) inset',
                            border: '1px solid rgba(41, 151, 255, 0.2)'
                        }}
                    />
                    {/* Sphere 2 */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            bottom: '20%',
                            right: '20%',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 191, 246, 0.1), transparent 60%)',
                            boxShadow: '0 0 40px rgba(255, 191, 246, 0.1) inset',
                            border: '1px solid rgba(255, 191, 246, 0.2)'
                        }}
                    />
                </div>

                {/* Content Block A: Marketplace */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass"
                    style={{
                        padding: '3rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(41, 151, 255, 0.2)',
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 2
                    }}
                >
                    <h2 style={{ fontFamily: "'Nico Moji', sans-serif", fontSize: '2.5rem', marginBottom: '1.5rem', color: '#D5F1FF' }}>
                        El Mercado Universal
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: '#a3cfff', lineHeight: 1.6 }}>
                        Tu negocio, visible en todas las frecuencias. No busques clientes en el vacío; permite que la gravedad de nuestro ecosistema los atraiga hacia ti. Digitalizamos la oferta y la demanda.
                    </p>
                </motion.div>

                {/* Content Block B: Find Capital */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass"
                    style={{
                        padding: '3rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 191, 246, 0.2)',
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 2
                    }}
                >
                    <h2 style={{ fontFamily: "'Nico Moji', sans-serif", fontSize: '2.5rem', marginBottom: '1.5rem', color: '#FFBFF6' }}>
                        Energía para la Expansión
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: '#ffccf9', lineHeight: 1.6 }}>
                        Conecta tu visión con fuentes de capital validadas. Fondos reales, sin materia oscura ni promesas vacías. Tu 'pitch' convertido en una señal inconfundible para inversores.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default GravitationalCore;
