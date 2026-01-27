import { motion } from 'framer-motion';

const Constellations = () => {
    return (
        <section style={{ minHeight: '80vh', padding: '6rem 2rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Visual Decoration: Constellation Lines */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                <motion.path
                    d="M 100 100 L 400 300 L 800 100 L 100 100" // Simple triangle for now
                    stroke="rgba(41, 151, 255, 0.3)"
                    strokeWidth="1"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                    d="M 200 600 L 500 500 L 300 800"
                    stroke="rgba(255, 191, 246, 0.3)"
                    strokeWidth="1"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                />
            </svg>

            <div style={{ textAlign: 'center', maxWidth: '900px', zIndex: 2 }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontFamily: "'Nico Moji', sans-serif",
                        fontSize: '3.5rem',
                        marginBottom: '2rem',
                        background: 'linear-gradient(to right, #D5F1FF, #white)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 20px rgba(213, 241, 255, 0.4)'
                    }}
                >
                    Forma tu Constelación
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    style={{ color: '#dbeafe', fontSize: '1.4rem', lineHeight: 1.6 }}
                >
                    Ninguna estrella brilla sola con la misma intensidad. Encuentra co-fundadores y talento técnico alineados a tu órbita. Une los puntos dispersos y crea una fuerza de trabajo imparable para tu startup.
                </motion.p>
            </div>
        </section>
    );
};

export default Constellations;
