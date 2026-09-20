'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import IndustrialScene from '../3d/IndustrialScene';

export default function SystemInMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const steps = [
    { title: 'RAW MATERIAL', desc: 'Sourcing the finest industrial-grade components.' },
    { title: 'ENGINEERING', desc: 'Precision CAD modeling and technical planning.' },
    { title: 'FABRICATION', desc: 'Cutting, welding, and shaping the core structure.' },
    { title: 'ASSEMBLY', desc: 'Putting together the mechanical and electronic parts.' },
    { title: 'TESTING', desc: 'Rigorous quality assurance and load testing.' },
    { title: 'DEPLOYMENT', desc: 'Installation and commissioning at the client site.' },
  ];

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <IndustrialScene className="opacity-60" showFloating={false} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pointer-events-none flex justify-between items-center w-full">
          <div className="max-w-xl w-full">
            <h2 className="font-display font-bold text-4xl text-white mb-16 tracking-wider relative">
              <span className="text-gray-600 block text-sm mb-2">THE SYSTEM</span>
              IN MOTION
              <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-white/10"></div>
              <motion.div 
                className="absolute -left-6 top-0 w-[2px] bg-[#4a50c8]"
                style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
              ></motion.div>
            </h2>
            
            <div className="relative h-40">
              {steps.map((step, index) => {
                const start = index / steps.length;
                const end = (index + 1) / steps.length;
                
                return (
                  <motion.div 
                    key={index}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={{ opacity: 0 }}
                    style={{
                      opacity: useTransform(
                        scrollYProgress,
                        [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end)],
                        [0, 1, 1, 0]
                      ),
                      y: useTransform(
                        scrollYProgress,
                        [Math.max(0, start - 0.05), start, end - 0.05, Math.min(1, end)],
                        [20, 0, 0, -20]
                      )
                    }}
                  >
                    <span className="text-[#4a50c8] font-bold text-sm tracking-[0.2em] mb-2">STEP 0{index + 1}</span>
                    <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white uppercase">{step.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="hidden lg:block w-1/3 relative h-64 border border-white/5 rounded-sm p-6 glass-panel">
            <div className="absolute top-4 right-4 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4a50c8] animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            </div>
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">Live Telemetry</div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Torque</span>
                  <span className="text-white">850 Nm</span>
                </div>
                <div className="w-full h-1 bg-white/10"><div className="w-3/4 h-full bg-white"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Velocity</span>
                  <span className="text-white">2.4 m/s</span>
                </div>
                <div className="w-full h-1 bg-white/10"><div className="w-1/2 h-full bg-[#4a50c8]"></div></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
