import React, { useState, useEffect } from 'react';
import { 
  occasionOptions, 
  fabricOptions, 
  blouseStyleOptions, 
  coverageOptions 
} from '../data';
import { DesignConsultation, DesignProposal } from '../types';
import { Sparkles, Loader2, Calendar, Scissors, Compass, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConsultantWidgetProps {
  customPreFill?: string;
  onScrollToLocation: () => void;
}

export default function ConsultantWidget({ customPreFill, onScrollToLocation }: ConsultantWidgetProps) {
  const [formData, setFormData] = useState<DesignConsultation>({
    occasion: occasionOptions[0],
    fabric: fabricOptions[0],
    color: 'Crimson Red with Gold Border',
    blouseStyle: blouseStyleOptions[0],
    coverage: 'heavy',
    customDetails: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [proposal, setProposal] = useState<DesignProposal | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill if requested from the portfolio page
  useEffect(() => {
    if (customPreFill) {
      setFormData(prev => ({ ...prev, customDetails: customPreFill }));
      // Scroll to the consultant widget smooth
      const el = document.getElementById('ai-consultant');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [customPreFill]);

  const loadingMessages = [
    'Measuring the dimensions of your fabric...',
    'Spinning traditional golden Zari threads...',
    'Drafting symmetrical floral arches on the blueprint...',
    'Weaving delicate Kundan gem layouts...',
    'Creating your bespoke royal embroidery certificate...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoverageSelect = (value: string) => {
    setFormData(prev => ({ ...prev, coverage: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProposal(null);

    try {
      const response = await fetch('/api/consultant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server error. Please verify configuration.');
      }

      const data: DesignProposal = await response.json();
      setProposal(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'The AI service is initializing or key is missing. Please review local secrets.');
      
      // Provide an exquisite fallback proposal so the app never stays broken or looks blank
      const selectedCoverage = coverageOptions.find(c => c.value === formData.coverage);
      const fallbackProposal: DesignProposal = {
        title: `The Royal Heritage ${formData.occasion.split(' / ')[0]} Ensemble`,
        embroideryStyle: `Premium Handcrafted Zardosi with Traditional Aari Trim`,
        designConcept: `A majestic proposal designed especially for your ${formData.color.toLowerCase()} ${formData.fabric.toLowerCase()}. The back-neckline features a regal deep drop lined with miniature kundan stone arches. The sleeves are designed in high elbow style with heavy alternating panels of diagonal golden zari jaal and micro-pearl lines. This will complement the rich drape of your saree and make a statement.`,
        recommendedMotifs: [
          'Symmetrical matching peacocks on sleeve borders',
          'Intricate floral vine creeper along back neck',
          'Elegant micro-jhumka hanging droplets'
        ],
        embellishments: 'Premium gold metallic Zari thread, pure white glass pearls, ruby-pink Swarovski replica stones, micro kundan brass mounts, and gold seed beads.',
        suggestedColorPairings: [
          'Antique Gold & Champagne',
          'Rich Crimson & Emerald Green accents',
          'Delicate White Pearl'
        ],
        careInstructions: 'Dry clean only. Store wrapped in soft muslin fabric away from direct sunlight to preserve gold thread luster.',
        estimateTimeline: selectedCoverage ? selectedCoverage.timeline : '10-12 Days',
        estimatedBudget: formData.coverage === 'heavy' || formData.coverage === 'royal' ? '₹8,500 - ₹12,000' : '₹3,500 - ₹5,500'
      };
      setProposal(fallbackProposal);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-consultant" className="bg-[#0c0c0b] py-20 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3 py-1 border border-[#c9a050]/30 rounded-full w-max text-[10px] uppercase tracking-widest text-[#c9a050]">
            Intelligent Fashion Design
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide flex items-center justify-center space-x-2.5">
            <Sparkles className="h-7 w-7 text-[#c9a050] shrink-0 fill-[#c9a050]" />
            <span>AI Bridal Embroidery Consultant</span>
          </h2>
          <div className="h-0.5 w-16 bg-[#c9a050] mx-auto rounded-full" />
          <p className="font-sans text-[#a8a29e] text-sm leading-relaxed">
            Enter your saree details or occasion details below. Our advanced AI Stylist, trained in South Indian bridal couture and traditional Maggam work, will instantly formulate an intricate, tailor-made design blueprint.
          </p>
        </div>

        {/* Content Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form inputs column */}
          <div className="lg:col-span-5 bg-[#1a1a18] border border-white/5 p-6 sm:p-8 rounded shadow-xl">
            <h3 className="font-serif text-lg font-bold text-white mb-6 pb-3 border-b border-white/5 flex items-center space-x-2 tracking-wide uppercase">
              <Scissors className="h-4.5 w-4.5 text-[#c9a050]" />
              <span>Define Saree & Blouse Specs</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Occasion Option */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">Celebration Occasion</label>
                <select 
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="w-full bg-[#0c0c0b] border border-white/10 rounded py-2.5 px-3.5 text-[#f4f1ea] text-sm focus:border-[#c9a050] outline-none"
                >
                  {occasionOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Saree Fabric Option */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">Saree/Garment Fabric</label>
                <select 
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleInputChange}
                  className="w-full bg-[#0c0c0b] border border-white/10 rounded py-2.5 px-3.5 text-[#f4f1ea] text-sm focus:border-[#c9a050] outline-none"
                >
                  {fabricOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Saree Color Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">Saree Color & Accents</label>
                <input 
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Mustard yellow with olive green borders"
                  required
                  className="w-full bg-[#0c0c0b] border border-white/10 rounded py-2.5 px-3.5 text-[#f4f1ea] text-sm focus:border-[#c9a050] outline-none"
                />
              </div>

              {/* Blouse style */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">Preferred Neckline / Cut Style</label>
                <select 
                  name="blouseStyle"
                  value={formData.blouseStyle}
                  onChange={handleInputChange}
                  className="w-full bg-[#0c0c0b] border border-white/10 rounded py-2.5 px-3.5 text-[#f4f1ea] text-sm focus:border-[#c9a050] outline-none"
                >
                  {blouseStyleOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Coverage level selector buttons */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">Stitch Density / Coverage</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {coverageOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => handleCoverageSelect(opt.value)}
                      className={`text-left p-3 rounded border text-xs transition-all duration-200 cursor-pointer ${
                        formData.coverage === opt.value
                          ? 'border-[#c9a050] bg-[#c9a050]/10 text-[#c9a050]'
                          : 'border-white/10 bg-[#0c0c0b] text-[#a8a29e] hover:border-[#c9a050]/30'
                      }`}
                    >
                      <span className="font-bold block text-[11px] mb-0.5">{opt.label.split(' (')[0]}</span>
                      <span className="text-[10px] text-[#a8a29e] block leading-tight">{opt.timeline} delivery</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Wishes */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">Custom Motif Wishes / Back-Neck Details</label>
                <textarea 
                  name="customDetails"
                  value={formData.customDetails}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="e.g., Please incorporate elephant motifs and my marriage date on the left sleeve"
                  className="w-full bg-[#0c0c0b] border border-white/10 rounded py-2.5 px-3.5 text-[#f4f1ea] text-sm focus:border-[#c9a050] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a050] text-[#0c0c0b] font-bold uppercase text-xs tracking-widest py-4 hover:bg-[#b08b40] transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-[#0c0c0b]" />
                    <span>Draping Design Specs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-[#0c0c0b] fill-[#0c0c0b]" />
                    <span>Formulate Design Proposal</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Blueprint outputs side */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* Idle State */}
              {!loading && !proposal && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#1a1a18] border border-dashed border-white/10 rounded p-10 text-center h-[540px] flex flex-col items-center justify-center space-y-6"
                >
                  <div className="border border-white/10 p-5 rounded-full shadow-inner">
                    <Compass className="h-10 w-10 text-[#c9a050] animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-bold text-white tracking-wide uppercase">Blueprint Workspace Idle</h4>
                    <p className="font-sans text-xs text-[#a8a29e] max-w-md mx-auto leading-relaxed">
                      Fill out the form with your saree colors and neckline choice, then click formulate. Your live customized embroidery proposal card will render here.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Loading State */}
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#1a1a18] border border-white/5 rounded p-10 text-center h-[540px] flex flex-col items-center justify-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-white/10 border-t-[#c9a050] rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-[#c9a050] animate-bounce" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest animate-pulse">
                      FORMULATING ROYAL DESIGN
                    </h4>
                    <p className="font-mono text-xs text-[#c9a050] h-6">
                      {loadingMessages[loadingStep]}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Success Proposal Certificate */}
              {proposal && !loading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative bg-[#1a1a18] border border-[#c9a050]/30 rounded p-6 sm:p-8 shadow-2xl"
                >
                  {/* Watermark Logo Back */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center overflow-hidden">
                    <Scissors className="w-96 h-96 text-[#c9a050]" />
                  </div>

                  {/* Top Decorative Border lines */}
                  <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/5 pointer-events-none rounded" />
                  
                  {/* Warning banner if we are using fallback design */}
                  {error && (
                    <div className="mb-4 bg-[#5c1a1a]/20 border border-[#5c1a1a]/40 p-3 rounded flex items-start space-x-2 text-rose-300 font-sans text-xs relative z-10">
                      <ShieldAlert className="h-4.5 w-4.5 shrink-0 text-rose-500 mt-0.5" />
                      <div>
                        <span className="font-bold">Offline Designer Activated:</span> This exquisite blueprint has been loaded locally from our heritage collections. Connect a valid API key in Settings to enjoy instant personalized generative drafts.
                      </div>
                    </div>
                  )}

                  {/* Header Title certificate style */}
                  <div className="text-center space-y-2 relative z-10">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#c9a050] block">AIYAN EMBROIDERY STUDIO BLUEPRINT</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wider border-b border-white/5 pb-4 uppercase">
                      {proposal.title}
                    </h3>
                  </div>

                  {/* Certificate Specs Detail Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 relative z-10">
                    
                    {/* Left Column Description */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider">Embroidery Weaving Style</span>
                        <h4 className="font-serif text-sm font-bold text-white tracking-wide">{proposal.embroideryStyle}</h4>
                      </div>

                      <div className="space-y-1.5">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider">Visual Design Concept</span>
                        <p className="font-sans text-xs text-[#a8a29e] leading-relaxed font-light">{proposal.designConcept}</p>
                      </div>

                      {/* Motifs Grid */}
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider">Recommended Motifs</span>
                        <div className="flex flex-wrap gap-2">
                          {proposal.recommendedMotifs.map((motif, i) => (
                            <span key={i} className="bg-black/40 border border-white/5 text-[#f4f1ea] font-sans text-[11px] px-3.5 py-1 rounded-full">
                              🌟 {motif}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Embellishments material */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider">Premium Embellishment Beads & Threads</span>
                        <p className="font-sans text-xs text-[#a8a29e] font-light leading-relaxed">{proposal.embellishments}</p>
                      </div>
                    </div>

                    {/* Right Column Specs */}
                    <div className="md:col-span-4 space-y-4.5 bg-black/40 border border-white/5 p-4.5 rounded">
                      {/* Color pairings */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-[8px] text-[#c9a050] block uppercase tracking-wider">Color Harmony</span>
                        <div className="flex flex-col space-y-1">
                          {proposal.suggestedColorPairings.map((col, i) => (
                            <span key={i} className="text-[#a8a29e] font-sans text-xs flex items-center">
                              <span className="h-1.5 w-1.5 bg-[#c9a050] rounded-full mr-2" />
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Care info */}
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-[#c9a050] block uppercase tracking-wider">Garment Care</span>
                        <p className="font-sans text-[10px] text-[#a8a29e] leading-normal">{proposal.careInstructions}</p>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-0.5 pt-2 border-t border-white/5">
                        <span className="font-mono text-[8px] text-[#c9a050] block uppercase tracking-wider">Est. Handcraft Time</span>
                        <span className="font-sans text-xs font-bold text-white">{proposal.estimateTimeline}</span>
                      </div>

                      {/* Estimated Budget */}
                      <div className="space-y-0.5">
                        <span className="font-mono text-[8px] text-[#c9a050] block uppercase tracking-wider">Est. Work Budget</span>
                        <span className="font-serif text-sm font-black text-[#c9a050]">{proposal.estimatedBudget}</span>
                      </div>
                    </div>

                  </div>

                  {/* Interactive Button Quote */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                    <p className="font-sans text-[10px] text-[#a8a29e] leading-relaxed text-center sm:text-left">
                      Estimates are for handwork details. Final prices may vary slightly based on blouse stitching/lining preferences.
                    </p>
                    
                    <button
                      onClick={onScrollToLocation}
                      className="w-full sm:w-auto bg-[#c9a050] text-[#0c0c0b] font-bold uppercase text-xs tracking-widest px-6 py-3.5 hover:bg-[#b08b40] transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Calendar className="h-3.5 w-3.5 text-[#0c0c0b]" />
                      <span>Book Consultation</span>
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
