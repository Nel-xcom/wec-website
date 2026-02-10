import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { NeuralExchange, BioChart, NetworkUser, NeuralMedia, NeuralValuation, NeuralConnect } from './NeuralArtifacts';


import { useLanguage } from '../context/LanguageContext';

const CrystalCard = ({ title, subtitle, desc, artifact: Artifact, type }) => (
    <motion.div
        className={`crystal-slab radioactive-border p-8 md:p-10 rounded-3xl flex flex-col justify-between group overflow-hidden relative min-w-[350px] md:min-w-[400px] h-[400px] mx-4 transition-all duration-500`}
        style={{ willChange: 'transform' }}
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

export default function Ecosystem() {
    const { t } = useLanguage();

    const DATA_CARDS = [
        {
            title: t('eco_card_1_title'),
            subtitle: t('eco_card_1_sub'),
            desc: t('eco_card_1_desc'),
            artifact: NeuralExchange,
            type: "marketplace"
        },
        {
            title: t('eco_card_2_title'),
            subtitle: t('eco_card_2_sub'),
            desc: t('eco_card_2_desc'),
            artifact: BioChart,
            type: "capital"
        },
        {
            title: t('eco_card_3_title'),
            subtitle: t('eco_card_3_sub'),
            desc: t('eco_card_3_desc'),
            artifact: NetworkUser,
            type: "team"
        },
        {
            title: t('eco_card_4_title'),
            subtitle: t('eco_card_4_sub'),
            desc: t('eco_card_4_desc'),
            artifact: NeuralMedia,
            type: "clips"
        },
        {
            title: t('eco_card_5_title'),
            subtitle: t('eco_card_5_sub'),
            desc: t('eco_card_5_desc'),
            artifact: NeuralValuation,
            type: "pricing"
        },
        {
            title: t('eco_card_6_title'),
            subtitle: t('eco_card_6_sub'),
            desc: t('eco_card_6_desc'),
            artifact: NeuralConnect,
            type: "community"
        }
    ];

    // Duplicate data to simulate infinite loop
    const INFINITE_CARDS = [...DATA_CARDS, ...DATA_CARDS, ...DATA_CARDS, ...DATA_CARDS];

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

    // PERFORMANCE: Track viewport visibility to pause animation
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 } // 10% visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Set initial position to show 'middle' set for infinite scrolling capability in both directions
        x.set(-ONE_SET_WIDTH);
    }, [ONE_SET_WIDTH, x]);

    useAnimationFrame((time, delta) => {
        // PERFORMANCE: Pause when off-screen or interacting
        if (!isInView || isHovered || isDragging) return;

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
        <section ref={sectionRef} id="ecosystem" className="w-full py-40 flex flex-col items-center relative z-10 w-full overflow-hidden">

            <motion.div
                className="mb-12 text-center px-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">{t('eco_title')}</h2>
                <p className="text-slate-500 max-w-xl mx-auto">{t('eco_subtitle')}</p>
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
                    style={{ x, willChange: 'transform' }}
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
                {t('eco_drag')}
            </div>


        </section>
    );
}
