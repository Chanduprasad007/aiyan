import { useState } from 'react';
import { Menu, X, Sparkles, Phone, MapPin, Key, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ApiKeyModal from './ApiKeyModal';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  const menuItems = [
    { label: 'Lookbook', id: 'portfolio' },
    { label: 'AI Stylist', id: 'ai-consultant' },
    { label: 'The Atelier', id: 'craft' },
    { label: 'Estimator', id: 'estimator' },
    { label: 'Visit Store', id: 'location' }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <header id="app-header" className="sticky top-0 z-50 bg-[#09080b]/90 backdrop-blur-md border-b border-white/10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Tagline */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => handleItemClick('hero')}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#c9a050] to-[#e5c07b] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(201,160,80,0.3)] transition-transform group-hover:scale-105">
                <Scissors className="text-[#09080b] h-5 w-5 rotate-45" />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-widest text-white block leading-tight">
                  AIYAN
                </span>
                <span className="font-mono text-[8px] tracking-[0.25em] text-[#c9a050] block font-bold uppercase">
                  EMBROIDERY & HAND WORKS • BANGALORE
                </span>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-300">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="hover:text-[#c9a050] transition-colors duration-200 relative py-1 group cursor-pointer"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c9a050] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Call To Actions & Settings */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* API Key Modal Button */}
              <button
                onClick={() => setIsKeyModalOpen(true)}
                title="Configure Gemini AI Key"
                className="p-2.5 rounded-xl border border-white/10 hover:border-[#c9a050]/40 text-neutral-400 hover:text-[#c9a050] transition-colors cursor-pointer bg-[#141318]"
              >
                <Key className="h-4 w-4" />
              </button>

              {/* Call Atelier */}
              <a
                href="tel:+919845531210"
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono text-neutral-300 hover:text-[#c9a050] transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#c9a050]" />
                <span>+91 98455 31210</span>
              </a>

              {/* Primary AI Consultant Button */}
              <button
                onClick={() => handleItemClick('ai-consultant')}
                className="bg-[#c9a050] hover:bg-[#b08535] text-[#09080b] px-5 py-2.5 rounded-xl font-bold uppercase text-[11px] tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(201,160,80,0.25)] hover:shadow-[0_0_20px_rgba(201,160,80,0.4)] cursor-pointer flex items-center space-x-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 fill-[#09080b]" />
                <span>Consult AI Stylist</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsKeyModalOpen(true)}
                title="Configure Gemini Key"
                className="p-2 text-neutral-400 hover:text-[#c9a050]"
              >
                <Key className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-neutral-300 hover:text-white p-2 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#141318] border-b border-white/10"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="block w-full text-left px-4 py-3 text-neutral-200 hover:bg-[#c9a050]/10 hover:text-[#c9a050] text-xs font-semibold tracking-widest uppercase rounded-xl transition-all duration-200"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 border-t border-white/10 space-y-3 px-2">
                  <a
                    href="tel:+919845531210"
                    className="flex items-center text-xs font-mono text-neutral-300 py-2"
                  >
                    <Phone className="h-4 w-4 mr-2 text-[#c9a050]" />
                    <span>Direct Atelier: +91 98455 31210</span>
                  </a>
                  
                  <div className="flex items-center text-xs font-sans text-neutral-400 py-1">
                    <MapPin className="h-4 w-4 mr-2 text-[#c9a050]" />
                    <span>Banashankari 3rd Stage, Bangalore</span>
                  </div>

                  <button
                    onClick={() => handleItemClick('ai-consultant')}
                    className="w-full bg-[#c9a050] text-[#09080b] font-bold uppercase text-xs tracking-widest py-3.5 text-center rounded-xl block hover:bg-[#b08535] transition-all duration-300 shadow-md"
                  >
                    Launch AI Stylist
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
      />
    </>
  );
}
