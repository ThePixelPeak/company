"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact({ setFormInteracted }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section-container min-h-screen py-8 md:py-32" id="contact">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 w-full flex flex-col md:flex-row items-center gap-16"
      >
        <div className="w-full md:w-1/2 text-left bg-slate-900/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-slate-700/50 shadow-2xl">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Ready to <br/>
            <span className="text-gradient">Scale?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-0 max-w-lg">
            Let's build something extraordinary together. Drop us a message, and we'll engineer your brand's next growth phase.
          </p>
        </div>
        
        <div className="w-full md:w-1/2">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl p-12 rounded-3xl border border-teal-500/30 text-center shadow-[0_0_30px_rgba(20,184,166,0.2)]"
            >
              <h3 className="text-3xl font-black text-white mb-4">Transmission Successful</h3>
              <p className="text-slate-400 font-medium">Our operatives will respond shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-lime-500/5 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative mb-6">
                <input onFocus={() => setFormInteracted(true)} required type="text" id="name" name="name" className="peer w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all placeholder-transparent" placeholder="Name" />
                <label htmlFor="name" className="absolute left-4 top-4 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-teal-400 peer-focus:bg-black px-1 rounded font-medium">Name</label>
              </div>

              <div className="relative mb-6">
                <input onFocus={() => setFormInteracted(true)} required type="email" id="email" name="email" className="peer w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all placeholder-transparent" placeholder="Email" />
                <label htmlFor="email" className="absolute left-4 top-4 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-teal-400 peer-focus:bg-black px-1 rounded font-medium">Email</label>
              </div>

              <div className="relative mb-6">
                <input onFocus={() => setFormInteracted?.(true)} required type="tel" id="phone" name="phone" className="peer w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all placeholder-transparent" placeholder="Phone" />
                <label htmlFor="phone" className="absolute left-4 top-4 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-teal-400 peer-focus:bg-black px-1 rounded font-medium">Phone Number</label>
              </div>

              <div className="relative mb-8">
                <textarea onFocus={() => setFormInteracted(true)} id="message" name="message" rows="4" className="peer w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-1 focus:ring-lime-500 focus:border-lime-500 transition-all resize-none placeholder-transparent" placeholder="Message"></textarea>
                <label htmlFor="message" className="absolute left-4 top-4 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-lime-400 peer-focus:bg-black px-1 rounded font-medium">Message</label>
              </div>

              <motion.button 
                onFocus={() => setFormInteracted(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit" 
                className="relative w-full bg-white text-black font-black tracking-widest uppercase text-sm py-4 rounded-xl hover:bg-slate-200 transition-all flex justify-center items-center overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Transmit"
                )}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
