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

  return <span ref={ref} className="text-[clamp(2.5rem,8vw,6rem)] font-black text-white tracking-tighter mb-2" />;
}

export default function Statistics({ data, isEditable, onUpdate }) {
  const currentStats = data && Array.isArray(data) ? data : stats;
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
    <section className="w-full flex items-center justify-center py-6 md:py-24" id="statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full z-10">
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center"
        >
          {currentStats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="flex flex-col items-center bg-slate-900/40 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-slate-700/50 shadow-2xl relative group"
            >
              <div className="flex items-center text-[clamp(2.5rem,8vw,6rem)] font-black text-white tracking-tighter mb-2">
                <span 
                  className={isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded' : ''}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => isEditable && onUpdate?.('statistics', `[${index}].prefix`, e.currentTarget.textContent)}
                >{stat.prefix}</span>
                <AnimatedCounter value={stat.value} prefix="" suffix="" />
                <span 
                  className={isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded' : ''}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => isEditable && onUpdate?.('statistics', `[${index}].suffix`, e.currentTarget.textContent)}
                >{stat.suffix}</span>
              </div>
              <h3 
                className={`text-xl md:text-2xl text-teal-400 font-medium mt-4 ${isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded px-1' : ''}`}
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => isEditable && onUpdate?.('statistics', `[${index}].label`, e.currentTarget.textContent)}
              >
                {stat.label}
              </h3>

              {isEditable && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={() => {
                      const newArr = [...currentStats];
                      newArr.splice(index, 1);
                      onUpdate?.('statistics', 'full_array', newArr);
                    }}
                    className="bg-red-500/20 text-red-400 px-2 py-1 text-xs rounded uppercase font-bold hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Del
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          
          {isEditable && (
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center justify-center border-2 border-dashed border-teal-500/30 hover:bg-teal-500/10 transition-colors p-6 md:p-12 rounded-3xl cursor-pointer"
              onClick={() => {
                const template = { label: "New Stat", value: 100, prefix: "", suffix: "%" };
                onUpdate?.('statistics', 'full_array', [...currentStats, template]);
              }}
            >
              <span className="text-teal-400 font-bold uppercase tracking-widest">+ Add Stat</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
