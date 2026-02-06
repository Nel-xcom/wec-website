import { motion } from 'framer-motion';
import { memo } from 'react';
import { ShieldCheck, Lock, Scale } from 'lucide-react';

const CitadelProtocol = memo(({ title, subtitle, desc, icon: Icon, delay }) => (
    <motion.div
        className="flex flex-col items-center text-center p-6 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
        {/* ROTATING ENERGY SPHERE - OPTIMIZED: CSS ANIMATION & LAYER ISOLATION */}
        <div className="relative mb-8 w-24 h-24 flex items-center justify-center">

            {/* Ring 1 - Outer (3s rotation) */}
            <div
                className="absolute inset-[-8px] rounded-full border border-t-wec-blue/50 border-r-transparent border-b-wec-purple/50 border-l-transparent animate-spin"
                style={{ animationDuration: '3s', willChange: 'transform' }} // Exact match: duration 3
            />

            {/* Ring 2 - Inner (5s reverse rotation) */}
            <div
                className="absolute inset-[-12px] rounded-full border border-t-transparent border-r-wec-purple/30 border-b-transparent border-l-wec-blue/30 animate-[spin_reverse_linear_infinite]"
                style={{ animationDuration: '5s', animationDirection: 'reverse', willChange: 'transform' }} // Exact match: duration 5
            />

            {/* Static Core with Blur - ISOLATED from rotation */}
            <div
                className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.15)] relative z-10"
                style={{ willChange: 'transform' }} // GPU Promotion for Blur/Shadow container
            >
                <Icon size={32} className="text-white" strokeWidth={1.5} />
            </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white tracking-tight">{title}</h3>
        <h4 className="text-xs font-bold text-wec-purple/80 uppercase tracking-widest mb-4">{subtitle}</h4>
        <p className="volcanic-ash text-sm leading-relaxed max-w-sm">
            {desc}
        </p>
    </motion.div>
));

const Security = () => {
    return (
        <section id="security" className="w-full py-32 px-6 flex flex-col items-center relative overflow-hidden">

            <motion.div
                className="mb-24 text-center relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-bold tracking-tight mb-4 text-white text-bloom">Ecosistema Blindado</h2>
                <p className="volcanic-ash max-w-xl mx-auto">Nos ocupamos de la seguridad de nuestros usuarios.</p>
            </motion.div>

            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 relative">

                {/* LASER TRIPWIRE */}
                <div className="absolute top-[48px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-wec-purple/30 to-transparent hidden md:block" />

                <CitadelProtocol
                    title="Biometric KYC"
                    subtitle="Eliminación de Perfiles Falsos"
                    desc="Sabemos quién es quién. Un entorno libre de fricción verificado biométricamente para garantizar interacciones humanas reales."
                    icon={ShieldCheck}
                    delay={0.1}
                />

                <CitadelProtocol
                    title="Real-time Proof of Funds"
                    subtitle="Liquidez Verificada"
                    desc="El capital listado es real. Verificamos la solvencia de los inversores en tiempo real mediante APIs bancarias seguras."
                    icon={Lock}
                    delay={0.2}
                />

                <CitadelProtocol
                    title="Integrated Mediation"
                    subtitle="Resolución de Disputas"
                    desc="Justicia digital codificada. Mediación integrada en cada contrato inteligente para resolver conflictos sin burocracia."
                    icon={Scale}
                    delay={0.3}
                />

            </div>

        </section>
    );
};

export default memo(Security);
