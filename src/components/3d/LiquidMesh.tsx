'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function LiquidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom simple vertex displacement shader approach
  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry;
      const positions = geometry.attributes.position;
      
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        // Simple wave math based on X and Y and time
        const z = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.5 + time * 0.8) * 0.5;
        positions.setZ(i, z);
      }
      
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[30, 30, 64, 64]} />
      <meshStandardMaterial 
        color="#0a0a0a" 
        metalness={0.9} 
        roughness={0.3} 
        wireframe={false} 
      />
    </mesh>
  );
}
