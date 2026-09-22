'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

export default function Clients() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // Create an infinite marquee effect
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20, force3D: true,
      repeat: -1
    });
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-[#050505] border-t border-white/[0.04] overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-[#0077B6]/10 blur-[120px] rounded-full pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 mb-16 md:mb-20">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <span className="text-[#0077B6] font-mono text-[11px] md:text-xs tracking-[0.2em] mb-4 uppercase font-semibold flex items-center justify-center gap-3">
            <span className="w-8 md:w-12 h-[1px] bg-[#0077B6]" />
            Trusted Partners
            <span className="w-8 md:w-12 h-[1px] bg-[#0077B6]" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            OUR CLIENTS
          </h2>
        </div>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap py-4">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
        
        <div ref={marqueeRef} className="flex gap-6 md:gap-10 px-4 md:px-8 items-center shrink-0">
          {/* Double the logos to create seamless loop */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
            <div 
              key={idx} 
              className="w-48 h-24 md:w-60 md:h-32 relative bg-[#0a0a0a] border border-white/[0.04] rounded-2xl flex items-center justify-center flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:border-white/10 hover:bg-[#111] transition-all duration-500 hover:shadow-2xl hover:shadow-[#0077B6]/10 p-6 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Image 
                src={`/images/clients/c${item}.png`} 
                alt={`Client ${item}`}
                fill
                className="object-contain p-6 md:p-8 transform group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 md:mt-24 text-center relative z-10">
        <Link 
          href="/our-clients" 
          className="group relative overflow-hidden inline-flex bg-transparent text-white px-10 py-4 font-bold tracking-[0.15em] text-[11px] text-center border border-white/20 transition-all duration-300 hover:border-[#0077B6]"
        >
          <span className="relative z-10 flex items-center gap-3">
            VIEW ALL CLIENTS
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
          <div className="absolute inset-0 bg-[#0077B6] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        </Link>
      </div>
    </section>
  );
}
