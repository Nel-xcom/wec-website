import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Scale } from 'lucide-react';

const CitadelProtocol = ({ title, subtitle, desc, icon: Icon, delay }) => (
    <motion.div
        className="flex flex-col items-center text-center p-6 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
        {/* ROTATING ENERGY SPHERE */}
        <div className="relative mb-8">
            <motion.div
                className="absolute inset-0 rounded-full border border-t-wec-blue/50 border-r-transparent border-b-wec-purple/50 border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute inset-[-4px] rounded-full border border-t-transparent border-r-wec-purple/30 border-b-transparent border-l-wec-blue/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.15)] relative z-10">
                <Icon size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />
            </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white tracking-tight">{title}</h3>
        <h4 className="text-xs font-bold text-wec-purple/80 uppercase tracking-widest mb-4">{subtitle}</h4>
        <p className="volcanic-ash text-sm leading-relaxed max-w-sm">
            {desc}
        </p>
    </motion.div>
);

export default function Security() {
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
}
