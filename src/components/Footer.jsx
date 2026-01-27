import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <section style={{
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            background: 'linear-gradient(to top, rgba(213, 241, 255, 0.05) 0%, transparent 50%)' // Sunrise effect
        }}>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: '#fff',
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}
            >
                La historia no se espera.<br />
                <span className="aurora-text">Se escribe.</span>
            </motion.h2>

            <motion.button
                whileHover={{ scale: 1.05 }}
                className="pill-btn"
                style={{
                    background: '#fff',
                    color: '#000',
                    fontSize: '1.2rem',
                    padding: '20px 60px',
                    boxShadow: '0 0 30px rgba(255,255,255,0.2)'
                }}
            >
                Comenzar
            </motion.button>

            <div style={{ marginTop: 'auto', marginBottom: '3rem', display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555' }}>
                <span>Legal</span>
                <span>Roadmap</span>
                <span>Privacidad</span>
            </div>

        </section>
    );
};

export default Footer;
