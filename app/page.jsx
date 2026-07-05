"use client";

import { useState } from 'react';
import Scene from '@/components/Canvas/Scene';
import Hero from '@/components/UI/Hero';
import About from '@/components/UI/About';
import Statistics from '@/components/UI/Statistics';
import Process from '@/components/UI/Process';
import Services from '@/components/UI/Services';
import Projects from '@/components/UI/Projects';
import Reviews from '@/components/UI/Reviews';
import Contact from '@/components/UI/Contact';

export default function Home() {
  const [formInteracted, setFormInteracted] = useState(false);

  return (
    <main className="relative bg-transparent w-full">
      <Scene formInteracted={formInteracted} setFormInteracted={setFormInteracted} />
      
      <div className="relative z-10 w-full flex flex-col gap-12 pb-24">
        <Hero />
        <About />
        <Services />
        <Process />
        <Statistics />
        <Projects />
        <Reviews />
        <Contact setFormInteracted={setFormInteracted} />
      </div>
    </main>
  );
}
