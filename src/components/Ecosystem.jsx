import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// --- NEURAL ARTIFACTS (GENERATIVE FORMS) ---

const NeuralExchange = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <motion.circle cx="100" cy="100" r="40" stroke="#D5F1FF" strokeWidth="0.5" fill="none" strokeDasharray="4 4" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
            <motion.path d="M60,100 A40,40 0 0,1 140,100" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
            <motion.path d="M135,95 L140,100 L135,105" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }} />
            <motion.path d="M140,100 A40,40 0 0,1 60,100" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }} />
            <motion.path d="M65,105 L60,100 L65,95" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.9, duration: 0.5 }} />
            <motion.circle cx="100" cy="100" r="10" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, type: "spring" }} />
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ originX: "100px", originY: "100px" }}>
                <circle cx="100" cy="60" r="2" fill="#D5F1FF" />
                <circle cx="100" cy="140" r="2" fill="#D5F1FF" />
            </motion.g>
        </svg>
    </div>
);

const BioChart = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <line x1="40" y1="160" x2="160" y2="160" stroke="#D5F1FF" strokeWidth="0.5" opacity="0.3" />
            <line x1="40" y1="40" x2="40" y2="160" stroke="#D5F1FF" strokeWidth="0.5" opacity="0.3" />
            <motion.path d="M40,160 Q80,140 100,100 T160,50" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut" }} />
            {[0, 1, 2].map((i) => (
                <motion.circle key={i} cx={[40, 100, 160][i]} cy={[160, 100, 50][i]} r="3" fill="#D5F1FF" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.5, type: "spring" }} />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 0.5, 0], y: -50 }} transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}>
                    <circle cx={40 + i * 30} cy={160} r="1" fill="#D5F1FF" />
                </motion.div>
            ))}
        </svg>
    </div>
);

const NetworkUser = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <motion.circle cx="100" cy="80" r="20" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} />
            <motion.path d="M60,160 Q100,100 140,160" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />
            <motion.g initial={{ x: 30, y: -30, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1.5, delay: 1, type: "spring" }}>
                <circle cx="140" cy="80" r="12" stroke="#D5F1FF" strokeWidth="1" fill="none" />
                <line x1="134" y1="80" x2="146" y2="80" stroke="#D5F1FF" strokeWidth="1" />
                <line x1="140" y1="74" x2="140" y2="86" stroke="#D5F1FF" strokeWidth="1" />
            </motion.g>
            <motion.line x1="120" y1="80" x2="128" y2="80" stroke="#D5F1FF" strokeWidth="1" strokeDasharray="2 2" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.5 }} transition={{ duration: 1, delay: 1.5 }} />
        </svg>
    </div>
);

const NeuralMedia = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <motion.rect x="50" y="60" width="100" height="80" rx="10" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} />
            <motion.path d="M90,85 L120,100 L90,115 Z" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} />
            {/* Sparks */}
            {[0, 1, 2].map(i => (
                <motion.line key={i} x1="100" y1="50" x2="100" y2="30" stroke="#D5F1FF" strokeWidth="1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0, 1, 0], y: -20 }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    style={{ rotate: (i - 1) * 30, originY: "50px" }}
                />
            ))}
        </svg>
    </div>
);

const NeuralValuation = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <motion.path d="M100,40 L100,160 M60,160 L140,160" stroke="#D5F1FF" strokeWidth="1" opacity="0.3" />
            {/* Scale Balance */}
            <motion.path d="M60,120 L140,80" stroke="#D5F1FF" strokeWidth="1"
                animate={{ d: ["M60,120 L140,80", "M60,80 L140,120", "M60,120 L140,80"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle cx="100" cy="100" r="4" fill="#D5F1FF" />
            {/* Nodes */}
            <motion.circle cx="60" cy="120" r="15" stroke="#D5F1FF" strokeWidth="1" fill="none" animate={{ cy: [120, 80, 120] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            <motion.circle cx="140" cy="80" r="15" stroke="#D5F1FF" strokeWidth="1" fill="none" animate={{ cy: [80, 120, 80] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
    </div>
);

const NeuralConnect = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <motion.circle cx="100" cy="100" r="60" stroke="#D5F1FF" strokeWidth="0.5" fill="none" opacity="0.3" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
            {/* Mesh */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.g key={i} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: -i }} style={{ originX: "100px", originY: "100px" }}>
                    <circle cx="100" cy="40" r="2" fill="#D5F1FF" />
                    <line x1="100" y1="40" x2="100" y2="100" stroke="#D5F1FF" strokeWidth="0.5" opacity="0.5" />
                </motion.g>
            ))}
            <circle cx="100" cy="100" r="10" fill="#D5F1FF" opacity="0.8" />
        </svg>
    </div>
);


const CrystalCard = ({ title, subtitle, desc, artifact: Artifact, type }) => (
    <motion.div
        className={`crystal-slab radioactive-border p-8 md:p-10 rounded-3xl flex flex-col justify-between group overflow-hidden relative min-w-[350px] md:min-w-[400px] h-[400px] mx-4 transition-all duration-500`}
        whileHover={{
            scale: 1.03,
            borderColor: type === 'capital' ? 'rgba(234, 179, 8, 0.4)' : 'rgba(255,255,255,0.2)',
            boxShadow: "0 25px 50px -12px rgba(213, 241, 255, 0.15)"
        }}
    >
        {/* THE SOUL: Neural Artifact Background */}
        <Artifact />

        <div className="relative z-10 pt-24 h-full flex flex-col">
            <h3 className="text-3xl font-bold mb-2 text-white tracking-tight">{title}</h3>
            <h4 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-6">{subtitle}</h4>
            <p className="volcanic-ash text-sm md:text-base leading-relaxed flex-grow">{desc}</p>
        </div>
    </motion.div>
);

const DATA_CARDS = [
    {
        title: "Marketplace",
        subtitle: "Worldwide business selling & VERIFIED METRICS",
        desc: "Visibilidad basada en mérito financiero real. Un escaparate global donde la demanda encuentra a la oferta sin fricción.",
        artifact: NeuralExchange,
        type: "marketplace"
    },
    {
        title: "Find Capital",
        subtitle: "Find investors around the world",
        desc: "Transformamos tu Pitch Deck en data estructurada. Conectamos tu visión con fondos que buscan exactamente tu perfil de riesgo.",
        artifact: BioChart,
        type: "capital"
    },
    {
        title: "Team Building",
        subtitle: "Don't start a startup alone",
        desc: "Encuentra co-fundadores técnicos. Firma acuerdos digitales instantáneos y distribuye equity de forma programática.",
        artifact: NetworkUser,
        type: "team"
    },
    {
        title: "Smart Clips",
        subtitle: "AI-DRIVEN MARKET INTELLIGENCE",
        desc: "Contenido generado por IA que impulsa la cultura emprendedora. Detecta tendencias y nichos de crecimiento antes que nadie.",
        artifact: NeuralMedia,
        type: "clips"
    },
    {
        title: "Business Pricing",
        subtitle: "FAIR PROFIT DISCOVERY",
        desc: "Descubre el precio real de tu negocio con algoritmos predictivos. Obtén una ganancia justa basada en datos de mercado reales.",
        artifact: NeuralValuation,
        type: "pricing"
    },
    {
        title: "Community",
        subtitle: "DECENTRALIZED ECOSYSTEM GRAPH",
        desc: "La red social del ecosistema emprendedor. Conecta con fundadores, valida ideas y escala tu red de contactos globalmente.",
        artifact: NeuralConnect,
        type: "community"
    }
];

// Duplicate data to simulate infinite loop
const INFINITE_CARDS = [...DATA_CARDS, ...DATA_CARDS, ...DATA_CARDS, ...DATA_CARDS];

export default function Ecosystem() {
    // CAROUSEL LOGIC
    const x = useMotionValue(0);
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Approximate width of card (400px min-w + 32px mx-4 = 432px). 
    // Total set width = 6 * 432 = 2592.
    // We start at -2592 (showing the second set) and move left.
    // When we reach -5184, we jump back to -2592.
    const ONE_SET_WIDTH = DATA_CARDS.length * 432;
    const RESET_THRESHOLD = -(ONE_SET_WIDTH * 2); // End of second set

    useEffect(() => {
        // Set initial position to show 'middle' set for infinite scrolling capability in both directions
        x.set(-ONE_SET_WIDTH);
    }, [ONE_SET_WIDTH, x]);

    useAnimationFrame((time, delta) => {
        if (isHovered || isDragging) return;

        let moveBy = 0.5; // Speed adjustment (pixels per frame)

        // This is a simplified "dumb" scroller. 
        // A robust solution uses time delta, but for consistent smooth motion often fixed steps are smoother if FPS is stable.
        let currentX = x.get();
        let newX = currentX - moveBy;

        // Reset logic for infinite loop
        if (newX <= RESET_THRESHOLD) {
            newX = -ONE_SET_WIDTH;
        }

        x.set(newX);
    });

    return (
        <section id="ecosystem" className="w-full py-40 flex flex-col items-center relative z-10 w-full overflow-hidden">

            <motion.div
                className="mb-12 text-center px-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">Nuestro Ecosistema</h2>
                <p className="text-slate-500 max-w-xl mx-auto">Conoce la columna vertebral de la comunidad.</p>
            </motion.div>

            {/* DRAGGABLE CAROUSEL */}
            <motion.div
                ref={containerRef}
                className="w-full cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    className="flex"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: RESET_THRESHOLD, right: 0 }} // Loose constraints
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                >
                    {INFINITE_CARDS.map((card, index) => (
                        <CrystalCard key={index} {...card} />
                    ))}
                </motion.div>
            </motion.div>

            <div className="mt-8 text-slate-600 text-xs tracking-widest uppercase">
                Drag or hover to pause
            </div>

        </section>
    );
}
