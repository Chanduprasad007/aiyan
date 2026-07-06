import { useState } from 'react';
import { garmentOptions, embroideryTypeOptions, coverageOptions } from '../data';
import { EstimatorOptions } from '../types';
import { Calculator, Clock, Landmark, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

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
  const estimatedHours = Math.round(selectedCoverage.factor * 12 + (selectedGarment.value === 'saree_border' ? 45 : 15));
  const fabricLength = selectedGarment.value === 'saree_border' ? '5.5 Meters' : '1.25 Meters (Standard Blouse)';

  const handleApplyToAI = () => {
    const preFill = `I have estimated a craft specification for a "${selectedGarment.label}" with "${selectedWorkType.label}" and "${selectedCoverage.label.split(' (')[0]}". Please give me further custom motif recommendations for this!`;
    onPreFillConsultant(preFill);
  };

  return (
    <section id="estimator" className="bg-[#0c0c0b] py-20 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3 py-1 border border-[#c9a050]/30 rounded-full w-max text-[10px] uppercase tracking-widest text-[#c9a050]">
            Artisan Specifications
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide flex items-center justify-center space-x-2.5">
            <Calculator className="h-6.5 w-6.5 text-[#c9a050] shrink-0" />
            <span>Interactive Handcraft Estimator</span>
          </h2>
          <div className="h-0.5 w-16 bg-[#c9a050] mx-auto rounded-full" />
          <p className="font-sans text-[#a8a29e] text-sm leading-relaxed">
            Get instant estimates of handcrafting timelines and artisan work hours based on your selected fabric, coverage area, and stitch details.
          </p>
        </div>

        {/* Calculator layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[#1a1a18] border border-white/5 p-6 sm:p-8 rounded shadow-lg space-y-6">
            
            {/* Garment type selector */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">1. Choose Garment / Article</label>
              <div className="grid grid-cols-2 gap-2.5">
                {garmentOptions.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setOptions(prev => ({ ...prev, garmentType: g.value }))}
                    className={`text-left p-3.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      options.garmentType === g.value
                        ? 'border-[#c9a050] bg-[#c9a050]/10 text-[#c9a050]'
                        : 'border-white/10 bg-[#0c0c0b] text-[#a8a29e] hover:border-[#c9a050]/30'
                    }`}
                  >
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Embroidery technique */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">2. Select Handwork Technique</label>
              <select
                value={options.workType}
                onChange={(e) => setOptions(prev => ({ ...prev, workType: e.target.value }))}
                className="w-full bg-[#0c0c0b] border border-white/10 rounded py-2.5 px-3.5 text-[#f4f1ea] text-sm focus:border-[#c9a050] outline-none"
              >
                {embroideryTypeOptions.map((e) => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </div>

            {/* Coverage selectors */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-[#c9a050] tracking-widest uppercase">3. Choose Stitch Density / Coverage</label>
              <div className="space-y-2">
                {coverageOptions.map((cov) => (
                  <button
                    key={cov.value}
                    onClick={() => setOptions(prev => ({ ...prev, coverage: cov.value }))}
                    className={`w-full text-left p-3.5 rounded border text-xs flex justify-between items-center transition-all duration-200 cursor-pointer ${
                      options.coverage === cov.value
                        ? 'border-[#c9a050] bg-[#c9a050]/10 text-[#c9a050]'
                        : 'border-white/10 bg-[#0c0c0b] text-[#a8a29e] hover:border-[#c9a050]/30'
                    }`}
                  >
                    <div>
                      <span className="font-bold block text-[12px] uppercase tracking-wider">{cov.label.split(' (')[0]}</span>
                      <span className="text-[10px] text-[#a8a29e] block leading-tight mt-0.5">{cov.label.split(' (')[1]?.replace(')', '') || ''}</span>
                    </div>
                    <span className="font-mono text-[#c9a050] text-[11px] font-bold">x{cov.factor.toFixed(1)} Factor</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Procurement Switch */}
            <div className="flex items-center justify-between p-4 bg-[#0c0c0b] rounded border border-white/5">
              <div className="space-y-0.5 pr-4">
                <span className="font-serif text-xs font-bold text-white block uppercase tracking-wide">Do you provide the base fabric?</span>
                <span className="font-sans text-[10px] text-[#a8a29e] block leading-normal font-light">
                  Turn on if you will bring your saree blouse bit. Turn off if you want us to procure premium pure raw silk.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOptions(prev => ({ ...prev, fabricProvided: !prev.fabricProvided }))}
                className={`px-4 py-2 rounded font-sans text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                  options.fabricProvided
                    ? 'bg-black text-[#c9a050] border border-white/5'
                    : 'bg-[#c9a050] text-[#0c0c0b]'
                }`}
              >
                {options.fabricProvided ? 'Providing Fabric' : 'Boutique Procures'}
              </button>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#1a1a18] border border-[#c9a050]/20 p-8 rounded shadow-2xl relative overflow-hidden">
              {/* Golden circular backdrop pattern */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#c9a050]/[0.02] rounded-full blur-3xl pointer-events-none" />

              <span className="font-mono text-[9px] tracking-widest text-[#c9a050] uppercase block mb-1">CRAFT & TIMELINE SPECIFICATION</span>
              <h3 className="font-serif text-2xl font-bold text-white tracking-wide uppercase">Your Custom Handcraft Spec</h3>
              <p className="font-sans text-xs text-[#a8a29e] mt-1 leading-relaxed font-light">
                Based on heritage Bangalore handwork guidelines. Work parameters are tailored for handcrafting details.
              </p>

              {/* Estimate Main Timeline Display */}
              <div className="py-6 border-y border-white/5 my-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="font-mono text-[10px] text-[#c9a050] block uppercase tracking-wider">ESTIMATED TIMELINE</span>
                  <span className="font-serif text-3xl sm:text-4xl font-black text-[#c9a050]">
                    {selectedCoverage.timeline}
                  </span>
                  <span className="font-sans text-[10px] text-[#a8a29e] block mt-1">Express delivery option available on request</span>
                </div>

                <div className="bg-black/40 border border-white/5 p-4 rounded text-center min-w-[140px] shrink-0">
                  <span className="font-mono text-[8px] text-[#c9a050] block uppercase tracking-widest">STITCH DENSITY</span>
                  <span className="font-serif text-sm font-bold text-white block mt-0.5">x{selectedCoverage.factor.toFixed(1)} Factor</span>
                  <span className="font-sans text-[10px] text-[#a8a29e] block">Traditional maggam</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 border border-white/5 p-4 rounded space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#c9a050]">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-[9px] tracking-wider uppercase">ARTISAN TIME</span>
                  </div>
                  <span className="font-serif text-sm font-bold text-white block">{estimatedHours} Hours</span>
                  <span className="font-sans text-[10px] text-[#a8a29e] block leading-tight font-light">Of precise single-needle hand stitching</span>
                </div>

                <div className="bg-black/30 border border-white/5 p-4 rounded space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#c9a050]">
                    <Landmark className="h-4 w-4" />
                    <span className="font-mono text-[9px] tracking-wider uppercase">FABRIC SIZE</span>
                  </div>
                  <span className="font-serif text-sm font-bold text-white block">{fabricLength}</span>
                  <span className="font-sans text-[10px] text-[#a8a29e] block leading-tight font-light">Ideal for seamless border layout</span>
                </div>
              </div>

              {/* Notice text */}
              <div className="mt-6 flex items-start space-x-2.5 bg-black/40 border border-white/5 p-3.5 rounded text-[#a8a29e] text-[11px] leading-relaxed font-light">
                <AlertCircle className="h-4 w-4 text-[#c9a050] shrink-0 mt-0.5" />
                <span>
                  Our calculations take into account the complexity of raw silk backing and standard gold Zari thread density. For customized embroidery options, please click below to send this profile into our AI Consultant for a detailed design blueprint.
                </span>
              </div>

              {/* Apply parameters button */}
              <button
                onClick={handleApplyToAI}
                className="w-full mt-6 border border-white/10 text-[#f4f1ea] hover:bg-[#c9a050] hover:text-[#0c0c0b] hover:border-[#c9a050] font-bold uppercase text-xs tracking-widest py-3.5 rounded transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#c9a050] fill-[#c9a050]" />
                <span>Send Spec to AI Consultant</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
