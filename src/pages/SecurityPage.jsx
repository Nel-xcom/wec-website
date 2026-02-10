import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import GeometricBackground from '../components/GeometricBackground';
import Footer from '../components/Footer';
import { NeuralExchange, NeuralConnect, NeuralMedia, NetworkUser, BioChart } from '../components/NeuralArtifacts';
import { useLanguage } from '../context/LanguageContext';
import { useEarlyAccess } from '../context/EarlyAccessContext';



const DetailSection = ({ data, index, t }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            className="relative min-h-[60vh] flex items-center py-24 px-6 md:px-20 border-b border-white/5 bg-[#030303]/40 group overflow-hidden"
        >
            <div className="max-w-6xl mx-auto w-full relative z-10">
                {/* HEADER ROW WITH HOLOGRAM ANCHOR */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start mb-20">

                    {/* TEXT BLOCK */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-xs font-mono text-purple-400/70 transition-colors group-hover:text-purple-400 duration-500">SEC-0{index + 1}</span>
                            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-500/40 group-hover:text-purple-500/40 transition-colors duration-500">{data.subtitle}</h3>
                        </div>

                        {/* CINEMATIC TITLE */}
                        <div className="relative inline-block mb-8">
                            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter relative z-10 mix-blend-normal">
                                {data.title}
                            </h2>
                            {/* Subtle Shimmer Overlay - Gradient Tinted */}

                        </div>

                        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl border-l-2 border-white/5 pl-6 group-hover:border-purple-500/30 transition-colors duration-500">
                            {data.what}
                        </p>
                    </motion.div>

                    {/* HOLOGRAPHIC ARTIFACT HOOK */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="hidden lg:flex items-center justify-center w-[200px] h-[200px] opacity-20 grayscale brightness-150 group-hover:opacity-60 group-hover:scale-110 group-hover:grayscale-0 group-hover:sepia group-hover:hue-rotate-[90deg] transition-all duration-700 ease-in-out"
                        style={{ opacity: 0.8 }} // Optimized: Removed heavy CSS filter
                    >
                        <data.Artifact />
                    </motion.div>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 md:divide-x divide-white/5">

                    {/* COL 1: ESTRUCTURA (Tecnología) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:pl-8 first:pl-0 hover:bg-emerald-900/5 md:hover:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 transition-colors duration-300"
                    >
                        <h4 className="text-white font-mono text-xs mb-4 opacity-40 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-wec-blue rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> {t('secpage_label_tech')}
                        </h4>
                        <p className="text-slate-500 hover:text-slate-300 transition-colors duration-300 text-sm leading-7">{data.structure}</p>
                    </motion.div>

                    {/* COL 2: BENEFICIO (Confianza) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:pl-8 hover:bg-emerald-900/5 md:hover:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 transition-colors duration-300"
                    >
                        <h4 className="text-white font-mono text-xs mb-4 opacity-40 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> {t('secpage_label_trust')}
                        </h4>
                        <p className="text-slate-500 hover:text-slate-300 transition-colors duration-300 text-sm leading-7">{data.benefit}</p>
                    </motion.div>

                    {/* COL 3: PROBLEMA (Riesgo Mitigado) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:pl-8 hover:bg-emerald-900/5 md:hover:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 transition-colors duration-300"
                    >
                        <h4 className="text-white font-mono text-xs mb-4 opacity-40 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> {t('secpage_label_risk')}
                        </h4>
                        <p className="text-slate-500 hover:text-slate-300 transition-colors duration-300 text-sm leading-7">{data.problem}</p>
                    </motion.div>
                </div>
            </div>

            {/* AMBIENT LIGHT LEAK (Ecosystem Gradient) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none" />
        </motion.div>
    );
};

export default function SecurityPage() {
    const { t } = useLanguage();
    const { openForm } = useEarlyAccess();

    const PROTOCOLS = [
        { title: t('secpage_p1_title'), subtitle: t('secpage_p1_sub'), Artifact: NeuralMedia, what: t('secpage_p1_what'), structure: t('secpage_p1_structure'), benefit: t('secpage_p1_benefit'), problem: t('secpage_p1_problem') },
        { title: t('secpage_p2_title'), subtitle: t('secpage_p2_sub'), Artifact: NetworkUser, what: t('secpage_p2_what'), structure: t('secpage_p2_structure'), benefit: t('secpage_p2_benefit'), problem: t('secpage_p2_problem') },
        { title: t('secpage_p3_title'), subtitle: t('secpage_p3_sub'), Artifact: NeuralExchange, what: t('secpage_p3_what'), structure: t('secpage_p3_structure'), benefit: t('secpage_p3_benefit'), problem: t('secpage_p3_problem') },
        { title: t('secpage_p4_title'), subtitle: t('secpage_p4_sub'), Artifact: NeuralExchange, what: t('secpage_p4_what'), structure: t('secpage_p4_structure'), benefit: t('secpage_p4_benefit'), problem: t('secpage_p4_problem') },
        { title: t('secpage_p5_title'), subtitle: t('secpage_p5_sub'), Artifact: BioChart, what: t('secpage_p5_what'), structure: t('secpage_p5_structure'), benefit: t('secpage_p5_benefit'), problem: t('secpage_p5_problem') }
    ];

    return (
        <div className="relative min-h-screen bg-[#030303] text-slate-400 selection:bg-emerald-500/30 selection:text-white pb-32">
            <Navbar />

            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <GeometricBackground />
            </div>

            <section className="relative w-full h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
                <motion.div
                    className="text-center z-10 max-w-6xl mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <motion.span
                        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-mono tracking-widest uppercase backdrop-blur-md"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {t('secpage_badge')}
                    </motion.span>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-8">
                        <span className="block mb-2">{t('secpage_hero_1')}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-wec-blue via-purple-400 to-amber-300">
                            {t('secpage_hero_2')}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {t('secpage_hero_desc')}
                    </p>
                </motion.div>

                <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-wec-blue/5 to-transparent pointer-events-none" />
            </section>

            <div className="relative z-10 w-full border-t border-white/5 bg-[#030303]/90">
                {PROTOCOLS.map((item, i) => (
                    <DetailSection key={i} data={item} index={i} t={t} />
                ))}
            </div>

            <section className="relative py-40 flex flex-col items-center justify-center border-t border-white/5">
                <div className="text-center max-w-2xl px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter">
                        {t('secpage_cta_title_1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-wec-blue to-purple-400">{t('secpage_cta_title_2')}</span>.
                    </h2>
                    <p className="text-slate-400 mb-10 text-lg">
                        {t('secpage_cta_desc')}
                    </p>
                    <button
                        onClick={openForm}
                        className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg tracking-widest uppercase hover:bg-gradient-to-r hover:from-wec-blue hover:via-purple-400 hover:to-amber-300 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95"
                    >
                        {t('secpage_cta_btn')}
                    </button>
                </div>
            </section>
        </div>
    );
}
