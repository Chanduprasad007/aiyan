import { Scissors, MapPin, Phone, MessageCircle, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleItemClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#060507] border-t border-white/10 text-neutral-400 py-16 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12 pb-12 border-b border-white/10">
          
          {/* Logo & Atelier Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleItemClick('hero')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c9a050] to-[#e5c07b] flex items-center justify-center shrink-0 shadow-md">
                <Scissors className="text-[#09080b] h-5 w-5 rotate-45" />
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-widest text-white block">AIYAN</span>
                <span className="font-mono text-[8px] tracking-[0.25em] text-[#c9a050] block font-bold uppercase">
                  EMBROIDERY & HAND WORKS
                </span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed text-neutral-300 max-w-sm font-light">
              Bangalore’s premier luxury bridal blouse and maggam needlework atelier. Crafting bespoke heirlooms in pure gold zari, raw silk, and hand-embroidered kundan stone since 2012.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://wa.me/919845531210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border border-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp Atelier</span>
              </a>
              
              <a
                href="tel:+919845531210"
                className="bg-[#c9a050]/15 hover:bg-[#c9a050]/30 text-[#c9a050] px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border border-[#c9a050]/30 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Us</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] text-[#c9a050] uppercase tracking-widest font-bold">
              Atelier Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleItemClick('portfolio')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Bridal Blouses Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('portfolio')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Saree Borders & Pallus
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('portfolio')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Designer Silk Jackets
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('estimator')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Handcraft Timeline Estimator
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('ai-consultant')} className="hover:text-white transition-colors cursor-pointer text-left">
                  AI Bridal Stylist
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Visit Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-[10px] text-[#c9a050] uppercase tracking-widest font-bold">
              Bangalore Location
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <p className="flex items-start">
                <MapPin className="h-4 w-4 text-[#c9a050] mr-2 shrink-0 mt-0.5" />
                <span>253, 4th Main Rd, Kakathiya Nagar, Banashankari 3rd Stage, Bengaluru, Karnataka 560061</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 text-[#c9a050] mr-2 shrink-0" />
                <span>+91 98455 31210 / +91 80240 91312</span>
              </p>
              <p className="flex items-center">
                <Clock className="h-4 w-4 text-[#c9a050] mr-2 shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:30 PM IST</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Section Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-sans">
          <p>© {new Date().getFullYear()} Aiyan Embroidery And Hand Works. All rights reserved.</p>
          <div className="flex items-center space-x-1 text-neutral-400">
            <span>Handcrafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for brides across Bangalore</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
