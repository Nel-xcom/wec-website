import { useRef, memo, useEffect, useState } from 'react';
import downloadVideo from '../assets/images/download.mp4';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Apple, Play, Globe, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

// ICON COMPONENTS FOR STORES
const AppleIcon = ({ className }) => <Apple className={className} />;
const PlayStoreIcon = ({ className }) => <Play className={className} />;

const Button = memo(({ icon: Icon, label, sublabel, href, primary }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative group flex items-center gap-4 px-6 py-4 rounded-xl border transition-all duration-300 overflow-hidden
            ${primary
                ? 'bg-white text-black border-white hover:border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]'
                : 'bg-white/5 text-white border-white/10 hover:border-white/30 hover:bg-white/10'
            }`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
    >
        {/* Glow Hover Effect (GPU Accelerated) */}
        {!primary && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
        )}

        <Icon className={`w-8 h-8 ${primary ? 'fill-black' : 'fill-white'}`} style={primary ? {} : { fill: 'currentColor' }} />

        <div className="flex flex-col text-left z-10">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${primary ? 'text-slate-500' : 'text-slate-400'}`}>{sublabel}</span>
            <span className="text-lg font-bold leading-none">{label}</span>
        </div>

        {/* Arrow Hint */}
        <ChevronRight className={`ml-auto w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${primary ? 'text-black' : 'text-white'}`} />
    </motion.a>
));

const DownloadPage = () => {
    const { t } = useLanguage();
    // Reveal Animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="relative min-h-screen bg-[#030303] text-white overflow-hidden selection:bg-wec-blue/30 selection:text-white">
            <Navbar />

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT: INFORMATION CLUSTER */}
                <motion.div
                    className="flex flex-col justify-center px-6 md:px-20 py-32 lg:py-0 relative z-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Centered Content Wrapper */}
                    <div className="w-full max-w-xl mx-auto flex flex-col justify-center">

                        {/* Background Texture (Subtle) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-wec-blue/5 via-transparent to-transparent pointer-events-none" />

                        <motion.div variants={itemVariants} className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-mono tracking-widest uppercase backdrop-blur-md">
                                {t('dl_badge')}
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
                            {t('dl_title_1')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wec-blue via-purple-400 to-amber-300">
                                {t('dl_title_2')}
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-xl mb-12 leading-relaxed">
                            {t('dl_desc')}
                        </motion.p>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                            <Button
                                icon={AppleIcon}
                                sublabel={t('dl_appstore_sub')}
                                label="App Store"
                                href="#"
                                primary
                            />
                            <Button
                                icon={PlayStoreIcon}
                                sublabel={t('dl_playstore_sub')}
                                label="Google Play"
                                href="#"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-8 flex items-center gap-4 text-sm text-slate-500 font-mono">
                            <Globe size={16} />
                            <span>{t('dl_also')} <a href="#" className="underline hover:text-white transition-colors">{t('dl_webapp')}</a></span>
                        </motion.div>
                    </div>

                </motion.div>

                {/* RIGHT: CINEMATIC VISUAL CENTERPIECE */}
                <div className="relative h-[60vh] lg:h-screen w-full overflow-hidden flex items-center justify-center">

                    {/* Video Container - CLEAN (Removed styling) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative w-[80%] max-w-[380px] aspect-[9/16] overflow-hidden z-10 mt-20"
                    >
                        {/* THE VIDEO ASSET */}
                        <video
                            className="w-full h-full object-cover mix-blend-screen"
                            playsInline
                            muted
                            loop
                            autoPlay
                            preload="auto"
                            width="1080"
                            height="1920"
                        >
                            <source src={downloadVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>


                </div>

            </div>


        </div>
    );
};

export default memo(DownloadPage);
