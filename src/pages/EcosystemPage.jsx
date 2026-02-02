import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import GeometricBackground from '../components/GeometricBackground';
import { NeuralExchange, BioChart, NetworkUser, NeuralMedia, NeuralValuation, NeuralConnect } from '../components/NeuralArtifacts';

const SECTIONS = [
    {
        id: "marketplace",
        title: "Marketplace",
        subtitle: "LIQUIDEZ SIN FRICCIÓN",
        Artifact: NeuralExchange,
        color: "text-amber-400",
        bgGradient: "from-amber-500/10 to-transparent",
        what: "Un mercado secundario descentralizado donde startups y negocios tradicionales se compran y venden con la misma facilidad que una acción.",
        structure: "Utilizamos contratos inteligentes para el escrow de fondos y la transferencia de propiedad. La verificación de métricas se realiza on-chain para garantizar transparencia absoluta.",
        benefit: "Founders obtienen liquidez inmediata (Exit) sin esperar años a una IPO. Inversores acceden a flujo de caja verificado.",
        problem: "La venta de empresas privadas es un proceso lento (6-12 meses), costoso (brokers) y opaco."
    },
    {
        id: "capital",
        title: "Find Capital",
        subtitle: "MATCHING ALGORÍTMICO",
        Artifact: BioChart,
        color: "text-cyan-400",
        bgGradient: "from-cyan-500/10 to-transparent",
        what: "Una plataforma de levantamiento de capital que conecta a fundadores con inversores basándose en tesis de inversión y datos, no en 'a quién conoces'.",
        structure: "Transformamos tu Pitch Deck en data estructurada. Nuestro motor de emparejamiento analiza miles de tesis de inversión para encontrar el fit perfecto.",
        benefit: "Acceso a capital global las 24/7. Cierra rondas en semanas, no meses.",
        problem: "El Fundraising tradicional es un juego de insiders, ineficiente y lleno de sesgos geográficos."
    },
    {
        id: "team",
        title: "Team Building",
        subtitle: "SOCIOS, NO EMPLEADOS",
        Artifact: NetworkUser,
        color: "text-purple-400",
        bgGradient: "from-purple-500/10 to-transparent",
        what: "El sistema definitivo para encontrar co-fundadores y talento clave dispuestos a trabajar por equity.",
        structure: "Perfiles verificados con historial de ejecución. Acuerdos de vesting generados y firmados digitalmente en la plataforma.",
        benefit: "Construye un equipo 'A-Player' sin quemar caja inicial. Alineación de incentivos total a largo plazo.",
        problem: "La soledad del fundador y la dificultad (y costo legal) de estructurar equipos co-fundadores sólidos."
    },
    {
        id: "clips",
        title: "Smart Clips",
        subtitle: "INTELIGENCIA DE MERCADO",
        Artifact: NeuralMedia,
        color: "text-emerald-400",
        bgGradient: "from-emerald-500/10 to-transparent",
        what: "Contenido de alto valor generado por IA que destila las tendencias más importantes del ecosistema emprendedor.",
        structure: "Agentes autónomos escanean miles de fuentes (news, papers, social) y generan resúmenes visuales de alto impacto.",
        benefit: "Mantente a la vanguardia sin ruido. Insights accionables para tu negocio en segundos.",
        problem: "La sobrecarga de información (infoxicación) hace imposible distinguir la señal del ruido."
    },
    {
        id: "pricing",
        title: "Business Pricing",
        subtitle: "VALUACIÓN OBJETIVA",
        Artifact: NeuralValuation,
        color: "text-rose-400",
        bgGradient: "from-rose-500/10 to-transparent",
        what: "El estándar de oro para la valuación de negocios digitales y tradicionales.",
        structure: "Modelos de Machine Learning entrenados con datos de transacciones reales, ajustados por sector, crecimiento y riesgo.",
        benefit: "Elimina la especulación. Entra a una negociación con un precio defendible y justo.",
        problem: "La subjetividad extrema en las valuaciones mata acuerdos viables antes de empezar."
    },
    {
        id: "community",
        title: "Community",
        subtitle: "RED DE CONFIANZA",
        Artifact: NeuralConnect,
        color: "text-blue-400",
        bgGradient: "from-blue-500/10 to-transparent",
        what: "Más que una red social, un grafo de reputación donde emprendedores e inversores validan su trayectoria.",
        structure: "Identidad soberana y sistema de reputación on-chain. Conexiones P2P directas.",
        benefit: "Validación social instantánea. Networking de calidad sin intermediarios ni gatekeepers.",
        problem: "La fragmentación del ecosistema hace que el valor de tu red esté limitado a tu ubicación física."
    }
];

const DetailSection = ({ data, index }) => {
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
                            <span className="text-xs font-mono text-slate-600 transition-colors group-hover:text-wec-blue/50 duration-500">0{index + 1}</span>
                            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-white/30">{data.subtitle}</h3>
                        </div>

                        {/* CINEMATIC TITLE */}
                        <div className="relative inline-block mb-8">
                            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter relative z-10 mix-blend-normal">
                                {data.title}
                            </h2>
                            {/* Subtle Shimmer Overlay */}
                            <h2 className="absolute top-0 left-0 text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse pointer-events-none">
                                {data.title}
                            </h2>
                        </div>

                        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl border-l-2 border-white/5 pl-6 group-hover:border-wec-blue/30 transition-colors duration-500">
                            {data.what}
                        </p>
                    </motion.div>

                    {/* HOLOGRAPHIC ARTIFACT HOOK */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="hidden lg:flex items-center justify-center w-[200px] h-[200px] opacity-20 grayscale brightness-150 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 ease-in-out"
                        style={{ filter: 'grayscale(100%) drop-shadow(0 0 20px rgba(255,255,255,0.1))' }}
                    >
                        <data.Artifact />
                    </motion.div>
                </div>

                {/* BENTO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 md:divide-x divide-white/5">

                    {/* COL 1: ESTRUCTURA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:pl-8 first:pl-0 hover:bg-white/5 md:hover:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 transition-colors duration-300"
                    >
                        <h4 className="text-white font-mono text-sm mb-4 opacity-40 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 bg-wec-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> Estructura
                        </h4>
                        <p className="text-slate-500 hover:text-slate-300 transition-colors duration-300 text-sm leading-7">{data.structure}</p>
                    </motion.div>

                    {/* COL 2: BENEFICIO */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:pl-8 hover:bg-white/5 md:hover:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 transition-colors duration-300"
                    >
                        <h4 className="text-white font-mono text-sm mb-4 opacity-40 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> Beneficio
                        </h4>
                        <p className="text-slate-500 hover:text-slate-300 transition-colors duration-300 text-sm leading-7">{data.benefit}</p>
                    </motion.div>

                    {/* COL 3: PROBLEMA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:pl-8 hover:bg-white/5 md:hover:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 transition-colors duration-300"
                    >
                        <h4 className="text-white font-mono text-sm mb-4 opacity-40 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 bg-rose-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> Problema
                        </h4>
                        <p className="text-slate-500 hover:text-slate-300 transition-colors duration-300 text-sm leading-7">{data.problem}</p>
                    </motion.div>
                </div>
            </div>

            {/* AMBIENT LIGHT LEAK (Optional subtle dynamism) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none" />
        </motion.div>
    );
};

export default function EcosystemPage() {
    return (
        <div className="min-h-screen text-slate-300 selection:bg-wec-blue/30 selection:text-white pb-32 relative">
            <GeometricBackground />
            <div className="relative z-10">
                <Navbar />

                {/* HERO SECTION */}
                <section className="relative h-screen px-6 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
                            Infraestructura del <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-wec-blue via-purple-400 to-amber-300">Nuevo Mundo</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Cada componente del ecosistema ha sido diseñado para democratizar el acceso a oportunidades de negocio, talento y capital.
                        </p>
                    </motion.div>
                </section>

                {/* DETAIL SECTIONS */}
                <div className="relative z-10 w-full overflow-hidden">
                    {/* Connecting Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2" />

                    {SECTIONS.map((section, index) => (
                        <DetailSection key={section.id} data={section} index={index} />
                    ))}
                </div>

                {/* CALL TO ACTION */}
                <div className="flex justify-center mt-20">
                    <motion.button
                        className="px-12 py-5 rounded-full bg-white text-black font-bold text-lg tracking-widest uppercase hover:bg-gradient-to-r hover:from-wec-blue hover:via-purple-400 hover:to-amber-300 hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        OBTENER ACCESO ANTICIPADO
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
