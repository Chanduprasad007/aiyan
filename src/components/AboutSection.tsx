import { Scissors, ShieldCheck, Heart, Sparkles, Star, CheckCircle, MessageCircle, Phone } from 'lucide-react';
import imageHandcraft from '../assets/images/handcrafting_artisan_embroidery_1783349716437.jpg';
import ownerImg from '../assets/images/owner.png';

export default function AboutSection() {
  const values = [
    {
      icon: <Scissors className="h-5 w-5 text-[#d97706]" />,
      title: 'Handcrafted on Wooden Looms',
      desc: 'We tension all silk, georgette, and velvet fabrics on heavy traditional Maggam frames so the stitching never pulls or puckers your saree blouse.'
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#d97706]" />,
      title: 'Honest Local Shop Pricing',
      desc: 'As a local Bangalore boutique, we believe in fair, transparent prices without inflated bridal charges. You pay purely for artisan labor and materials.'
    },
    {
      icon: <Heart className="h-5 w-5 text-[#d97706]" />,
      title: 'Comfortable Custom Fit',
      desc: 'We tailor the armholes, deep back cuts, and sleeve lengths to fit your body gracefully, ensuring complete ease of movement during your ceremonies.'
    },
    {
      icon: <Sparkles className="h-5 w-5 text-[#d97706]" />,
      title: 'Saree & Jewelry Harmonization',
      desc: 'Bring your saree and jewelry photos! We match the exact shade of antique gold zari, pearl beads, and stone colors to complement your jewelry.'
    }
  ];

  const steps = [
    { num: '01', title: 'Bring Saree or WhatsApp Photo', desc: 'Share your saree or blouse design photo with SK on WhatsApp or at our Banashankari shop.' },
    { num: '02', title: 'Pick Motifs & Thread Colors', desc: 'Select peacock, lotus, or temple border patterns and choose beads, kundan gems, or silk threads.' },
    { num: '03', title: 'Precision Hand Needling', desc: 'Our artisans meticulously hand-stitch every bead and zardosi metal coil on the loom.' },
    { num: '04', title: 'Trial & On-Time Delivery', desc: 'Try on your blouse for any micro-adjustments and take it home ready for your celebration.' }
  ];

  return (
    <section id="owner" className="bg-[#faf7f2] py-16 sm:py-24 border-b border-[#e8dfd3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-[#854d0e] bg-[#fef3c7] border border-[#fde68a]">
            <span>Local Bangalore Craftsmanship</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1f1a15] tracking-tight">
            Meet SK & Our Banashankari Workshop
          </h2>
          
          <div className="h-0.5 w-16 bg-[#d97706] mx-auto rounded-full" />
          
          <p className="text-[#574d43] text-sm sm:text-base leading-relaxed font-normal">
            A small boutique with a huge passion for traditional Indian handwork. We take pride in making every woman look regal on her wedding day, festive puja, or family celebration.
          </p>
        </div>

        {/* Owner Spotlight Card Split */}
        <div className="bg-white border border-[#e8dfd3] rounded-3xl p-6 sm:p-10 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Owner Photo & Direct Contact */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#fde68a] shadow-xl bg-[#fef3c7] mx-auto">
                  <img 
                    src={ownerImg} 
                    alt="SK - Master Artisan & Founder of Aiyan Embroidery" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-3 bg-[#d97706] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  Shop Owner
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1f1a15]">
                  SK (Master Designer)
                </h3>
                <p className="text-xs font-semibold text-[#b45309]">
                  Founder & Head Artisan • Aiyan Embroidery
                </p>
                <p className="text-xs text-[#736b63] mt-0.5">
                  12+ Years Creating Bridal Masterpieces in Bangalore
                </p>
              </div>

              {/* Quick Contact Buttons with SK */}
              <div className="flex flex-wrap justify-center gap-2 pt-1 w-full">
                <a
                  href="https://wa.me/919845531210?text=Hello%20SK!%20I%20want%20to%20discuss%20an%20embroidery%20design%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>Chat with SK</span>
                </a>

                <a
                  href="tel:+919845531210"
                  className="bg-[#f5efe6] hover:bg-[#ede8df] text-[#3d342a] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border border-[#e8dfd3]"
                >
                  <Phone className="h-4 w-4 text-[#d97706]" />
                  <span>+91 98455 31210</span>
                </a>
              </div>
            </div>

            {/* Right: Personal Message & Guarantees */}
            <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-[#e8dfd3] lg:pl-8">
              <div className="inline-block text-xs font-bold text-[#d97706] uppercase tracking-wider">
                A Note from the Founder
              </div>
              
              <blockquote className="text-sm sm:text-base text-[#3d342a] leading-relaxed italic font-serif">
                "Whether you need a simple graceful neckline for a festival puja or a heavy grand Maggam piece with real pearls for your wedding day, my team and I treat every single garment with utmost care. You don't have to spend a fortune at commercial showrooms to get royal bridal fitting."
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3d342a]">
                  <CheckCircle className="h-4 w-4 text-[#059669] shrink-0" />
                  <span>Transparent, honest rates</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3d342a]">
                  <CheckCircle className="h-4 w-4 text-[#059669] shrink-0" />
                  <span>Custom motif sketch & advice</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3d342a]">
                  <CheckCircle className="h-4 w-4 text-[#059669] shrink-0" />
                  <span>Safe fabric care on wooden looms</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3d342a]">
                  <CheckCircle className="h-4 w-4 text-[#059669] shrink-0" />
                  <span>Strict on-time delivery promise</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Guarantees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white border border-[#e8dfd3] p-5 rounded-2xl warm-card-hover">
              <div className="p-2.5 bg-[#fef3c7] rounded-xl w-fit mb-3 text-[#d97706]">
                {val.icon}
              </div>
              <h4 className="font-serif text-sm font-bold text-[#1f1a15]">{val.title}</h4>
              <p className="text-xs text-[#665e55] leading-relaxed mt-1.5 font-normal">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* 4 Step Process */}
        <div className="bg-white border border-[#e8dfd3] rounded-3xl p-6 sm:p-10 shadow-sm">
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#1f1a15] text-center mb-8 flex items-center justify-center space-x-2">
            <Star className="h-4 w-4 text-[#d97706] fill-[#d97706]" />
            <span>HOW TO GET YOUR CUSTOM BLOUSE HANDCRAFTED</span>
            <Star className="h-4 w-4 text-[#d97706] fill-[#d97706]" />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div key={idx} className="relative space-y-2 md:border-r last:border-0 border-[#e8dfd3] pr-4">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#d97706] block">
                  {st.num}
                </span>
                <h4 className="font-serif text-sm font-bold text-[#1f1a15]">{st.title}</h4>
                <p className="text-xs text-[#665e55] leading-relaxed font-normal">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
