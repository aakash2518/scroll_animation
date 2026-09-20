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

    // Enforce video muted state and autoplay (helps with browser policies)
    videoRef.current.muted = true;
    videoRef.current.defaultMuted = true;
    videoRef.current.play().catch((e) => console.log('Autoplay prevented:', e));

    // Initial load animation
    const tl = gsap.timeline();
    tl.to('.hero-reveal', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
    });

    // Scroll animation
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop Only Animations
      mm.add("(min-width: 768px)", () => {
        // Pinning and zooming
        gsap.to(videoRef.current, {
          scale: 1.08,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });

        // Text moving up faster than scroll (parallax)
        gsap.to(textRef.current, {
          y: -150,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      // Darkening overlay
      gsap.to(overlayRef.current, {
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Fade out scroll indicator
      gsap.to('.scroll-indicator', {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] md:h-screen overflow-hidden bg-black">
      {/* Layer 1: Video */}
      <video
        ref={videoRef}
        src="/videos/hero-bg.webm"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          e.currentTarget.play().catch(() => {});
        }}
        className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform origin-center"
      />
      
      {/* Layer 2: Cinematic Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a] opacity-50 z-10"
      ></div>


      {/* Layer 3: Noise Texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-20 pointer-events-none mix-blend-overlay"></div>

      {/* Layer 4: Content */}
      <div className="relative z-30 container mx-auto px-6 h-full flex flex-col justify-center">
        <div ref={textRef} className="max-w-4xl mt-20">
          
          <div className="overflow-hidden mb-6">
            <div className="hero-reveal translate-y-full opacity-0 flex items-center gap-4 will-change-transform">
              <div className="w-12 h-[1px] bg-[#0077B6]"></div>
              <span className="text-[#0077B6] font-bold tracking-[0.2em] text-xs uppercase">
                TEJ AUTOSYSTEM PVT. LTD. | INDUSTRIAL AUTOMATION
              </span>
            </div>
          </div>
          
          <div className="overflow-hidden mb-8">
            <h1 className="hero-reveal translate-y-full opacity-0 font-display font-bold text-5xl md:text-7xl lg:text-[7.5rem] leading-[1.1] tracking-tight text-white will-change-transform">
              <span className="block">ENGINEERING</span>
              <span className="block text-gray-400">THAT MOVES</span>
              <span className="block">INDUSTRY.</span>
            </h1>
          </div>
          
          <div className="overflow-hidden mb-12">
            <p className="hero-reveal translate-y-full opacity-0 text-lg md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed will-change-transform">
              Industrial automation, conveyor systems and material handling solutions engineered for modern manufacturing.
            </p>
          </div>
          
          <div className="overflow-hidden">
            <div className="hero-reveal translate-y-full opacity-0 flex flex-col sm:flex-row items-start sm:items-center gap-6 will-change-transform">
              <Link href="#solutions" className="group relative overflow-hidden bg-[#0077B6] text-white px-8 py-4 font-bold tracking-widest text-sm w-full sm:w-auto text-center border border-[#0077B6] transition-colors hover:bg-transparent">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  EXPLORE SOLUTIONS 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              </Link>
              
              <Link href="/contact-us" className="group relative overflow-hidden bg-transparent text-white px-8 py-4 font-bold tracking-widest text-sm w-full sm:w-auto text-center border border-white/20 transition-all hover:border-white hover:scale-105">
                <span className="relative z-10">REQUEST A QUOTE</span>
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Labels */}
      <div className="absolute bottom-8 left-6 md:left-12 z-30 scroll-indicator">
        <span className="text-gray-500 font-bold tracking-[0.3em] text-[10px]">EST. 2004</span>
      </div>
      
      <div className="absolute bottom-8 right-6 md:right-12 z-30 scroll-indicator">
        <span className="text-white font-bold tracking-[0.2em] text-[10px] flex items-center gap-2">
          SCROLL TO EXPLORE <span className="animate-bounce">↓</span>
        </span>
      </div>
    </section>
  );
}
