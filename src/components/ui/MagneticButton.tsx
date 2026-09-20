'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MagneticButton({ 
  children, 
  href, 
  className = "",
  variant = 'primary'
}: { 
  children: React.ReactNode, 
  href?: string,
  className?: string,
  variant?: 'primary' | 'outline'
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!buttonRef.current) return;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = "relative overflow-hidden group flex items-center justify-center transition-all duration-300";
  const variants = {
    primary: "bg-[#4a50c8] text-white",
    outline: "border border-white/20 hover:border-white/50 text-white bg-transparent backdrop-blur-md"
  };

  const Content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href} className="inline-block">{Content}</Link>;
  }

  return <div className="inline-block cursor-pointer">{Content}</div>;
}
