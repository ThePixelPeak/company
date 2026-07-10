"use client";

import { useState, useEffect } from 'react';
import Scene from '@/components/Canvas/Scene';
import Hero from '@/components/UI/Hero';
import About from '@/components/UI/About';
import Statistics from '@/components/UI/Statistics';
import Process from '@/components/UI/Process';
import Services from '@/components/UI/Services';
import Projects from '@/components/UI/Projects';
import Reviews from '@/components/UI/Reviews';
import Contact from '@/components/UI/Contact';
import Footer from '@/components/UI/Footer';
import LoadingScreen from '@/components/UI/LoadingScreen';
import { databases, DB_ID, COLLECTION_ID } from '@/lib/appwrite';

const Divider = () => (
  <div className="w-full flex justify-center py-2 md:py-4 opacity-50 relative z-10 pointer-events-none">
    <div className="w-2/3 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-[0_0_15px_rgba(45,212,191,0.6)]" />
  </div>
);

export default function Home() {
  const [formInteracted, setFormInteracted] = useState(false);
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaderFinished, setLoaderFinished] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await databases.listDocuments(DB_ID, COLLECTION_ID);
        const dataMap = {};
        response.documents.forEach(doc => {
          dataMap[doc.section] = JSON.parse(doc.data);
        });
        setCmsData(dataMap);
      } catch (err) {
        console.error("Failed to fetch CMS data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (loaderFinished) {
      // Force GSAP ScrollTrigger to recalculate now that the main container has expanded
      window.dispatchEvent(new Event('resize'));
    }
  }, [loaderFinished]);

  return (
    <>
      {!loaderFinished && (
        <LoadingScreen 
          isLoading={loading || !cmsData} 
          onComplete={() => setLoaderFinished(true)} 
        />
      )}

      {/* Render actual DOM structure once data exists, it will be hidden by the absolute LoadingScreen overlay */}
      {cmsData && (
        <main className={`relative bg-transparent w-full ${!loaderFinished ? 'h-screen overflow-hidden' : ''}`}>
          <Scene formInteracted={formInteracted} setFormInteracted={setFormInteracted} />
      
      <div className="relative z-10 w-full flex flex-col gap-4 md:gap-12 pb-16">
        <Hero data={cmsData.hero} />
        <Divider />
        <About data={cmsData.about} />
        <Divider />
        <Services data={cmsData.services} />
        <Divider />
        <Process data={cmsData.process} />
        <Divider />
        <Statistics data={cmsData.statistics} />
        <Divider />
        <Projects data={cmsData.projects} />
        <Divider />
        <Reviews data={cmsData.reviews} />
        <Divider />
          <Contact setFormInteracted={setFormInteracted} />
        </div>
        <Footer socials={cmsData.socials} />
      </main>
      )}
    </>
  );
}
