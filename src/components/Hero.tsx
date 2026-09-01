import { ArrowRight, Sparkles, Star, ShieldCheck, Clock, Award } from 'lucide-react';
import { motion } from 'motion/react';
import imageHero from '../assets/images/hero_bridal_saree_embroidery_1783349684763.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center bg-[#09080b] text-[#f4f1ea] overflow-hidden py-16 sm:py-24">
      
      {/* Subtle Luxury Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#6b151b]/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-[#c9a050]/10 blur-[150px]" />
      </div>
      
      {/* Decorative Traditional Needlework Grid Line Art */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c9a050" strokeWidth="0.6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Elegant Atelier Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#c9a050]/40 rounded-full text-[11px] uppercase tracking-widest text-[#c9a050] bg-[#141318]/90 backdrop-blur-md shadow-sm"
            >
              <Award className="h-3.5 w-3.5 text-[#c9a050]" />
              <span className="font-mono">Est. 2012 • Banashankari, Bangalore</span>
              <span className="text-[#c9a050]/40">•</span>
              <span className="font-sans font-bold text-white inline-flex items-center gap-1">
                <Star className="h-3 w-3 fill-[#c9a050] text-[#c9a050]" />
                4.9/5 Bridal Rating
              </span>
            </motion.div>
 
            {/* Main Header Display Typography */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]"
              >
                Threads of <br />
                <span className="italic font-light text-gold-gradient">
                  Heritage & Grace
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              >
                Bespoke Aari, intricate Maggam, and classic Zardosi handwork crafted for your most cherished celebrations. Specializing in majestic bridal silk blouses, scalloped saree borders, and custom designer jackets in Bangalore.
              </motion.p>
            </div>

            {/* Quick Trust Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-400 border-y border-white/5 py-4"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#c9a050] shrink-0" />
                <span>100% Hand Loomed</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5">
                <Clock className="h-4 w-4 text-[#c9a050] shrink-0" />
                <span>Guaranteed Fits</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5">
                <Sparkles className="h-4 w-4 text-[#c9a050] shrink-0" />
                <span>AI Design Blueprint</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate('ai-consultant')}
                className="w-full sm:w-auto bg-[#c9a050] hover:bg-[#b08535] text-[#09080b] px-9 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(201,160,80,0.3)] hover:shadow-[0_0_35px_rgba(201,160,80,0.5)] cursor-pointer"
              >
                <Sparkles className="h-4 w-4 fill-[#09080b]" />
                <span>Consult AI Stylist</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="w-full sm:w-auto border border-white/15 bg-white/5 hover:bg-white/10 text-white px-9 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 cursor-pointer"
              >
                <span>Explore Lookbook</span>
              </button>
            </motion.div>

          </div>

          {/* Majestic Hero Image Showcase Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Fine Gold Outer Border Frame */}
            <div className="absolute -inset-2 border border-[#c9a050]/30 rounded-2xl pointer-events-none" />
            
            <div className="relative bg-[#141318] border border-white/10 p-2.5 rounded-xl shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px]">
              <img 
                src={imageHero} 
                alt="Intricate Royal Silk Saree Embroidery by Aiyan Embroidery Bangalore" 
                className="w-full h-full object-cover rounded-lg filter brightness-95 hover:brightness-100 transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Overlay Signature Craft Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#09080b]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#c9a050] block mb-1 font-bold">
                  SIGNATURE BRIDAL MASTERPIECE
                </span>
                <h3 className="font-cinzel text-sm font-bold text-white tracking-wide">
                  Pure Gold Zari Scalloped Saree Border & Blouse
                </h3>
                <p className="font-sans text-xs text-neutral-300 mt-1 line-clamp-2">
                  Handcrafted on pure Bangalore raw silk with ruby gems, authentic Zardosi metal thread, and intricate Maggam needlework.
                </p>
              </div>
            </div>

            {/* Floating Location Tag */}
            <div className="absolute -top-4 -right-4 bg-[#141318] border border-[#c9a050]/30 p-3.5 shadow-xl hidden sm:block rounded-xl">
              <p className="font-mono text-[9px] text-[#c9a050] uppercase tracking-widest font-bold">BANGALORE ATELIER</p>
              <p className="font-cinzel text-xs font-bold text-white mt-0.5">Banashankari 3rd Stage</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
