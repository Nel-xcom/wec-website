import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, Layout, MousePointer2, Box, Circle, Hexagon, Type, Palette, Maximize2, Trash2, Triangle, Diamond } from 'lucide-react';
import { useGesture } from '../context/GestureContext';

const Toolbar = () => {
    const {
        isToolbarVisible, setIsToolbarVisible,
        addedObjects, setAddedObjects,
        backgroundTheme, setBackgroundTheme,
        editorTime, setEditorTime,
        setMode,
        // Phase 4 Props
        navbarColor, setNavbarColor,
        titleColor, setTitleColor,
        selectedObjectId, setSelectedObjectId,
        updateObject
    } = useGesture();

    const [showShapesMenu, setShowShapesMenu] = useState(false);
    const [showColorMenu, setShowColorMenu] = useState(false);

    // Get selected object details
    const selectedObject = addedObjects.find(obj => obj.id === selectedObjectId);

    // Timer Logic
    useEffect(() => {
        let interval;
        if (editorTime > 0) {
            interval = setInterval(() => {
                setEditorTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setMode('revealing');
                        setIsToolbarVisible(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [editorTime, setEditorTime, setMode, setIsToolbarVisible]);

    const addObject = (category, subtype) => {
        const id = Date.now();
        // Spawning slightly randomized near center
        const x = 50 + (Math.random() * 10 - 5);
        const y = 40 + (Math.random() * 10 - 5); // Higher up

        const newObj = { id, x, y, category, subtype, scale: 1 };
        setAddedObjects(prev => [...prev, newObj]);
        setSelectedObjectId(id); // Auto-select new object
        setShowShapesMenu(false);
    };

    const deleteSelected = () => {
        if (selectedObjectId) {
            setAddedObjects(prev => prev.filter(obj => obj.id !== selectedObjectId));
            setSelectedObjectId(null);
        }
    };

    return (
        <AnimatePresence>
            {isToolbarVisible && (
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 p-5 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl w-72 max-h-[80vh] overflow-y-auto custom-scrollbar"
                >
                    {/* TIMER */}
                    <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 text-red-400">
                            <Clock size={20} className={editorTime < 10 ? "animate-pulse" : ""} />
                            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
                                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeDasharray={113}
                                    strokeDashoffset={113 - (113 * editorTime) / 30}
                                    className="transition-all duration-1000 ease-linear"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Remaining Time</span>
                            <span className="text-xl font-mono font-bold text-white leading-none">00:{editorTime.toString().padStart(2, '0')}</span>
                        </div>
                    </div>

                    {/* TEXT COLORS */}
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Text Colors</span>
                        <div className="bg-white/5 p-3 rounded-xl flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-300">Navbar</span>
                                <input
                                    type="color"
                                    value={navbarColor}
                                    onChange={(e) => setNavbarColor(e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer bg-transparent"
                                />
                            </div>
                            <div className="w-full h-px bg-white/10" />
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-300">Title</span>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="color"
                                            value={titleColor === 'gradient' ? '#ffffff' : titleColor}
                                            onChange={(e) => setTitleColor(e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer bg-transparent"
                                        />
                                    </div>
                                </div>
                                {/* Presets */}
                                <div className="flex gap-1 justify-between pt-1">
                                    {['#ffffff', '#fbbf24', '#22d3ee', '#c084fc', '#f87171', '#60a5fa'].map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setTitleColor(color)}
                                            className="w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-white"
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => setTitleColor('gradient')}
                                    className={`mt-1 text-[10px] w-full py-1.5 rounded border transition-colors ${titleColor === 'gradient' ? 'bg-white text-black border-white' : 'border-white/20 text-slate-400 hover:border-white hover:text-white'}`}
                                >
                                    Reset to Gradient
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* OBJECT ACTIONS */}
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Add Elements</span>

                        {/* NEURAL SHAPES TOGGLE */}
                        <button
                            onClick={() => setShowShapesMenu(!showShapesMenu)}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all active:scale-95
                                ${showShapesMenu ? 'bg-wec-blue/20 border-wec-blue text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'}`}
                        >
                            <span className="text-sm font-medium">Add Neural Shape</span>
                            <Hexagon size={18} />
                        </button>

                        {/* SHAPES POPOVER */}
                        <AnimatePresence>
                            {showShapesMenu && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden flex flex-col gap-2 pl-2"
                                >
                                    {[
                                        { id: 'exchange', label: 'Neural Ring', icon: Circle, color: 'text-purple-400' },
                                        { id: 'media', label: 'Data Node', icon: Box, color: 'text-blue-400' },
                                        { id: 'connect', label: 'Graph Net', icon: Layout, color: 'text-amber-400' },
                                        { id: 'triangle', label: 'Flux Triad', icon: Triangle, color: 'text-emerald-400' },
                                        { id: 'diamond', label: 'Prism Core', icon: Diamond, color: 'text-rose-400' },
                                    ].map((shape) => (
                                        <button
                                            key={shape.id}
                                            onClick={() => addObject('neural', shape.id)}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                                        >
                                            <shape.icon size={14} className={shape.color} />
                                            <span className="text-xs font-bold text-slate-300">{shape.label}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* LIGHT BUTTON */}
                        <button
                            onClick={() => addObject('light', 'violet')}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                        >
                            <span className="text-sm font-medium text-slate-200">Add Spot Light</span>
                            <Plus size={18} className="text-violet-400" />
                        </button>
                    </div>

                    {/* SELECTED OBJECT PROPERTIES */}
                    {
                        selectedObject && (
                            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-wec-blue font-bold uppercase tracking-wider">Selected: {selectedObject.category === 'neural' ? 'Shape' : 'Light'}</span>
                                    <button onClick={deleteSelected} className="text-red-400 hover:text-red-300 p-1">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                                    <Maximize2 size={16} className="text-slate-400" />
                                    <div className="flex flex-col flex-1 gap-1">
                                        <div className="flex justify-between text-xs text-slate-400">
                                            <span>Size</span>
                                            <span>{(selectedObject.scale || 1).toFixed(1)}x</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="3"
                                            step="0.1"
                                            value={selectedObject.scale || 1}
                                            onChange={(e) => updateObject(selectedObject.id, { scale: parseFloat(e.target.value) })}
                                            className="w-full accent-wec-blue h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* BACKGROUNDS (Mini) */}
                    <div className="flex gap-2 pt-2">
                        {['black', 'dark_gray', 'deep_blue'].map(bg => (
                            <button
                                key={bg}
                                onClick={() => setBackgroundTheme(bg)}
                                className={`h-8 flex-1 rounded-lg border transition-all ${backgroundTheme === bg ? 'border-white bg-white/20' : 'border-white/10 bg-transparent'}`}
                                title={bg}
                            />
                        ))}
                    </div>
                </motion.div >
            )}
        </AnimatePresence >
    );
};

export default Toolbar;
