import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

export default function CoreObject() {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
            <MeshDistortMaterial
                color="#ffffff"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0}
                metalness={0.8}
                wireframe={true}
            />
        </Sphere>
    );
}
