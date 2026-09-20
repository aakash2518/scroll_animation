'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about-us' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'PROFILE', href: '/profile' },
    { name: 'CAREER', href: '/career' },
    { name: 'OUR CLIENTS', href: '/our-clients' },
    { name: 'CONTACT US', href: '/contact-us' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/95 backdrop-blur-sm border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="w-32 h-16 md:w-40 md:h-20 relative group-hover:scale-105 transition-transform origin-left">
            <Image src="/OMlogo.png" alt="OM Logo" fill className="object-contain object-left" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-xs font-bold tracking-widest transition-colors ${isActive ? 'text-[#0077B6]' : 'text-white hover:text-[#0077B6]'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact-us" className="px-6 py-3 bg-[#0077B6] hover:bg-[#005f8a] transition-all text-xs font-bold tracking-widest rounded-sm text-white flex items-center gap-2 group shadow-lg shadow-[#0077B6]/20">
            GET A QUOTE
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
