'use client';
import { useGLTF } from '@react-three/drei';

export default function TruckModel() {
  const { scene } = useGLTF('/videos/carrier_truck_renault_premium_dxi_440 (1).glb');
  
  return (
    <primitive 
      object={scene} 
      scale={0.7} 
      position={[0, -1, 0]} 
      rotation={[0, Math.PI / 2, 0]} 
    />
  );
}

useGLTF.preload('/videos/carrier_truck_renault_premium_dxi_440 (1).glb');
