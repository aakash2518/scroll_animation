'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import ConveyorModel from './ConveyorModel';
import FloatingParts from './FloatingParts';

export default function IndustrialScene({
  className = "",
  showFloating = true,
  children
}: {
  className?: string,
  showFloating?: boolean,
  children?: React.ReactNode
}) {
  return (
    <div className={`w-full h-full absolute inset-0 -z-10 ${className}`}>
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 35 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <color attach="background" args={['#0a0a0a']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a50c8" />
          
          <group position={[0, -1, 0]}>
            <ConveyorModel rotation={[0, -Math.PI / 6, 0]} />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
          </group>

          {showFloating && <FloatingParts />}
          <Environment preset="city" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
