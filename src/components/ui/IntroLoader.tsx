'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function IntroLoader() {
  const [opacity, setOpacity] = useState(1);
  const [isRendered, setIsRendered] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRendered(false);
      return;
    }
    
    // Check if it's a mobile screen (md breakpoint is 768px in Tailwind)
    const checkMobile = window.matchMedia('(max-width: 767px)').matches;
    setIsMobile(checkMobile);

    if (checkMobile) {
      // Premium Mobile Logo Animation
      const ctx = gsap.context(() => {
        gsap.set('.mobile-logo', { scale: 0.8, opacity: 0, y: 15 });
        gsap.set('.mobile-line', { scaleX: 0, opacity: 0 });
        gsap.set('.intro-glow', { opacity: 0, scale: 0.5 });
        
        const tl = gsap.timeline({
          onComplete: () => {
            // Smoothly fade out the entire black screen container
            setOpacity(0);
            setTimeout(() => setIsRendered(false), 800);
          }
        });

        // Appear Sequence
        tl.to('.intro-glow', {
          opacity: 0.3,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
        })
        .to('.mobile-logo', {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
        }, "-=0.4")
        .to('.mobile-line', {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        }, "-=0.4")
        
        // Hold briefly, then Disappear Sequence
        .to('.mobile-logo', {
          scale: 1.05,
          opacity: 0,
          y: -10,
          filter: 'blur(8px)',
          duration: 0.5,
          ease: 'power2.inOut',
        }, "+=0.3") 
        .to('.mobile-line', {
          scaleX: 0,
          opacity: 0,
          duration: 0.3,
        }, "-=0.4")
        .to('.intro-glow', {
          opacity: 0,
          duration: 0.4,
        }, "-=0.4");
      }, containerRef);
      return () => ctx.revert();
      
    } else {
      // Desktop Video Animation
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {
          setIsRendered(false);
        });
      }
    }
  }, []);

  const handleVideoEnd = () => {
    // Smoothly fade out the intro video so the transition is seamless
    setOpacity(0);
    setTimeout(() => {
      setIsRendered(false);
    }, 1000);
  };

  if (!isRendered) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black overflow-hidden pointer-events-none transition-opacity ease-in-out"
      style={{ opacity, transitionDuration: isMobile ? '800ms' : '1000ms' }}
    >
      {/* Premium Mobile Logo Intro */}
      <div className="absolute inset-0 flex flex-col items-center justify-center md:hidden bg-[#050505]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] mix-blend-overlay z-0" />
        <div className="intro-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#0077B6] rounded-full blur-[50px] opacity-0" />
        
        <div className="mobile-logo w-56 h-28 relative opacity-0 z-10">
          <Image 
            src="/OMlogo.png" 
            alt="Tej Autosystem" 
            fill 
            className="object-contain drop-shadow-2xl"
            priority
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
        <div className="mobile-line w-40 h-[1px] bg-gradient-to-r from-transparent via-[#0077B6] to-transparent mt-5 opacity-0 z-10" />
      </div>

      {/* Desktop Video Intro */}
      <div className="hidden md:block absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/ezgif.com-video-cutter.webm"
          className="w-full h-full object-cover object-center transform-gpu"
          muted
          playsInline
          onEnded={handleVideoEnd}
          preload="auto"
        />
      </div>
    </div>
  );
}
