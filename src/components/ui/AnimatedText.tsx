'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({ 
  text, 
  className = "",
  as: Component = "h2"
}: { 
  text: string, 
  className?: string,
  as?: any
}) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Simple split by words
    const words = text.split(' ');
    textRef.current.innerHTML = '';
    
    words.forEach((word) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';
      span.style.paddingRight = '0.25em';
      
      const innerSpan = document.createElement('span');
      innerSpan.style.display = 'inline-block';
      innerSpan.innerText = word;
      innerSpan.classList.add('word-inner');
      
      span.appendChild(innerSpan);
      textRef.current?.appendChild(span);
    });
    
    const inners = textRef.current.querySelectorAll('.word-inner');
    
    gsap.fromTo(inners, 
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
        }
      }
    );
  }, [text]);

  return (
    <Component ref={textRef} className={className}></Component>
  );
}
