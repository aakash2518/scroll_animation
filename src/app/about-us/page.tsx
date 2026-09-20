'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import ParticleGlobe from '@/components/3d/ParticleGlobe';

export default function AboutUsPage() {
  return (
    <main className="w-full min-h-screen bg-[#050505] flex flex-col">
      {/* 3D Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <ParticleGlobe />
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center container mx-auto px-6">
          <h4 className="text-[#00B4D8] font-bold tracking-widest text-sm mb-4 uppercase">Company</h4>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white uppercase drop-shadow-2xl">
            About Us
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
            Incepted in the year 2004, Tej Autosystem Pvt. Ltd. is one of the well-known organizations indulged in the business of manufacturing and supplying a quality rich assured collection of Conveyors & Assembly Line, Industrial Workstations & Material Handling Trolley.
          </p>
          <p className="text-gray-500 font-light leading-relaxed">
            We are an excellence alert organization and deem in working with a patron centric approach. For providing rapid elucidation to our assorted patrons, we efficiently operate our sophisticated technology, tied with our skilled employees to modify our products as per our patrons’ necessities.
          </p>
        </div>
      </section>
    </main>
  );
}
