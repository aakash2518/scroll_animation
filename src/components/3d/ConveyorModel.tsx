'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ConveyorModel(props: any) {
  const groupRef = useRef<THREE.Group>(null);
  const beltRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating/movement
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Main Frame */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 0.2, 2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Rollers */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[-4.75 + i * 0.5, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 1.8, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Belt */}
      <mesh ref={beltRef} position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[9.8, 0.05, 1.9]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      
      {/* Details/Accents */}
      <mesh position={[0, -0.5, 1.01]}>
        <boxGeometry args={[10, 0.05, 0.05]} />
        <meshStandardMaterial color="#0A4174" emissive="#0A4174" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Frame Legs */}
      <mesh position={[-4, -1.5, 0.8]} castShadow>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[4, -1.5, 0.8]} castShadow>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-4, -1.5, -0.8]} castShadow>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[4, -1.5, -0.8]} castShadow>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
