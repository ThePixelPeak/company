import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export default function Footer({ socials, whatsapp, isEditable, onUpdate }) {
  const socialLinks = [
    { id: 'twitter', icon: <Twitter className="w-6 h-6" />, url: socials?.twitter },
    { id: 'linkedin', icon: <Linkedin className="w-6 h-6" />, url: socials?.linkedin },
    { id: 'instagram', icon: <Instagram className="w-6 h-6" />, url: socials?.instagram },
    { id: 'github', icon: <Github className="w-6 h-6" />, url: socials?.github }
  ].filter(link => link.url && link.url.trim() !== '');

  return (
    <footer className="w-full bg-slate-950 py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center">
        <div className="flex gap-6 mb-8 flex-wrap justify-center w-full">
          {isEditable ? (
            <div className="flex flex-col items-center w-full gap-4">
              <div className="flex gap-4 flex-wrap justify-center">
                {['twitter', 'linkedin', 'instagram', 'github'].map((platform) => (
                  <div key={platform} className="flex flex-col items-center gap-2 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-teal-500 uppercase font-mono tracking-widest">{platform}</span>
                    <input
                      type="text"
                      value={socials?.[platform] || ''}
                      onChange={(e) => onUpdate?.('socials', platform, e.target.value)}
                      className="bg-black/50 border border-slate-700 rounded px-2 py-1 text-xs text-white w-32 md:w-40 text-center focus:outline-none focus:border-teal-500"
                      placeholder={`${platform} URL...`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-2 bg-slate-900/50 p-3 rounded-lg border border-slate-800 w-full max-w-md">
                <span className="text-[10px] text-teal-500 uppercase font-mono tracking-widest">WhatsApp Config</span>
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={whatsapp?.phone || ''}
                    onChange={(e) => onUpdate?.('whatsapp', 'phone', e.target.value)}
                    className="bg-black/50 border border-slate-700 rounded px-2 py-1 text-xs text-white w-1/3 focus:outline-none focus:border-teal-500"
                    placeholder="Phone Number"
                  />
                  <input
                    type="text"
                    value={whatsapp?.message || ''}
                    onChange={(e) => onUpdate?.('whatsapp', 'message', e.target.value)}
                    className="bg-black/50 border border-slate-700 rounded px-2 py-1 text-xs text-white flex-1 focus:outline-none focus:border-teal-500"
                    placeholder="Default message..."
                  />
                </div>
              </div>
            </div>
          ) : (
            socialLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-slate-500 hover:text-teal-400 transition-colors"
              >
                {link.icon}
              </motion.a>
            ))
          )}
        </div>
        <div className="text-slate-600 text-xs font-mono tracking-widest uppercase text-center">
          © {new Date().getFullYear()} PIXELPEAK. SYSTEM ONLINE.
        </div>
      </div>
    </footer>
  );
}
