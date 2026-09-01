import React, { useState, useEffect } from 'react';
import { 
  occasionOptions, 
  fabricOptions, 
  blouseStyleOptions, 
  coverageOptions 
} from '../data';
import { DesignConsultation, DesignProposal } from '../types';
import { Sparkles, Loader2, Calendar, Scissors, Compass, MessageCircle, Printer, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import ownerImg from '../assets/images/owner.png';

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
    'Analyzing your saree fabric and color tones...',
    'Selecting traditional golden Zari and Maggam stitch combinations...',
    'Sketching symmetrical peacock and floral neckline arches...',
    'Calculating pearl, kundan stone, and bead embellishments...',
    'Finalizing your personalized custom design proposal card...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 1800);
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

  // Tailored fallback generator matching input parameters exactly
  const generateTailoredFallback = (data: DesignConsultation): DesignProposal => {
    const selectedCoverage = coverageOptions.find(c => c.value === data.coverage) || coverageOptions[2];
    const isBridal = data.occasion.toLowerCase().includes('wedding') || data.occasion.toLowerCase().includes('bridal');
    const isPuja = data.occasion.toLowerCase().includes('festive');

    const styleName = isBridal 
      ? `Grand Antique Zardosi with Maggam Border & Kundan Accents`
      : isPuja 
      ? `Festive Silk Thread Floral Jaal with Pearl Trim`
      : `Delicate Scalloped Cutwork & Stone Needlework`;

    const motifs = isBridal 
      ? [
          'Symmetrical Dancing Peacocks on the back neckline',
          'Lotus creepers along elbow-length sleeve borders',
          'Dainty hanging Jhumka droplets with pearl fringes',
          'Traditional temple kalash motifs'
        ]
      : [
          'Scalloped floral vine creepers along front and back neck',
          'Geometric diamond jaal with micro-sequin highlights',
          'Dainty floral clusters on sleeve hems'
        ];

    const embellishments = 'Pure gold finish Zari thread, natural replica pearls, ruby-pink stones, micro kundan brass mounts, and gold seed beads.';

    const colorPairings = data.color.toLowerCase().includes('red') || data.color.toLowerCase().includes('crimson')
      ? ['Antique Gold & Warm Champagne', 'Emerald Green accents', 'Ivory Pearl highlights']
      : data.color.toLowerCase().includes('yellow') || data.color.toLowerCase().includes('mustard')
      ? ['Deep Maroon & Royal Magenta', 'Gilded Gold Zari', 'Forest Green touches']
      : ['Antique Matt Gold', 'Rich Jewel Tones', 'Glistening Silver Sequins'];

    const designConcept = `A personalized design curated especially for your ${data.color.toLowerCase()} ${data.fabric.toLowerCase()}. The ${data.blouseStyle.toLowerCase()} is designed with a flattering neck drop lined with delicate pearls and kundan stone arches. The sleeves feature rich Maggam work that harmonizes with your saree's pallu. ${data.customDetails ? `Incorporating your specific wishes: "${data.customDetails}".` : 'Tailored to give a regal, timeless ethnic look.'}`;

    return {
      title: `The Custom ${data.occasion.split(' / ')[0]} Ensemble`,
      embroideryStyle: styleName,
      designConcept: designConcept,
      recommendedMotifs: motifs,
      embellishments: embellishments,
      suggestedColorPairings: colorPairings,
      careInstructions: 'Dry clean only. Store wrapped in soft muslin cloth to preserve gold Zari shine.',
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
      // Backend not running on static hosts
    }

    // 2. Try Client-side Google GenAI if key available
    if (!generatedProposal) {
      const clientApiKey = localStorage.getItem('AIYAN_GEMINI_API_KEY') || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (clientApiKey) {
        try {
          const aiClient = new GoogleGenAI({ apiKey: clientApiKey });
          const systemPrompt = `You are SK, an expert master designer at Aiyan Embroidery And Hand Works in Bangalore. Generate a personalized, delightful design proposal in valid JSON format with keys: "title", "embroideryStyle", "designConcept", "recommendedMotifs" (array of 3-4 strings), "embellishments" (string), "suggestedColorPairings" (array of strings), "careInstructions" (string), "estimateTimeline" (string).`;
          
          const prompt = `Design a blouse embroidery concept for:
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
          console.warn("Client Gemini fallback to local generator:", clientAiErr);
        }
      }
    }

    // 3. Fallback to tailored generative craft engine
    if (!generatedProposal) {
      await new Promise(r => setTimeout(r, 1000));
      generatedProposal = generateTailoredFallback(formData);
    }

    setProposal(generatedProposal);
    setLoading(false);
  };

  const handleWhatsAppBlueprint = () => {
    if (!proposal) return;
    const text = `*AIYAN EMBROIDERY BANGALORE - BLOUSE DESIGN*\n\n` +
      `*Design Name:* ${proposal.title}\n` +
      `*Stitch Style:* ${proposal.embroideryStyle}\n` +
      `*Occasion:* ${formData.occasion}\n` +
      `*Saree Color & Fabric:* ${formData.color} (${formData.fabric})\n` +
      `*Neckline:* ${formData.blouseStyle}\n` +
      `*Estimated Timeline:* ${proposal.estimateTimeline}\n\n` +
      `*Concept:* ${proposal.designConcept}\n\n` +
      `*Motifs:* ${proposal.recommendedMotifs.join(', ')}\n\n` +
      `Hello SK, I generated this design concept on your website. Can we discuss making this for my saree?`;

    window.open(`https://wa.me/919845531210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="ai-consultant" className="bg-[#faf7f2] py-16 sm:py-24 border-b border-[#e8dfd3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-[#854d0e] bg-[#fef3c7] border border-[#fde68a]">
            <Sparkles className="h-3.5 w-3.5 fill-[#d97706] text-[#d97706]" />
            <span>AI Bridal Stylist</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1f1a15] tracking-tight">
            Design Your Dream Blouse with AI
          </h2>
          
          <div className="h-0.5 w-16 bg-[#d97706] mx-auto rounded-full" />
          
          <p className="text-[#574d43] text-sm sm:text-base leading-relaxed font-normal">
            Not sure which neckline or Maggam motifs will match your saree? Tell us your saree details below to generate a tailored design proposal card!
          </p>
        </div>

        {/* Content Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Inputs Column */}
          <div className="lg:col-span-5 bg-white border border-[#e8dfd3] p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-[#f5efe6]">
              <Scissors className="h-4 w-4 text-[#d97706]" />
              <h3 className="font-serif text-sm font-bold text-[#1f1a15] uppercase tracking-wider">
                Enter Your Saree Details
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Occasion */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1f1a15]">Occasion / Function</label>
                <select 
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="w-full bg-[#fbf9f5] border border-[#e8dfd3] rounded-xl py-2 px-3 text-[#2c251e] text-xs sm:text-sm focus:border-[#d97706] outline-none"
                >
                  {occasionOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Saree Fabric */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1f1a15]">Saree Fabric</label>
                <select 
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleInputChange}
                  className="w-full bg-[#fbf9f5] border border-[#e8dfd3] rounded-xl py-2 px-3 text-[#2c251e] text-xs sm:text-sm focus:border-[#d97706] outline-none"
                >
                  {fabricOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Saree Color Input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1f1a15]">Saree Color & Border Details</label>
                <input 
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Mustard yellow with bottle green border"
                  required
                  className="w-full bg-[#fbf9f5] border border-[#e8dfd3] rounded-xl py-2 px-3 text-[#2c251e] text-xs sm:text-sm focus:border-[#d97706] outline-none"
                />
              </div>

              {/* Blouse Style */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1f1a15]">Preferred Neckline & Sleeve Cut</label>
                <select 
                  name="blouseStyle"
                  value={formData.blouseStyle}
                  onChange={handleInputChange}
                  className="w-full bg-[#fbf9f5] border border-[#e8dfd3] rounded-xl py-2 px-3 text-[#2c251e] text-xs sm:text-sm focus:border-[#d97706] outline-none"
                >
                  {blouseStyleOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Coverage Density Buttons */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1f1a15]">Stitch Density</label>
                <div className="grid grid-cols-2 gap-2">
                  {coverageOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => handleCoverageSelect(opt.value)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer ${
                        formData.coverage === opt.value
                          ? 'border-[#d97706] bg-[#fef3c7] text-[#854d0e] font-bold shadow-sm'
                          : 'border-[#e8dfd3] bg-[#fbf9f5] text-[#574d43] hover:border-[#d97706]'
                      }`}
                    >
                      <span className="font-bold block text-xs">{opt.label.split(' (')[0]}</span>
                      <span className="text-[10px] text-[#736b63] block">{opt.timeline}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Wishes */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#1f1a15]">Custom Motif Wishes / Notes</label>
                <textarea 
                  name="customDetails"
                  value={formData.customDetails}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="e.g., Please add elephant motifs or marriage date on sleeve..."
                  className="w-full bg-[#fbf9f5] border border-[#e8dfd3] rounded-xl py-2 px-3 text-[#2c251e] text-xs focus:border-[#d97706] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Styling Your Blouse...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 fill-white" />
                    <span>Generate Design Proposal</span>
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
                  className="bg-white border border-dashed border-[#e8dfd3] rounded-3xl p-8 text-center h-[520px] flex flex-col items-center justify-center space-y-4"
                >
                  <div className="border border-[#fde68a] p-4 rounded-full bg-[#fef3c7]">
                    <Compass className="h-8 w-8 text-[#d97706] animate-pulse" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h4 className="font-serif text-lg font-bold text-[#1f1a15]">
                      Your Design Card Will Appear Here
                    </h4>
                    <p className="text-xs text-[#736b63] leading-relaxed">
                      Choose your saree color and neckline on the left, then click generate. You will receive a personalized design card you can directly show SK!
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
                  className="bg-white border border-[#e8dfd3] rounded-3xl p-8 text-center h-[520px] flex flex-col items-center justify-center space-y-4 shadow-sm"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#fef3c7] border-t-[#d97706] rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-[#d97706] animate-bounce" />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h4 className="text-xs font-bold text-[#1f1a15] uppercase tracking-wider">
                      CREATING CUSTOM DESIGN BLUEPRINT
                    </h4>
                    <p className="text-xs text-[#b45309] font-medium leading-relaxed">
                      {loadingMessages[loadingStep]}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Success Proposal Card */}
              {proposal && !loading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border-2 border-[#fde68a] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden"
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#f5efe6]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#d97706] bg-[#fef3c7]">
                        <img src={ownerImg} alt="SK" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#b45309] uppercase block">
                          RECOMMENDED BY SK
                        </span>
                        <span className="text-xs font-bold text-[#1f1a15]">Aiyan Boutique Design Card</span>
                      </div>
                    </div>

                    <span className="bg-[#ecfdf5] text-[#047857] text-[11px] font-bold px-3 py-1 rounded-full border border-[#a7f3d0]">
                      {proposal.estimateTimeline}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mt-4 mb-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1f1a15]">
                      {proposal.title}
                    </h3>
                    <p className="text-xs font-bold text-[#d97706] mt-0.5">
                      {proposal.embroideryStyle}
                    </p>
                  </div>

                  {/* Concept */}
                  <p className="text-xs text-[#574d43] leading-relaxed font-normal mb-4 bg-[#fbf9f5] p-3.5 rounded-xl border border-[#e8dfd3]">
                    {proposal.designConcept}
                  </p>

                  {/* Motifs */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-xs font-bold text-[#1f1a15] block">
                      Recommended Motifs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proposal.recommendedMotifs.map((motif, i) => (
                        <span key={i} className="bg-[#fef3c7] text-[#854d0e] text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#fde68a]">
                          ✦ {motif}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Embellishments & Color Harmony */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-5">
                    <div className="bg-[#fbf9f5] p-3 rounded-xl border border-[#e8dfd3]">
                      <span className="font-bold text-[#1f1a15] block mb-1">Color Palette:</span>
                      <div className="flex flex-wrap gap-1">
                        {proposal.suggestedColorPairings.map((col, i) => (
                          <span key={i} className="text-[#574d43] text-[11px] block">
                            • {col}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#fbf9f5] p-3 rounded-xl border border-[#e8dfd3]">
                      <span className="font-bold text-[#1f1a15] block mb-1">Garment Care:</span>
                      <p className="text-[11px] text-[#736b63]">{proposal.careInstructions}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-[#f5efe6] flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={handleWhatsAppBlueprint}
                      className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 fill-current" />
                      <span>Send This Design to SK on WhatsApp</span>
                    </button>

                    <button
                      onClick={onScrollToLocation}
                      className="bg-[#fef3c7] hover:bg-[#fde68a] text-[#854d0e] font-bold text-xs px-5 py-3 rounded-xl transition-colors cursor-pointer border border-[#fde68a] flex items-center justify-center gap-1"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Visit Shop</span>
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
