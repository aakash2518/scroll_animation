'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TruckModel from '@/components/3d/TruckModel';

gsap.registerPlugin(ScrollTrigger);

export default function CompanyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const text1 = "Incepted in the year 2004, Tej Autosystem Pvt. Ltd. is one of the well-known organizations indulged in the business of manufacturing and supplying a quality rich assured collection of Conveyors & Assembly Line, Industrial Workstations & Material Handling Trolley.";
  const text2 = "We are an excellence alert organization and deem in working with a patron centric approach. For providing rapid elucidation to our assorted patrons, we efficiently operate our sophisticated technology, tied with our skilled employees to modify our products as per our patrons' necessities.";
  
  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.word-anim', { opacity: 1, y: 0 });
      gsap.set('.story-element', { opacity: 1, y: 0 });
      gsap.set('.truck-wrapper', { display: 'none' });
      return;
    }
    
    const ctx = gsap.context(() => {
      // Fade in elements
      gsap.fromTo('.story-element',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          force3D: true,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // Image clip reveal
      gsap.fromTo('.story-image-reveal',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );

      const mm = gsap.matchMedia();

      // Desktop: pinned word-by-word reveal
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=350%',
            pin: true,
            scrub: 1,
          }
        });

        tl.to('.word-anim', {
          opacity: 1,
          y: 0,
          force3D: true,
          stagger: { amount: 3 }, 
          duration: 1,
        }, 0);
        
        tl.fromTo('.truck-wrapper',
          { x: '-50vw' },
          { x: '50vw', duration: 4, ease: 'none', force3D: true },
          0
        );
      });

      // Mobile: simple stagger reveal
      mm.add("(max-width: 1023px)", () => {
        gsap.to('.word-anim', {
          opacity: 1,
          y: 0,
          force3D: true,
          stagger: 0.03, 
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        });
        
        gsap.fromTo('.truck-wrapper',
          { x: '-50vw' },
          { x: '50vw', ease: 'none', force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1,
            }
          }
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative z-10 min-h-screen lg:h-screen py-20 lg:py-0 bg-[#050505] overflow-hidden flex items-center">
      <div className="section-divider absolute top-0 left-0 w-full" />
      
      {/* 3D Truck Background */}
      <div className="truck-wrapper absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Environment preset="city" />
            <TruckModel />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <div className="story-element">
              <div className="section-label">
                <span>About Our Company</span>
              </div>
            </div>
            
            <div className="story-element overflow-hidden mb-8 lg:mb-10">
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-white uppercase">
                Two Decades of<br/>
                <span className="text-white/40">Industrial Excellence</span>
              </h2>
            </div>
            
            <div>
              <div className="text-base lg:text-lg text-white/60 font-light leading-[1.8] mb-6 border-l-2 border-[#0077B6]/40 pl-6">
                {text1.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-[0.3em] opacity-[0.15] translate-y-1 word-anim transition-none">{word}</span>
                ))}
              </div>
              <div className="text-sm lg:text-[15px] text-white/40 font-light leading-[1.8] pl-6">
                {text2.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-[0.3em] opacity-[0.15] translate-y-1 word-anim transition-none">{word}</span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="story-image-reveal relative h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden group">
              <Image 
                src="/images/company-image-1-min-min-1.jpg"
                alt="Tej Autosystem manufacturing facility — conveyor assembly and industrial automation"
                fill
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Corner accents */}
              <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-[#0077B6]/60 pointer-events-none" />
              <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-[#0077B6]/60 pointer-events-none" />
              
              {/* Year badge */}
              <div className="absolute bottom-5 left-5 pointer-events-none">
                <span className="text-white/30 text-[10px] font-semibold tracking-[0.3em] uppercase">Since 2004</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
