'use client';
import MagneticButton from '../ui/MagneticButton';
import IndustrialScene from '../3d/IndustrialScene';

export default function FinalCTA() {
  return (
    <section className="relative py-40 bg-[#0a0a0a] overflow-hidden">
      <IndustrialScene className="opacity-30" showFloating={false} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#050505]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display font-bold text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight mb-8">
            <span className="block text-gray-500">LET'S BUILD</span>
            <span className="block text-white">WHAT MOVES</span>
            <span className="block text-[#0A4174]">INDUSTRY.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">
            Tell us what you need. Our team will help engineer the right solution.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <MagneticButton href="#contact" className="px-10 py-5 font-bold tracking-widest text-sm">
              REQUEST A QUOTE
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline" className="px-10 py-5 font-bold tracking-widest text-sm">
              CONTACT US
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
