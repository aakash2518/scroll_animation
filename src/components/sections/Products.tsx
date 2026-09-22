'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: '01', title: 'Assembly belt station', name: 'ASSEMBLY BELT CONVEYOR', desc: 'We are dedicatedly engaged in manufacturing and exporting a matchless range of Assembly Conveyors to our prestigious customers.', image: '/images/featured product/frame_00_delay-0.2s.webp' },
  { id: '02', title: 'Assembly work station', name: 'ASSEMBLY WORK STATIONS', desc: 'Ergonomic workstations tailored for maximum operator efficiency.', image: '/images/featured product/frame_08_delay-0.2s.webp' },
  { id: '03', title: 'Inclined conveyor', name: 'INCLINED CONVEYOR', desc: 'Efficient vertical material transport with high-grip belts and cleats.', image: '/images/featured product/frame_16_delay-0.2s.webp' },
  { id: '04', title: 'Roller conveyor', name: 'ROLLER CONVEYORS', desc: 'Heavy-duty gravity and powered roller systems for robust material handling.', image: '/images/featured product/frame_24_delay-0.2s.webp' },
  { id: '05', title: 'LED aging racks', name: 'LED AGING RACKS', desc: 'Dedicated racks for efficient LED aging and quality testing.', image: '/images/featured product/frame_32_delay-0.2s.webp' },
  { id: '06', title: 'Mesh conveyors', name: 'MESH CONVEYORS', desc: 'Industrial grade mesh conveyors for heavy-duty applications.', image: '/images/featured product/frame_42_delay-0.2s.webp' }
];

export default function Products() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0]);

  // Keyboard navigation for modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);
  
  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.timeline({
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="products" className="relative h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* Background */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] mix-blend-overlay" />
      </div>

      {/* Section Header */}
      <div className="absolute top-24 md:top-28 left-0 right-0 z-20 pointer-events-none">
        <div className="container mx-auto px-6 md:px-12 flex items-end justify-between">
          <div>
            <div className="section-label">
              <span>Products</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-4xl leading-tight text-white uppercase">
              Featured Products
            </h2>
          </div>
          <div className="hidden md:block">
            <span className="text-white/20 font-mono text-xs tracking-widest">
              {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div ref={scrollWrapperRef} className="container mx-auto px-4 md:px-12 w-full h-full pt-40 md:pt-48 pb-8 md:pb-12 flex flex-col justify-center relative z-10">
        
        {/* Showcase Container */}
        <div className="w-full max-w-[90rem] mx-auto h-[65vh] md:h-[75vh] relative flex flex-col md:flex-row items-center gap-8 lg:gap-20">
          
          {/* Left: Product Image */}
          <div className="w-full md:w-[55%] h-[45%] md:h-full relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08] shadow-2xl shadow-black bg-[#050505]">
            {products.map((prod, i) => {
              const isActive = activeIndex === i;
              const isPast = i < activeIndex;
              
              return (
                <div 
                  key={`img-${prod.id}`}
                  className={`absolute inset-0 w-full h-full transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive 
                      ? 'opacity-100 scale-100 z-10' 
                      : isPast
                        ? 'opacity-0 scale-[1.08] z-0'
                        : 'opacity-0 scale-[0.92] z-0'
                  }`}
                >
                  <Image 
                    src={prod.image} 
                    alt={prod.name} 
                    fill 
                    unoptimized 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                </div>
              );
            })}

            {/* Product number watermark */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 pointer-events-none mix-blend-overlay">
              <span className="font-display font-bold text-6xl md:text-9xl text-white opacity-20 leading-none">
                {products[activeIndex]?.id}
              </span>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-[45%] h-[55%] md:h-full relative">
            {products.map((prod, i) => {
              const isActive = activeIndex === i;
              const isPast = i < activeIndex;
              
              return (
                <div 
                  key={`info-${prod.id}`}
                  className={`absolute inset-0 w-full h-full py-4 md:py-10 flex flex-col justify-center transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive 
                      ? 'opacity-100 translate-y-0 z-10 pointer-events-auto' 
                      : isPast
                        ? 'opacity-0 -translate-y-12 z-0 pointer-events-none'
                        : 'opacity-0 translate-y-12 z-0 pointer-events-none'
                  }`}
                >
                  <span className="text-[#0077B6] font-mono text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-5 uppercase block font-semibold flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#0077B6]" />
                    {prod.title}
                  </span>
                  
                  <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.1] mb-6 md:mb-8">
                    {prod.name}
                  </h3>
                  
                  <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-8 md:mb-12 line-clamp-3 md:line-clamp-none max-w-xl">
                    {prod.desc}
                  </p>
                  
                  <div className="mt-auto md:mt-0">
                    <button 
                      onClick={() => { setActiveProduct(prod); setIsModalOpen(true); }}
                      className="group flex items-center gap-3 text-white hover:text-[#0077B6] transition-colors duration-300"
                      aria-label={`View details for ${prod.name}`}
                    >
                      <span className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase">View Details</span>
                      <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#0077B6] flex items-center justify-center transition-all duration-300 group-hover:bg-[#0077B6] group-hover:text-white">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
        
        {/* Progress dots */}
        <div className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {products.map((_, i) => (
            <div 
              key={`dot-${i}`} 
              className={`w-1 transition-all duration-300 rounded-full ${activeIndex === i ? 'h-6 bg-[#0077B6]' : 'h-1.5 bg-white/15'}`}
            />
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProduct.name} details`}
        >
          <div className="relative w-full max-w-5xl max-h-[90vh] border border-white/[0.06] bg-[#0a0a0a] rounded-lg flex flex-col md:flex-row overflow-hidden">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white bg-black/50 rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-48 md:h-auto min-h-[200px] md:min-h-[500px] relative bg-[#080808]">
              <Image 
                src={activeProduct.image} 
                alt={activeProduct.name} 
                fill 
                unoptimized 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0a]/30" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 pointer-events-none">
                <span className="font-display font-bold text-5xl md:text-7xl text-white/[0.08]">{activeProduct.id}</span>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 overflow-y-auto">
              <span className="text-[#0077B6] font-mono text-[11px] tracking-[0.2em] mb-3 block uppercase">Product / {activeProduct.id}</span>
              <h3 className="font-display font-bold text-2xl md:text-4xl mb-4 md:mb-6 text-white">{activeProduct.name}</h3>
              <p className="text-white/40 text-sm md:text-base leading-relaxed mb-6 md:mb-8">{activeProduct.desc}</p>
              
              <div className="space-y-5 mb-8 md:mb-10">
                <div>
                  <h4 className="text-white text-[11px] font-bold tracking-[0.15em] mb-3 uppercase">Advantages</h4>
                  <ul className="text-white/35 text-sm space-y-2">
                    <li className="flex items-start gap-2"><span className="text-[#0077B6] mt-1.5 w-1 h-1 rounded-full bg-[#0077B6] flex-shrink-0" />High precision and reliability</li>
                    <li className="flex items-start gap-2"><span className="text-[#0077B6] mt-1.5 w-1 h-1 rounded-full bg-[#0077B6] flex-shrink-0" />Low maintenance requirements</li>
                    <li className="flex items-start gap-2"><span className="text-[#0077B6] mt-1.5 w-1 h-1 rounded-full bg-[#0077B6] flex-shrink-0" />Customizable dimensions and capacities</li>
                    <li className="flex items-start gap-2"><span className="text-[#0077B6] mt-1.5 w-1 h-1 rounded-full bg-[#0077B6] flex-shrink-0" />Energy-efficient operation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white text-[11px] font-bold tracking-[0.15em] mb-3 uppercase">Applications</h4>
                  <p className="text-white/35 text-sm">Automotive assembly, Electronics manufacturing, Packaging lines, Material routing.</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="w-full py-4 bg-[#0077B6] hover:bg-[#005f8a] text-white text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
