import { useState } from 'react';
import { Sparkles, Menu, X, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Our Craft', id: 'craft' },
    { label: 'Signature Collections', id: 'portfolio' },
    { label: 'AI Designer Consultant', id: 'ai-consultant' },
    { label: 'Price Estimator', id: 'estimator' },
    { label: 'Locate Store', id: 'location' }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-[#0c0c0b]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Brand matching Immersive design exactly */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleItemClick('hero')}>
            <div className="w-10 h-10 border border-[#c9a050] rotate-45 flex items-center justify-center shrink-0">
              <span className="-rotate-45 font-serif text-[#c9a050] text-xl font-bold">A</span>
            </div>
            <div>
              <span className="font-serif text-xl tracking-widest uppercase text-white block">AIYAN</span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-[#c9a050] block -mt-1 uppercase">EMBROIDERY & HAND WORKS</span>
            </div>
          </div>

          {/* Desktop Navigation with high tracking & gold accent */}
          <nav className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#c9a050]/80">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="hover:text-white transition-colors duration-200 relative py-1 group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c9a050] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center space-x-6">
            <a 
              href="tel:+918024091312" 
              className="flex items-center text-xs font-mono text-[#c9a050]/90 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 mr-1.5 text-[#c9a050]" />
              +91 Call Boutique
            </a>
            <button
              onClick={() => handleItemClick('ai-consultant')}
              className="bg-[#c9a050] text-[#0c0c0b] px-6 py-3 font-bold uppercase text-xs tracking-widest hover:bg-[#b08b40] transition-all duration-300 shadow-md cursor-pointer flex items-center space-x-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#0c0c0b]" />
              <span>AI Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#f4f1ea] hover:text-[#c9a050] p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="md:hidden bg-[#121211] border-b border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="block w-full text-left px-4 py-3 text-[#f4f1ea]/80 hover:bg-[#c9a050]/10 hover:text-[#c9a050] font-sans text-sm font-semibold tracking-wider uppercase rounded-md transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5 px-4 space-y-3">
                <div className="flex items-center text-xs font-mono text-[#a8a29e]">
                  <MapPin className="h-4 w-4 mr-2 text-[#c9a050]" />
                  <span>Sneha Colony, Banashankari, Bangalore</span>
                </div>
                <button
                  onClick={() => handleItemClick('ai-consultant')}
                  className="w-full bg-[#c9a050] text-[#0c0c0b] font-bold uppercase text-xs tracking-widest py-3 text-center block hover:bg-[#b08b40] transition-all duration-300"
                >
                  Start AI Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
