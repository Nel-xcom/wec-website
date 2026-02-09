import { motion } from 'framer-motion';
import { useGesture } from '../context/GestureContext';
import HandGestureController from './HandGestureController';
import Toolbar from './Toolbar';
import { Grab, Hand } from 'lucide-react';

const GestureUI = () => {
    const {
        isActive, toggleGestureControl, isReady, isGrabbing,
        mode, triggerEditorMode // Phase 3 Context
    } = useGesture();

    return (
        <>
            {/* 1. INITIAL MODE: GESTURE CONTROLS */}
            {mode === 'initial' && (
                <>
                    {/* LOGIC & CAMERA (Unmounts when mode changes -> Auto Stop) */}
                    <HandGestureController />

                    {/* TOGGLE BUTTON - NEON TUBE STYLE */}
                    <button
                        onClick={() => {
                            console.log("Toggle Clicked (Global UI)");
                            toggleGestureControl();
                        }}
                        className="fixed bottom-8 right-8 z-[9999] group cursor-pointer active:scale-95 transition-transform duration-200"
                    >
                        {/* ROTATING BORDER CONTAINER */}
                        {/* Gradient Textures: Amber (Gold), Blue, Purple, White */}
                        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#fcd34d,#3b82f6,#9333ea,#ffffff,#fcd34d)] animate-[spin_4s_linear_infinite] p-[3px] opacity-80 group-hover:opacity-100 transition-opacity">
                            {/* Inner content background to mask the center */}
                            <div className="h-full w-full rounded-full bg-black" />
                        </div>

                        {/* BUTTON CONTENT */}
                        <div className={`relative flex items-center justify-center w-32 h-24 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 transition-all duration-300
                            ${isActive ? 'bg-wec-blue/10' : 'bg-black/90'}`}
                        >
                            {isActive ? (
                                <div className="flex flex-col items-center justify-center">
                                    <span className="mb-1 relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-[9px] font-bold tracking-wider text-green-400 uppercase">On</span>
                                </div>
                            ) : (
                                <Hand size={28} className="text-white group-hover:text-amber-300 transition-colors" />
                            )}
                        </div>

                        {/* LABEL (Tooltip style or adjacent?) User asked for button styling. Let's keep label simple or hidden for cleaner look?
                            User prompt: "Boton 'Enable hand control'... debe ser mas redondo".
                            The text "Enable Hand Control" might not fit in a round button.
                            I'll use a tooltip or just the icon with status.
                        */}
                    </button>

                    {/* STATUS INDICATOR */}
                    {isActive && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="fixed bottom-28 right-8 z-[9999] flex flex-col items-end gap-2 pointer-events-none"
                        >
                            <div className={`flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md transition-all ${isReady
                                ? isGrabbing
                                    ? "bg-blue-500/20 border-blue-400 text-blue-200"
                                    : "bg-green-500/10 border-green-400/50 text-green-200"
                                : "bg-red-500/10 border-red-400/30 text-red-200"
                                }`}>
                                <span className="text-xs font-bold tracking-wider uppercase">
                                    {isReady
                                        ? isGrabbing ? "Arrastra fuera" : "Cierra el puño"
                                        : "Looking for hands..."}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </>
            )}

            {/* 2. EDITING MODE: TOOLBAR */}
            {mode === 'editing' && (
                <Toolbar />
            )}
        </>
    );
};

export default GestureUI;
