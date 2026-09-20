'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyTej() {
  const containerRef = useRef<HTMLElement>(null);

  const points = [
    { title: 'QUALITY-FOCUSED MANUFACTURING', desc: 'Stringent quality checks at every stage ensuring robust and reliable systems.' },
    { title: 'CUSTOMIZATION', desc: 'Bespoke automation solutions tailored to unique operational requirements.' },
    { title: 'TIME-BOUND DELIVERY', desc: 'Agile project management for on-time deployment without compromising precision.' },
    { title: 'ENGINEERING EXPERTISE', desc: 'Decades of collective experience in mechanical and electronic industrial automation.' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.why-item');
      items.forEach((item: any, i) => {
        gsap.fromTo(item, 
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2">
            <div className="sticky top-32">
              <h2 className="font-display font-bold text-5xl md:text-7xl leading-tight tracking-tight mb-8">
                PRECISION IS<br/><span className="text-gray-500">NOT OPTIONAL.</span>
              </h2>
              <p className="text-gray-400 text-xl font-light max-w-md">
                We believe that true industrial efficiency starts with uncompromising standards. Every system we build is a testament to durability and exactitude.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="space-y-12 md:space-y-24 pt-12 lg:pt-32">
              {points.map((pt, i) => (
                <div key={i} className="why-item relative pl-8 md:pl-16 border-l border-white/10 group">
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#0077B6] group-hover:h-full transition-all duration-700 ease-out"></div>
                  <span className="absolute -left-8 md:-left-12 top-0 text-[#0077B6] font-mono text-xl md:text-2xl opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                  <h3 className="font-display font-bold text-2xl md:text-4xl mb-4 group-hover:text-white text-gray-300 transition-colors">{pt.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
