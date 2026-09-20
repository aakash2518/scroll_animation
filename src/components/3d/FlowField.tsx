'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FlowField() {
  const count = 200; // number of boxes
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // initial positions and speeds
  const boxes = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 20,
        speed: 0.05 + Math.random() * 0.05
      });
    }
    return data;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    boxes.forEach((box, i) => {
      box.z += box.speed;
      if (box.z > 10) box.z = -10; // loop back
      
      dummy.position.set(box.x, box.y, box.z);
      // rotate slightly
      dummy.rotation.x += 0.01;
      dummy.rotation.y += 0.01;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.5, 0.1, 1]} />
      <meshStandardMaterial color="#0077B6" metalness={0.8} roughness={0.2} />
    </instancedMesh>
  );
}
