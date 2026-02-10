import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoWhite from '../assets/logos/logo-white.png';

const API_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace('/api/chat', '/api/early-access')
    : 'http://localhost:3001/api/early-access';

// --- DRAGON LINES ANIMATION ---
const DragonLines = () => {
    return (
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                {/* Line 1: Sinuous Dragon */}
                <motion.path
                    d="M-50,200 C50,100 150,300 250,200 S450,100 550,200"
                    fill="none"
                    stroke="url(#dragonGradient1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 1],
                        pathOffset: [0, 0, 1],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 0.5
                    }}
                />

                {/* Line 2: Intertwining */}
                <motion.path
                    d="M-50,250 C100,350 200,50 300,200 S500,300 600,100"
                    fill="none"
                    stroke="url(#dragonGradient2)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 1],
                        pathOffset: [0, 0, 1],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2
                    }}
                />

                {/* Line 3: Vertical flow */}
                <motion.path
                    d="M200,450 C100,350 300,250 200,150 S100,-50 200,-150"
                    fill="none"
                    stroke="url(#dragonGradient1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 1, 1],
                        pathOffset: [0, 0, 1],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 4
                    }}
                />

                <defs>
                    <linearGradient id="dragonGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D5F1FF" stopOpacity="0" />
                        <stop offset="50%" stopColor="#D5F1FF" stopOpacity="1" />
                        <stop offset="100%" stopColor="#D5F1FF" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="dragonGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFBFF6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#FFBFF6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FFBFF6" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default function EarlyAccessForm({ isOpen, onClose }) {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');
    const { language } = useLanguage();

    const t = (key) => {
        const texts = {
            es: {
                title: 'Acceso Anticipado',
                subtitle: 'Únete a la siguiente evolución.',
                firstName: 'Nombre',
                lastName: 'Apellido',
                email: 'Correo electrónico',
                submit: 'Solicitar Acceso',
                sending: 'Procesando...',
                success: 'Acceso Concedido',
                successMsg: 'Estás en la lista prioritaria.',
                error: 'Error de conexión',
                close: 'Cerrar',
                emailError: 'Correo inválido',
                required: 'Campos requeridos',
            },
            en: {
                title: 'Early Access',
                subtitle: 'Join the next evolution.',
                firstName: 'First Name',
                lastName: 'Last Name',
                email: 'Email Address',
                submit: 'Request Access',
                sending: 'Processing...',
                success: 'Access Granted',
                successMsg: 'You are on the priority list.',
                error: 'Connection Error',
                close: 'Close',
                emailError: 'Invalid email',
                required: 'Required fields',
            }
        };
        return texts[language]?.[key] || texts.es[key];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
            setErrorMsg(t('required'));
            setStatus('error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setErrorMsg(t('emailError'));
            setStatus('error');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Server error');
            }

            setStatus('success');
            setForm({ firstName: '', lastName: '', email: '' });
        } catch (err) {
            setErrorMsg(err.message || t('error'));
            setStatus('error');
        }
    };

    const handleClose = () => {
        setStatus('idle');
        setErrorMsg('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[10000]"
                    />

                    {/* MODAL CONTAINER */}
                    <div className="fixed inset-0 flex items-center justify-center z-[10001] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="relative w-[95%] md:w-full max-w-lg pointer-events-auto" // Responsive width
                        >
                            {/* MAIN CARD CONTENT */}
                            <div className="relative bg-[#030303] rounded-[2.5rem] p-1 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20">
                                {/* Inner Glass Texture */}
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-[2.5rem]" />

                                {/* DRAGON LINES ANIMATION BACKGROUND */}
                                <DragonLines />

                                <div className="relative z-10 p-6 md:p-12 flex flex-col items-center text-center">

                                    {/* CLOSE BUTTON */}
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group z-20"
                                    >
                                        <X size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                                    </button>

                                    {/* LOGO (REAL) */}
                                    <div className="mb-8">
                                        <img
                                            src={logoWhite}
                                            alt="WEC Logo"
                                            className="h-16 w-auto opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                        />
                                    </div>

                                    {/* TITLE */}
                                    <h2 className="text-3xl font-bold text-white mb-2 tracking-wide font-sans">{t('title')}</h2>
                                    <p className="text-slate-400 text-sm mb-10 font-light tracking-wide">{t('subtitle')}</p>

                                    {/* SUCCESS STATE */}
                                    {status === 'success' ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-10 flex flex-col items-center"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20">
                                                <Check size={40} className="text-green-400" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{t('success')}</h3>
                                            <p className="text-slate-400 text-sm">{t('successMsg')}</p>
                                        </motion.div>
                                    ) : (
                                        /* FORM */
                                        <form onSubmit={handleSubmit} className="w-full space-y-5">
                                            <div className="space-y-5">
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        value={form.firstName}
                                                        onChange={(e) => { setForm(f => ({ ...f, firstName: e.target.value })); setStatus('idle'); }}
                                                        placeholder={t('firstName')}
                                                        className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white text-base placeholder:text-slate-600 outline-none focus:border-white/30 focus:bg-white/10 transition-all text-center group-hover:border-white/20"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        value={form.lastName}
                                                        onChange={(e) => { setForm(f => ({ ...f, lastName: e.target.value })); setStatus('idle'); }}
                                                        placeholder={t('lastName')}
                                                        className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white text-base placeholder:text-slate-600 outline-none focus:border-white/30 focus:bg-white/10 transition-all text-center group-hover:border-white/20"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <input
                                                        type="email"
                                                        value={form.email}
                                                        onChange={(e) => { setForm(f => ({ ...f, email: e.target.value })); setStatus('idle'); }}
                                                        placeholder={t('email')}
                                                        className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white text-base placeholder:text-slate-600 outline-none focus:border-white/30 focus:bg-white/10 transition-all text-center group-hover:border-white/20"
                                                    />
                                                </div>
                                            </div>

                                            {/* ERROR MESSAGE */}
                                            {status === 'error' && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-400 text-xs text-center font-medium bg-red-500/10 py-1 px-3 rounded-full inline-block mx-auto"
                                                >
                                                    {errorMsg}
                                                </motion.p>
                                            )}

                                            {/* SUBMIT BUTTON - WHITE STYLE */}
                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className="w-full py-4 rounded-full bg-white text-black font-bold tracking-widest uppercase text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
                                            >
                                                {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                                                {status === 'loading' ? t('sending') : t('submit')}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
