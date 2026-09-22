'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT US', href: '/about-us' },
  { name: 'PRODUCTS', href: '/products' },
  { name: 'PROFILE', href: '/profile' },
  { name: 'CAREER', href: '/career' },
  { name: 'OUR CLIENTS', href: '/our-clients' },
  { name: 'CONTACT US', href: '/contact-us' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.06] py-2'
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group relative z-10" aria-label="TAPL India Home">
          <div className="w-28 h-14 md:w-36 md:h-[4.5rem] relative group-hover:scale-[1.02] transition-transform duration-300 origin-left">
            <Image src="/OMlogo.png" alt="Tej Autosystem Pvt. Ltd. Logo" fill className="object-contain object-left" priority />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[11px] font-semibold tracking-[0.15em] px-4 py-2 transition-colors duration-300 ${
                  isActive ? 'text-[#0077B6]' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#0077B6]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact-us"
            className="group relative overflow-hidden px-6 py-3 bg-[#0077B6] text-[11px] font-bold tracking-[0.15em] text-white flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#0077B6]/20"
          >
            <span className="relative z-10">GET A QUOTE</span>
            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
            <div className="absolute inset-0 bg-[#005f8a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2 relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="lg:hidden fixed inset-0 top-0 w-full h-screen bg-[#050505]/98 backdrop-blur-xl z-40 flex flex-col"
          >
            {/* Mobile menu header spacer */}
            <div className="h-20 flex-shrink-0" />

            <nav className="flex flex-col px-8 py-6 gap-1 flex-1 overflow-y-auto" aria-label="Mobile navigation">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-2xl font-bold tracking-wider py-4 border-b border-white/5 transition-colors duration-300 ${
                        isActive ? 'text-[#0077B6]' : 'text-white/80 active:text-[#0077B6]'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.name}
                        {isActive && <div className="w-2 h-2 rounded-full bg-[#0077B6]" />}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-6 py-4 bg-[#0077B6] text-[11px] font-bold tracking-[0.2em] text-white"
                >
                  GET A QUOTE →
                </Link>
              </motion.div>
            </nav>

            {/* Mobile menu footer */}
            <div className="px-8 py-6 border-t border-white/5">
              <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Tej Autosystem Pvt. Ltd.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
