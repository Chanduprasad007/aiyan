import { useState } from 'react';
import { Terminal, Menu, X, Cpu, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Bento Grid', id: 'bento' },
    { label: 'Pipeline', id: 'pipeline' },
    { label: 'Monitor', id: 'monitor' },
    { label: 'Knowledge', id: 'knowledge' },
    { label: 'Tools', id: 'tools' }
  ];

  const handleItemClick = (id: string) => {
    // If it's a section, scroll to it
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-[#08070a]/80 backdrop-blur-md border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleItemClick('app-header')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <Cpu className="text-white h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-white block leading-tight">AIYAN</span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-violet-400 block font-bold uppercase">AGENT WORKSPACE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-[11px] uppercase tracking-[0.15em] font-semibold text-neutral-400">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="hover:text-white transition-colors duration-200 relative py-1 group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[11px] font-mono text-neutral-400 hover:text-white transition-colors gap-1.5"
            >
              <Github className="h-4 w-4" />
              <span>Repository</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('bento');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-violet-600 text-white px-5 py-2.5 rounded-lg font-bold uppercase text-[10px] tracking-wider hover:bg-violet-500 transition-all duration-300 shadow-md cursor-pointer flex items-center space-x-1.5 border border-violet-500/20"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Launch Sandbox</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-400 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0c11] border-b border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="block w-full text-left px-4 py-3 text-neutral-300 hover:bg-violet-500/10 hover:text-violet-400 font-sans text-xs font-semibold tracking-wider uppercase rounded-md transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5 px-4 space-y-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-xs font-mono text-neutral-400"
                >
                  <Github className="h-4 w-4 mr-2" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    const el = document.getElementById('bento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-violet-600 text-white font-bold uppercase text-[10px] tracking-widest py-3 text-center rounded-lg block hover:bg-violet-500 transition-all duration-300"
                >
                  Launch Sandbox
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
