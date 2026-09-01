import { useState } from 'react';
import { garmentOptions, embroideryTypeOptions, coverageOptions } from '../data';
import { EstimatorOptions } from '../types';
import { Calculator, Clock, Landmark, Sparkles, AlertCircle, ArrowRight, MessageCircle, IndianRupee } from 'lucide-react';

interface EstimatorProps {
  onPreFillConsultant: (preFillText: string) => void;
}

export default function CostEstimator({ onPreFillConsultant }: EstimatorProps) {
  const [options, setOptions] = useState<EstimatorOptions>({
    garmentType: garmentOptions[0].value,
    workType: embroideryTypeOptions[0].value,
    coverage: 'heavy',
    fabricProvided: true
  });

  const selectedGarment = garmentOptions.find(g => g.value === options.garmentType) || garmentOptions[0];
  const selectedWorkType = embroideryTypeOptions.find(e => e.value === options.workType) || embroideryTypeOptions[0];
  const selectedCoverage = coverageOptions.find(c => c.value === options.coverage) || coverageOptions[2];

  // Price estimate calculation for local customer convenience
  let basePrice = 1200;
  if (selectedGarment.value === 'saree_border') basePrice = 3500;
  if (selectedGarment.value === 'lehenga_blouse') basePrice = 2800;
  if (selectedGarment.value === 'ethnic_jacket') basePrice = 3200;

  const estimatedCost = Math.round(basePrice * selectedCoverage.factor);
  const estimatedHours = Math.round(selectedCoverage.factor * 12 + (selectedGarment.value === 'saree_border' ? 40 : 15));

  const handleApplyToAI = () => {
    const preFill = `I am planning a ${selectedGarment.label} with ${selectedWorkType.label} in ${selectedCoverage.label.split(' (')[0]} density (${options.fabricProvided ? 'Providing own fabric' : 'Need raw silk sourced'}). Please suggest motif themes and color harmonies!`;
    onPreFillConsultant(preFill);
  };

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(`Hello SK! I used your website price estimator for:\n- Article: ${selectedGarment.label}\n- Work: ${selectedWorkType.label}\n- Coverage: ${selectedCoverage.label.split(' (')[0]}\n- Fabric: ${options.fabricProvided ? 'I will bring my fabric' : 'Please provide raw silk'}\nEstimated Timeline: ${selectedCoverage.timeline}\nEstimated Range: ~₹${estimatedCost.toLocaleString('en-IN')}\n\nCan I book a consultation / drop by your Banashankari shop?`);
    window.open(`https://wa.me/919845531210?text=${text}`, '_blank');
  };

  return (
    <section id="estimator" className="bg-[#faf7f2] py-16 sm:py-24 border-b border-[#e8dfd3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-[#854d0e] bg-[#fef3c7] border border-[#fde68a]">
            <span>Instant Price & Time Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1f1a15] tracking-tight flex items-center justify-center space-x-2.5">
            <Calculator className="h-7 w-7 text-[#d97706] shrink-0" />
            <span>Interactive Price & Timeline Estimator</span>
          </h2>
          <div className="h-0.5 w-16 bg-[#d97706] mx-auto rounded-full" />
          <p className="text-[#574d43] text-sm sm:text-base leading-relaxed font-normal">
            No hidden charges! Select your desired embroidery style to calculate realistic local shop pricing, artisan work hours, and delivery timelines.
          </p>
        </div>

        {/* Calculator Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white border border-[#e8dfd3] p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
            
            {/* Garment Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1f1a15] uppercase tracking-wider">
                1. Select Garment Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {garmentOptions.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setOptions(prev => ({ ...prev, garmentType: g.value }))}
                    className={`text-left p-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                      options.garmentType === g.value
                        ? 'border-[#d97706] bg-[#fef3c7] text-[#854d0e] font-bold shadow-sm'
                        : 'border-[#e8dfd3] bg-white text-[#574d43] hover:border-[#d97706]'
                    }`}
                  >
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Embroidery Technique */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1f1a15] uppercase tracking-wider">
                2. Handwork Needle Technique
              </label>
              <select
                value={options.workType}
                onChange={(e) => setOptions(prev => ({ ...prev, workType: e.target.value }))}
                className="w-full bg-[#fbf9f5] border border-[#e8dfd3] rounded-xl py-2.5 px-3 text-[#2c251e] text-xs sm:text-sm focus:border-[#d97706] outline-none cursor-pointer"
              >
                {embroideryTypeOptions.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

            {/* Coverage Selectors */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1f1a15] uppercase tracking-wider">
                3. Stitch Density / Coverage
              </label>
              <div className="space-y-2">
                {coverageOptions.map((cov) => (
                  <button
                    key={cov.value}
                    onClick={() => setOptions(prev => ({ ...prev, coverage: cov.value }))}
                    className={`w-full text-left p-3 rounded-xl border text-xs flex justify-between items-center transition-all duration-200 cursor-pointer ${
                      options.coverage === cov.value
                        ? 'border-[#d97706] bg-[#fef3c7] text-[#854d0e] font-bold shadow-sm'
                        : 'border-[#e8dfd3] bg-white text-[#574d43] hover:border-[#d97706]'
                    }`}
                  >
                    <div>
                      <span className="font-bold block text-xs">{cov.label.split(' (')[0]}</span>
                      <span className="text-[11px] text-[#736b63] block leading-tight mt-0.5">{cov.label.split(' (')[1]?.replace(')', '') || ''}</span>
                    </div>
                    <span className="text-[#b45309] font-bold text-xs shrink-0 ml-2">{cov.timeline}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Base Fabric Switch */}
            <div className="flex items-center justify-between p-4 bg-[#fbf9f5] rounded-2xl border border-[#e8dfd3]">
              <div className="space-y-0.5 pr-3">
                <span className="text-xs font-bold text-[#1f1a15] block">
                  Base Fabric
                </span>
                <span className="text-[11px] text-[#665e55] block leading-tight font-normal">
                  {options.fabricProvided ? 'You will bring your own saree blouse bit.' : 'SK will procure matching pure Bangalore raw silk.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOptions(prev => ({ ...prev, fabricProvided: !prev.fabricProvided }))}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  options.fabricProvided
                    ? 'bg-white text-[#b45309] border border-[#d97706]'
                    : 'bg-[#d97706] text-white'
                }`}
              >
                {options.fabricProvided ? 'Bringing Fabric' : 'Shop Sourced'}
              </button>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white border border-[#e8dfd3] p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              
              <div>
                <span className="text-[10px] font-bold text-[#b45309] uppercase tracking-wider block">
                  TRANSPARENT PRICE ESTIMATE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1f1a15] mt-0.5">
                  Your Custom Blouse Estimate
                </h3>
              </div>

              {/* Highlight Price & Timeline Row */}
              <div className="py-4 border-y border-[#f5efe6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-[#736b63] block">APPROXIMATE COST</span>
                  <div className="flex items-center text-3xl sm:text-4xl font-extrabold text-[#047857] mt-0.5">
                    <span>₹{estimatedCost.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-normal text-[#574d43] ml-2">(+ / - based on stones)</span>
                  </div>
                  <span className="text-xs text-[#059669] block mt-1 font-semibold">✓ Honest local workshop rates</span>
                </div>

                <div className="bg-[#fef3c7] border border-[#fde68a] p-3.5 rounded-2xl text-center min-w-[130px] shrink-0">
                  <span className="text-[10px] font-bold text-[#854d0e] uppercase block">TIMELINE</span>
                  <span className="font-serif text-base font-bold text-[#1f1a15] block mt-0.5">{selectedCoverage.timeline}</span>
                  <span className="text-[10px] text-[#854d0e] block">48-hr Express available</span>
                </div>
              </div>

              {/* Metrics Breakdown */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#fbf9f5] border border-[#e8dfd3] p-3.5 rounded-xl space-y-0.5">
                  <div className="flex items-center space-x-1 text-[#d97706]">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase">ARTISAN TIME</span>
                  </div>
                  <span className="font-bold text-sm text-[#1f1a15] block">{estimatedHours} Hand-stitch Hours</span>
                  <span className="text-[10px] text-[#736b63] block">Double-needle lock</span>
                </div>

                <div className="bg-[#fbf9f5] border border-[#e8dfd3] p-3.5 rounded-xl space-y-0.5">
                  <div className="flex items-center space-x-1 text-[#d97706]">
                    <Landmark className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase">FABRIC FRAME</span>
                  </div>
                  <span className="font-bold text-sm text-[#1f1a15] block">Maggam Loom</span>
                  <span className="text-[10px] text-[#736b63] block">Zero puckering</span>
                </div>
              </div>

              {/* Direct WhatsApp Quote Button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>Send This Spec to SK on WhatsApp</span>
                </button>

                <button
                  onClick={handleApplyToAI}
                  className="w-full bg-[#fef3c7] hover:bg-[#fde68a] text-[#854d0e] font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer border border-[#fde68a]"
                >
                  <Sparkles className="h-4 w-4 fill-[#854d0e]" />
                  <span>Customize with AI Stylist</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
