'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Values() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%']
  });

  const values = [
    'PERSONAL RESPONSIBILITY',
    'CUSTOMER INTIMACY',
    'RESPECT FOR INDIVIDUAL',
    'TEAMWORK',
    'SENSE OF URGENCY'
  ];

  return (
    <section ref={containerRef} className="py-40 md:py-64 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-[#4a50c8] text-sm tracking-[0.3em] font-bold mb-20">OUR CORE VALUES</h2>
        
        <div className="flex flex-col items-center gap-6 md:gap-10">
          {values.map((val, i) => {
            const step = 1 / values.length;
            const start = i * step;
            const end = start + step;
            
            return (
              <motion.div 
                key={i}
                className="font-display font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase"
                style={{
                  opacity: useTransform(scrollYProgress, [Math.max(0, start - 0.1), start + 0.1, end - 0.1, Math.min(1, end + 0.1)], [0.1, 1, 1, 0.1]),
                  color: useTransform(scrollYProgress, [Math.max(0, start - 0.1), start + 0.1, end - 0.1, Math.min(1, end + 0.1)], ['#333333', '#ffffff', '#ffffff', '#333333']),
                  scale: useTransform(scrollYProgress, [Math.max(0, start - 0.1), start + 0.1], [0.95, 1])
                }}
              >
                {val}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
