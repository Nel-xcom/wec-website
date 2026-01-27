import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import CoreObject from './CoreObject';
import { Suspense } from 'react';

export default function Experience() {
    return (
        <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <color attach="background" args={['#0F0F0F']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#D5F1FF" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFBFF6" />

                <Suspense fallback={null}>
                    <CoreObject />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Suspense>

                {/* <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} /> */}
            </Canvas>
        </div>
    );
}
