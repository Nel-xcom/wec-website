import { createContext, useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useMotionValue } from 'framer-motion';

const GestureContext = createContext(null);

export const GestureProvider = ({ children }) => {
    // MediaPipe State
    const [isLoaded, setIsLoaded] = useState(false);
    const [isActive, setIsActive] = useState(false); // User enabled it
    const [isReady, setIsReady] = useState(false); // Hand detected & open
    const [isGrabbing, setIsGrabbing] = useState(false); // Fist closed

    // Motion Values for direct DOM manipulation (High Performance)
    // Motion Values are stable objects, so they don't cause re-renders.
    const posX = useRef(useMotionValue(0)).current;
    const posY = useRef(useMotionValue(0)).current;

    // --- PHASE 3: FULL EXPERIENCE STATE ---
    const [mode, setMode] = useState('initial'); // 'initial', 'editing', 'revealing', 'final'
    const [editorTime, setEditorTime] = useState(30); // 30 seconds countdown (User Request)

    // --- PHASE 2: Toolbar & Customization State (Legacy/Compatible) ---
    // isToolbarVisible is now derived from mode === 'editing' effectively, but we keep it for now or sync it.
    const [isToolbarVisible, setIsToolbarVisible] = useState(false);
    const [backgroundTheme, setBackgroundTheme] = useState('black'); // RESTORED DEFAULT: Black
    const [addedObjects, setAddedObjects] = useState([]); // Array of distinct light objects
    const [timer, setTimer] = useState(120); // Legacy timer (will preserve for now but use editorTime)

    // --- PHASE 4: REFINEMENT STATE ---
    const [navbarColor, setNavbarColor] = useState('#ffffff'); // White default
    const [titleColor, setTitleColor] = useState('#ffffff'); // Default: White (Security Style), was 'gradient'
    const [selectedObjectId, setSelectedObjectId] = useState(null); // For resizing/deleting

    const toggleGestureControl = useCallback(() => {
        setIsActive(prev => !prev);
    }, []);

    const triggerEditorMode = useCallback(() => {
        setIsActive(false); // Turn off camera
        setMode('editing');
        setIsToolbarVisible(true);
        setEditorTime(60); // Reset to 60s
        // setBackgroundTheme('dark_gray'); // REMOVED: Keep user preference
    }, []);

    // Helper to update specific object
    const updateObject = useCallback((id, updates) => {
        setAddedObjects(prev => prev.map(obj =>
            obj.id === id ? { ...obj, ...updates } : obj
        ));
    }, []);

    // Memoize the context value to prevent consumers from re-rendering unless state changes
    const value = useMemo(() => ({
        isLoaded, setIsLoaded,
        isActive, toggleGestureControl,
        isReady, setIsReady,
        isGrabbing, setIsGrabbing,
        posX, posY,
        isToolbarVisible, setIsToolbarVisible,
        backgroundTheme, setBackgroundTheme,
        addedObjects, setAddedObjects,
        timer, setTimer,
        // New Phase 3 Props
        mode, setMode,
        editorTime, setEditorTime,
        triggerEditorMode,
        // Phase 4 Props
        navbarColor, setNavbarColor,
        titleColor, setTitleColor,
        selectedObjectId, setSelectedObjectId,
        updateObject
    }), [isLoaded, isActive, isReady, isGrabbing, toggleGestureControl, posX, posY, isToolbarVisible, backgroundTheme, addedObjects, timer, mode, editorTime, triggerEditorMode, navbarColor, titleColor, selectedObjectId, updateObject]);

    return (
        <GestureContext.Provider value={value}>
            {children}
        </GestureContext.Provider>
    );
};

export const useGesture = () => {
    const context = useContext(GestureContext);
    if (!context) throw new Error("useGesture must be used within a GestureProvider");
    return context;
};
