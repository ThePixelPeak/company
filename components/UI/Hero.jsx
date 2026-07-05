"use client";

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
  return (
    <section className="w-full relative overflow-hidden min-h-screen flex items-center pt-8" id="hero">
      {/* Decorative gradient orb for richer background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block mb-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
        >
          <span className="text-teal-400 font-bold tracking-[0.2em] text-xs uppercase">The Future of Web</span>
        </motion.div>
        
        <div className="overflow-hidden mb-6">
          <motion.h1 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter max-w-5xl leading-[1.05] text-white"
          >
            Design the <span className="text-gradient">Unknown.</span>
          </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed font-medium mt-6"
        >
          Pixelpeak engineers ultra-premium digital experiences. We merge data science with cyberpunk aesthetics to scale your brand.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-14 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <MagneticButton className="px-6 py-4 sm:px-10 sm:py-5 bg-white text-black font-bold tracking-wide md:hover:bg-slate-200 transition-colors">
            Initialize Project
          </MagneticButton>
          <MagneticButton className="px-6 py-4 sm:px-10 sm:py-5 bg-white/5 border border-white/10 text-white backdrop-blur-md md:hover:bg-white/10 transition-colors">
            Access Database
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
