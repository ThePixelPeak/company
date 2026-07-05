"use client";

import { motion } from 'framer-motion';

const projects = [
  {
    title: "AETHERIUS",
    category: "AI BRAND PLATFORM",
    description: "Generative brand asset creation portal scaling digital fashion marketing.",
    metrics: [
      { name: "ENGAGEMENT", value: "+280%" },
      { name: "GENERATED ASSETS", value: "2.4M" },
      { name: "MODEL LATENCY", value: "85ms" }
    ],
    tech: ["Next.js", "Stable Diffusion", "Tailwind CSS"],
    color: "from-teal-500/20 to-teal-900/10",
    borderColor: "group-hover:border-teal-500/50",
    url: "https://github.com/aetherius-brand"
  },
  {
    title: "NOVA ANALYTICS",
    category: "REAL-TIME PIPELINE",
    description: "High-throughput data ingestion pipeline handling 100k+ events/sec.",
    metrics: [
      { name: "INGEST RATE", value: "120k/s" },
      { name: "STABILITY", value: "99.999%" },
      { name: "QUERY TIME", value: "8ms" }
    ],
    tech: ["React", "Go", "Kafka", "ClickHouse"],
    color: "from-lime-500/20 to-lime-900/10",
    borderColor: "group-hover:border-lime-500/50",
    url: "https://github.com/nova-analytics"
  },
  {
    title: "ZEPHYR MATRIX",
    category: "CAMPAIGN AUTOMATION",
    description: "Predictive AI agent automating media buying and optimizing budget allocation.",
    metrics: [
      { name: "ROI IMPROVEMENT", value: "+148%" },
      { name: "AD SPEND MANAGED", value: "$4.2M" },
      { name: "DECISIONS/MIN", value: "1,200" }
    ],
    tech: ["Python", "TensorFlow", "FastAPI", "React"],
    color: "from-teal-500/20 to-lime-500/10",
    borderColor: "group-hover:border-teal-400/50",
    url: "https://github.com/zephyr-matrix"
  },
  {
    title: "HELIOS SUITE",
    category: "CYBER-ASSETS STUDIO",
    description: "Immersive WebGL repository and rendering sandbox for digital collectibles.",
    metrics: [
      { name: "RENDER RATE", value: "90 FPS" },
      { name: "ASSETS STORED", value: "45k" },
      { name: "WEBGL LOAD", value: "0.6s" }
    ],
    tech: ["Next.js", "Three.js", "React Three Fiber"],
    color: "from-lime-500/20 to-teal-500/10",
    borderColor: "group-hover:border-lime-400/50",
    url: "https://github.com/helios-suite"
  }
];

export default function Projects() {
  return (
    <section className="w-full py-10 md:py-24 relative overflow-hidden" id="projects">
      {/* Decorative vector meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-teal-400 font-bold tracking-[0.2em] text-xs uppercase">Recent Deployments</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-white"
          >
            Systems <span className="text-gradient">Portfolio</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mt-4 font-medium"
          >
            Hover to initialize telemetry previews and click to access terminal source codes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="relative w-full h-[300px] group [perspective:1200px]"
            >
              {/* Outer standard anchor for click redirect */}
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full h-full"
              >
                {/* Cuboid Body */}
                <div 
                  className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ 
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseEnter={(e) => {
                    if (window.innerWidth < 768) return;
                    const inner = e.currentTarget;
                    inner.style.transform = 'rotateX(90deg)';
                  }}
                  onMouseLeave={(e) => {
                    if (window.innerWidth < 768) return;
                    const inner = e.currentTarget;
                    inner.style.transform = 'rotateX(0deg)';
                  }}
                >
                  {/* Front Face of the Cuboid */}
                  <div 
                    className={`absolute inset-0 w-full h-full bg-slate-950/80 border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-colors duration-500 md:${project.borderColor}`}
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(150px)',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 rounded-2xl pointer-events-none`} />
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="text-xs font-bold tracking-[0.2em] text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                        {project.category}
                      </span>
                      <span className="text-slate-500 text-xs font-mono font-semibold">
                        [ SYSTEM_0{index + 1} ]
                      </span>
                    </div>

                    <div className="relative z-10 my-4">
                      <h3 className="text-3xl font-black text-white tracking-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
                        {project.description}
                      </p>
                    </div>

                    <div className="relative z-10 flex gap-2 flex-wrap">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-slate-500 border border-slate-800 bg-black/40 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Face of the Cuboid (Glow/Preview face) */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-slate-900 border-2 border-teal-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(45,212,191,0.15)]"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateX(-90deg) translateZ(150px)',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                        <span className="text-xs font-mono text-teal-400 tracking-wider font-semibold">PREVIEW ACTIVE (12.4.9)</span>
                      </div>
                      <span className="text-xs font-mono text-slate-500">[ SYSTEM LINK ACCESS ]</span>
                    </div>

                    {/* Telemetry charts / metrics */}
                    <div className="grid grid-cols-3 gap-2 my-auto">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                          <span className="block text-[10px] text-slate-500 font-mono tracking-wider font-semibold mb-1 uppercase">
                            {metric.name}
                          </span>
                          <span className="text-lg md:text-xl font-black text-white font-mono">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-xs text-slate-400 font-medium">Click to initialize connection</span>
                      <span className="text-xs font-bold text-slate-900 bg-gradient-accent px-4 py-1.5 rounded-lg flex items-center gap-1.5 hover:scale-105 transition-transform">
                        ACCESS SOURCE
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
