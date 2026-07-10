import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';

export default function Footer({ socials }) {
  if (!socials) return null;

  const socialLinks = [
    { id: 'twitter', icon: <Twitter className="w-6 h-6" />, url: socials.twitter },
    { id: 'linkedin', icon: <Linkedin className="w-6 h-6" />, url: socials.linkedin },
    { id: 'instagram', icon: <Instagram className="w-6 h-6" />, url: socials.instagram },
    { id: 'github', icon: <Github className="w-6 h-6" />, url: socials.github }
  ].filter(link => link.url && link.url.trim() !== '');

  return (
    <footer className="w-full bg-slate-950 py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center">
        <div className="flex gap-6 mb-8">
          {socialLinks.map((link) => (
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
          ))}
        </div>
        <div className="text-slate-600 text-xs font-mono tracking-widest uppercase text-center">
          © {new Date().getFullYear()} PIXELPEAK. SYSTEM ONLINE.
        </div>
      </div>
    </footer>
  );
}
