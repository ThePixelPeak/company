"use client";

import { motion } from 'framer-motion';

const services = [
  {
    title: "Data-Driven Marketing",
    description: "Omnichannel campaigns fueled by predictive analytics. We scale CAC efficiently.",
    icon: (
      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    colSpan: "md:col-span-2",
  },
  {
    title: "Web Engineering",
    description: "Lightning-fast, immersive React/Next.js architectures.",
    icon: (
      <svg className="w-8 h-8 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    colSpan: "md:col-span-1",
  },
  {
    title: "Brand Matrix",
    description: "Cyber-aesthetic visual identities that dominate attention economies.",
    icon: (
      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    colSpan: "md:col-span-3",
  }
];

export default function Services() {
  return (
    <section className="w-full flex items-center justify-center py-10 md:py-24 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full z-10">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10 md:mb-16 text-center text-white">
          System <span className="text-teal-400">Capabilities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-14 rounded-[2rem] md:hover:bg-white/10 transition-colors overflow-hidden ${service.colSpan}`}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-8">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-4 text-white tracking-tight">{service.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
