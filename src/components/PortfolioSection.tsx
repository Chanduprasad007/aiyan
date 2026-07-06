import { useState } from 'react';
import { portfolioItems } from '../data';
import { PortfolioItem } from '../types';
import { Sparkles, Eye, X, ChevronRight, Check } from 'lucide-react';
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

  return (
    <section id="portfolio" className="bg-[#0c0c0b] py-20 border-b border-white/5 relative">
      {/* Absolute background accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#5c1a1a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-block px-3 py-1 border border-[#c9a050]/30 rounded-full w-max text-[10px] uppercase tracking-widest text-[#c9a050]">
            The Gallery Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">Our Signature Masterpieces</h2>
          <div className="h-0.5 w-16 bg-[#c9a050] mx-auto rounded-full" />
          <p className="font-sans text-[#a8a29e] text-sm leading-relaxed">
            Browse custom-commissioned masterpieces handcrafted in our Banashankari boutique. Select any item to view intricate details or request a custom recreation.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#c9a050] text-[#0c0c0b] shadow-md'
                  : 'bg-[#1a1a18] border border-white/5 text-[#a8a29e] hover:text-[#f4f1ea] hover:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid Display */}
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
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group bg-[#1a1a18] border border-white/5 p-4 flex flex-col justify-end gap-2 hover:border-[#c9a050]/30 transition-all duration-300"
              >
                {/* Image Container with view action */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-900 cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover brightness-95 group-hover:brightness-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="bg-[#c9a050] text-[#0c0c0b] font-sans text-xs font-bold px-5 py-2.5 uppercase tracking-widest flex items-center space-x-1.5 shadow-lg">
                      <Eye className="h-3.5 w-3.5" />
                      <span>Examine Design</span>
                    </span>
                  </div>

                  <span className="absolute top-4 left-4 bg-black/80 text-[#c9a050] font-mono text-[9px] font-semibold tracking-widest px-3 py-1 border border-white/5 uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Info and action */}
                <div className="pt-4 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-base font-bold text-white tracking-wide group-hover:text-[#c9a050] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#a8a29e] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="text-[#c9a050] hover:text-[#b08b40] font-sans text-xs font-bold tracking-wider uppercase flex items-center cursor-pointer"
                    >
                      <span>View details</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                    </button>

                    <button
                      onClick={() => handleConsultSimilar(item)}
                      className="border border-white/10 text-[#f4f1ea] hover:bg-[#c9a050] hover:text-[#0c0c0b] hover:border-[#c9a050] font-mono text-[9px] font-bold tracking-widest uppercase px-3 py-2 cursor-pointer transition-all duration-300 flex items-center space-x-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>AI Recreate</span>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#1a1a18] border border-white/10 rounded overflow-hidden max-w-3xl w-full shadow-2xl relative my-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 bg-black border border-white/10 text-[#f4f1ea] hover:text-[#c9a050] p-2 rounded cursor-pointer transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Left Column Image */}
                  <div className="md:col-span-6 bg-stone-950 aspect-[4/3] md:aspect-auto md:h-full min-h-[300px] relative">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title} 
                      className="w-full h-full object-cover filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right Column details */}
                  <div className="md:col-span-6 p-6 sm:p-8 space-y-6">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] tracking-widest text-[#c9a050] uppercase block">
                        {selectedItem.category} • BOUTIQUE ORIGINAL
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                        {selectedItem.title}
                      </h3>
                    </div>

                    <p className="font-sans text-sm text-[#a8a29e] leading-relaxed font-light">
                      {selectedItem.description}
                    </p>

                    {/* Detailed features bullet check */}
                    <div className="space-y-2.5">
                      <h4 className="font-serif text-xs font-bold text-[#c9a050] uppercase tracking-wider">
                        Tailoring & Needlework Specifications:
                      </h4>
                      <ul className="space-y-2">
                        {selectedItem.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-xs text-[#a8a29e]">
                            <Check className="h-4 w-4 text-[#c9a050] shrink-0 mr-2 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons inside modal */}
                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleConsultSimilar(selectedItem)}
                        className="flex-1 bg-[#c9a050] text-[#0c0c0b] font-bold uppercase text-xs tracking-widest py-3.5 hover:bg-[#b08b40] transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Consult Similar Style</span>
                      </button>

                      <button
                        onClick={() => setSelectedItem(null)}
                        className="px-5 py-3.5 border border-white/10 text-[#a8a29e] hover:text-[#f4f1ea] font-sans text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors cursor-pointer text-center"
                      >
                        Close
                      </button>
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
