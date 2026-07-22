"use client";

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // Adjusts responsiveness (0.05 is buttery, 0.1 is snappy)
      wheelMultiplier: 1.2, // Makes each scroll tick move a bit further
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
