import { Scissors, ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  const values = [
    {
      icon: <Scissors className="h-5 w-5 text-[#c9a050]" />,
      title: 'Precision Embroidery Looms',
      desc: 'All fabrics are tensioned flawlessly on traditional large Maggam frames to prevent puckering or design warping on delicate silks, velvets, or georgettes.'
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#c9a050]" />,
      title: 'Heritage Master Artisans',
      desc: 'Our workshop features skilled needlework masters whose families have crafted royal zari and zardosi designs for generations.'
    },
    {
      icon: <Heart className="h-5 w-5 text-[#c9a050]" />,
      title: 'Bespoke Custom Fitting',
      desc: 'Every bridal blouse or jacket is custom drafted to your exact measurements, ensuring your sleeves, necklines, and back cuts are structurally perfect.'
    },
    {
      icon: <Sparkles className="h-5 w-5 text-[#c9a050]" />,
      title: 'Flawless Saree Styling',
      desc: 'We match, dye, and align every thread and gemstone to complement your sarees color gradients, border shine, and pallu motifs perfectly.'
    }
  ];

  const steps = [
    { num: '01', title: 'Consultation & AI Sketch', desc: 'Discuss your saree pattern or select a jacket inspiration. We draft an initial design and layout.' },
    { num: '02', title: 'Fabric Tensioning', desc: 'Mount your blouse fabric on heavy timber frames (looms) for perfect stability and thread alignment.' },
    { num: '03', title: 'Multi-Artisan Needling', desc: 'Our team hand-stitches your beads, pearls, kundan gems, and metallic gold zari threads.' },
    { num: '04', title: 'Fitting & Delivery', desc: 'Fine stitching and detail validation to verify durability and seamless comfort for your big day.' }
  ];

  return (
    <section id="craft" className="bg-[#0c0c0b] py-20 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Elegant Immersive Badges */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-block px-3 py-1 border border-[#c9a050]/30 rounded-full w-max text-[10px] uppercase tracking-widest text-[#c9a050]">
            The Art of Bespoke Needlework
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            Crafting Legends in Gold Thread, Silk & Gemstones
          </h2>
          <div className="h-0.5 w-16 bg-[#c9a050] mx-auto rounded-full" />
          <p className="font-sans text-[#a8a29e] text-sm leading-relaxed">
            At Aiyan Embroidery And Hand Works in Bangalore, we treat every sari and bridal jacket as a canvas. We preserve ancient hand needlework techniques while styling them for modern elegant silhouettes.
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Photo Showcase with elegant fine gold border */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 border border-[#c9a050]/20 rounded-lg" />
            <div className="relative bg-[#1a1a18] border border-white/5 p-2 rounded shadow-xl overflow-hidden aspect-[4/3]">
              <img 
                src="/src/assets/images/handcrafting_artisan_embroidery_1783349716437.jpg" 
                alt="Artisan doing hand Zardosi work" 
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Overlay statistics */}
            <div className="absolute -bottom-6 -right-4 bg-[#1a1a18] border border-white/5 px-5 py-4 rounded shadow-xl flex items-center space-x-3">
              <div className="text-3xl font-serif font-black text-[#c9a050]">10+</div>
              <div className="font-mono text-[9px] text-[#a8a29e] leading-tight uppercase tracking-wider">
                YEARS OF BRIDAL<br />CRAFT IN BANGALORE
              </div>
            </div>
          </div>

          {/* Core Values / Features */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">Our Studio Signature Guarantees</h3>
            <p className="font-sans text-[#a8a29e] text-sm leading-relaxed font-light">
              We understand that a wedding blouse or heavy designer jacket is not just attire—it is an heirloom. Our artisans ensure every millimeter of gold thread, bead, and pearl is anchored to withstand your active celebratory movements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {values.map((val, idx) => (
                <div key={idx} className="bg-[#1a1a18] border border-white/5 p-5 rounded hover:border-[#c9a050]/35 transition-colors">
                  <div className="p-2 bg-[#0c0c0b] border border-[#c9a050]/20 rounded w-fit mb-3">{val.icon}</div>
                  <h4 className="font-serif text-sm font-bold text-white tracking-wide">{val.title}</h4>
                  <p className="font-sans text-xs text-[#a8a29e] leading-relaxed mt-1">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Process Steps */}
        <div className="bg-[#1a1a18] border border-white/5 rounded p-8 sm:p-10">
          <h3 className="font-serif text-base sm:text-lg font-bold text-white text-center mb-10 flex items-center justify-center space-x-2 tracking-widest uppercase">
            <Star className="h-4 w-4 text-[#c9a050] fill-[#c9a050]" />
            <span>THE CREATIVE LIFECYCLE OF THE CRAFT</span>
            <Star className="h-4 w-4 text-[#c9a050] fill-[#c9a050]" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((st, idx) => (
              <div key={idx} className="relative space-y-3 md:border-r last:border-0 border-white/5 pr-4">
                <span className="font-serif text-3xl font-black text-[#c9a050] block">
                  {st.num}
                </span>
                <h4 className="font-serif text-sm font-bold text-[#c9a050] tracking-wide uppercase">{st.title}</h4>
                <p className="font-sans text-xs text-[#a8a29e] leading-relaxed font-light">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
