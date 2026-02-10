import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
                subtitle: 'Sé de los primeros en experimentar WEC',
                firstName: 'Nombre',
                lastName: 'Apellido',
                email: 'Correo electrónico',
                submit: 'Solicitar acceso',
                sending: 'Enviando...',
                success: '¡Registro exitoso!',
                successMsg: 'Te notificaremos cuando tu acceso esté listo.',
                error: 'Error al enviar',
                close: 'Cerrar',
                emailError: 'Ingresa un correo válido',
                required: 'Todos los campos son obligatorios',
            },
            en: {
                title: 'Early Access',
                subtitle: 'Be among the first to experience WEC',
                firstName: 'First Name',
                lastName: 'Last Name',
                email: 'Email address',
                submit: 'Request access',
                sending: 'Sending...',
                success: 'Successfully registered!',
                successMsg: "We'll notify you when your access is ready.",
                error: 'Error submitting',
                close: 'Close',
                emailError: 'Enter a valid email',
                required: 'All fields are required',
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
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000]"
                    />

                    {/* MODAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-0 flex items-center justify-center z-[10001] px-4"
                    >
                        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.15)]">
                            {/* BACKGROUND */}
                            <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl" />

                            {/* GRADIENT TOP BORDER */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-wec-blue to-transparent opacity-60" />

                            {/* CONTENT */}
                            <div className="relative p-8">
                                {/* CLOSE BUTTON */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                >
                                    <X size={14} className="text-slate-400" />
                                </button>

                                {/* HEADER */}
                                <div className="text-center mb-6">
                                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-wec-blue via-purple-500 to-amber-400 flex items-center justify-center">
                                        <span className="text-2xl">🚀</span>
                                    </div>
                                    <h2 className="text-white text-xl font-bold tracking-wide">{t('title')}</h2>
                                    <p className="text-slate-400 text-sm mt-1">{t('subtitle')}</p>
                                </div>

                                {/* SUCCESS STATE */}
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-6"
                                    >
                                        <CheckCircle size={48} className="text-green-400 mx-auto mb-3" />
                                        <h3 className="text-white text-lg font-semibold">{t('success')}</h3>
                                        <p className="text-slate-400 text-sm mt-1">{t('successMsg')}</p>
                                        <button
                                            onClick={handleClose}
                                            className="mt-6 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 transition-colors"
                                        >
                                            {t('close')}
                                        </button>
                                    </motion.div>
                                ) : (
                                    /* FORM */
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={form.firstName}
                                                onChange={(e) => { setForm(f => ({ ...f, firstName: e.target.value })); setStatus('idle'); }}
                                                placeholder={t('firstName')}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-wec-blue/40 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                value={form.lastName}
                                                onChange={(e) => { setForm(f => ({ ...f, lastName: e.target.value })); setStatus('idle'); }}
                                                placeholder={t('lastName')}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-wec-blue/40 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => { setForm(f => ({ ...f, email: e.target.value })); setStatus('idle'); }}
                                                placeholder={t('email')}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-600 outline-none focus:border-wec-blue/40 transition-colors"
                                            />
                                        </div>

                                        {/* ERROR */}
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-2 text-red-400 text-xs"
                                            >
                                                <AlertCircle size={14} />
                                                <span>{errorMsg}</span>
                                            </motion.div>
                                        )}

                                        {/* SUBMIT */}
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full py-3 rounded-xl bg-gradient-to-r from-wec-blue via-purple-600 to-amber-500 text-white text-sm font-semibold tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    {t('sending')}
                                                </>
                                            ) : (
                                                t('submit')
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
