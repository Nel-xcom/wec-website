import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace('/api/chat', '/api/early-access')
    : 'http://localhost:3001/api/early-access';

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
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000]"
                    />

                    {/* MODAL CONTAINER */}
                    <div className="fixed inset-0 flex items-center justify-center z-[10001] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-md pointer-events-auto"
                        >
                            {/* ROTATING BORDER GLOW (The "AI Style" signature) */}
                            <div className="absolute -inset-[2px] rounded-[2.5rem] bg-[conic-gradient(from_0deg,#fcd34d,#3b82f6,#9333ea,#ffffff,#fcd34d)] animate-[spin_4s_linear_infinite] opacity-60 blur-sm" />

                            {/* MAIN CARD CONTENT */}
                            <div className="relative bg-[#0a0a0a] rounded-[2.5rem] p-1 overflow-hidden shadow-2xl">
                                {/* Inner Glass Texture */}
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-[2.5rem]" />

                                <div className="relative bg-black/80 rounded-[2.3rem] p-8 md:p-10 flex flex-col items-center text-center">

                                    {/* CLOSE BUTTON */}
                                    <button
                                        onClick={handleClose}
                                        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
                                    >
                                        <X size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                                    </button>

                                    {/* HEADER ICON */}
                                    <div className="mb-6 relative">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wec-blue via-purple-500 to-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                            <Sparkles size={28} className="text-white" />
                                        </div>
                                        {/* Orbiting Ring */}
                                        <div className="absolute inset-[-10px] border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                                    </div>

                                    {/* TITLE */}
                                    <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">{t('title')}</h2>
                                    <p className="text-slate-400 text-sm mb-8 font-light tracking-wide">{t('subtitle')}</p>

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
                                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                                            <div className="space-y-4">
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        value={form.firstName}
                                                        onChange={(e) => { setForm(f => ({ ...f, firstName: e.target.value })); setStatus('idle'); }}
                                                        placeholder={t('firstName')}
                                                        className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-wec-blue/50 focus:bg-white/10 transition-all text-center group-hover:border-white/20"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        value={form.lastName}
                                                        onChange={(e) => { setForm(f => ({ ...f, lastName: e.target.value })); setStatus('idle'); }}
                                                        placeholder={t('lastName')}
                                                        className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-wec-blue/50 focus:bg-white/10 transition-all text-center group-hover:border-white/20"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <input
                                                        type="email"
                                                        value={form.email}
                                                        onChange={(e) => { setForm(f => ({ ...f, email: e.target.value })); setStatus('idle'); }}
                                                        placeholder={t('email')}
                                                        className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-wec-blue/50 focus:bg-white/10 transition-all text-center group-hover:border-white/20"
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

                                            {/* SUBMIT BUTTON */}
                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className="w-full py-4 rounded-full bg-gradient-to-r from-wec-blue via-purple-600 to-amber-500 text-white font-bold tracking-widest uppercase text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
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
