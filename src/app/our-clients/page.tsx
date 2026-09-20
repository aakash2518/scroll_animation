'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import ClientSpheres from '@/components/3d/ClientSpheres';
import Image from 'next/image';

export default function OurClientsPage() {
  return (
    <main className="w-full min-h-screen bg-[#050505] flex flex-col">
      {/* 3D Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
              <directionalLight position={[-10, -10, 10]} intensity={2} color="#4a50c8" />
              <Environment preset="city" />
              <ClientSpheres />
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center container mx-auto px-6">
          <h4 className="text-[#4a50c8] font-bold tracking-widest text-sm mb-4 uppercase">Partners</h4>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white uppercase drop-shadow-2xl">
            Our Clients
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
              <div key={idx} className="aspect-video relative bg-white/5 border border-white/10 rounded-sm flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 p-8">
                <Image 
                  src={`/images/clients/c${item}.png`} 
                  alt={`Client ${item}`}
                  fill
                  className="object-contain p-6"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
