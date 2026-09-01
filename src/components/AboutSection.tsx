import { Scissors, ShieldCheck, Heart, Sparkles, Star, Award, Layers } from 'lucide-react';
import imageHandcraft from '../assets/images/handcrafting_artisan_embroidery_1783349716437.jpg';

export default function AboutSection() {
  const values = [
    {
      icon: <Scissors className="h-5 w-5 text-[#c9a050]" />,
      title: 'Precision Timber Maggam Looms',
      desc: 'All fabrics are tensioned on traditional large Maggam frames to prevent puckering or design warping on delicate Kanjeevaram silks, raw silks, velvets, or organza.'
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#c9a050]" />,
      title: 'Generations of Master Needleworkers',
      desc: 'Our Bangalore workshop features skilled master artisans whose families have crafted royal Zari, Aari, and Zardosi embroidery for decades.'
    },
    {
      icon: <Heart className="h-5 w-5 text-[#c9a050]" />,
      title: 'Bespoke Couture Fitting',
      desc: 'Every bridal blouse or jacket is custom drafted to your exact measurements, ensuring your sleeves, necklines, and back cuts are structurally flattering and comfortable.'
    },
    {
      icon: <Sparkles className="h-5 w-5 text-[#c9a050]" />,
      title: 'Flawless Saree Harmonization',
      desc: 'We match, dye, and align every thread, gemstone, and bead to complement your saree’s color gradients, zari weave luster, and pallu motifs.'
    }
  ];

  const steps = [
    { num: '01', title: 'Consultation & AI Blueprint', desc: 'Discuss your saree pattern or select a jacket inspiration. We formulate an exact motif blueprint and neckline layout.' },
    { num: '02', title: 'Fabric Tensioning on Loom', desc: 'Mount your blouse fabric on heavy timber Maggam frames for absolute stability and thread alignment.' },
    { num: '03', title: 'Multi-Artisan Needling', desc: 'Master artisans hand-stitch your pearls, kundan gems, zardosi metal coils, and metallic gold zari threads.' },
    { num: '04', title: 'Fitting & Delivery', desc: 'Fine stitching, lining attachment, and quality auditing to guarantee seamless comfort and regal finish.' }
  ];

  return (
    <section id="craft" className="bg-[#09080b] py-20 sm:py-28 border-b border-white/5 relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#c9a050]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title with Elegant Badges */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 border border-[#c9a050]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9a050] bg-[#141318]">
            <Layers className="h-3 w-3" />
            <span>The Atelier Heritage</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Crafting Legends in Gold Thread, Silk & Gemstones
          </h2>
          
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#c9a050] to-transparent mx-auto rounded-full" />
          
          <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            At Aiyan Embroidery And Hand Works in Banashankari, Bangalore, we treat every blouse, saree, and bridal jacket as a canvas. We preserve centuries-old hand needlework traditions while perfecting modern silhouettes.
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Photo Showcase with Gold Frame */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 border border-[#c9a050]/20 rounded-2xl pointer-events-none" />
            
            <div className="relative bg-[#141318] border border-white/10 p-2.5 rounded-xl shadow-2xl overflow-hidden aspect-[4/3]">
              <img 
                src={imageHandcraft} 
                alt="Master Artisan doing hand Zardosi needlework at Aiyan Embroidery Bangalore" 
                className="w-full h-full object-cover rounded-lg filter brightness-95 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-3 bg-[#141318] border border-[#c9a050]/40 px-5 py-4 rounded-xl shadow-2xl flex items-center space-x-3 backdrop-blur-md">
              <div className="text-3xl font-cinzel font-bold text-[#c9a050]">12+</div>
              <div className="font-mono text-[9px] text-neutral-300 leading-tight uppercase tracking-wider">
                YEARS OF BRIDAL<br />EXCELLENCE IN BANGALORE
              </div>
            </div>
          </div>

          {/* Core Guarantees & Features */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[#c9a050] uppercase tracking-widest font-bold">UNCOMPROMISING ARTISANSHIP</span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                Our Atelier Guarantees
              </h3>
            </div>
            
            <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
              We understand that a wedding blouse or heavy designer jacket is not just attire—it is an heirloom. Our artisans ensure every millimeter of gold zari thread, glass bead, and pearl is anchored with double-knot locking to withstand active celebrations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {values.map((val, idx) => (
                <div key={idx} className="bg-[#141318] border border-white/5 p-5 rounded-xl hover:border-[#c9a050]/40 transition-colors group">
                  <div className="p-2.5 bg-[#09080b] border border-[#c9a050]/20 rounded-lg w-fit mb-3 group-hover:border-[#c9a050] transition-colors">
                    {val.icon}
                  </div>
                  <h4 className="font-cinzel text-sm font-bold text-white tracking-wide">{val.title}</h4>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed mt-1.5 font-light">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Process Steps */}
        <div className="bg-[#141318] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-xl">
          <h3 className="font-cinzel text-sm sm:text-base font-bold text-white text-center mb-10 flex items-center justify-center space-x-2 tracking-widest uppercase">
            <Star className="h-4 w-4 text-[#c9a050] fill-[#c9a050]" />
            <span>THE 4-STEP CREATIVE LIFECYCLE OF YOUR GARMENT</span>
            <Star className="h-4 w-4 text-[#c9a050] fill-[#c9a050]" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((st, idx) => (
              <div key={idx} className="relative space-y-3 md:border-r last:border-0 border-white/10 pr-4">
                <span className="font-cinzel text-3xl font-bold text-[#c9a050] block">
                  {st.num}
                </span>
                <h4 className="font-cinzel text-sm font-bold text-white tracking-wide">{st.title}</h4>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
