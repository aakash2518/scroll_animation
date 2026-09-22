'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Cog, Users, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: 20, suffix: '+', label: 'Years of Experience' },
  { icon: Cog, value: 650, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 1200, suffix: '+', label: 'Machines Delivered' },
  { icon: Shield, value: 100, suffix: '%', label: 'Quality Commitment' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.floor(obj.val)),
          });
        },
      });
    });
    return () => ctx.revert();
  }, [target]);

  return (
    <span ref={ref} className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-none tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          force3D: true,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-[#0077B6] overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className={`stat-item text-center md:text-left py-6 md:py-0 ${
                  i < stats.length - 1 ? 'lg:border-r lg:border-white/15' : ''
                }`}
              >
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-white/70 text-[10px] md:text-xs font-semibold tracking-[0.15em] mt-3 uppercase">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
