"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const processSteps = [
  {
    title: "Discovery & Audit",
    description: "Deep dive analytics. We identify bottlenecks and hidden opportunities in your digital footprint.",
  },
  {
    title: "Strategy Formulation",
    description: "Crafting a bespoke, omnichannel roadmap engineered for maximum ROI and sustainable growth.",
  },
  {
    title: "Execution & Deployment",
    description: "Rapid, precise implementation across all channels. We launch campaigns that capture attention.",
  },
  {
    title: "Optimization & Scaling",
    description: "Continuous A/B testing and data analysis. We double down on winners and relentlessly scale.",
  }
];

export default function Process({ data, isEditable, onUpdate }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full flex items-center justify-center py-6 md:py-24" id="process" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-white">
            The <span className="text-gradient">Algorithm</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            A proven methodology turning cold traffic into loyal brand advocates.
          </p>
        </div>

        <div className="flex justify-end mb-2 md:hidden">
          <span className="text-[10px] text-teal-400 font-mono tracking-wider animate-pulse flex items-center gap-1.5">
            SWIPE STEPS 
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line Background */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full overflow-hidden hidden md:block">
            {/* Animated Draw Line */}
            <motion.div 
              className="absolute top-0 w-full bg-teal-500 origin-top shadow-[0_0_15px_rgba(20,184,166,0.8)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-4 md:gap-0 md:space-y-16 pb-6 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] w-full">
            {(data && Array.isArray(data) ? data : processSteps).map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <ProcessStep 
                  key={index} 
                  step={step} 
                  index={index} 
                  isEven={isEven} 
                  isEditable={isEditable}
                  onUpdate={onUpdate}
                  processList={data || processSteps}
                />
              );
            })}
            {isEditable && (
              <div className="flex items-center justify-center min-w-[300px] md:w-full border-2 border-dashed border-teal-500/30 rounded-xl hover:bg-teal-500/10 cursor-pointer transition-colors p-6"
                   onClick={() => {
                     const currentList = data && Array.isArray(data) ? data : processSteps;
                     const template = { title: "NEW STEP", description: "Description here." };
                     onUpdate?.('process', 'full_array', [...currentList, template]);
                   }}>
                <span className="text-teal-400 font-bold uppercase tracking-widest">+ Add Step</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index, isEven, isEditable, onUpdate, processList }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-start md:items-center w-[85vw] shrink-0 snap-center md:w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Connector Dot */}
      <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-teal-500 -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(20,184,166,0.5)] hidden md:block" />
      
      {/* Content */}
      <div className={`w-full md:w-1/2 pl-0 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-2xl shadow-lg md:hover:bg-white/10 transition-colors h-auto">
          <div className="text-teal-400 font-black text-xl mb-2 tracking-wider">0{index + 1}</div>
          <h3 
            className={`text-[clamp(1.25rem,4vw,1.5rem)] font-black mb-4 text-white ${isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded px-1' : ''}`}
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => isEditable && onUpdate?.('process', `[${index}].title`, e.currentTarget.textContent)}
          >
            {step.title}
          </h3>
          <p 
            className={`text-slate-400 text-sm md:text-lg leading-relaxed font-medium ${isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded px-1' : ''}`}
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => isEditable && onUpdate?.('process', `[${index}].description`, e.currentTarget.textContent)}
          >
            {step.description}
          </p>
          
          {isEditable && (
            <button 
              onClick={() => {
                const newArr = [...processList];
                newArr.splice(index, 1);
                onUpdate?.('process', 'full_array', newArr);
              }}
              className="absolute top-4 right-4 bg-red-500/20 text-red-400 px-2 py-1 text-xs rounded uppercase font-bold hover:bg-red-500/40"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
