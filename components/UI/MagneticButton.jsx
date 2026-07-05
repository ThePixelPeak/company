"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
  
  const handleMouseMove = (e) => {
    if (!ref.current || window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center, scale down for subtlety
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`relative rounded-full font-bold overflow-hidden transition-shadow md:hover:shadow-2xl ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
