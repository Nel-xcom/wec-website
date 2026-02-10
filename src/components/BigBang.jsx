import { motion } from 'framer-motion';
import logoWhite from '../assets/logos/logo-white.png';
import { useLanguage } from '../context/LanguageContext';

const BigBang = () => {
    const { t } = useLanguage();
    return (
        <section style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Initial Light Explosion Background Effect */}
            <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            {/* Logo - Top centered, lots of air */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                style={{
                    marginTop: '15vh', // Upper third positioning
                    marginBottom: 'auto',
                    zIndex: 2
                }}
            >
                <img
                    src={logoWhite}
                    alt="WEC Logo"
                    style={{ width: '60px', height: 'auto', opacity: 0.9 }}
                />
            </motion.div>

            {/* Main Content - Centered vertically in remaining space */}
            <div style={{
                marginBottom: '20vh',
                textAlign: 'center',
                zIndex: 2,
                padding: '0 2rem',
                maxWidth: '1000px'
            }}>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                    style={{
                        fontFamily: "\'Nico Moji\', sans-serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        lineHeight: 1.1,
                        color: '#f5f5f7',
                        marginBottom: '2rem'
                    }}
                >
                    {t('bigbang_title_1')}<br /> {t('bigbang_title_2')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        color: '#D5F1FF', // Slight blue tint for cosmic feel
                        opacity: 0.8,
                        lineHeight: 1.6,
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}
                >
                    {t('bigbang_desc_1')}<br />
                    {t('bigbang_desc_2')}
                </motion.p>
            </div>

            {/* Propulsor Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '5vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                        width: '2px',
                        height: '40px',
                        background: 'linear-gradient(to bottom, #2997ff, transparent)',
                        boxShadow: '0 0 10px #2997ff'
                    }}
                />
                <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#2997ff', textTransform: 'uppercase' }}>{t('scroll')}</span>
            </motion.div>
        </section>
    );
};

export default BigBang;
