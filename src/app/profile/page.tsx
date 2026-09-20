'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WireframeModel from '@/components/3d/WireframeModel';

export default function ProfilePage() {
  return (
    <main className="w-full min-h-screen bg-[#050505] flex flex-col">
      {/* 3D Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ambientLight intensity={1} />
              <WireframeModel />
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center container mx-auto px-6">
          <h4 className="text-[#49769F] font-bold tracking-widest text-sm mb-4 uppercase">Excellence & Precision</h4>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white uppercase drop-shadow-2xl">
            Company Profile
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
            Built on a foundation of rigorous engineering standards and an uncompromising commitment to quality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
            <div className="p-8 border border-white/5 bg-[#0a0a0a]">
              <h3 className="text-[#49769F] font-bold text-2xl mb-4">Vision</h3>
              <p className="text-gray-500">To be the global benchmark in industrial automation and material handling.</p>
            </div>
            <div className="p-8 border border-white/5 bg-[#0a0a0a]">
              <h3 className="text-[#49769F] font-bold text-2xl mb-4">Mission</h3>
              <p className="text-gray-500">Deliver cutting-edge, reliable, and custom engineering solutions.</p>
            </div>
            <div className="p-8 border border-white/5 bg-[#0a0a0a]">
              <h3 className="text-[#49769F] font-bold text-2xl mb-4">Values</h3>
              <p className="text-gray-500">Integrity, Precision, Innovation, and Patron-centric approach.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
