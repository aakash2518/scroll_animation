'use client';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Tej Autosystem has provided me with an outstanding and pleasant experience. Tej Autosystem has always provided us with exceptional service, and there was no exception this time. The order arrived on schedule and in perfect condition.",
    name: "JAMES ANDERSON",
    role: "Project Manager, MetroBuild"
  },
  {
    text: "Tej Autosystem is a valuable asset to our industry and to my company. We know we can rely on them for everything from new products to constant product delivery, as well as trusted responses, solutions, and services.",
    name: "SARAH JENKINS",
    role: "Director of Operations"
  },
  {
    text: "Thank you for supplying Assembly Conveyor at such a high level. We also appreciate your expertise in providing after-sales support and following up quickly on maintenance concerns and system upgrades.",
    name: "MICHAEL CHANG",
    role: "Lead Engineer"
  },
  {
    text: "Tej Autosystem has exceeded my expectations. Tej Autosystem provides high-quality products. Thank you, a lot. Your staff are quite helpful.",
    name: "EMILY ROBERTSON",
    role: "Procurement Head"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(handleNext, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex]);

  // Animate on change
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-content', 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6, force3D: true,
          ease: "power3.out"
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-40 bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0077B6]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-[#0077B6]"></div>
            <h4 className="text-[#0077B6] font-bold tracking-widest text-xs uppercase">Testimonials</h4>
            <div className="w-8 h-[2px] bg-[#0077B6]"></div>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase">
            TRUSTED BY<br/>
            <span className="text-[#0077B6]">OUR CLIENTS</span>
          </h2>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative flex items-center justify-center min-h-[300px]">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev} 
            className="absolute left-0 z-20 w-12 h-12 border border-white/10 hover:border-[#0077B6] flex items-center justify-center transition-colors hidden md:flex group"
          >
            <ChevronLeft className="w-5 h-5 text-white/50 group-hover:text-[#0077B6] transition-colors" />
          </button>

          {/* Content */}
          <div className="w-full max-w-3xl text-center testimonial-content px-4 md:px-16">
            {/* Large Quote Mark */}
            <div className="flex justify-center mb-8">
              <span className="text-[#0077B6] text-8xl md:text-9xl font-serif leading-none opacity-60 select-none">&quot;</span>
            </div>
            
            <p className="text-gray-200 text-lg md:text-2xl leading-relaxed font-light mb-12">
              {testimonials[activeIndex].text}
            </p>
            
            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-[#0077B6]/20 rounded-full flex items-center justify-center border border-[#0077B6]/30">
                <span className="text-[#0077B6] font-bold text-sm">
                  {testimonials[activeIndex].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-sm tracking-widest">{testimonials[activeIndex].name}</h4>
                <span className="text-[#0077B6] text-xs tracking-widest">{testimonials[activeIndex].role}</span>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext} 
            className="absolute right-0 z-20 w-12 h-12 border border-white/10 hover:border-[#0077B6] flex items-center justify-center transition-colors hidden md:flex group"
          >
            <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-[#0077B6] transition-colors" />
          </button>
        </div>

        {/* Dots + Mobile Controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button onClick={handlePrev} className="text-white/40 hover:text-[#0077B6] md:hidden transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx 
                    ? 'w-8 h-2 bg-[#0077B6]' 
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button onClick={handleNext} className="text-white/40 hover:text-[#0077B6] md:hidden transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}


