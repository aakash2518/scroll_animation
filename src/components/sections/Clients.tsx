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
      duration: 20,
      repeat: -1
    });
  }, []);

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-8">OUR CLIENTS</h2>
        </div>
      </div>
      
      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
        
        <div ref={marqueeRef} className="flex gap-16 px-8 items-center shrink-0">
          {/* Double the logos to create seamless loop */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
            <div key={idx} className="w-48 h-24 relative bg-white/5 border border-white/10 rounded-sm flex items-center justify-center flex-shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 p-4">
              <Image 
                src={`/images/clients/c${item}.png`} 
                alt={`Client ${item}`}
                fill
                className="object-contain p-4"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 text-center">
        <Link href="/our-clients" className="inline-block px-10 py-4 bg-[#ff4500] text-white font-bold tracking-widest text-xs hover:bg-transparent hover:text-[#ff4500] border border-[#ff4500] transition-colors rounded-sm">
          VIEW ALL CLIENTS
        </Link>
      </div>
    </section>
  );
}
