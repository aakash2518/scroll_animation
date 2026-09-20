'use client';
import { useRef } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EngineModel({ visible }: { visible: boolean }) {
  // Load the GLTF file
  const { scene } = useGLTF('/videos/sbc_v8_engine.glb');
  const groupRef = useRef<THREE.Group>(null);
  
  // Base scale of the engine (you can adjust this if it's too big/small)
  const baseScale = 0.02; 
  const targetScale = visible ? baseScale : 0;
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous smooth rotation
      groupRef.current.rotation.y += delta * 0.3;
      
      // Smoothly animate scale in and out based on scroll visibility
      const currentScale = groupRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
      
      // Don't waste render scaling if it's already essentially 0
      if (newScale > 0.001 || targetScale > 0) {
        groupRef.current.scale.set(newScale, newScale, newScale);
      }
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// Preload the model so there's no lag when it appears
useGLTF.preload('/videos/sbc_v8_engine.glb');
