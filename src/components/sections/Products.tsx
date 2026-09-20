'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';
import { ArrowUpRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: '01', title: 'Assembly belt station', name: 'ASSEMBLY BELT CONVEYOR', desc: 'We are dedicatedly engaged in manufacturing and exporting a matchless range of Assembly Conveyors to our prestigious customers.', image: '/images/featured product/frame_00_delay-0.2s.webp' },
  { id: '02', title: 'Assembly work station', name: 'ASSEMBLY WORK STATIONS', desc: 'Ergonomic workstations tailored for maximum operator efficiency.', image: '/images/featured product/frame_08_delay-0.2s.webp' },
  { id: '03', title: 'Inclined conveyor', name: 'INCLINED CONVEYOR', desc: 'Efficient vertical material transport with high-grip belts and cleats.', image: '/images/featured product/frame_16_delay-0.2s.webp' },
  { id: '04', title: 'Roller conveyor', name: 'ROLLER CONVEYORS', desc: 'Heavy-duty gravity and powered roller systems for robust material handling.', image: '/images/featured product/frame_24_delay-0.2s.webp' },
  { id: '05', title: 'LED aging racks', name: 'LED AGING RACKS', desc: 'Dedicated racks for efficient LED aging.', image: '/images/featured product/frame_32_delay-0.2s.webp' },
  { id: '06', title: 'Mesh conveyors', name: 'MESH CONVEYORS', desc: 'Industrial grade mesh conveyors.', image: '/images/featured product/frame_42_delay-0.2s.webp' }
];

export default function Products() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${products.length * 100}%`,
        pin: true,
        scrub: true,
      }
    });
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${products.length * 100}%`,
      onUpdate: (self) => {
        const progress = self.progress;
        let index = Math.floor(progress * products.length);
        if (index >= products.length) index = products.length - 1;
        setActiveIndex(index);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="products" className="relative h-screen bg-[#050505] overflow-hidden flex items-center justify-center border-t border-white/5">
      
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-overlay z-0"></div>
      </div>

      <div className="absolute top-24 md:top-32 left-0 right-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none text-center">
        <h4 className="text-[#4a50c8] font-bold tracking-widest text-xs md:text-sm mb-2 uppercase drop-shadow-md">PRODUCTS</h4>
        <h2 className="font-display font-bold text-2xl md:text-4xl leading-tight text-white uppercase drop-shadow-lg">
          FEATURED PRODUCTS
        </h2>
      </div>

      <div ref={scrollWrapperRef} className="container mx-auto px-4 md:px-6 w-full h-full pt-40 md:pt-48 pb-8 md:pb-12 flex flex-col justify-center relative z-10">
        
        {/* Showcase Container */}
        <div className="w-full max-w-7xl mx-auto h-[65vh] md:h-[70vh] border border-white/10 rounded-2xl md:rounded-[2rem] bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col md:flex-row">
          
          {/* Left Side: Product Visuals */}
          <div className="w-full md:w-[60%] h-[45%] md:h-full relative overflow-hidden bg-black rounded-t-2xl md:rounded-tr-none md:rounded-l-[2rem]">
            {products.map((prod, i) => {
              const isActive = activeIndex === i;
              const isPast = i < activeIndex;
              
              return (
                <div 
                  key={`img-${prod.id}`}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center ${
                    isActive 
                      ? 'opacity-100 scale-100 translate-y-0 translate-x-0 z-10' 
                      : isPast
                        ? 'opacity-0 scale-[1.05] -translate-y-8 md:-translate-y-0 md:-translate-x-12 z-0'
                        : 'opacity-0 scale-[0.95] translate-y-8 md:translate-y-0 md:translate-x-12 z-0'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0a0a] z-10 pointer-events-none"></div>
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover md:object-contain object-center opacity-80"
                  />
                </div>
              );
            })}
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full md:w-[40%] h-[55%] md:h-full relative bg-[#0a0a0a] md:bg-transparent">
            {products.map((prod, i) => {
              const isActive = activeIndex === i;
              const isPast = i < activeIndex;
              
              return (
                <div 
                  key={`info-${prod.id}`}
                  className={`absolute inset-0 w-full h-full p-6 md:p-12 lg:p-16 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive 
                      ? 'opacity-100 translate-y-0 z-10 pointer-events-auto delay-100' 
                      : isPast
                        ? 'opacity-0 -translate-y-8 z-0 pointer-events-none'
                        : 'opacity-0 translate-y-8 z-0 pointer-events-none'
                  }`}
                >
                  <span className="text-[#4a50c8] font-mono text-xs md:text-sm tracking-widest mb-3 uppercase block">
                    CATEGORY / {prod.title}
                  </span>
                  
                  <h3 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-white leading-tight mb-4 md:mb-6 drop-shadow-lg">
                    {prod.name}
                  </h3>
                  
                  <div className="w-12 h-[2px] bg-[#4a50c8]/50 mb-4 md:mb-6"></div>
                  
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-12 line-clamp-3 md:line-clamp-none">
                    {prod.desc}
                  </p>
                  
                  <div className="mt-auto md:mt-0 flex items-center justify-between">
                    <button 
                      onClick={() => { setActiveProduct(prod); setIsModalOpen(true); }}
                      className="group flex items-center gap-3 text-white hover:text-[#4a50c8] transition-colors"
                    >
                      <span className="text-xs font-bold tracking-widest uppercase">VIEW DETAILS</span>
                      <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#4a50c8] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
        
        {/* Progress Indicator */}
        <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3 z-20">
          {products.map((_, i) => (
            <div 
              key={`dot-${i}`} 
              className={`w-1 md:w-1.5 transition-all duration-300 rounded-full ${activeIndex === i ? 'h-6 md:h-8 bg-[#4a50c8]' : 'h-1.5 md:h-2 bg-white/20'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Tech HUD elements */}
      <div className="absolute bottom-6 right-6 z-20 text-right pointer-events-none hidden md:block">
        <span className="text-[#4a50c8] font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2 drop-shadow-md">
          <span className={`w-2 h-2 rounded-full bg-[#4a50c8] animate-ping`}></span>
          SYSTEM ACTIVE
        </span>
      </div>
      <div className="absolute top-6 left-6 z-20 pointer-events-none hidden md:block">
        <div className="w-16 h-[1px] bg-white/40 mb-1"></div>
        <div className="w-8 h-[1px] bg-white/40"></div>
      </div>

      {/* Product Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-5xl h-[90vh] md:h-[80vh] border border-white/10 bg-[#050505] rounded-xl md:rounded-sm flex flex-col md:flex-row overflow-hidden">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white z-20 bg-black/50 p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-full md:w-1/2 h-48 md:h-full border-b md:border-b-0 md:border-r border-white/5 bg-[#0a0a0a] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <img src={activeProduct.image} alt={activeProduct.name} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity" />
              <div className="w-32 h-32 md:w-64 md:h-64 border border-[#4a50c8]/30 relative flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm rounded-full md:rounded-none">
                <div className="absolute inset-0 border border-white/20 rotate-45 hidden md:block"></div>
                <span className="font-display text-4xl md:text-5xl font-bold text-white/40">{activeProduct.id}</span>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
              <span className="text-[#4a50c8] font-mono text-xs md:text-sm tracking-widest mb-2 md:mb-4 block">PRODUCT / {activeProduct.id}</span>
              <h3 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6">{activeProduct.name}</h3>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">{activeProduct.desc}</p>
              
              <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <div>
                  <h4 className="text-white text-xs md:text-sm font-bold tracking-widest mb-2 uppercase">Advantages</h4>
                  <ul className="text-gray-500 text-sm md:text-base space-y-2 list-disc list-inside">
                    <li>High precision and reliability</li>
                    <li>Low maintenance requirements</li>
                    <li>Customizable dimensions and capacities</li>
                    <li>Energy-efficient operation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white text-xs md:text-sm font-bold tracking-widest mb-2 uppercase">Applications</h4>
                  <p className="text-gray-500 text-sm md:text-base">Automotive assembly, Electronics manufacturing, Packaging lines, Material routing.</p>
                </div>
              </div>
              
              <div onClick={() => {
                setIsModalOpen(false);
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}>
                <MagneticButton className="px-6 py-3 md:px-8 md:py-4 tracking-widest font-bold w-full text-center text-xs md:text-sm rounded-md md:rounded-none">
                  REQUEST A QUOTE
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
