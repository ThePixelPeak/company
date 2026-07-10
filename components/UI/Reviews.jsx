"use client";

import { motion } from 'framer-motion';

const reviews = [
  {
    name: "Elena Rostova",
    role: "VP of Growth",
    company: "Cyberspace Labs",
    quote: "Pixelpeak engineered our Web3 platform and drove a 340% increase in active users within 3 months. Their engineering is top-tier and their aesthetic sensibility is second to none.",
    stars: 5,
    metric: "340% Growth",
    color: "text-teal-400 bg-teal-500/10",
    avatarBg: "from-teal-500 to-emerald-600"
  },
  {
    name: "Marcus Vance",
    role: "Founder",
    company: "Nova Technologies",
    quote: "The 3D analytics dashboard they built is not just beautiful—it handles our real-time traffic without breaking a sweat. It has completely transformed how our stakeholders visualize backend data.",
    stars: 5,
    metric: "Sub-10ms Latency",
    color: "text-lime-400 bg-lime-500/10",
    avatarBg: "from-lime-500 to-green-600"
  },
  {
    name: "Aria Chen",
    role: "CMO",
    company: "Aetherius",
    quote: "Aesthetic precision combined with mathematical execution. Their digital campaign strategy optimized our CAC down to levels we thought impossible, while building a brand identity that commands attention.",
    stars: 5,
    metric: "-48% CAC",
    color: "text-teal-400 bg-teal-500/10",
    avatarBg: "from-cyan-500 to-teal-600"
  },
  {
    name: "Kaelen Vance",
    role: "Tech Lead",
    company: "Helios Guild",
    quote: "Their Next.js architecture is incredibly fast and clean. Working with their team felt like working with a high-performance special ops unit. The integration of 3D shaders is flawless.",
    stars: 5,
    metric: "90 FPS Render",
    color: "text-lime-400 bg-lime-500/10",
    avatarBg: "from-yellow-500 to-lime-600"
  }
];

export default function Reviews({ data, isEditable, onUpdate }) {
  const currentReviews = data && Array.isArray(data) ? data : reviews;

  return (
    <section className="w-full py-6 md:py-24 relative overflow-hidden" id="reviews">
      {/* Decorative gradient orb */}
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="text-lime-400 font-bold tracking-[0.2em] text-xs uppercase">Transmission Reports</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-white"
          >
            Client <span className="text-gradient">Evaluations</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mt-4 font-medium"
          >
            Read reviews from brands that scaled their products to the next generation.
          </motion.p>
        </div>

        <div className="flex justify-end mb-2 md:hidden">
          <span className="text-[10px] text-lime-400 font-mono tracking-wider animate-pulse flex items-center gap-1.5">
            SWIPE REVIEWS 
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>

        <div className="flex flex-row md:grid md:grid-cols-2 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-4 md:gap-6 lg:gap-8 pb-6 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] w-full">
          {currentReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-10 backdrop-blur-xl flex flex-col justify-between md:hover:bg-white/[0.08] md:hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl w-[85vw] shrink-0 snap-center md:w-auto"
            >
              {/* Subtle accent hover indicator */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent scale-x-0 md:group-hover:scale-x-100 transition-transform duration-700 origin-center" />
              
              <div>
                {/* Header: Stars & Metric Badge */}
                <div className="flex justify-between items-center mb-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(review.stars)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Highlight Metric */}
                  <span 
                    className={`text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full ${review.color} ${isEditable ? 'cursor-text outline-none' : ''}`}
                    contentEditable={isEditable}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => isEditable && onUpdate?.('reviews', `[${index}].metric`, e.currentTarget.textContent)}
                  >
                    {review.metric}
                  </span>
                </div>

                {/* Quote text */}
                <p 
                  className={`text-slate-300 text-sm md:text-lg leading-relaxed italic mb-6 md:mb-8 font-medium ${isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded px-1' : ''}`}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => isEditable && onUpdate?.('reviews', `[${index}].quote`, e.currentTarget.textContent)}
                >
                  "{review.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${review.avatarBg} flex items-center justify-center font-bold text-white shadow-lg`}>
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 
                    className={`text-white font-bold text-base tracking-wide ${isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded px-1' : ''}`}
                    contentEditable={isEditable}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => isEditable && onUpdate?.('reviews', `[${index}].name`, e.currentTarget.textContent)}
                  >
                    {review.name}
                  </h4>
                  <p className="text-slate-400 text-xs font-medium flex gap-1">
                    <span 
                      className={isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded px-1' : ''}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && onUpdate?.('reviews', `[${index}].role`, e.currentTarget.textContent)}
                    >
                      {review.role}
                    </span>
                    at 
                    <span 
                      className={`text-slate-200 ${isEditable ? 'cursor-text outline-none hover:bg-white/10 rounded px-1' : ''}`}
                      contentEditable={isEditable}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => isEditable && onUpdate?.('reviews', `[${index}].company`, e.currentTarget.textContent)}
                    >
                      {review.company}
                    </span>
                  </p>
                </div>
              </div>

              {isEditable && (
                <button 
                  onClick={() => {
                    const newArr = [...currentReviews];
                    newArr.splice(index, 1);
                    onUpdate?.('reviews', 'full_array', newArr);
                  }}
                  className="absolute top-4 right-4 bg-red-500/20 text-red-400 px-2 py-1 text-xs rounded uppercase font-bold hover:bg-red-500/40 z-50"
                >
                  Delete
                </button>
              )}
            </motion.div>
          ))}
          
          {isEditable && (
            <div className="flex items-center justify-center min-w-[300px] md:w-full border-2 border-dashed border-teal-500/30 rounded-xl hover:bg-teal-500/10 cursor-pointer transition-colors p-6 h-[300px]"
                 onClick={() => {
                   const template = { 
                     name: "NEW CLIENT", 
                     role: "Role", 
                     company: "Company", 
                     quote: "Review text here.",
                     stars: 5,
                     metric: "New Metric",
                     color: "text-teal-400 bg-teal-500/10",
                     avatarBg: "from-teal-500 to-emerald-600"
                   };
                   onUpdate?.('reviews', 'full_array', [...currentReviews, template]);
                 }}>
              <span className="text-teal-400 font-bold uppercase tracking-widest">+ Add Review</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
