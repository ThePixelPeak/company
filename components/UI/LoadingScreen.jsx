"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const terminalPhrases = [
  "[SYS] Initializing core neural pathways...",
  "[NET] Decrypting encrypted assets...",
  "[SEC] Bypassing firewall protocols...",
  "[GFX] Compiling shader pipelines...",
  "[DAT] Synchronizing remote nodes...",
  "[SYS] Mounting geometric meshes...",
  "[NET] Establishing secure uplink...",
];

export default function LoadingScreen({ isLoading, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // Terminal text cycler
  useEffect(() => {
    if (isLoaded) return;
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % terminalPhrases.length);
    }, 400);
    return () => clearInterval(interval);
  }, [isLoaded]);

  // Progress engine
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) return prev;
          const increment = Math.random() * 4 + 1;
          return Math.min(prev + increment, 85);
        });
      }, 80);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoaded(true);
            setTimeout(() => {
              setShow(false);
              setTimeout(() => {
                onComplete && onComplete();
              }, 1200); // Wait for blast doors to finish
            }, 600); // Hold at 100% for dramatic pause before opening
            return 100;
          }
          return Math.min(prev + 5, 100);
        });
      }, 20);
    }
    return () => clearInterval(interval);
  }, [isLoading, onComplete]);

  // Ring calculation
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (progress / 100) * circleCircumference;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
          
          {/* Top Blast Door */}
          <motion.div 
            initial={{ y: "0%" }}
            animate={isLoaded ? { y: "-100%" } : { y: "0%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-slate-950 border-b border-teal-500/20 shadow-[0_4px_30px_rgba(45,212,191,0.1)] z-10"
          />

          {/* Bottom Blast Door */}
          <motion.div 
            initial={{ y: "0%" }}
            animate={isLoaded ? { y: "100%" } : { y: "0%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-950 border-t border-teal-500/20 shadow-[0_-4px_30px_rgba(45,212,191,0.1)] z-10"
          />

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            
            <div className="relative flex items-center justify-center mb-8">
              {/* Outer Neon Progress Ring */}
              <motion.svg 
                width="140" 
                height="140" 
                viewBox="0 0 120 120" 
                className="absolute transform -rotate-90"
                animate={isLoaded ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Background Track */}
                <circle 
                  cx="60" cy="60" r={circleRadius} 
                  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" 
                />
                {/* Active Progress */}
                <circle 
                  cx="60" cy="60" r={circleRadius} 
                  fill="none" stroke="#2dd4bf" strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: circleCircumference,
                    strokeDashoffset: strokeDashoffset,
                    transition: "stroke-dashoffset 0.1s linear"
                  }}
                  className="drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]"
                />
              </motion.svg>

              {/* The Logo */}
              <motion.div
                animate={
                  isLoaded 
                    ? { scale: 0.5, opacity: 0, x: 0, y: 0 } 
                    : { 
                        x: [0, -2, 1, -1, 2, 0],
                        y: [0, 1, -2, 1, -1, 0],
                        opacity: [1, 0.8, 1, 0.9, 1]
                      }
                }
                transition={
                  isLoaded 
                    ? { duration: 0.6, ease: "easeInOut" }
                    : { repeat: Infinity, duration: 0.3, repeatType: "mirror" }
                }
                className="relative"
              >
                <Logo className="w-16 h-16" />
                {/* Glitch overlays - only visible when not loaded */}
                {!isLoaded && (
                  <>
                    <div className="absolute inset-0 opacity-50 mix-blend-screen -translate-x-[2px] translate-y-[1px] blur-[0.5px]">
                      <Logo className="w-16 h-16 hue-rotate-90" />
                    </div>
                    <div className="absolute inset-0 opacity-50 mix-blend-screen translate-x-[2px] -translate-y-[1px] blur-[0.5px]">
                      <Logo className="w-16 h-16 -hue-rotate-90" />
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Terminal Interface */}
            <motion.div
              animate={isLoaded ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-teal-400 font-mono text-2xl md:text-3xl font-black tracking-widest tabular-nums drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">
                {Math.floor(progress).toString().padStart(3, '0')}%
              </div>
              <div className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] h-4">
                {isLoaded ? "[SYS] UPLINK ESTABLISHED. MOUNTING UI..." : terminalPhrases[textIndex]}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
