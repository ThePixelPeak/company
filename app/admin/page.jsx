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
import { databases, account, DB_ID, COLLECTION_ID } from '@/lib/appwrite';

const Divider = () => (
  <div className="w-full flex justify-center py-2 md:py-4 opacity-50 relative z-10 pointer-events-none">
    <div className="w-2/3 md:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-[0_0_15px_rgba(45,212,191,0.6)]" />
  </div>
);

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [formInteracted, setFormInteracted] = useState(false);
  const [cmsData, setCmsData] = useState(null);
  const [documentMap, setDocumentMap] = useState({});
  const [saveStatus, setSaveStatus] = useState('');

  // Check Session
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await account.get();
      setUser(session);
      fetchContent();
    } catch (err) {
      setUser(null);
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      await checkSession();
    } catch (err) {
      alert("Login failed. Check console or create an account in Appwrite first.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const fetchContent = async () => {
    try {
      const response = await databases.listDocuments(DB_ID, COLLECTION_ID);
      const dataMap = {};
      const docMap = {};
      response.documents.forEach(doc => {
        dataMap[doc.section] = JSON.parse(doc.data);
        docMap[doc.section] = doc.$id;
      });
      setCmsData(dataMap);
      setDocumentMap(docMap);
    } catch (err) {
      console.error("Failed to fetch CMS data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (section, field, value) => {
    setCmsData(prev => {
      const newData = { ...prev };
      
      if (field === 'full_array') {
        newData[section] = value;
      }
      // Handle nested fields like "[0].title"
      else if (field.includes('[')) {
        const matches = field.match(/\[(\d+)\]\.(.+)/);
        if (matches) {
          const idx = parseInt(matches[1]);
          const key = matches[2];
          const arr = [...newData[section]];
          arr[idx] = { ...arr[idx], [key]: value };
          newData[section] = arr;
        }
      } else {
        newData[section] = { ...newData[section], [field]: value };
      }
      return newData;
    });
  };

  const handleSaveAll = async () => {
    setSaveStatus('Saving...');
    try {
      const promises = Object.keys(cmsData).map(section => {
        const docId = documentMap[section];
        if (docId) {
          return databases.updateDocument(DB_ID, COLLECTION_ID, docId, {
            data: JSON.stringify(cmsData[section])
          });
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
      setSaveStatus('All changes saved!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('Error saving changes!');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-teal-400 font-mono animate-pulse">INITIALIZING SECURE UPLINK...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-slate-900 pointer-events-none" />
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl relative z-10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <span className="text-teal-400 font-black text-2xl tracking-widest uppercase">Admin Access</span>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Email Override</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Passcode</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors"
                required
              />
            </div>
            <button 
              type="submit"
              className="mt-4 w-full py-4 bg-teal-500 hover:bg-teal-400 text-black font-black uppercase tracking-widest rounded-lg transition-colors"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!cmsData) return null;

  return (
    <main className="relative bg-transparent w-full">
      {/* Floating Admin Toolbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-teal-500/30 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-teal-400 font-black tracking-widest uppercase text-sm">Visual CMS Active</span>
          <span className="text-xs text-slate-400 font-mono hidden md:inline-block">Click any text to edit directly.</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.getElementById('metadata-panel').classList.toggle('hidden')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase tracking-widest rounded-lg transition-colors text-xs border border-slate-600"
          >
            Settings
          </button>
          {saveStatus && (
            <span className={`text-sm font-mono ${saveStatus.includes('Error') ? 'text-red-400' : 'text-teal-400'}`}>
              {saveStatus}
            </span>
          )}
          <button 
            onClick={handleSaveAll}
            className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-black font-black uppercase tracking-widest rounded-lg transition-colors shadow-[0_0_15px_rgba(20,184,166,0.3)] text-sm"
          >
            Save All Changes
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-lg font-bold text-xs uppercase transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>

      <div id="metadata-panel" className="hidden relative z-40 w-full bg-slate-900 border-b border-slate-700 p-8 pt-24 mt-16 shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-teal-400 font-black uppercase tracking-widest mb-4">WhatsApp Configuration</h3>
            <div className="space-y-4">
              <input type="text" value={cmsData.whatsapp?.phone || ''} onChange={(e) => handleUpdate('whatsapp', 'phone', e.target.value)} placeholder="Phone Number" className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm" />
              <textarea value={cmsData.whatsapp?.message || ''} onChange={(e) => handleUpdate('whatsapp', 'message', e.target.value)} placeholder="Default Message" className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white text-sm h-24" />
            </div>
          </div>
          <div>
            <h3 className="text-teal-400 font-black uppercase tracking-widest mb-4">Social Links</h3>
            <div className="space-y-4">
              {['twitter', 'linkedin', 'instagram', 'github'].map(platform => (
                <div key={platform} className="flex items-center gap-4">
                  <span className="w-24 text-slate-400 text-sm uppercase">{platform}</span>
                  <input type="text" value={cmsData.socials?.[platform] || ''} onChange={(e) => handleUpdate('socials', platform, e.target.value)} placeholder={`${platform} URL`} className="flex-1 bg-slate-950 border border-slate-800 rounded p-2 text-white text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Scene formInteracted={formInteracted} setFormInteracted={setFormInteracted} />
      
      <div className="relative z-10 w-full flex flex-col gap-4 md:gap-12 pb-16 pt-20">
        <Hero data={cmsData.hero} isEditable={true} onUpdate={handleUpdate} />
        <Divider />
        <About data={cmsData.about} isEditable={true} onUpdate={handleUpdate} />
        <Divider />
        <Services data={cmsData.services} isEditable={true} onUpdate={handleUpdate} />
        <Divider />
        <Process data={cmsData.process} isEditable={true} onUpdate={handleUpdate} />
        <Divider />
        <Statistics data={cmsData.statistics} isEditable={true} onUpdate={handleUpdate} />
        <Divider />
        <Projects data={cmsData.projects} isEditable={true} onUpdate={handleUpdate} />
        <Divider />
        <Reviews data={cmsData.reviews} isEditable={true} onUpdate={handleUpdate} />
        <Divider />
        <Contact setFormInteracted={setFormInteracted} />
      </div>
      <Footer socials={cmsData.socials} />
    </main>
  );
}
