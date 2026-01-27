import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Line } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const NeuralNetwork = (props) => {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 3 })); // Larger radius

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 20;
        ref.current.rotation.y -= delta / 30;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#D5F1FF"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.15}
                />
            </Points>
        </group>
    );
};

const CoreMesh = ({ scale = 1, position = [0, 0, 0], opacity = 1, distort = 0.4, color = "#FFBFF6" }) => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.5;
    });

    return (
        <Sphere args={[1, 32, 32]} ref={meshRef} scale={scale} position={position}>
            <MeshDistortMaterial
                color={color}
                wireframe
                distort={distort}
                speed={2}
                roughness={0}
                transparent
                opacity={opacity}
            />
        </Sphere>
    )
}

// 11 NODES DISTRIBUTED LAYOUT
// Node 0: Center (The Core)
// Nodes 1-5: Left Wing (Sequential outwards)
// Nodes 6-10: Right Wing (Sequential outwards)
const NODES_DATA = [
    // --- CENTER CORE ---
    { id: 0, pos: [0, 0, 0], scale: 1.2, parent: null, delay: 0 },

    // --- LEFT WING ---
    { id: 1, pos: [-2.5, 0.5, 0], scale: 0.6, parent: 0, delay: 0.5 },
    { id: 2, pos: [-4.5, 1.5, 0], scale: 0.5, parent: 1, delay: 1.0 },
    { id: 3, pos: [-6.0, -0.5, 0], scale: 0.4, parent: 2, delay: 1.5 },
    { id: 4, pos: [-7.5, 2.0, 0], scale: 0.35, parent: 3, delay: 2.0 },
    { id: 5, pos: [-8.5, -2.0, 0], scale: 0.3, parent: 3, delay: 2.5 },

    // --- RIGHT WING ---
    { id: 6, pos: [2.5, -0.5, 0], scale: 0.6, parent: 0, delay: 0.5 },
    { id: 7, pos: [4.5, -1.5, 0], scale: 0.5, parent: 6, delay: 1.0 },
    { id: 8, pos: [6.0, 0.5, 0], scale: 0.4, parent: 7, delay: 1.5 },
    { id: 9, pos: [7.5, -2.0, 0], scale: 0.35, parent: 8, delay: 2.0 },
    { id: 10, pos: [8.5, 2.0, 0], scale: 0.3, parent: 8, delay: 2.5 },
];

const ElectricLine = ({ start, end, opacity }) => {
    return (
        <Line
            points={[start, end]}
            color="#D5F1FF"
            lineWidth={1}
            transparent
            opacity={opacity * 0.4}
            dashed={true}
            dashScale={10}
            dashSize={0.5}
            gapSize={0.2}
        />
    );
};

const DistributedNetworkScene = () => {
    const [elapsed, setElapsed] = useState(0);

    useFrame((state, delta) => {
        // Continuous time for animations
        setElapsed(state.clock.elapsedTime);
    });

    return (
        <group position={[0, 0, 0]}>
            {NODES_DATA.map((node, i) => {
                // Animation Logic:
                // Nodes appear sequentially based on 'delay'.
                // Loop of 8 seconds

                const cycleTime = elapsed % 12; // 12 second loop for slower pace
                const isVisible = cycleTime > node.delay;

                // Fade in quickly
                const fadeProgress = isVisible ? Math.min(1, (cycleTime - node.delay) * 2) : 0;

                // Reset fade out at end of cycle
                const fadeOut = cycleTime > 11 ? (12 - cycleTime) : 1;
                const finalOpacity = (fadeProgress * fadeOut) * 0.4; // Max opacity 0.4

                // Scale pop effect
                const currentScale = node.scale * finalOpacity;

                if (finalOpacity <= 0.01) return null;

                return (
                    <group key={i}>
                        <CoreMesh
                            position={node.pos}
                            scale={currentScale}
                            opacity={finalOpacity}
                            color={node.id === 0 ? "#FFBFF6" : "#D5F1FF"}
                            distort={0.3 + (node.id * 0.05)}
                        />

                        {/* Connecting Line to Parent */}
                        {node.parent !== null && (
                            <ElectricLine
                                start={NODES_DATA[node.parent].pos}
                                end={node.pos}
                                opacity={finalOpacity}
                            />
                        )}
                    </group>
                );
            })}

            <NeuralNetwork />
        </group>
    );
};

export default function ThreeBrain() {
    return (
        <div className="w-full h-full relative z-0">
            {/* Wide Camera to capture -8 to +8 range. Adjusted Z for better fit. */}
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#D5F1FF" />
                <DistributedNetworkScene />
            </Canvas>
        </div>
    );
}
