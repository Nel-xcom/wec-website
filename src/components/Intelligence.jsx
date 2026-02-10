import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, LineChart, TrendingUp, BrainCircuit } from 'lucide-react';
import bt1 from '../assets/images/bt-1.webp';
import bt2 from '../assets/images/bt-2.webp';
import bt3 from '../assets/images/bt-3.webp';
import bt4 from '../assets/images/bt-4.webp';
import { useLanguage } from '../context/LanguageContext';

export default function Intelligence() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { t } = useLanguage();

    const FEATURES = [
        {
            icon: Code2,
            title: t('intel_feat_1_title'),
            subtitle: t('intel_feat_1_sub'),
            color: "text-wec-blue",
            bg: "bg-wec-blue/10",
            border: "border-wec-blue/50",
            image: bt1,
            description: (
                <>
                    {t('intel_feat_1_desc')}
                </>
            )
        },
        {
            icon: LineChart,
            title: t('intel_feat_2_title'),
            subtitle: t('intel_feat_2_sub'),
            color: "text-wec-purple",
            bg: "bg-wec-purple/10",
            border: "border-wec-purple/50",
            image: bt2,
            description: (
                <>
                    {t('intel_feat_2_desc')}
                </>
            )
        },
        {
            icon: TrendingUp,
            title: t('intel_feat_3_title'),
            subtitle: t('intel_feat_3_sub'),
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/50",
            image: bt3,
            description: (
                <>
                    {t('intel_feat_3_desc')}
                </>
            )
        },
        {
            icon: BrainCircuit,
            title: t('intel_feat_4_title'),
            subtitle: t('intel_feat_4_sub'),
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/50",
            image: bt4,
            description: (
                <>
                    {t('intel_feat_4_desc')}
                </>
            )
        }
    ];

    return (
        <section className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden min-h-screen bg-black">

            {/* THE NEURAL BEAM: Moving Light with Code Syntax Trail */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 z-0">
                <motion.div
                    className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-wec-blue to-transparent blur-[1px]"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="relative z-10 max-w-7xl w-full px-6 flex flex-col items-center">

                <div className="text-center mb-16">
                    <motion.h2
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white text-bloom"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
                    >
                        {t('intel_title')}
                    </motion.h2>

                    <motion.p
                        className="volcanic-ash text-xl max-w-3xl leading-relaxed mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        {t('intel_subtitle')}
                    </motion.p>
                </div>

                {/* MAIN GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">

                    {/* LEFT COLUMN: Navigation Cards */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {FEATURES.map((feature, index) => {
                            const isSelected = selectedIndex === index;
                            const Icon = feature.icon;

                            return (
                                <motion.div
                                    key={index}
                                    onClick={() => setSelectedIndex(index)}
                                    className={`relative p-5 rounded-xl border flex items-center gap-4 cursor-pointer transition-all duration-300 group
                                        ${isSelected
                                            ? `bg-white/5 ${feature.border} shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]`
                                            : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10'
                                        }
                                    `}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Active Indicator Glow */}
                                    {isSelected && (
                                        <motion.div
                                            layoutId="activeGlow"
                                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-50"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}

                                    <div className={`p-3 rounded-lg transition-colors ${isSelected ? feature.bg : 'bg-white/5 group-hover:bg-white/10'}`}>
                                        <Icon className={`w-6 h-6 ${isSelected ? feature.color : 'text-slate-400 group-hover:text-white'}`} />
                                    </div>

                                    <div className="relative z-10">
                                        <h4 className={`font-bold text-lg mb-0.5 ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                            {feature.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                                            {feature.subtitle}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* RIGHT COLUMN: Content Display */}
                    <div className="lg:col-span-8 relative flex flex-col items-center justify-center p-4 bg-black/20 border border-white/5 rounded-3xl overflow-hidden min-h-[400px]">

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-wec-blue/10 blur-[100px] rounded-full pointer-events-none" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10 flex flex-col items-center text-center max-w-2xl"
                            >
                                <div className="relative w-full max-w-[460px] aspect-square mb-4 flex items-center justify-center">
                                    {/* Image with Glow */}
                                    <div className="absolute inset-0 bg-wec-blue/20 blur-3xl opacity-30 rounded-full" />
                                    <img
                                        src={FEATURES[selectedIndex].image}
                                        alt={FEATURES[selectedIndex].title}
                                        className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.3)] scale-[1.35]"
                                        loading="lazy"
                                        decoding="async"
                                        style={{ willChange: 'transform' }}
                                    />
                                </div>

                                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                                    {FEATURES[selectedIndex].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                    </div>

                </div>

            </div>

        </section>
    );
}
