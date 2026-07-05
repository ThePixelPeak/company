"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { label: "ROI Generated", value: 5000000, prefix: "$", suffix: "+" },
  { label: "Ad Spend Managed", value: 15000000, prefix: "$", suffix: "+" },
  { label: "Brands Scaled", value: 150, prefix: "", suffix: "+" },
];

function AnimatedCounter({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        let displayValue = Intl.NumberFormat('en-US', {
          notation: "compact",
          maximumFractionDigits: 1
        }).format(latest);
        ref.current.textContent = `${prefix}${displayValue}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref} className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-2" />;
}

export default function Statistics() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full flex items-center justify-center py-10 md:py-24" id="statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full z-10">
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="flex flex-col items-center bg-slate-900/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-slate-700/50 shadow-2xl"
            >
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <h3 className="text-xl md:text-2xl text-pixelpeak-teal font-medium mt-4">{stat.label}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
