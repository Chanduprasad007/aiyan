import { useState } from 'react';
import { portfolioItems } from '../data';
import { PortfolioItem } from '../types';
import { Sparkles, Eye, X, ChevronRight, Check, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioProps {
  onSelectDesign: (details: string) => void;
}

export default function PortfolioSection({ onSelectDesign }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'blouses' | 'saris' | 'jackets' | 'lehengas'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const tabs = [
    { label: 'All Creations', id: 'all' as const },
    { label: 'Bridal Blouses', id: 'blouses' as const },
    { label: 'Saree Borders', id: 'saris' as const },
    { label: 'Designer Jackets', id: 'jackets' as const },
    { label: 'Luxury Lehengas', id: 'lehengas' as const }
  ];

  const filteredItems = activeTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab);

  const handleConsultSimilar = (item: PortfolioItem) => {
    const detailsString = `Inspired by "${item.title}": I love the ${item.description.toLowerCase()} details such as ${item.details.slice(0, 2).join(' and ').toLowerCase()}.`;
    onSelectDesign(detailsString);
    setSelectedItem(null);
  };

  const handleWhatsAppInquiry = (item: PortfolioItem) => {
    const msg = encodeURIComponent(`Hello Aiyan Embroidery! I am interested in ordering/customizing the "${item.title}" (${item.category}). Here are the details from your lookbook: ${item.description}`);
    window.open(`https://wa.me/919845531210?text=${msg}`, '_blank');
  };

  return (
    <section id="portfolio" className="bg-[#09080b] py-20 sm:py-28 border-b border-white/5 relative">
      
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#c9a050]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-block px-4 py-1 border border-[#c9a050]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9a050] bg-[#141318]">
            The Atelier Lookbook
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Signature Masterpieces
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#c9a050] to-transparent mx-auto rounded-full" />
          <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
            Browse custom-commissioned bridal blouses, jackets, and saree borders handcrafted in our Banashankari atelier. Click any piece to examine intricate needlework or consult our AI designer to recreate it with your saree colors.
          </p>
        </div>

        {/* Tab Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#c9a050] text-[#09080b] shadow-[0_0_15px_rgba(201,160,80,0.3)]'
                  : 'bg-[#141318] border border-white/10 text-neutral-300 hover:text-white hover:border-[#c9a050]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lookbook Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group bg-[#141318] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#c9a050]/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Image Container with view action */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden bg-neutral-900 cursor-pointer" 
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover brightness-95 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="bg-[#c9a050] text-[#09080b] font-sans text-xs font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider flex items-center space-x-1.5 shadow-lg">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Examine Design</span>
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 bg-[#09080b]/80 backdrop-blur-md text-[#c9a050] font-mono text-[9px] font-bold tracking-widest px-3 py-1 rounded-lg border border-white/10 uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Info and Actions */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-cinzel text-base font-bold text-white tracking-wide group-hover:text-[#c9a050] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-300 leading-relaxed line-clamp-2 font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="text-[#c9a050] hover:text-[#e5c07b] font-sans text-xs font-bold tracking-wider uppercase flex items-center cursor-pointer"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                    </button>

                    <button
                      onClick={() => handleConsultSimilar(item)}
                      className="bg-white/5 hover:bg-[#c9a050] text-neutral-200 hover:text-[#09080b] border border-white/10 hover:border-[#c9a050] font-mono text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 flex items-center space-x-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>AI Adapt</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Detailed Examine */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#141318] border border-[#c9a050]/30 rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl relative my-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 bg-black/80 border border-white/15 text-white hover:text-[#c9a050] p-2 rounded-xl cursor-pointer transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Left Column Image */}
                  <div className="md:col-span-6 bg-neutral-950 aspect-[4/3] md:aspect-auto md:h-full min-h-[300px] relative">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title} 
                      className="w-full h-full object-cover filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right Column Details */}
                  <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] tracking-widest text-[#c9a050] uppercase block font-bold">
                          {selectedItem.category} • ATELIER ORIGINAL
                        </span>
                        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                          {selectedItem.title}
                        </h3>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                        {selectedItem.description}
                      </p>

                      {/* Tailoring & Needlework Specifications */}
                      <div className="space-y-2.5 pt-2">
                        <h4 className="font-mono text-[10px] font-bold text-[#c9a050] uppercase tracking-widest">
                          Needlework & Tailoring Specifications:
                        </h4>
                        <ul className="space-y-2">
                          {selectedItem.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-xs text-neutral-300">
                              <Check className="h-4 w-4 text-[#c9a050] shrink-0 mr-2 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action buttons inside modal */}
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                      <button
                        onClick={() => handleConsultSimilar(selectedItem)}
                        className="w-full bg-[#c9a050] hover:bg-[#b08535] text-[#09080b] font-bold uppercase text-xs tracking-wider py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                      >
                        <Sparkles className="h-4 w-4 fill-[#09080b]" />
                        <span>Recreate Design with AI Stylist</span>
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleWhatsAppInquiry(selectedItem)}
                          className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold uppercase text-xs tracking-wider py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <MessageCircle className="h-4 w-4 fill-current" />
                          <span>Inquire on WhatsApp</span>
                        </button>

                        <button
                          onClick={() => setSelectedItem(null)}
                          className="px-5 py-3 border border-white/15 text-neutral-300 hover:text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
