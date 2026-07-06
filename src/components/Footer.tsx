import { Scissors, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0b] border-t border-white/5 text-[#a8a29e] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-white/5">
          
          {/* Logo & Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 border border-[#c9a050] rotate-45 flex items-center justify-center shrink-0">
                <span className="-rotate-45 font-serif text-[#c9a050] text-lg font-bold">A</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.1em] text-[#f4f1ea] block uppercase">AIYAN</span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#c9a050] block font-bold uppercase">EMBROIDERY & HAND WORKS</span>
              </div>
            </div>
            
            <p className="font-sans text-xs leading-relaxed text-[#a8a29e] max-w-sm font-light">
              Your premier boutique in Banashankari, Bangalore for high-end, handcrafted bridal blouses, designer jackets, and majestic saris. Blending years of artisan legacy with custom modern silhouettes.
            </p>
          </div>

          {/* Quick Contact Specs */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-[10px] text-[#c9a050] uppercase tracking-widest font-bold">Contact Studio</h4>
            <div className="space-y-2 font-sans text-xs text-[#a8a29e]">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2.5 text-[#c9a050] shrink-0" />
                <span>253, 4th Main Rd, Kakathiya Nagar, Banashankari 3rd Stage, Bengaluru</span>
              </div>
              <div className="flex items-center font-mono">
                <Phone className="h-4 w-4 mr-2.5 text-[#c9a050] shrink-0" />
                <span>+91 8024091312</span>
              </div>
            </div>
          </div>

          {/* Legal and compliance */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-[10px] text-[#c9a050] uppercase tracking-widest font-bold">Heritage Craft</h4>
            <div className="space-y-1.5 font-sans text-xs">
              <p className="leading-relaxed font-serif uppercase tracking-wider text-white">100% Handcrafted Guarantee</p>
              <p className="text-[#a8a29e] text-[10px] font-light">All designs are intellectual property of Aiyan Embroidery Bangalore.</p>
            </div>
          </div>

        </div>

        {/* Bottom section copyright and attribution */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-[#a8a29e] font-light">
          <p>© 2026 Aiyan Embroidery And Hand Works. All Rights Reserved.</p>
          <div className="flex items-center space-x-2">
            <span>Handcrafted in Bangalore, Karnataka</span>
            <span className="text-[#c9a050]">✦</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
