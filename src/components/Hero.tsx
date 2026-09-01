import { ArrowRight, Sparkles, Star, ShieldCheck, Clock, MessageCircle, Heart, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import imageHero from '../assets/images/hero_bridal_saree_embroidery_1783349684763.jpg';
import ownerImg from '../assets/images/owner.png';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative bg-festive-hero py-14 sm:py-20 border-b border-[#e8dfd3] overflow-hidden">
      
      {/* Decorative Warm Light Background Circles */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#fef3c7]/60 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#fed7aa]/40 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Friendly Location & Rating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-[#854d0e] bg-white border border-[#fde68a] shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#d97706]" />
              <span>Namaskara! • Banashankari 3rd Stage, Bangalore</span>
              <span className="text-[#d97706]/40">•</span>
              <span className="inline-flex items-center gap-1 font-bold text-[#b45309]">
                <Star className="h-3.5 w-3.5 fill-[#d97706] text-[#d97706]" />
                4.9/5 (500+ Happy Brides)
              </span>
            </motion.div>
 
            {/* Main Header Display Typography */}
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1f1a15] leading-[1.18]"
              >
                Custom Maggam & <br />
                <span className="italic font-normal text-[#d97706]">
                  Bridal Blouse Embroidery
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#574d43] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
              >
                Welcome to our friendly neighborhood boutique! We specialize in authentic Aari, Maggam work, Zardosi, and beadwork for bridal blouses, saree borders, and designer jackets. Perfect fitting and honest local prices.
              </motion.p>
            </div>

            {/* Quick Owner SK Endorsement Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="bg-white/90 backdrop-blur-sm border border-[#e8dfd3] p-4 rounded-2xl shadow-sm flex items-center gap-3.5 max-w-xl mx-auto lg:mx-0 text-left"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#d97706] shadow-sm shrink-0 bg-[#fef3c7]">
                <img src={ownerImg} alt="SK - Shop Owner" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#1f1a15]">SK — Master Artisan & Shop Owner</span>
                  <span className="bg-[#ecfdf5] text-[#047857] text-[10px] px-2 py-0.5 rounded-full font-bold border border-[#a7f3d0]">
                    Atelier In-Charge
                  </span>
                </div>
                <p className="text-xs text-[#665e55] leading-normal font-light">
                  "Bring your saree blouse piece or share a photo on WhatsApp. I personally verify every thread and bead so your blouse looks stunning!"
                </p>
              </div>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-[11px] font-semibold text-[#665e55] pt-1"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#d97706] shrink-0" />
                <span>100% Handwork</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#d97706] shrink-0" />
                <span>On-time Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-[#d97706] shrink-0" />
                <span>Affordable Rates</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 pt-2"
            >
              <a
                href="https://wa.me/919845531210?text=Hello%20SK!%20I%20have%20a%20blouse%20photo%20and%20want%20to%20know%20the%20embroidery%20cost%20and%20timeline."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Get Instant WhatsApp Quote</span>
              </a>

              <button
                onClick={() => onNavigate('ai-consultant')}
                className="w-full sm:w-auto bg-[#d97706] hover:bg-[#b45309] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
              >
                <Sparkles className="h-4 w-4 fill-white" />
                <span>AI Blouse Stylist</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="w-full sm:w-auto bg-white border border-[#e8dfd3] hover:border-[#d97706] text-[#3d342a] px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
              >
                <span>View Lookbook</span>
              </button>
            </motion.div>

          </div>

          {/* Hero Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative bg-white border border-[#e8dfd3] p-2.5 rounded-2xl shadow-xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[480px]">
              <img 
                src={imageHero} 
                alt="Intricate Royal Silk Saree Embroidery by Aiyan Embroidery Bangalore" 
                className="w-full h-full object-cover rounded-xl filter hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Bottom Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#e8dfd3] shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45309]">
                    Signature Bridal Work
                  </span>
                  <span className="text-xs font-bold text-[#047857] bg-[#ecfdf5] px-2 py-0.5 rounded-full border border-[#a7f3d0]">
                    From ₹2,499
                  </span>
                </div>
                <h3 className="font-serif text-sm font-bold text-[#1f1a15] mt-1">
                  Handcrafted Maggam Work with Pearl & Stone Jaal
                </h3>
                <p className="text-xs text-[#665e55] mt-1">
                  Custom scalloped necklines and elbow sleeves made to fit your exact measurements.
                </p>
              </div>
            </div>

            {/* Floating Store Badge */}
            <div className="absolute -top-3 -right-3 bg-white border border-[#fde68a] p-3 shadow-lg hidden sm:flex items-center gap-2.5 rounded-xl">
              <div className="p-2 bg-[#fef3c7] rounded-lg text-[#d97706]">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#b45309] uppercase tracking-wider">VISIT SHOP</p>
                <p className="text-xs font-bold text-[#1f1a15]">Banashankari 3rd Stage</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
