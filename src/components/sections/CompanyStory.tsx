'use client';
import { useRef, useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../ui/AnimatedText';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

function TruckModel() {
  const { scene } = useGLTF('/videos/tata_signa_cargo_truck__low_poly_game_ready_pbr.glb');
  // Rotate to face right (Math.PI / 2).
  return <primitive object={scene} scale={0.4} rotation={[0, Math.PI / 2, 0]} position={[0, -1.5, 0]} />;
}

export default function CompanyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const truckWrapperRef = useRef<HTMLDivElement>(null);
  
  const text1 = "Incepted in the year 2004, Tej Autosystem Pvt. Ltd. is one of the well-known organizations indulged in the business of manufacturing and supplying a quality rich assured collection of Conveyors & Assembly Line, Industrial Workstations & Material Handling Trolley.";
  const text2 = "We are an excellence alert organization and deem in working with a patron centric approach. For providing rapid elucidation to our assorted patrons, we efficiently operate our sophisticated technology, tied with our skilled employees to modify our products as per our patrons’ necessities.";
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Initial fade in for elements when section enters view
      gsap.fromTo('.story-element',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      const scrollDuration = 5;
      let mm = gsap.matchMedia();

      // Desktop animation (pinned)
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=400%', // Pin the section for 4x screen height
            pin: true,
            scrub: 1,
          }
        });

        tl.to('.word-anim', {
          opacity: 1,
          y: 0,
          force3D: true,
          stagger: { amount: scrollDuration * 0.8 }, 
          duration: scrollDuration * 0.2,
        }, 0);

        if (truckWrapperRef.current) {
          tl.fromTo(truckWrapperRef.current,
            { x: '-1200px' },
            {
              x: '120vw',
              ease: 'none',
              force3D: true,
              duration: scrollDuration * 0.7, 
            }, 0);
        }
      });

      // Mobile animation (no pin)
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', 
            end: 'bottom top', 
            scrub: 1,
          }
        });

        gsap.to('.word-anim', {
          opacity: 1,
          y: 0,
          force3D: true,
          stagger: 0.05, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        });

        if (truckWrapperRef.current) {
          tl.fromTo(truckWrapperRef.current,
            { x: '-1000px' },
            {
              x: '150vw',
              ease: 'none',
            force3D: true,
            duration: 1,
            }, 0);
        }
      });
    }, sectionRef);
    
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen lg:h-screen py-16 lg:py-0 bg-[#050505] overflow-hidden flex items-center">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <div className="inline-block mb-4 story-element">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[2px] bg-[#0077B6]"></div>
                <h4 className="text-[#0077B6] font-bold tracking-widest text-xs uppercase">About Our Company</h4>
              </div>
            </div>
            
            <AnimatedText 
              as="h2"
              text="About Us" 
              className="font-display font-black text-4xl md:text-5xl lg:text-7xl leading-tight tracking-tight mb-6 lg:mb-8 text-white uppercase" 
            />
            
            <div>
              <div className="text-lg lg:text-xl text-gray-300 font-light leading-relaxed mb-4 lg:mb-6 border-l-2 border-[#0077B6]/30 pl-4 lg:pl-6">
                {text1.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-1 opacity-20 translate-y-2 word-anim">{word}</span>
                ))}
              </div>
              <div className="text-sm lg:text-base text-gray-500 font-light leading-relaxed pl-4 lg:pl-6">
                {text2.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-1 opacity-20 translate-y-2 word-anim">{word}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden story-element border border-white/10 group shadow-2xl shadow-black/50">
            <Image 
              src="/images/company-image-1-min-min-1.jpg"
              alt="About Tej Autosystem"
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/50 via-transparent to-transparent pointer-events-none"></div>
            {/* Corner accent */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#0077B6] pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#0077B6] pointer-events-none"></div>
          </div>
          
        </div>
      </div>

      {/* 3D Truck Element */}
      <div ref={truckWrapperRef} className="absolute bottom-[-50px] left-0 w-[1000px] h-[400px] z-20 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <Environment preset="city" />
            <TruckModel />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

useGLTF.preload('/videos/tata_signa_cargo_truck__low_poly_game_ready_pbr.glb');

