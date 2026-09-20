'use client';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export default function FloatingParts() {
  const group = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const s = Math.random() * 0.1 + 0.02;
      temp.push({ position: [x, y, z], scale: s });
    }
    return temp;
  }, []);

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <mesh position={p.position as [number, number, number]} scale={p.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#555" metalness={1} roughness={0.2} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
