'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function IndustrialHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current || !textRef.current || !overlayRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Enforce video autoplay
    videoRef.current.muted = true;
    videoRef.current.defaultMuted = true;
    videoRef.current.play().catch(() => {});

    if (prefersReducedMotion) {
      // Just show everything immediately
      gsap.set('.hero-line', { y: 0, clipPath: 'inset(0 0 0 0)' });
      gsap.set('.hero-fade', { opacity: 1, y: 0 });
      return;
    }

    // Removed entrance animations so the page starts fully visible as requested when the video intro ends.

    // Scroll animations
    const ctx = gsap.context(() => {
      // Premium overlapping scroll effect
      gsap.to(containerRef.current, {
        scale: 0.95,
        opacity: 0.5,
        filter: 'blur(10px)',
        transformOrigin: 'top center',
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: false // Allows the next section to scroll perfectly over it
        }
      });

      // Subtle parallax for text inside while pinning
      gsap.to(textRef.current, {
        y: 100, // Move down slightly within the pinned container
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Fade out bottom elements
      gsap.to('.scroll-indicator', {
        opacity: 0,
        y: -10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-0 w-full h-[100svh] md:h-screen overflow-hidden bg-black" aria-label="Hero section">
      {/* Video background */}
      <video
        ref={videoRef}
        src="/videos/hero-bg.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform origin-center"
      />
      
      {/* Cinematic overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0a0a0a] opacity-40 z-10"
      />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] z-20 pointer-events-none mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-16 md:pb-24 lg:justify-center lg:pb-0">
        <div ref={textRef} className="max-w-5xl lg:mt-10">
          
          {/* Label */}
          <div className="mb-6 md:mb-8 hero-fade">
            <div className="flex items-center gap-4">
              <div className="hero-rule w-10 md:w-14 h-[2px] bg-[#0077B6] origin-left" />
              <span className="text-[#0077B6] font-semibold tracking-[0.25em] text-[10px] md:text-[11px] uppercase">
                Tej Autosystem Pvt. Ltd.
              </span>
            </div>
          </div>
          
          {/* Main heading — line by line reveal */}
          <h1 className="font-display font-bold text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.95] tracking-[-0.02em] mb-6 md:mb-8">
            <span className="block overflow-hidden">
              <span className="hero-line block will-change-transform text-white">ENGINEERING</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block will-change-transform text-white/40">THAT MOVES</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block will-change-transform text-white">INDUSTRY<span className="text-[#0077B6]">.</span></span>
            </span>
          </h1>
          
          {/* Subtext */}
          <div className="hero-fade mb-8 md:mb-12">
            <p className="text-base md:text-xl lg:text-2xl text-white/50 font-light max-w-xl leading-relaxed">
              Conveyor systems, assembly lines & material handling solutions engineered for modern manufacturing.
            </p>
          </div>
          
          {/* CTA */}
          <div className="hero-fade flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link 
              href="/products" 
              className="group relative overflow-hidden bg-[#0077B6] text-white px-8 py-4 font-bold tracking-[0.15em] text-[11px] w-full sm:w-auto text-center border border-[#0077B6] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                EXPLORE SOLUTIONS 
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
              <div className="absolute inset-0 bg-[#005f8a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </Link>
            
            <Link 
              href="/contact-us" 
              className="group relative overflow-hidden bg-transparent text-white px-8 py-4 font-bold tracking-[0.15em] text-[11px] w-full sm:w-auto text-center border border-white/20 transition-all duration-300 hover:border-white/40"
            >
              <span className="relative z-10">REQUEST A QUOTE</span>
              <div className="absolute inset-0 bg-white/[0.04] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom labels */}
      <div className="absolute bottom-6 left-6 md:left-12 z-30 scroll-indicator">
        <span className="text-white/30 font-semibold tracking-[0.3em] text-[9px] uppercase">Est. 2004</span>
      </div>
      
      <div className="absolute bottom-6 right-6 md:right-12 z-30 scroll-indicator">
        <span className="text-white/50 font-semibold tracking-[0.2em] text-[9px] flex items-center gap-2 uppercase">
          Scroll <span className="inline-block w-[1px] h-4 bg-white/30 animate-pulse" />
        </span>
      </div>

      {/* Side accent line */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 z-30 scroll-indicator">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}
