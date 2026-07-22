"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Projects', href: '#projects' },
  { name: 'Reviews', href: '#reviews' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith('/admin')) return null;

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block w-auto max-w-[95vw]">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <div className="flex items-center gap-4 px-6 py-3 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-full shadow-2xl">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-full hover:bg-slate-800/50 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, '#contact')}
              className="ml-2 px-4 py-2 text-sm font-bold text-slate-900 bg-gradient-accent rounded-full hover:scale-105 transition-transform min-h-[44px] flex items-center justify-center whitespace-nowrap"
            >
              Scale Now
            </a>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="fixed top-6 right-4 z-[101] md:hidden">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full flex flex-col items-center justify-center gap-1.5 shadow-xl relative"
          aria-label="Toggle menu"
        >
          <motion.span 
            animate={{ rotate: isOpen ? 45 : 0, top: isOpen ? "50%" : "35%" }} 
            className="w-5 h-0.5 bg-white absolute transition-transform transform -translate-y-1/2"
          />
          <motion.span 
            animate={{ opacity: isOpen ? 0 : 1, top: "50%" }} 
            className="w-5 h-0.5 bg-white absolute transition-opacity transform -translate-y-1/2"
          />
          <motion.span 
            animate={{ rotate: isOpen ? -45 : 0, top: isOpen ? "50%" : "65%" }} 
            className="w-5 h-0.5 bg-white absolute transition-transform transform -translate-y-1/2"
          />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4 w-full px-6 max-h-[100vh] overflow-y-auto py-20">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-2xl font-black text-slate-300 hover:text-teal-400 transition-colors w-full text-center py-3 min-h-[44px]"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="mt-4 px-8 py-4 text-lg font-bold text-slate-900 bg-gradient-accent rounded-full hover:scale-105 transition-transform w-full text-center max-w-xs min-h-[44px]"
              >
                Scale Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
