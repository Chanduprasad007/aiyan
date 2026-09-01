import { useState } from 'react';
import { garmentOptions, embroideryTypeOptions, coverageOptions } from '../data';
import { EstimatorOptions } from '../types';
import { Calculator, Clock, Landmark, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

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

  // Calculate metrics
  const estimatedHours = Math.round(selectedCoverage.factor * 14 + (selectedGarment.value === 'saree_border' ? 45 : 18));
  const fabricLength = selectedGarment.value === 'saree_border' ? '5.5 Meters (Full Border)' : '1.25 Meters (Standard Blouse)';

  const handleApplyToAI = () => {
    const preFill = `Craft specification: Commissioning a "${selectedGarment.label}" with "${selectedWorkType.label}" and "${selectedCoverage.label.split(' (')[0]}" density (${options.fabricProvided ? 'Fabric provided by client' : 'Boutique to procure pure raw silk'}). Please generate custom motif and color harmonies for this configuration!`;
    onPreFillConsultant(preFill);
  };

  return (
    <section id="estimator" className="bg-[#09080b] py-20 sm:py-28 border-b border-white/5 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#c9a050]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-4 py-1 border border-[#c9a050]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9a050] bg-[#141318]">
            Artisan Timeline Calculator
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center space-x-3">
            <Calculator className="h-7 w-7 text-[#c9a050] shrink-0" />
            <span>Interactive Handcraft Estimator</span>
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#c9a050] to-transparent mx-auto rounded-full" />
          <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
            Plan your bridal timeline with precision. Calculate estimated handcrafting durations, artisan work hours, and loom specifications based on stitch density and techniques.
          </p>
        </div>

        {/* Calculator Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[#141318] border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            
            {/* Garment Selector */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                1. Select Garment / Article
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {garmentOptions.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setOptions(prev => ({ ...prev, garmentType: g.value }))}
                    className={`text-left p-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                      options.garmentType === g.value
                        ? 'border-[#c9a050] bg-[#c9a050]/15 text-[#c9a050]'
                        : 'border-white/10 bg-[#09080b] text-neutral-300 hover:border-[#c9a050]/40'
                    }`}
                  >
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Embroidery Technique */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                2. Select Handwork Technique
              </label>
              <select
                value={options.workType}
                onChange={(e) => setOptions(prev => ({ ...prev, workType: e.target.value }))}
                className="w-full bg-[#09080b] border border-white/15 rounded-xl py-3 px-4 text-neutral-200 text-sm focus:border-[#c9a050] outline-none cursor-pointer"
              >
                {embroideryTypeOptions.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

            {/* Coverage Selectors */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase font-bold">
                3. Choose Stitch Density / Coverage
              </label>
              <div className="space-y-2">
                {coverageOptions.map((cov) => (
                  <button
                    key={cov.value}
                    onClick={() => setOptions(prev => ({ ...prev, coverage: cov.value }))}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs flex justify-between items-center transition-all duration-200 cursor-pointer ${
                      options.coverage === cov.value
                        ? 'border-[#c9a050] bg-[#c9a050]/15 text-[#c9a050]'
                        : 'border-white/10 bg-[#09080b] text-neutral-300 hover:border-[#c9a050]/40'
                    }`}
                  >
                    <div>
                      <span className="font-bold block text-xs uppercase tracking-wider">{cov.label.split(' (')[0]}</span>
                      <span className="text-[10px] text-neutral-400 block leading-tight mt-0.5">{cov.label.split(' (')[1]?.replace(')', '') || ''}</span>
                    </div>
                    <span className="font-mono text-[#c9a050] text-xs font-bold shrink-0 ml-2">x{cov.factor.toFixed(1)} Intensity</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Base Fabric Switch */}
            <div className="flex items-center justify-between p-4 bg-[#09080b] rounded-xl border border-white/10">
              <div className="space-y-0.5 pr-4">
                <span className="font-cinzel text-xs font-bold text-white block uppercase tracking-wide">
                  Fabric Procurement
                </span>
                <span className="font-sans text-[11px] text-neutral-400 block leading-normal font-light">
                  {options.fabricProvided ? 'You are bringing your saree blouse fabric.' : 'Aiyan Atelier will source premium pure Bangalore raw silk.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOptions(prev => ({ ...prev, fabricProvided: !prev.fabricProvided }))}
                className={`px-4 py-2 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                  options.fabricProvided
                    ? 'bg-[#141318] text-[#c9a050] border border-[#c9a050]/30'
                    : 'bg-[#c9a050] text-[#09080b]'
                }`}
              >
                {options.fabricProvided ? 'Providing Fabric' : 'Atelier Sources'}
              </button>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#141318] border border-[#c9a050]/30 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              
              <span className="font-mono text-[9px] tracking-widest text-[#c9a050] uppercase block mb-1 font-bold">
                ATELIER SPECIFICATION
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white tracking-wide uppercase">
                Handcraft & Timeline Estimate
              </h3>
              <p className="font-sans text-xs text-neutral-300 mt-1 leading-relaxed font-light">
                Tailored for traditional Bangalore Maggam loom craftsmanship and double-needle anchoring.
              </p>

              {/* Main Timeline Card */}
              <div className="py-6 border-y border-white/10 my-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="font-mono text-[10px] text-[#c9a050] block uppercase tracking-wider font-bold">ESTIMATED ATELIER TIMELINE</span>
                  <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#c9a050]">
                    {selectedCoverage.timeline}
                  </span>
                  <span className="font-sans text-[11px] text-neutral-400 block mt-1">Express bridal priority available on request</span>
                </div>

                <div className="bg-[#09080b] border border-white/10 p-4 rounded-xl text-center min-w-[140px] shrink-0">
                  <span className="font-mono text-[9px] text-[#c9a050] block uppercase tracking-widest font-bold">STITCH FACTOR</span>
                  <span className="font-cinzel text-sm font-bold text-white block mt-0.5">x{selectedCoverage.factor.toFixed(1)} Density</span>
                  <span className="font-sans text-[10px] text-neutral-400 block">Traditional Loom</span>
                </div>
              </div>

              {/* Metrics Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#09080b] border border-white/10 p-4 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#c9a050]">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-[9px] tracking-wider uppercase font-bold">ARTISAN HOURS</span>
                  </div>
                  <span className="font-cinzel text-lg font-bold text-white block">{estimatedHours} Hours</span>
                  <span className="font-sans text-[10px] text-neutral-400 block leading-tight font-light">Dedicated single-needle stitching</span>
                </div>

                <div className="bg-[#09080b] border border-white/10 p-4 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#c9a050]">
                    <Landmark className="h-4 w-4" />
                    <span className="font-mono text-[9px] tracking-wider uppercase font-bold">FRAME COVERAGE</span>
                  </div>
                  <span className="font-cinzel text-lg font-bold text-white block">{fabricLength.split(' (')[0]}</span>
                  <span className="font-sans text-[10px] text-neutral-400 block leading-tight font-light">Precision tensioned mounting</span>
                </div>
              </div>

              {/* Note */}
              <div className="mt-6 flex items-start space-x-2.5 bg-[#09080b]/70 border border-white/5 p-4 rounded-xl text-neutral-300 text-xs leading-relaxed font-light">
                <AlertCircle className="h-4 w-4 text-[#c9a050] shrink-0 mt-0.5" />
                <span>
                  Calculations factor in Bangalore raw silk backing, double-zari borders, and authentic pearl bead clusters. Send this profile directly to our AI Stylist to generate tailored motif and color harmony proposals.
                </span>
              </div>

              {/* Send to AI Consultant Button */}
              <button
                onClick={handleApplyToAI}
                className="w-full mt-6 bg-[#c9a050] hover:bg-[#b08535] text-[#09080b] font-bold uppercase text-xs tracking-wider py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
              >
                <Sparkles className="h-4 w-4 fill-[#09080b]" />
                <span>Send Spec to AI Stylist</span>
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
