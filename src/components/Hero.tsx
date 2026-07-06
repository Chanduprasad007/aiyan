import { ArrowRight, Sparkles, Star, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import imageHero from '../assets/images/hero_bridal_saree_embroidery_1783349684763.jpg';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center bg-[#0c0c0b] text-[#f4f1ea] overflow-hidden py-16">
      
      {/* Absolute Decorative Immersive Background Elements */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#5c1a1a] blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#8c6d31] blur-[120px]" />
      </div>
      
      {/* Thread Line Grid Art */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c9a050" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content side */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Elegant location and rating badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 border border-[#c9a050]/30 rounded-full w-max text-[10px] uppercase tracking-widest text-[#c9a050] bg-black/40 backdrop-blur-sm"
            >
              <span className="font-mono">Est. 2012 • Aiyan Royal Embroidery Bangalore</span>
              <span className="mx-2 text-[#c9a050]/50">•</span>
              <span className="font-sans font-bold text-[#f4f1ea] inline-flex items-center gap-1">
                <Star className="h-3 w-3 fill-[#c9a050] text-[#c9a050]" />
                4.9/5
              </span>
            </motion.div>
 
            {/* Main Header Display Typography */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-wide text-white leading-[1.15]"
              >
                Threads of <br />
                <span className="italic font-light text-[#c9a050]">Heritage & Grace</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-[#a8a29e] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
              >
                Bespoke Aari, heavy Maggam, and classic Zardosi handwork for the modern woman. Specializing in majestic bridal silk blouses and custom designer jackets that tell a story in every single stitch.
              </motion.p>
            </div>

            {/* Quick trust bullet points */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#a8a29e]"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-[#c9a050] shrink-0" />
                <span>100% HANDWORK</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-[#c9a050] shrink-0" />
                <span>TIMELY BRIDAL FITS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-[#c9a050] shrink-0" />
                <span>AI PREVIEW CONCERT</span>
              </div>
            </motion.div>

            {/* Action buttons matching Design specifications exactly */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-5 pt-2"
            >
              <button
                onClick={() => onNavigate('ai-consultant')}
                className="w-full sm:w-auto bg-[#c9a050] text-[#0c0c0b] px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-[#b08b40] transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
              >
                <Sparkles className="h-4 w-4 text-[#0c0c0b] fill-current" />
                <span>Consult AI Designer</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#0c0c0b]" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="w-full sm:w-auto border border-white/20 text-[#f4f1ea] px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span>View Lookbook</span>
              </button>
            </motion.div>
          </div>

          {/* Majestic Saree Image side with premium gold borders */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Fine Minimal Gold Accent Border */}
            <div className="absolute -inset-1 border border-[#c9a050]/20 rounded" />
            
            <div className="relative bg-[#1a1a18] border border-white/5 p-2 rounded shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[480px]">
              <img 
                src={imageHero} 
                alt="Intricate Royal Silk Saree Embroidery" 
                className="w-full h-full object-cover filter brightness-95 hover:brightness-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Elegant overlay card details */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#0c0c0b]/90 backdrop-blur-md p-4 border border-white/5 shadow-xl">
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#c9a050] block mb-1">SIGNATURE CRAFT</span>
                <h3 className="font-serif text-sm font-bold text-white tracking-wide">Pure Gold Zari Scalloped Blouse</h3>
                <p className="font-sans text-[11px] text-[#a8a29e] mt-1">100% handcrafted over pure Bangalore raw silk. Featuring ruby gems and premium Maggam weaving.</p>
              </div>
            </div>

            {/* Small floating specs */}
            <div className="absolute -top-4 -right-4 bg-[#1a1a18] border border-white/10 p-3 shadow-lg hidden sm:block rounded">
              <p className="font-mono text-[9px] text-[#c9a050] uppercase tracking-widest">STUDIO LOCATION:</p>
              <p className="font-serif text-xs font-semibold text-[#f4f1ea] mt-1">Banashankari, Bangalore</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
