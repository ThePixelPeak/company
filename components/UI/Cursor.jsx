"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Disable on mobile/touch devices or admin dashboard
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, .magnetic') !== null;
      setIsHovering(isInteractive);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition);
      document.body.classList.add('custom-cursor-active');
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', checkMobile);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile || pathname?.startsWith('/admin')) {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('custom-cursor-active');
    }
    return null;
  }

  return (
    <>
      {/* Small dot that perfectly tracks the mouse */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-teal-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      
      {/* Larger outer ring that follows with a spring delay */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-teal-500/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(45, 212, 191, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(45, 212, 191, 0.8)' : 'rgba(45, 212, 191, 0.5)'
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
    </>
  );
}
