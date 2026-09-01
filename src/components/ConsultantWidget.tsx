import React, { useState, useEffect } from 'react';
import { 
  occasionOptions, 
  fabricOptions, 
  blouseStyleOptions, 
  coverageOptions 
} from '../data';
import { DesignConsultation, DesignProposal } from '../types';
import { Sparkles, Loader2, Calendar, Scissors, Compass, MessageCircle, Printer, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

interface ConsultantWidgetProps {
  customPreFill?: string;
  onScrollToLocation: () => void;
}

export default function ConsultantWidget({ customPreFill, onScrollToLocation }: ConsultantWidgetProps) {
  const [formData, setFormData] = useState<DesignConsultation>({
    occasion: occasionOptions[0],
    fabric: fabricOptions[0],
    color: 'Crimson Red with Gold Zari Border',
    blouseStyle: blouseStyleOptions[0],
    coverage: 'heavy',
    customDetails: ''
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [proposal, setProposal] = useState<DesignProposal | null>(null);
  const [copied, setCopied] = useState(false);

  // Pre-fill if requested from lookbook or estimator
  useEffect(() => {
    if (customPreFill) {
      setFormData(prev => ({ ...prev, customDetails: customPreFill }));
      const el = document.getElementById('ai-consultant');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [customPreFill]);

  const loadingMessages = [
    'Measuring dimensions and drape of your base fabric...',
    'Spinning traditional golden Zari and metallic threads...',
    'Drafting symmetrical temple peacock and lotus arches...',
    'Weaving delicate Kundan gemstones and pearl bead layouts...',
    'Formulating your bespoke royal atelier blueprint certificate...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
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

  // Generate intelligent tailored fallback proposal if offline / no API key
  const generateTailoredFallback = (data: DesignConsultation): DesignProposal => {
    const selectedCoverage = coverageOptions.find(c => c.value === data.coverage) || coverageOptions[2];
    const isBridal = data.occasion.toLowerCase().includes('wedding') || data.occasion.toLowerCase().includes('bridal');
    const isVelvet = data.fabric.toLowerCase().includes('velvet');
    const isSilk = data.fabric.toLowerCase().includes('silk');

    const styleName = isBridal 
      ? `Royal Antique Zardosi with Fine Aari Border & Kundan Accents`
      : `Delicate Floral Silk-Thread & Cutwork Scalloped Embroidery`;

    const motifs = isBridal 
      ? [
          'Symmetrical Dancing Peacocks on the back neckline',
          'Intricate Lotus creeper jaal on elbow-length sleeves',
          'Miniature hanging Jhumka droplets with pearl fringes',
          'Traditional temple kalash and coin border detailing'
        ]
      : [
          'Scalloped floral vine creepers along front and back neck',
          'Geometric diamond jaal with micro-sequin highlights',
          'Dainty rosebud clusters on sleeve hems'
        ];

    const embellishments = isVelvet
      ? 'Pure copper-gold metallic Zari coils, burgundy gemstone droplets, micro glass beads, and Austrian crystal highlights.'
      : 'Antique 24k gold finish Zari thread, natural freshwater replica pearls, ruby-pink kundan stones, and hand-twisted silk floss.';

    const colorPairings = data.color.toLowerCase().includes('red') || data.color.toLowerCase().includes('crimson')
      ? ['Antique Gold & Warm Champagne', 'Emerald Green accents', 'Ivory Pearl highlights']
      : data.color.toLowerCase().includes('yellow') || data.color.toLowerCase().includes('mustard')
      ? ['Deep Maroon & Royal Magenta', 'Gilded Gold Zari', 'Forest Green touches']
      : ['Antique Matt Gold', 'Rich Jewel Tones', 'Glistening Silver Sequins'];

    const designConcept = `A bespoke couture proposal meticulously curated for your ${data.color.toLowerCase()} ${data.fabric.toLowerCase()}. The ${data.blouseStyle.toLowerCase()} is designed with a regal contour featuring deep artisan borders and double-needle Maggam anchoring. The back layout captures exquisite symmetrical balance, seamlessly integrating ${data.customDetails ? `your custom wishes ("${data.customDetails}")` : 'traditional heritage bridal motifs'} while maintaining perfect drape and structural comfort.`;

    return {
      title: `The Royal Heritage ${data.occasion.split(' / ')[0]} Ensemble`,
      embroideryStyle: styleName,
      designConcept: designConcept,
      recommendedMotifs: motifs,
      embellishments: embellishments,
      suggestedColorPairings: colorPairings,
      careInstructions: 'Dry clean only. Store wrapped in pure unbleached muslin fabric away from moisture to preserve gold Zari luster for decades.',
      estimateTimeline: selectedCoverage.timeline,
      isAiGenerated: false
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProposal(null);

    let generatedProposal: DesignProposal | null = null;

    // 1. Try Backend API first if server is running
    try {
      const response = await fetch('/api/consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        if (result && result.title) {
          generatedProposal = { ...result, isAiGenerated: true };
        }
      }
    } catch (apiErr) {
      // Backend not available (e.g. static hosting on GitHub Pages)
    }

    // 2. Try Client-side Google GenAI if user provided API key or in Vite env
    if (!generatedProposal) {
      const clientApiKey = localStorage.getItem('AIYAN_GEMINI_API_KEY') || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (clientApiKey) {
        try {
          const aiClient = new GoogleGenAI({ apiKey: clientApiKey });
          const systemPrompt = `You are an elite master fashion designer and bridal embroidery specialist at "Aiyan Embroidery And Hand Works", a prestigious boutique in Bangalore. 
Generate a personalized, high-end design proposal in valid JSON format with keys:
"title", "embroideryStyle", "designConcept", "recommendedMotifs" (array of 3-4 strings), "embellishments" (string), "suggestedColorPairings" (array of strings), "careInstructions" (string), "estimateTimeline" (string).`;
          
          const prompt = `Formulate a bridal hand embroidery design for:
Occasion: ${formData.occasion}
Fabric: ${formData.fabric}
Color: ${formData.color}
Neckline: ${formData.blouseStyle}
Coverage: ${formData.coverage}
Notes: ${formData.customDetails || "No additional notes"}`;

          const res = await aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: "application/json",
              temperature: 0.7
            }
          });

          if (res.text) {
            const parsed = JSON.parse(res.text.trim());
            generatedProposal = { ...parsed, isAiGenerated: true };
          }
        } catch (clientAiErr) {
          console.warn("Client-side Gemini API call failed, falling back to crafted blueprint:", clientAiErr);
        }
      }
    }

    // 3. Fallback to tailored generative craft engine
    if (!generatedProposal) {
      // Small simulated delay for organic feel
      await new Promise(r => setTimeout(r, 1200));
      generatedProposal = generateTailoredFallback(formData);
    }

    setProposal(generatedProposal);
    setLoading(false);
  };

  const handleWhatsAppBlueprint = () => {
    if (!proposal) return;
    const text = `*AIYAN EMBROIDERY BANGALORE - DESIGN BLUEPRINT*\n\n` +
      `*Design:* ${proposal.title}\n` +
      `*Style:* ${proposal.embroideryStyle}\n` +
      `*Occasion:* ${formData.occasion}\n` +
      `*Fabric & Color:* ${formData.fabric} (${formData.color})\n` +
      `*Neckline:* ${formData.blouseStyle}\n` +
      `*Timeline:* ${proposal.estimateTimeline}\n\n` +
      `*Design Concept:* ${proposal.designConcept}\n\n` +
      `*Motifs:* ${proposal.recommendedMotifs.join(', ')}\n\n` +
      `*Embellishments:* ${proposal.embellishments}\n\n` +
      `Please let me know consultation availability and pricing for this specification.`;

    window.open(`https://wa.me/919845531210?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="ai-consultant" className="bg-[#09080b] py-20 sm:py-28 border-b border-white/5 relative">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c9a050]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 border border-[#c9a050]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9a050] bg-[#141318]">
            <Sparkles className="h-3 w-3 fill-[#c9a050]" />
            <span>AI Bridal Stylist</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center space-x-3">
            <span>AI Bridal Embroidery Consultant</span>
          </h2>
          
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#c9a050] to-transparent mx-auto rounded-full" />
          
          <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Enter your saree details and preferred neckline below. Our intelligent bridal stylist, trained in authentic South Indian couture and Maggam loom craftsmanship, will formulate a bespoke handwork design blueprint certificate.
          </p>
        </div>

        {/* Content Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Inputs Column */}
          <div className="lg:col-span-5 bg-[#141318] border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
            <h3 className="font-cinzel text-base font-bold text-white pb-3 border-b border-white/10 flex items-center space-x-2 tracking-wide uppercase">
              <Scissors className="h-4 w-4 text-[#c9a050]" />
              <span>Define Saree & Blouse Specs</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Occasion Option */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                  Celebration Occasion
                </label>
                <select 
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="w-full bg-[#09080b] border border-white/15 rounded-xl py-2.5 px-3.5 text-neutral-200 text-sm focus:border-[#c9a050] outline-none"
                >
                  {occasionOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Saree Fabric Option */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                  Saree / Garment Fabric
                </label>
                <select 
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleInputChange}
                  className="w-full bg-[#09080b] border border-white/15 rounded-xl py-2.5 px-3.5 text-neutral-200 text-sm focus:border-[#c9a050] outline-none"
                >
                  {fabricOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Saree Color Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                  Saree Color & Accent Tones
                </label>
                <input 
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Mustard yellow with bottle green borders"
                  required
                  className="w-full bg-[#09080b] border border-white/15 rounded-xl py-2.5 px-3.5 text-neutral-200 text-sm focus:border-[#c9a050] outline-none font-sans"
                />
              </div>

              {/* Blouse Style */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                  Preferred Neckline & Sleeve Cut
                </label>
                <select 
                  name="blouseStyle"
                  value={formData.blouseStyle}
                  onChange={handleInputChange}
                  className="w-full bg-[#09080b] border border-white/15 rounded-xl py-2.5 px-3.5 text-neutral-200 text-sm focus:border-[#c9a050] outline-none"
                >
                  {blouseStyleOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Coverage Density Buttons */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                  Stitch Density / Coverage
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {coverageOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => handleCoverageSelect(opt.value)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
                        formData.coverage === opt.value
                          ? 'border-[#c9a050] bg-[#c9a050]/15 text-[#c9a050]'
                          : 'border-white/10 bg-[#09080b] text-neutral-300 hover:border-[#c9a050]/30'
                      }`}
                    >
                      <span className="font-bold block text-[11px] mb-0.5">{opt.label.split(' (')[0]}</span>
                      <span className="text-[10px] text-neutral-400 block leading-tight">{opt.timeline}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Wishes */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                  Custom Motif Wishes & Notes
                </label>
                <textarea 
                  name="customDetails"
                  value={formData.customDetails}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="e.g., Incorporate elephant motifs and marriage date on sleeve..."
                  className="w-full bg-[#09080b] border border-white/15 rounded-xl py-2.5 px-3.5 text-neutral-200 text-sm focus:border-[#c9a050] outline-none resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a050] hover:bg-[#b08535] text-[#09080b] font-bold uppercase text-xs tracking-wider py-4 rounded-xl transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-[#09080b]" />
                    <span>Draping Design Specs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 fill-[#09080b]" />
                    <span>Formulate Design Blueprint</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Blueprint Outputs Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* Idle State */}
              {!loading && !proposal && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#141318] border border-dashed border-white/15 rounded-2xl p-10 text-center h-[560px] flex flex-col items-center justify-center space-y-6"
                >
                  <div className="border border-[#c9a050]/30 p-6 rounded-full bg-[#09080b]">
                    <Compass className="h-10 w-10 text-[#c9a050] animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-cinzel text-lg font-bold text-white tracking-wide uppercase">
                      Atelier Blueprint Workspace Ready
                    </h4>
                    <p className="font-sans text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                      Select your saree colors and neckline choice, then click formulate. Your personalized royal embroidery certificate blueprint will generate here instantly.
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
                  className="bg-[#141318] border border-white/10 rounded-2xl p-10 text-center h-[560px] flex flex-col items-center justify-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-white/10 border-t-[#c9a050] rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto h-7 w-7 text-[#c9a050] animate-bounce" />
                  </div>
                  <div className="space-y-3 max-w-md">
                    <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-widest animate-pulse">
                      FORMULATING BESPOKE BRIDAL BLUEPRINT
                    </h4>
                    <p className="font-mono text-xs text-[#c9a050] h-8 leading-relaxed">
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
                  className="relative bg-[#141318] border border-[#c9a050]/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
                >
                  {/* Decorative Certificate Inner Border */}
                  <div className="absolute top-3 left-3 right-3 bottom-3 border border-white/5 pointer-events-none rounded-xl" />

                  {/* Header Title Certificate Style */}
                  <div className="text-center space-y-2 relative z-10">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#c9a050] block font-bold">
                      AIYAN EMBROIDERY ATELIER • BESPOKE DESIGN CERTIFICATE
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wider border-b border-white/10 pb-4 uppercase">
                      {proposal.title}
                    </h3>
                  </div>

                  {/* Specs Detail Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 relative z-10">
                    
                    {/* Left Column Description */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider font-bold">
                          Embroidery Style & Technique
                        </span>
                        <h4 className="font-cinzel text-sm font-bold text-white tracking-wide">
                          {proposal.embroideryStyle}
                        </h4>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider font-bold">
                          Visual Design Concept
                        </span>
                        <p className="font-sans text-xs text-neutral-300 leading-relaxed font-light">
                          {proposal.designConcept}
                        </p>
                      </div>

                      {/* Motifs */}
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider font-bold">
                          Recommended Motifs
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {proposal.recommendedMotifs.map((motif, i) => (
                            <span key={i} className="bg-[#09080b] border border-white/10 text-neutral-200 font-sans text-[11px] px-3 py-1 rounded-lg flex items-center gap-1.5">
                              <span className="text-[#c9a050]">✦</span>
                              <span>{motif}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Embellishments */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider font-bold">
                          Selected Embellishments & Materials
                        </span>
                        <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed">
                          {proposal.embellishments}
                        </p>
                      </div>
                    </div>

                    {/* Right Column Specs */}
                    <div className="md:col-span-4 space-y-4 bg-[#09080b] border border-white/10 p-4 rounded-xl">
                      {/* Color Harmony */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider font-bold">
                          Color Harmony
                        </span>
                        <div className="flex flex-col space-y-1">
                          {proposal.suggestedColorPairings.map((col, i) => (
                            <span key={i} className="text-neutral-300 font-sans text-xs flex items-center">
                              <span className="h-1.5 w-1.5 bg-[#c9a050] rounded-full mr-2" />
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Garment Care */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider font-bold">
                          Garment Care
                        </span>
                        <p className="font-sans text-[10px] text-neutral-400 leading-normal font-light">
                          {proposal.careInstructions}
                        </p>
                      </div>

                      {/* Estimated Timeline */}
                      <div className="space-y-0.5 pt-2 border-t border-white/10">
                        <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-wider font-bold">
                          Est. Handcrafting Time
                        </span>
                        <span className="font-cinzel text-xs font-bold text-white">
                          {proposal.estimateTimeline}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Interactive Actions Quote Bar */}
                  <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleWhatsAppBlueprint}
                        className="flex-1 sm:flex-initial bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold uppercase text-xs tracking-wider px-5 py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                      >
                        <MessageCircle className="h-4 w-4 fill-current" />
                        <span>Book on WhatsApp</span>
                      </button>

                      <button
                        onClick={handlePrint}
                        title="Print / Save PDF"
                        className="p-3 border border-white/15 text-neutral-300 hover:text-white rounded-xl bg-[#09080b] hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={onScrollToLocation}
                      className="w-full sm:w-auto bg-[#c9a050] hover:bg-[#b08535] text-[#09080b] font-bold uppercase text-xs tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Visit Bangalore Atelier</span>
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
