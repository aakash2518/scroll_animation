'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WireframeModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central complex geometry */}
      <mesh>
        <torusKnotGeometry args={[1.5, 0.4, 128, 16]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Outer framing */}
      <mesh>
        <icosahedronGeometry args={[3, 1]} />
        <meshStandardMaterial color="#ff4500" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
