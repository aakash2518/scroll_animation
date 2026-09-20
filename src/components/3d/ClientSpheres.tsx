'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ClientSpheres() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 50;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // initial positions and speeds
  const spheres = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10,
        factor: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.01 + 0.005,
        t: Math.random() * 100
      });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    spheres.forEach((sphere, i) => {
      let t = (sphere.t += sphere.speed);
      
      dummy.position.set(
        sphere.x + Math.cos(t) * sphere.factor * 3,
        sphere.y + Math.sin(t) * sphere.factor * 3,
        sphere.z + Math.cos(t) * sphere.factor * 3
      );
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshPhysicalMaterial 
        color="#ffffff" 
        metalness={1} 
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </instancedMesh>
  );
}
