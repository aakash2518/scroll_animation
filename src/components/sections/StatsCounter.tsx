'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Cog, Users, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: 20, suffix: '+', label: 'YEARS OF EXPERIENCE' },
  { icon: Cog, value: 650, suffix: '+', label: 'PROJECTS COMPLETED' },
  { icon: Users, value: 1200, suffix: '+', label: 'MACHINES DELIVERED' },
  { icon: Shield, value: 100, suffix: '%', label: 'QUALITY COMMITMENT' },
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
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.floor(obj.val)),
          });
        },
      });
    });
    return () => ctx.revert();
  }, [target]);

  return (
    <span ref={ref} className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-white leading-none">
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
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
    <section ref={sectionRef} className="relative py-20 md:py-24 bg-[#0077B6] overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="stat-item text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Icon className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-white/80 text-xs md:text-sm font-bold tracking-widest mt-2 uppercase">
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
