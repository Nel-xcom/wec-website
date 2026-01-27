import { motion } from 'framer-motion';

const sentences = [
    "Hay un tipo de persona que nunca encaja del todo.",
    "Mientras la mayoría se adapta, ellos se inquietan.",
    "No buscan aprobación. Buscan propósito.",
    "A los que no se conforman: Este es su lugar."
];

export default function Manifesto() {
    return (
        <section className="relative w-full min-h-[150vh] flex flex-col items-center justify-center py-20">

            <div className="max-w-4xl text-center px-6 space-y-32">
                {sentences.map((text, index) => (
                    <motion.h2
                        key={index}
                        className={`text-3xl md:text-5xl font-medium tracking-tight leading-tight ${index === sentences.length - 1 ? 'text-white' : 'text-white/60'}`}
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {text}
                    </motion.h2>
                ))}
            </div>

        </section>
    );
}
