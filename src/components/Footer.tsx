import { Scissors, MapPin, Phone, MessageCircle, Clock, Heart } from 'lucide-react';
import ownerImg from '../assets/images/owner.png';

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
    <footer className="bg-[#f5efe6] border-t border-[#e8dfd3] text-[#574d43] py-14 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10 pb-10 border-b border-[#e8dfd3]">
          
          {/* Logo & Shop Info */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleItemClick('hero')}>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d97706] bg-[#fef3c7] shrink-0">
                <img src={ownerImg} alt="SK" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#1f1a15] block">Aiyan Embroidery</span>
                <span className="text-[10px] font-bold tracking-wider text-[#b45309] block uppercase">
                  Hand Works • Banashankari, Bangalore
                </span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed text-[#665e55] max-w-sm font-normal">
              Your trusted local boutique in Banashankari 3rd Stage for custom bridal blouses, Maggam work, Aari needlework, and designer lehenga stitching. Run with love by Master Artisan SK.
            </p>

            <div className="flex items-center space-x-2 pt-1">
              <a
                href="https://wa.me/919845531210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span>WhatsApp: +91 98455 31210</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-[#1f1a15] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => handleItemClick('portfolio')} className="hover:text-[#b45309] transition-colors cursor-pointer text-left">
                  Bridal Blouse Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('owner')} className="hover:text-[#b45309] transition-colors cursor-pointer text-left">
                  Meet SK (Shop Owner)
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('estimator')} className="hover:text-[#b45309] transition-colors cursor-pointer text-left">
                  Price & Timeline Estimator
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('ai-consultant')} className="hover:text-[#b45309] transition-colors cursor-pointer text-left">
                  AI Blouse Stylist
                </button>
              </li>
              <li>
                <button onClick={() => handleItemClick('location')} className="hover:text-[#b45309] transition-colors cursor-pointer text-left">
                  Shop Address & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold text-[#1f1a15] uppercase tracking-wider">
              Boutique Timings & Address
            </h4>
            <div className="space-y-2 text-xs text-[#574d43]">
              <p className="flex items-start">
                <MapPin className="h-4 w-4 text-[#d97706] mr-2 shrink-0 mt-0.5" />
                <span>253, 4th Main Rd, Kakathiya Nagar, Banashankari 3rd Stage, Bengaluru, Karnataka 560061</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 text-[#d97706] mr-2 shrink-0" />
                <span>+91 98455 31210 / +91 80240 91312</span>
              </p>
              <p className="flex items-center">
                <Clock className="h-4 w-4 text-[#d97706] mr-2 shrink-0" />
                <span>Mon – Sat: 10:00 AM – 8:30 PM (Sun by appointment)</span>
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#736b63]">
          <p>© {new Date().getFullYear()} Aiyan Embroidery And Hand Works. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Handcrafted with</span>
            <Heart className="h-3.5 w-3.5 text-[#e11d48] fill-[#e11d48]" />
            <span>for Bangalore brides</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
