'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { title: 'LED & LIGHTING', id: '01', desc: 'Automated assembly and aging solutions for LED manufacturing and testing.' },
  { title: 'ELECTRICAL & ELECTRONICS', id: '02', desc: 'Precision conveyor systems for PCB assembly, component handling and testing.' },
  { title: 'PHARMACEUTICALS', id: '03', desc: 'Hygienic material handling and packaging line automation for pharma facilities.' },
  { title: 'FOOD PROCESSING', id: '04', desc: 'Food-grade conveyor systems built for safe, efficient processing environments.' },
  { title: 'AUTOMOBILE', id: '05', desc: 'Heavy-duty assembly lines and material handling for automotive production.' }
];

export default function Industries() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const renderFrame = (frameIndex: number) => {
    if (!canvasRef.current || !imagesRef.current[frameIndex]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = imagesRef.current[frameIndex];
    if (!img.complete) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img, 
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  useEffect(() => {
    const frameCount = 50;
    const images: HTMLImageElement[] = [];
    
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      const numStr = i.toString().padStart(2, '0');
      img.src = `/images/application/frame_${numStr}_delay-0.2s.webp`;
      images.push(img);
    }
    imagesRef.current = images;

    images[0].onload = () => {
      renderFrame(0);
    };
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${industries.length * 100}%`,
          pin: true,
          scrub: true,
        }
      });
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${industries.length * 100}%`,
        onUpdate: (self) => {
          const progress = self.progress;
          let index = Math.floor(progress * industries.length);
          if (index >= industries.length) index = industries.length - 1;
          setActiveIndex(index);
          setScrollProgress(progress);

          const frameCount = 50;
          const frameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(progress * frameCount))
          );
          renderFrame(frameIndex);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="industries" className="relative h-screen bg-[#0a0a0a] overflow-hidden flex items-center">
      
      {/* Full Screen Background Canvas */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none mix-blend-overlay" />
      </div>

      {/* Section Header */}
      <div className="absolute top-24 md:top-28 left-0 right-0 z-20 pointer-events-none">
        <div className="container mx-auto px-6 md:px-12">
          <div className="section-label">
            <span>Applications</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-4xl leading-tight text-white uppercase">
            Industries We Serve
          </h2>
        </div>
      </div>

      <div ref={scrollWrapperRef} className="container mx-auto px-6 md:px-12 w-full h-full pt-44 md:pt-48 pb-12 flex flex-col justify-center relative z-10">
        
        {/* Industry List */}
        <div className="w-full md:w-3/4 flex flex-col justify-center gap-4 lg:gap-6">
          {industries.map((ind, i) => {
            const isActive = activeIndex === i;
            const isPast = i < activeIndex;
            
            return (
              <div 
                key={ind.id}
                className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-start gap-4 lg:gap-6 py-2 ${
                  isActive 
                    ? 'opacity-100 translate-x-4 lg:translate-x-8' 
                    : isPast 
                      ? 'opacity-30 -translate-y-1'
                      : 'opacity-30 translate-y-1'
                }`}
              >
                <span className={`font-mono text-xs md:text-sm tracking-widest transition-colors duration-500 mt-2 flex-shrink-0 ${isActive ? 'text-[#0077B6]' : 'text-white/20'}`}>
                  {ind.id}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    {isActive && <div className="w-5 h-[2px] bg-[#0077B6] hidden md:block flex-shrink-0" />}
                    <h3 className={`font-display font-bold text-xl sm:text-3xl lg:text-4xl xl:text-5xl uppercase transition-all duration-500 leading-tight ${isActive ? 'text-white' : 'text-white/40'}`}>
                      {ind.title}
                    </h3>
                  </div>
                  {/* Description — only show for active */}
                  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="text-white/40 text-sm md:text-base font-light max-w-lg leading-relaxed pl-0 md:pl-8">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/5">
        <div 
          className="h-full bg-[#0077B6] transition-[width] duration-100 ease-linear"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 text-right pointer-events-none hidden md:block">
        <span className="text-white/30 font-mono text-xs tracking-widest">
          {String(activeIndex + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
