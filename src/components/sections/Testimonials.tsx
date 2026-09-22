'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
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
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const DURATION = 6000; // ms per slide
  const TICK = 50; // progress update interval

  const resetAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min(elapsed / DURATION, 1));
    }, TICK);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Start autoplay
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeIndex, resetAutoplay]);

  // Animate on index change
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-content', 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          force3D: true,
          ease: "power3.out"
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 lg:py-40 bg-[#050505] overflow-hidden" aria-label="Client testimonials">
      <div className="section-divider absolute top-0 left-0 w-full" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-[#0077B6]" />
            <span className="text-[#0077B6] font-semibold tracking-[0.2em] text-[10px] uppercase">Testimonials</span>
            <div className="w-8 h-[1px] bg-[#0077B6]" />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white uppercase">
            Trusted By<br/>
            <span className="text-[#0077B6]">Our Clients</span>
          </h2>
        </div>
        
        {/* Carousel */}
        <div className="relative flex items-center justify-center min-h-[280px]">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev} 
            className="absolute left-0 z-20 w-11 h-11 border border-white/10 hover:border-[#0077B6] hidden md:flex items-center justify-center transition-colors duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-white/40 group-hover:text-[#0077B6] transition-colors" />
          </button>

          {/* Content */}
          <div className="w-full max-w-3xl text-center testimonial-content px-4 md:px-16">
            {/* Quote */}
            <div className="flex justify-center mb-6">
              <span className="text-[#0077B6]/40 text-7xl md:text-8xl font-serif leading-none select-none">&quot;</span>
            </div>
            
            <p className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed font-light mb-10">
              {testimonials[activeIndex].text}
            </p>
            
            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 bg-[#0077B6]/15 rounded-full flex items-center justify-center border border-[#0077B6]/20">
                <span className="text-[#0077B6] font-bold text-sm">
                  {testimonials[activeIndex].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-xs tracking-[0.15em]">{testimonials[activeIndex].name}</h4>
                <span className="text-[#0077B6]/60 text-[10px] tracking-[0.15em]">{testimonials[activeIndex].role}</span>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext} 
            className="absolute right-0 z-20 w-11 h-11 border border-white/10 hover:border-[#0077B6] hidden md:flex items-center justify-center transition-colors duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-[#0077B6] transition-colors" />
          </button>
        </div>

        {/* Dots + Progress */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={handlePrev} className="text-white/30 hover:text-[#0077B6] md:hidden transition-colors" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveIndex(idx)}
                className="relative overflow-hidden rounded-full transition-all duration-300"
                style={{ width: activeIndex === idx ? '2rem' : '0.5rem', height: '0.5rem' }}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-current={activeIndex === idx ? 'true' : undefined}
              >
                <div className={`absolute inset-0 rounded-full ${activeIndex === idx ? 'bg-[#0077B6]/30' : 'bg-white/15'}`} />
                {activeIndex === idx && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-[#0077B6] rounded-full transition-none"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          <button onClick={handleNext} className="text-white/30 hover:text-[#0077B6] md:hidden transition-colors" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
