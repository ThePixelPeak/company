"use client";

import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Projects', href: '#projects' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const handleScroll = (e, href) => {
    e.preventDefault();
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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      >
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-full shadow-2xl max-w-[95vw] sm:max-w-none">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-slate-300 hover:text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-slate-800/50 transition-all whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
          
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, '#contact')}
            className="hidden sm:block ml-2 px-4 py-2 text-xs sm:text-sm md:text-base font-bold text-slate-900 bg-gradient-accent rounded-full hover:scale-105 transition-transform whitespace-nowrap"
          >
            Scale Now
          </a>
        </div>
      </motion.nav>
    </div>
  );
}
