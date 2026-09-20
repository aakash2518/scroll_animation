'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../ui/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

export default function Infrastructure() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo('.parallax-bg', 
      { yPercent: -20 },
      {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true
        }
      }
    );
  }, []);

  const facilities = [
    { name: 'MANUFACTURING', id: '01' },
    { name: 'R&D', id: '02' },
    { name: 'QUALITY & TESTING', id: '03' },
    { name: 'ENGINEERING', id: '04' }
  ];

  return (
    <section ref={sectionRef} id="infrastructure" className="relative h-[80vh] min-h-[600px] overflow-hidden bg-[#050505] flex items-center border-t border-white/5">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="parallax-bg absolute -inset-[20%] bg-[#0a0a0a] z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4a50c8] rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-[150px] opacity-5"></div>
          
          {/* Abstract structural lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="20%" x2="100%" y2="80%" stroke="white" strokeWidth="1" />
            <line x1="0" y1="80%" x2="100%" y2="20%" stroke="white" strokeWidth="1" />
            <circle cx="50%" cy="50%" r="20%" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText 
            as="h2"
            text="WHERE ENGINEERING TAKES SHAPE."
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-16 text-white"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {facilities.map((fac, i) => (
              <div key={i} className="glass-panel p-6 md:p-8 border border-white/10 rounded-sm hover:border-[#4a50c8]/50 transition-colors duration-300 group cursor-default relative overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-[#4a50c8]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="text-[#4a50c8] font-mono text-xs tracking-widest mb-4 block relative z-10">{fac.id}</span>
                <h4 className="font-bold text-white text-sm md:text-base tracking-wider relative z-10">{fac.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
