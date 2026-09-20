'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { title: 'LED & LIGHTING', id: '01' },
  { title: 'ELECTRICAL & ELECTRONICS', id: '02' },
  { title: 'PHARMACEUTICALS', id: '03' },
  { title: 'FOOD PROCESSING', id: '04' },
  { title: 'AUTOMOBILE', id: '05' }
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
      const img = new Image();
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
    
    const tl = gsap.timeline({
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="industries" className="relative h-screen bg-[#0a0a0a] overflow-hidden flex items-center">
      
      {/* Full Screen Background Canvas */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
      </div>

      <div className="absolute top-28 md:top-32 left-0 right-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none text-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px] bg-[#0A4174]"></div>
          <h4 className="text-[#0A4174] font-bold tracking-widest text-xs uppercase drop-shadow-md">APPLICATIONS</h4>
          <div className="w-8 h-[2px] bg-[#0A4174]"></div>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl leading-tight text-white uppercase drop-shadow-lg">
          OUR APPLICATIONS
        </h2>
      </div>

      <div ref={scrollWrapperRef} className="container mx-auto px-6 w-full h-full pt-48 pb-12 flex flex-col justify-center relative z-10">
        
        {/* Staggered Text List */}
        <div className="w-full md:w-3/4 flex flex-col justify-center gap-6 lg:gap-10 pl-2 lg:pl-10">
          {industries.map((ind, i) => {
            const isActive = activeIndex === i;
            const isPast = i < activeIndex;
            
            return (
              <div 
                key={ind.id}
                className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center gap-4 lg:gap-8 ${
                  isActive 
                    ? 'opacity-100 translate-x-8 scale-105 origin-left' 
                    : isPast 
                      ? 'opacity-50 -translate-y-2 scale-90 origin-left'
                      : 'opacity-50 translate-y-2 scale-90 origin-left'
                }`}
              >
                <span className={`font-mono text-sm md:text-lg tracking-widest transition-colors duration-500 drop-shadow-md ${isActive ? 'text-[#0A4174]' : 'text-gray-600'}`}>
                  {ind.id}
                </span>
                <div className="flex items-center gap-4">
                  {isActive && <div className="w-6 h-[2px] bg-[#0A4174] hidden md:block"></div>}
                  <h3 className={`font-display font-black text-3xl sm:text-5xl lg:text-7xl uppercase transition-all duration-500 ${isActive ? 'text-white drop-shadow-[0_0_30px_rgba(255,69,0,0.3)]' : 'text-gray-600'}`}>
                    {ind.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/5">
        <div 
          className="h-full bg-[#0A4174] transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,69,0,0.5)]"
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* Active industry indicator */}
      <div className="absolute bottom-8 right-8 z-20 text-right pointer-events-none hidden md:block">
        <span className="text-[#0A4174] font-mono text-sm tracking-widest">
          {String(activeIndex + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
