import { motion } from 'framer-motion';

const AiNavigation = () => {
    return (
        <section style={{ minHeight: '80vh', padding: '6rem 2rem', position: 'relative', display: 'flex', alignItems: 'center' }}>

            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap-reverse', gap: '4rem' }}>

                {/* HUD Visual */}
                <div style={{ flex: 1, minWidth: '300px', height: '400px', position: 'relative', border: '1px solid rgba(41, 151, 255, 0.2)', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', padding: '2rem' }}>
                    <h4 style={{ color: '#2997ff', fontFamily: 'monospace', marginBottom: '1rem' }}>SYSTEM: ONLINE</h4>

                    {/* Fake Data Lines */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.random() * 80 + 20}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            style={{ height: '4px', background: 'rgba(41, 151, 255, 0.4)', marginBottom: '1rem', borderRadius: '2px' }}
                        />
                    ))}

                    <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', border: '1px solid rgba(41, 151, 255, 0.5)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                        <span style={{ color: '#fff', fontSize: '0.8rem', fontFamily: 'monospace' }}>OPTIMIZING ROUTE...</span>
                    </div>
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ flex: 1, minWidth: '300px' }}
                >
                    <h2 style={{ fontFamily: "'Nico Moji', sans-serif", fontSize: '3rem', marginBottom: '1.5rem', color: '#fff' }}>
                        El Copiloto Intelectual
                    </h2>
                    <p style={{ color: '#86868b', fontSize: '1.3rem', lineHeight: 1.6 }}>
                        Inteligencia Artificial integrada para eliminar la fricción operativa. Desde el análisis de rutas de mercado hasta la automatización de la diaria. <br /><br />
                        <span style={{ color: '#2997ff' }}>Tú defines el destino interestelar, el sistema calcula el trayecto más eficiente.</span>
                    </p>
                </motion.div>
            </div>

        </section>
    );
};

export default AiNavigation;
