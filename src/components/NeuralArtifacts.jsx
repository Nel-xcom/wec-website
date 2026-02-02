import { motion } from 'framer-motion';

export const NeuralExchange = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
                cx="100"
                cy="100"
                r="40"
                stroke="#D5F1FF"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="4 4"
                className="svg-spin-slow"
                style={{ transformOrigin: '100px 100px' }}
            />
            <motion.path d="M60,100 A40,40 0 0,1 140,100" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }} />
            <motion.path d="M135,95 L140,100 L135,105" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, duration: 0.5 }} />
            <motion.path d="M140,100 A40,40 0 0,1 60,100" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }} />
            <motion.path d="M65,105 L60,100 L65,95" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.9, duration: 0.5 }} />
            <motion.circle cx="100" cy="100" r="10" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, type: "spring" }} />
            <g className="svg-spin-medium" style={{ transformOrigin: '100px 100px' }}>
                <circle cx="100" cy="60" r="2" fill="#D5F1FF" />
                <circle cx="100" cy="140" r="2" fill="#D5F1FF" />
            </g>
        </svg>
    </div>
);

export const BioChart = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <line x1="40" y1="160" x2="160" y2="160" stroke="#D5F1FF" strokeWidth="0.5" opacity="0.3" />
            <line x1="40" y1="40" x2="40" y2="160" stroke="#D5F1FF" strokeWidth="0.5" opacity="0.3" />
            <motion.path d="M40,160 Q80,140 100,100 T160,50" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, ease: "easeInOut" }} />
            {[0, 1, 2].map((i) => (
                <motion.circle key={i} cx={[40, 100, 160][i]} cy={[160, 100, 50][i]} r="3" fill="#D5F1FF" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.5, type: "spring" }} />
            ))}
            {[0, 1, 2].map((i) => (
                <circle
                    key={`particle-${i}`}
                    cx={40 + i * 40}
                    cy={160}
                    r="1"
                    fill="#D5F1FF"
                    className="svg-particle"
                    style={{ animationDelay: `${i * 0.8}s` }}
                />
            ))}
        </svg>
    </div>
);

export const NetworkUser = () => (
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

export const NeuralMedia = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <motion.rect x="50" y="60" width="100" height="80" rx="10" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
            <motion.path d="M90,85 L120,100 L90,115 Z" stroke="#D5F1FF" strokeWidth="1" fill="none" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: "spring" }} />
            {[0, 1, 2].map(i => (
                <line
                    key={i}
                    x1="100"
                    y1="50"
                    x2="100"
                    y2="30"
                    stroke="#D5F1FF"
                    strokeWidth="1"
                    className="svg-particle"
                    style={{
                        transformOrigin: '100px 50px',
                        transform: `rotate(${(i - 1) * 30}deg)`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: '2s'
                    }}
                />
            ))}
        </svg>
    </div>
);

export const NeuralValuation = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M100,40 L100,160 M60,160 L140,160" stroke="#D5F1FF" strokeWidth="1" opacity="0.3" />
            <line
                x1="60"
                y1="100"
                x2="140"
                y2="100"
                stroke="#D5F1FF"
                strokeWidth="1"
                className="svg-oscillate-rotate"
            />
            <circle cx="100" cy="100" r="4" fill="#D5F1FF" />
            <circle
                cx="60"
                r="15"
                stroke="#D5F1FF"
                strokeWidth="1"
                fill="none"
                className="svg-oscillate"
                style={{ cy: 120, animationDuration: '6s' }}
            >
                <animate attributeName="cy" values="120;80;120" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle
                cx="140"
                r="15"
                stroke="#D5F1FF"
                strokeWidth="1"
                fill="none"
                className="svg-oscillate"
                style={{ cy: 80, animationDuration: '6s' }}
            >
                <animate attributeName="cy" values="80;120;80" dur="6s" repeatCount="indefinite" />
            </circle>
        </svg>
    </div>
);

export const NeuralConnect = () => (
    <div className="absolute top-6 right-6 w-[160px] h-[160px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
                cx="100"
                cy="100"
                r="60"
                stroke="#D5F1FF"
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
                className="svg-spin-very-slow"
                style={{ transformOrigin: '100px 100px' }}
            />
            {[0, 90, 180, 270].map((deg, i) => (
                <g
                    key={i}
                    className="svg-spin-very-slow"
                    style={{
                        transformOrigin: '100px 100px',
                        animationDelay: `${-i * 1}s`
                    }}
                >
                    <circle cx="100" cy="40" r="2" fill="#D5F1FF" />
                    <line x1="100" y1="40" x2="100" y2="100" stroke="#D5F1FF" strokeWidth="0.5" opacity="0.5" />
                </g>
            ))}
            <circle cx="100" cy="100" r="10" fill="#D5F1FF" opacity="0.8" />
        </svg>
    </div>
);
