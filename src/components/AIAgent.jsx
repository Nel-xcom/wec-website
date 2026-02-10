import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/chat';

// Generate a unique session ID
const getSessionId = () => {
    let id = sessionStorage.getItem('wec-chat-session');
    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem('wec-chat-session', id);
    }
    return id;
};

// Format markdown-like text to simple HTML
const formatMessage = (text) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 rounded text-xs">$1</code>')
        .replace(/\n/g, '<br/>');
};

export default function AIAgent() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasGreeted, setHasGreeted] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const { language } = useLanguage();

    // Auto-scroll to bottom
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Add greeting when opened for first time
    useEffect(() => {
        if (isOpen && !hasGreeted) {
            setHasGreeted(true);
            const greeting = language === 'es'
                ? '¡Hola! 👋 Soy el asistente de WEC. Puedo ayudarte con cualquier pregunta sobre el Centro Mundial de Emprendedores, nuestro ecosistema, seguridad, o cómo obtener acceso anticipado. ¿En qué puedo ayudarte?'
                : 'Hello! 👋 I\'m the WEC assistant. I can help you with any questions about the World Entrepreneurs Centre, our ecosystem, security, or how to get early access. How can I help you?';
            setMessages([{ role: 'ai', text: greeting }]);
        }
    }, [isOpen, hasGreeted, language]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMsg = { role: 'user', text: trimmed };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: trimmed,
                    sessionId: getSessionId(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 429 && data.waitSeconds) {
                    const waitMsg = language === 'es'
                        ? `⏳ Estoy procesando muchas consultas. Intenta de nuevo en ${data.waitSeconds} segundos.`
                        : `⏳ Processing many queries. Please try again in ${data.waitSeconds} seconds.`;
                    setMessages(prev => [...prev, { role: 'ai', text: waitMsg }]);
                } else {
                    throw new Error('API error');
                }
            } else {
                setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
            }
        } catch (err) {
            const errorText = language === 'es'
                ? 'Lo siento, hubo un error de conexión. Verificá que el servidor esté corriendo. 🔄'
                : 'Sorry, there was a connection error. Make sure the server is running. 🔄';
            setMessages(prev => [...prev, { role: 'ai', text: errorText }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* FLOATING BUTTON - Bottom Left */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-8 left-8 z-[9998] group cursor-pointer active:scale-95 transition-transform duration-200"
                        aria-label="Open AI Assistant"
                    >
                        {/* ROTATING BORDER (matches hand gesture button) */}
                        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#fcd34d,#3b82f6,#9333ea,#ffffff,#fcd34d)] animate-[spin_4s_linear_infinite] p-[3px] opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="h-full w-full rounded-full bg-black" />
                        </div>

                        {/* BUTTON CONTENT */}
                        <div className="relative flex items-center justify-center w-20 h-14 md:w-32 md:h-24 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:bg-wec-blue/10">
                            <Sparkles size={20} className="md:hidden text-white group-hover:text-amber-300 transition-colors" />
                            <Sparkles size={28} className="hidden md:block text-white group-hover:text-amber-300 transition-colors" />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* CHAT PANEL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-6 left-6 z-[9999] w-[380px] h-[560px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-48px)] flex flex-col rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
                    >
                        {/* GLASSMORPHIC BACKGROUND */}
                        <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl" />

                        {/* HEADER */}
                        <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-wec-blue via-purple-500 to-amber-400 flex items-center justify-center">
                                        <Sparkles size={16} className="text-white" />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
                                </div>
                                <div>
                                    <h3 className="text-white text-sm font-bold tracking-wide">Rick AI Agent</h3>
                                    <p className="text-[10px] text-green-400 font-mono uppercase tracking-widest">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                                <X size={14} className="text-slate-400" />
                            </button>
                        </div>

                        {/* MESSAGES */}
                        <div className="relative flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-wec-blue to-purple-600 text-white rounded-br-md'
                                            : 'bg-white/5 text-slate-300 border border-white/5 rounded-bl-md'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                                    />
                                </motion.div>
                            ))}

                            {/* TYPING INDICATOR */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-wec-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* INPUT AREA */}
                        <div className="relative px-4 py-3 border-t border-white/5">
                            <div className="flex items-center gap-2 bg-white/5 rounded-2xl px-4 py-2 border border-white/5 focus-within:border-wec-blue/30 transition-colors">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                                    className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-600 outline-none"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="w-8 h-8 rounded-full bg-gradient-to-r from-wec-blue to-purple-600 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                                >
                                    {isLoading ? (
                                        <Loader2 size={14} className="text-white animate-spin" />
                                    ) : (
                                        <Send size={14} className="text-white" />
                                    )}
                                </button>
                            </div>
                            <p className="text-[9px] text-slate-600 text-center mt-2 font-mono">
                                Powered by WEC AI · {language === 'es' ? 'Tu información es privada' : 'Your information is private'}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
