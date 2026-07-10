"use client";

import { motion } from 'framer-motion';
import { Terminal, Database, Box, Cpu } from 'lucide-react';

const defaultServices = [
  {
    title: "NEURAL BRANDING",
    description: "Algorithmic identity design and visual asset generation driven by data.",
    icon: <Box className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-1"
  },
  {
    title: "WEBGL ARCHITECTURE",
    description: "Immersive 3D web experiences pushing the limits of browser performance.",
    icon: <Cpu className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-2"
  },
  {
    title: "QUANTUM SCALING",
    description: "High-availability backend infrastructures capable of handling millions of concurrent connections.",
    icon: <Database className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-2"
  },
  {
    title: "AI AUTOMATION",
    description: "Intelligent workflow systems and custom LLM integrations for enterprise.",
    icon: <Terminal className="w-8 h-8 text-white" />,
    colSpan: "md:col-span-1"
  }
];

export default function Services({ data, isEditable, onUpdate }) {
  const IconMap = {
    "Box": <Box className="w-8 h-8 text-white" />,
    "Cpu": <Cpu className="w-8 h-8 text-white" />,
    "Database": <Database className="w-8 h-8 text-white" />,
    "Terminal": <Terminal className="w-8 h-8 text-white" />
  };

  const currentData = data && Array.isArray(data) ? data : defaultServices;
  const services = currentData.map(s => ({ ...s, iconNode: IconMap[s.icon] || IconMap["Box"] }));

  return (
    <section className="w-full flex items-center justify-center py-6 md:py-24 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-12 tracking-tighter text-white"
        >
          CORE <span className="text-teal-400">SERVICES</span>
        </motion.h2>
        
        <div className="flex md:grid flex-nowrap md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 hide-scrollbar">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 p-6 md:p-10 flex flex-col justify-between hover:bg-slate-800/50 transition-colors group w-[85vw] md:w-auto shrink-0 snap-center ${service.colSpan}`}
            >
              <div className="mb-8 md:mb-16 text-teal-400">
                {service.iconNode}
              </div>
              <div>
                <h3 
                  className={`text-xl md:text-2xl font-black mb-4 tracking-tight text-white uppercase ${isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded px-1' : ''}`}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => isEditable && onUpdate?.('services', `[${idx}].title`, e.currentTarget.textContent)}
                >
                  {service.title}
                </h3>
                <p 
                  className={`text-sm md:text-base text-slate-400 font-medium leading-relaxed ${isEditable ? 'cursor-text outline-none hover:bg-white/5 rounded p-1' : ''}`}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => isEditable && onUpdate?.('services', `[${idx}].description`, e.currentTarget.textContent)}
                >
                  {service.description}
                </p>
              </div>
              
              {isEditable && (
                <button 
                  onClick={() => {
                    const newArr = [...currentData];
                    newArr.splice(idx, 1);
                    onUpdate?.('services', 'full_array', newArr);
                  }}
                  className="absolute top-4 right-4 bg-red-500/20 text-red-400 px-2 py-1 text-xs rounded uppercase font-bold hover:bg-red-500/40"
                >
                  Delete
                </button>
              )}
            </motion.div>
          ))}
          
          {isEditable && (
            <div className="flex items-center justify-center min-w-[300px] border-2 border-dashed border-teal-500/30 rounded-xl hover:bg-teal-500/10 cursor-pointer transition-colors"
                 onClick={() => {
                   const template = { title: "NEW SERVICE", description: "Description here.", icon: "Box", colSpan: "md:col-span-1" };
                   onUpdate?.('services', 'full_array', [...currentData, template]);
                 }}>
              <span className="text-teal-400 font-bold uppercase tracking-widest">+ Add Service</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
