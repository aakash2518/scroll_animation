'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-fade', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 1.5 } // delay for IntroLoader
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#050505]">
      {/* Background Image/Scene */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/company-image-1-min-min-1.jpg')" }}
      ></div>
      
      {/* Heavy Gradient Overlays matching the reference */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-0"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6 hero-fade opacity-0">
            <div className="w-12 h-[2px] bg-[#0077B6]"></div>
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold text-gray-300">INDUSTRIAL AUTOMATION. SOLID FUTURES.</span>
          </div>
          
          <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-[1] tracking-tight mb-6 uppercase">
            <span className="block text-white mb-2 hero-fade opacity-0">We Build</span>
            <span className="block text-[#0077B6] hero-fade opacity-0">What Matters</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-xl mb-12 hero-fade opacity-0 leading-relaxed border-l-2 border-white/10 pl-6">
            Tej Autosystem delivers end-to-end industrial automation and material handling solutions with unmatched strength, precision, and commitment.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 hero-fade opacity-0">
            <Link 
              href="#products" 
              className="px-8 py-4 bg-[#0077B6] hover:bg-[#005f8a] transition-colors font-bold tracking-widest text-xs text-white uppercase flex items-center gap-2 group"
            >
              OUR SERVICES
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link 
              href="#contact" 
              className="px-8 py-4 border border-white/20 hover:border-[#0077B6] hover:text-[#0077B6] transition-colors font-bold tracking-widest text-xs text-white uppercase flex items-center gap-2 group"
            >
              VIEW PROJECTS
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Slider Indicators (Static for visual match) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 hero-fade opacity-0">
        <div className="w-8 h-1 bg-[#0077B6]"></div>
        <div className="w-2 h-1 bg-white/20 hover:bg-white/50 cursor-pointer transition-colors"></div>
        <div className="w-2 h-1 bg-white/20 hover:bg-white/50 cursor-pointer transition-colors"></div>
      </div>
    </section>
  );
}
