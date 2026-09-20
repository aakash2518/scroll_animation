'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import FlowField from '@/components/3d/FlowField';

export default function ProductsPage() {
  return (
    <main className="w-full min-h-screen bg-[#050505] flex flex-col">
      {/* 3D Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#020202]">
          <Canvas camera={{ position: [0, 5, 10], fov: 50 }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 5]} intensity={2} color="#00B4D8" />
              <Environment preset="city" />
              <FlowField />
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 text-center container mx-auto px-6">
          <h4 className="text-[#0077B6] font-bold tracking-widest text-sm mb-4 uppercase">Our Systems</h4>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white uppercase drop-shadow-2xl">
            Featured Products
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 relative z-10 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <p className="text-gray-400 text-lg mb-16">
            We are dedicatedly engaged in manufacturing and exporting a matchless range of Assembly Conveyors to our prestigious customers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              "Assembly Belt Conveyor", "Assembly Work Stations", "Flat Belt Conveyor", 
              "Inclined Conveyor", "Roller Conveyors", "Slat Chain/ Belt Conveyor", 
              "Free Flow Chain Conveyor", "PCB Conveyors", "Aging Conveyors LED Light",
              "Aging Conveyor of LED Bulb", "LED Aging Racks", "Mesh Conveyors",
              "Truck Loader Conveyors", "Material Handling Trolleys"
            ].map((prod, i) => (
              <div key={i} className="p-6 border border-white/10 bg-white/5 rounded-sm hover:border-[#00B4D8] transition-colors group cursor-pointer">
                <span className="text-[#00B4D8] font-mono text-xs mb-2 block">{String(i+1).padStart(2, '0')}</span>
                <h3 className="text-white font-bold text-xl group-hover:text-[#00B4D8] transition-colors">{prod}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
