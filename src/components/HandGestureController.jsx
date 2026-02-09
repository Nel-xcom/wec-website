import { useRef, useEffect, memo } from 'react';
// import { Camera } from '@mediapipe/camera_utils'; // REMOVED: Use Global
// import { Hands } from '@mediapipe/hands'; // REMOVED: Use Global
import { useGesture } from '../context/GestureContext';

const HandGestureController = () => {
    const videoRef = useRef(null);
    const {
        isActive, toggleGestureControl, setIsLoaded,
        setIsReady, setIsGrabbing,
        posX, posY,
        triggerEditorMode
    } = useGesture();

    // REFS FOR STABLE CALLBACKS
    const stateRef = useRef({
        isActive,
        setIsReady,
        setIsGrabbing,
        toggleGestureControl,
        posX,
        posY,
        triggerEditorMode,
        initialState: null,
        noHandTimeout: null
    });

    // Update refs on every render
    useEffect(() => {
        stateRef.current = {
            isActive,
            setIsReady,
            setIsGrabbing,
            toggleGestureControl,
            posX,
            posY,
            triggerEditorMode, // Update ref
            initialState: stateRef.current.initialState,
            noHandTimeout: stateRef.current.noHandTimeout
        };
    });

    useEffect(() => {
        if (!isActive) {
            // Cleanup state if manually toggled off
            setIsLoaded(false);
            if (stateRef.current.noHandTimeout) clearTimeout(stateRef.current.noHandTimeout);
            return;
        }

        if (!videoRef.current) return;

        // USA GLOBALS from CDN
        const Hands = window.Hands;
        const Camera = window.Camera;

        if (!Hands || !Camera) {
            console.error("Mediapipe globals not loaded. Check index.html scripts.");
            alert("Error: Mediapipe libraries failed to load. Please refresh.");
            return;
        }

        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 0, // Lite mode for maximum speed/lowest latency
            minDetectionConfidence: 0.4,
            minTrackingConfidence: 0.4
        });

        hands.onResults((results) => {
            const state = stateRef.current;

            // --- AUTO-SHUTDOWN LOGIC ---
            if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
                state.setIsReady(false);
                state.setIsGrabbing(false);
                state.initialRotation = null;

                // If no hand detected, start timer to shutdown
                if (!state.noHandTimeout) {
                    state.noHandTimeout = setTimeout(() => {
                        console.log("No hand detected for 8s. Shutting down.");
                        if (state.isActive) state.toggleGestureControl();
                    }, 8000);
                }
                return;
            }

            // Hand detected! Clear shutdown timer.
            if (state.noHandTimeout) {
                clearTimeout(state.noHandTimeout);
                state.noHandTimeout = null;
            }

            const landmarks = results.multiHandLandmarks[0];
            const wrist = landmarks[0];
            const indexTip = landmarks[8];
            const middleTip = landmarks[12];
            const ringTip = landmarks[16];
            const pinkyTip = landmarks[20];

            const indexPIP = landmarks[6];  // PIP joint
            const middlePIP = landmarks[10];
            const ringPIP = landmarks[14];
            const pinkyPIP = landmarks[18];

            // --- 1. DETECT OPEN PALM vs FIST (Scale Invariant) ---
            // Logic: Is the Fingertip closer to the Wrist than the PIP joint is?
            // This works regardless of hand size or distance from camera.
            const isFingerFolded = (tip, pip) => {
                const distTip = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
                const distPIP = Math.hypot(pip.x - wrist.x, pip.y - wrist.y);
                return distTip < distPIP;
            };

            const foldedCount = [
                isFingerFolded(indexTip, indexPIP),
                isFingerFolded(middleTip, middlePIP),
                isFingerFolded(ringTip, ringPIP),
                isFingerFolded(pinkyTip, pinkyPIP)
            ].filter(Boolean).length;

            // If 2 or more fingers are folded, consider it a GRAB gesture
            // (Allows for less-than-perfect fists, e.g. pointing finger might be slightly out)
            const isFist = foldedCount >= 2;

            state.setIsReady(!isFist);
            state.setIsGrabbing(isFist);

            // --- 2. ROTATION LOGIC (TRUE GEOMETRIC MAPPING) ---
            if (isFist) {
                // Calculate HAND ORIENTATION from 3D Landmark Projections
                // Pitch (Tilt Forward/Back): Relative Y/Z of Index Base vs Wrist
                // Yaw (Turn Left/Right): Relative Z of Index Base vs Pinky Base

                // Landmarks:
                // 0: Wrist
                // Determine Hand Position (using Wrist for stability)
                // Normalize X to -1 (left) to 1 (right) relative to center of screen
                // MediaPipe X: 0 (left) -> 1 (right). 
                // We want to map hand movement to screen pixels.

                const handX = wrist.x;
                const handY = wrist.y;

                if (!state.initialState) {
                    // LOCK STATE on first grab (The "Clutch")
                    state.initialState = {
                        handX: handX,
                        handY: handY,
                        elementX: state.posX.get(), // Current element position
                        elementY: state.posY.get()
                    };
                } else {
                    // CALCULATE DELTA
                    // Difference between current hand pos and grab start pos
                    const deltaXNorm = handX - state.initialState.handX;
                    const deltaYNorm = handY - state.initialState.handY;

                    // SCALE TO SCREEN PIXELS
                    // If hand moves 10% of screen width (0.1), element should move 10% of screen width?
                    // Or more? User wants "exact" feel. 
                    // Let's use a dynamic scale based on window size.
                    // Note: This runs in a loop, window.innerWidth is fine to access.
                    const screenW = window.innerWidth;
                    const screenH = window.innerHeight;

                    // Invert X because camera is mirrored? 
                    // If I move hand right (on screen), x increases.
                    // If camera is mirrored (-scale-x-100), then moving hand right in reality moves it left on screen?
                    // Typically: Hand Right -> x decreases in mirrored view?
                    // Let's assume standard mirrored interaction: Move hand right -> Cursor moves right.
                    // MediaPipe X is 0..1. 0 is left. 1 is right.
                    // In mirrored video: 0 is right, 1 is left.
                    // So delta needs inversion if we want natural movement.
                    // Let's try standard mapping first: deltaX * screenW.
                    // If it feels inverted, we flip sign.

                    // SENSITIVITY: 1:1 Mapping (No acceleration)
                    const DRAG_SENSITIVITY = 1.0;

                    // Invert X for mirrored feel (Hand moves Right -> Element moves Right)
                    // Wait, if hand moves right (in reality), on mirrored video it moves left.
                    // But if I want natural control: My hand goes right -> Object goes right.
                    // MediaPipe X logic: 0 is Left, 1 is Right.
                    // if mirror is set: 0 is Right, 1 is Left?
                    // Let's test standard first. 
                    // DeltaX is (handX - startX).

                    const pixelDeltaX = -deltaXNorm * screenW * DRAG_SENSITIVITY;
                    const pixelDeltaY = deltaYNorm * screenH * DRAG_SENSITIVITY;

                    // APPLY TO ELEMENT
                    // New Pos = Start Pos + Delta
                    const newPosX = state.initialState.elementX + pixelDeltaX;
                    const newPosY = state.initialState.elementY + pixelDeltaY;

                    state.posX.set(newPosX);
                    state.posY.set(newPosY);

                    // --- PHASE 3: FULL EXPERIENCE TRIGGER ---
                    // If dragged significantly off screen (left or right)
                    // limit: window.innerWidth / 2.5
                    if (Math.abs(newPosX) > screenW / 2.5) {
                        // DELAY TRIGGER TO PREVENT ACCIDENTAL FIRING ON START
                        if (Date.now() - (state.startTime || 0) > 1000) {
                            state.triggerEditorMode();
                        }
                    }
                }
            } else {
                // RELEASE: Dissolve clutch
                state.initialState = null;
            }
        });

        const camera = new Camera(videoRef.current, {
            onFrame: async () => {
                await hands.send({ image: videoRef.current });
            },
            width: 640,
            height: 480
        });

        // Set start time for trigger delay
        stateRef.current.startTime = Date.now();

        camera.start()
            .then(() => setIsLoaded(true))
            .catch(err => {
                console.error("Camera Init Error:", err);
                alert(`Camera Error: ${err.message || err}`);
            });

        return () => {
            camera.stop();
            hands.close();
            setIsLoaded(false);
            if (stateRef.current.noHandTimeout) clearTimeout(stateRef.current.noHandTimeout);
        };
    }, [isActive, setIsLoaded]);

    // --- RENDER ---
    // Always render the video (hidden) so the ref is available immediately when isActive becomes true.
    // USES OPACITY instead of display:none to ensuring DOM readiness.
    return (
        <div className={`fixed bottom-4 right-4 z-50 pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            {/* Hidden Video Feed for Processing */}
            <div className="block">
                <video
                    ref={videoRef}
                    className="w-32 h-24 object-cover -scale-x-100 rounded-lg border-2 border-green-500/50"
                    playsInline
                    style={{ opacity: isActive ? 1 : 0 }}
                />
            </div>
            {/* Debug Indicator */}
            {isActive && <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse" />}
        </div>
    );
};

export default memo(HandGestureController);

