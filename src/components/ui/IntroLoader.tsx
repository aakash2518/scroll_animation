'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we've already shown the intro this session (optional, but good for dev)
    // For now, let's just always show it on mount for demonstration
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      }
    });

    // 1. Initial state: logo hidden
    gsap.set('.intro-logo', { opacity: 0, scale: 0.8, y: 20 });
    gsap.set('.intro-bar', { scaleX: 0, transformOrigin: 'left' });
    gsap.set('.intro-overlay', { yPercent: 0 });

    // 2. Animate logo in
    tl.to('.intro-logo', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power3.out',
    })
    // 3. Animate loading bar
    .to('.intro-bar', {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    }, '-=0.1')
    // 4. Logo floats up slightly before exit
    .to('.intro-logo', {
      y: -20,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })
    // 5. Slide overlay up
    .to('.intro-overlay', {
      yPercent: -100,
      duration: 0.3,
      ease: 'expo.inOut',
    }, '-=0.1');

  }, []);

  if (!isLoading) return null;

  return (
    <div className="intro-overlay fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      {/* Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0A4174]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="intro-logo w-64 h-32 relative mb-8">
          <Image 
            src="/OMlogo.png" 
            alt="OM Logo" 
            fill 
            className="object-contain"
            priority
          />
        </div>

        {/* Loading Bar Container */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          {/* Animated Bar */}
          <div className="intro-bar w-full h-full bg-[#0A4174] rounded-full"></div>
        </div>

        {/* Loading Text */}
        <div className="intro-logo mt-4 text-[#0A4174] font-mono text-[10px] tracking-[0.3em] uppercase">
          Initializing System...
        </div>
      </div>
      
    </div>
  );
}
