import { useState } from 'react';
import { portfolioItems } from '../data';
import { PortfolioItem } from '../types';
import { Sparkles, Eye, X, ChevronRight, Check, MessageCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioProps {
  onSelectDesign: (details: string) => void;
}

export default function PortfolioSection({ onSelectDesign }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'blouses' | 'saris' | 'jackets' | 'lehengas'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const tabs = [
    { label: 'All Designs', id: 'all' as const },
    { label: 'Bridal Blouses', id: 'blouses' as const },
    { label: 'Saree Borders', id: 'saris' as const },
    { label: 'Designer Jackets', id: 'jackets' as const },
    { label: 'Wedding Lehengas', id: 'lehengas' as const }
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
    const msg = encodeURIComponent(`Hello SK! I am interested in getting the "${item.title}" (${item.category}) done. Can you give me price and timeline details?`);
    window.open(`https://wa.me/919845531210?text=${msg}`, '_blank');
  };

  return (
    <section id="portfolio" className="bg-[#faf7f2] py-16 sm:py-24 border-b border-[#e8dfd3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-[#854d0e] bg-[#fef3c7] border border-[#fde68a]">
            <span>Real Handcrafted Works</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1f1a15] tracking-tight">
            Our Signature Lookbook
          </h2>
          <div className="h-0.5 w-16 bg-[#d97706] mx-auto rounded-full" />
          <p className="text-[#574d43] text-sm sm:text-base leading-relaxed font-normal">
            Take a look at real pieces handcrafted right here in our Banashankari shop. Click any design to view details or send it directly to SK on WhatsApp for a quick estimate!
          </p>
        </div>

        {/* Tab Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#d97706] text-white shadow-sm'
                  : 'bg-white border border-[#e8dfd3] text-[#574d43] hover:text-[#1f1a15] hover:border-[#d97706]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lookbook Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group bg-white border border-[#e8dfd3] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#d97706] transition-all duration-300 warm-card-hover"
              >
                {/* Image Container with view action */}
                <div 
                  className="relative aspect-[4/3] overflow-hidden bg-[#f5efe6] cursor-pointer" 
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="bg-white text-[#1f1a15] font-sans text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center space-x-1.5">
                      <Eye className="h-3.5 w-3.5 text-[#d97706]" />
                      <span>Examine Design</span>
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 bg-white/95 text-[#854d0e] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#fde68a] uppercase shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Info and Actions */}
                <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-[#1f1a15] group-hover:text-[#b45309] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#665e55] leading-relaxed line-clamp-2 font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f5efe6] flex items-center justify-between gap-2">
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="text-[#b45309] hover:text-[#d97706] text-xs font-bold flex items-center cursor-pointer"
                    >
                      <span>View details</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                    </button>

                    <button
                      onClick={() => handleConsultSimilar(item)}
                      className="bg-[#fef3c7] hover:bg-[#d97706] text-[#854d0e] hover:text-white border border-[#fde68a] text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors flex items-center space-x-1"
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white border border-[#e8dfd3] rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative my-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 bg-white/90 border border-[#e8dfd3] text-[#574d43] hover:text-black p-2 rounded-full cursor-pointer shadow-sm"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Left Image */}
                  <div className="md:col-span-6 bg-[#f5efe6] aspect-[4/3] md:aspect-auto md:h-full min-h-[280px]">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right Details */}
                  <div className="md:col-span-6 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#b45309] uppercase tracking-wider block">
                          {selectedItem.category} • SHOP ORIGINAL
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#1f1a15]">
                          {selectedItem.title}
                        </h3>
                      </div>

                      <p className="text-xs text-[#574d43] leading-relaxed font-normal">
                        {selectedItem.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-[#f5efe6]">
                        <h4 className="text-xs font-bold text-[#1f1a15]">
                          Key Stitching Highlights:
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedItem.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-xs text-[#574d43]">
                              <Check className="h-4 w-4 text-[#059669] shrink-0 mr-2 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="pt-4 border-t border-[#f5efe6] space-y-2">
                      <button
                        onClick={() => handleWhatsAppInquiry(selectedItem)}
                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                      >
                        <MessageCircle className="h-4 w-4 fill-current" />
                        <span>Ask SK about this on WhatsApp</span>
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleConsultSimilar(selectedItem)}
                          className="flex-1 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                        >
                          <Sparkles className="h-3.5 w-3.5 fill-white" />
                          <span>Customize with AI</span>
                        </button>

                        <button
                          onClick={() => setSelectedItem(null)}
                          className="px-4 py-2.5 border border-[#e8dfd3] text-[#574d43] font-bold text-xs rounded-xl hover:bg-[#f5efe6] transition-colors cursor-pointer"
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
