import { useState } from 'react';
import { Menu, X, Sparkles, Phone, MessageCircle, Scissors, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ApiKeyModal from './ApiKeyModal';
import ownerImg from '../assets/images/owner.png';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  const menuItems = [
    { label: 'Lookbook', id: 'portfolio' },
    { label: 'Meet SK', id: 'owner' },
    { label: 'Estimator & Pricing', id: 'estimator' },
    { label: 'AI Stylist', id: 'ai-consultant' },
    { label: 'Visit Boutique', id: 'location' }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <header id="app-header" className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e8dfd3] font-sans transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Owner Face Mini Badge */}
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => handleItemClick('hero')}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d97706] shadow-md group-hover:scale-105 transition-transform bg-[#fef3c7]">
                  <img 
                    src={ownerImg} 
                    alt="SK - Owner & Master Artisan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#d97706] text-white p-1 rounded-full shadow">
                  <Scissors className="h-2.5 w-2.5" />
                </div>
              </div>

              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#1f1a15] block leading-tight group-hover:text-[#b45309] transition-colors">
                  Aiyan Embroidery
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-[#b45309] block uppercase">
                  Hand Works • Banashankari, Bangalore
                </span>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex gap-7 text-xs uppercase tracking-wider font-semibold text-[#665e55]">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="hover:text-[#b45309] transition-colors duration-200 relative py-1 group cursor-pointer"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d97706] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Actions: WhatsApp, Call, AI Consultant */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* API Key Modal Button */}
              <button
                onClick={() => setIsKeyModalOpen(true)}
                title="Configure Gemini AI Key"
                className="p-2.5 rounded-xl border border-[#e8dfd3] hover:border-[#d97706] text-[#736b63] hover:text-[#b45309] transition-colors cursor-pointer bg-white"
              >
                <Key className="h-4 w-4" />
              </button>

              {/* Direct Call to SK */}
              <a
                href="tel:+919845531210"
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#574d43] hover:text-[#b45309] transition-colors bg-[#f5efe6] border border-[#e8dfd3]"
              >
                <Phone className="h-3.5 w-3.5 text-[#d97706]" />
                <span>Call SK: +91 98455 31210</span>
              </a>

              {/* Instant WhatsApp Quote Button */}
              <a
                href="https://wa.me/919845531210?text=Hello%20SK!%20I%20want%20to%20get%20a%20quote%20for%20my%20blouse%20embroidery."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all duration-300 shadow-sm hover:shadow-md flex items-center space-x-1.5 cursor-pointer"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span>WhatsApp Quote</span>
              </a>

              {/* AI Consultant Button */}
              <button
                onClick={() => handleItemClick('ai-consultant')}
                className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center space-x-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 fill-white" />
                <span>AI Stylist</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="https://wa.me/919845531210"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#25D366] text-white rounded-lg"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#3d342a] hover:text-[#b45309] p-2 focus:outline-none"
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
              className="lg:hidden bg-white border-b border-[#e8dfd3]"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="block w-full text-left px-4 py-3 text-[#3d342a] hover:bg-[#fef3c7] hover:text-[#b45309] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 border-t border-[#e8dfd3] space-y-3 px-2">
                  <a
                    href="tel:+919845531210"
                    className="flex items-center text-xs font-semibold text-[#4a3f35] py-2"
                  >
                    <Phone className="h-4 w-4 mr-2 text-[#d97706]" />
                    <span>Call SK: +91 98455 31210</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href="https://wa.me/919845531210?text=Hello%20SK!%20I%20want%20to%20get%20a%20quote%20for%20my%20blouse%20embroidery."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] text-white font-bold text-xs py-3 text-center rounded-xl flex items-center justify-center gap-1.5 shadow"
                    >
                      <MessageCircle className="h-4 w-4 fill-current" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => handleItemClick('ai-consultant')}
                      className="w-full bg-[#d97706] text-white font-bold text-xs py-3 text-center rounded-xl shadow"
                    >
                      AI Stylist
                    </button>
                  </div>
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
