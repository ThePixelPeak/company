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

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full flex items-center justify-center py-10 md:py-24" id="process" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-white">
            The <span className="text-gradient">Algorithm</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            A proven methodology turning cold traffic into loyal brand advocates.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line Background */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
            {/* Animated Draw Line */}
            <motion.div 
              className="absolute top-0 w-full bg-teal-500 origin-top shadow-[0_0_15px_rgba(20,184,166,0.8)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-10 md:space-y-16">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <ProcessStep 
                  key={index} 
                  step={step} 
                  index={index} 
                  isEven={isEven} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index, isEven }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Connector Dot */}
      <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-teal-500 -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
      
      {/* Content */}
      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-lg md:hover:bg-white/10 transition-colors">
          <div className="text-teal-400 font-black text-xl mb-2 tracking-wider">0{index + 1}</div>
          <h3 className="text-2xl font-black mb-4 text-white">{step.title}</h3>
          <p className="text-slate-400 text-lg leading-relaxed font-medium">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
