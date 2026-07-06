import { MapPin, Phone, Clock, Compass, ExternalLink, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function StoreLocation() {
  const mapUrl = "https://maps.app.goo.gl/1PX2hcaNBJwC8mW39";

  const reviews = [
    {
      author: 'Priya R. (Bridal Customer)',
      rating: 5,
      date: 'June 2026',
      text: 'Extremely detailed maggam and zardosi work! Got my bridal blouse done for my wedding silk saree here. The peacocks and gold thread finish are stunning. Worth every rupee!'
    },
    {
      author: 'Anjali Sharma (Festive Wardrobe)',
      rating: 5,
      date: 'May 2026',
      text: 'I requested custom embroidery on my raw silk jacket. The fit is superb and the floral embroidery looks elegant. Prompt delivery and highly cooperative staff.'
    }
  ];

  return (
    <section id="location" className="bg-[#0c0c0b] py-20 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3 py-1 border border-[#c9a050]/30 rounded-full w-max text-[10px] uppercase tracking-widest text-[#c9a050]">
            Visit Our Workshop
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">Our Banashankari Boutique</h2>
          <div className="h-0.5 w-16 bg-[#c9a050] mx-auto rounded-full" />
          <p className="font-sans text-[#a8a29e] text-sm leading-relaxed">
            Come visit Aiyan Embroidery And Hand Works in Bangalore. Experience raw silk fabrics, review thread lusters in person, and consult with our master artisans.
          </p>
        </div>

        {/* Store Detail Card and Map Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Detailed Info Card */}
          <div className="lg:col-span-5 bg-[#1a1a18] border border-white/5 rounded p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Boutique Name */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-widest text-[#c9a050] uppercase block">SNEHA COLONY, BANGALORE</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Aiyan Embroidery And Hand Works
                </h3>
              </div>

              {/* Specifications Address */}
              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-start text-[#a8a29e]">
                  <MapPin className="h-5 w-5 text-[#c9a050] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-serif font-bold text-[#f4f1ea] uppercase tracking-wider block">Boutique Address:</span>
                    <span className="text-[#a8a29e] leading-relaxed block mt-1">
                      No. 12, Sneha Colony, Hosakerehalli, Banashankari 3rd Stage, Bangalore, Karnataka - 560085
                    </span>
                    <span className="text-[10px] text-[#c9a050] block mt-1">Landmark: Near Banashankari BDA Complex / Hosakerehalli Lake</span>
                  </div>
                </div>

                <div className="flex items-start text-[#a8a29e]">
                  <Phone className="h-5 w-5 text-[#c9a050] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-serif font-bold text-[#f4f1ea] uppercase tracking-wider block">Phone & Inquiries:</span>
                    <span className="text-[#a8a29e] block mt-1 font-mono text-sm">
                      +91 8024091312 / +91 98455 31210
                    </span>
                    <span className="text-[10px] text-[#a8a29e] block mt-1">Consultation hours: 10:00 AM - 8:30 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start text-[#a8a29e]">
                  <Clock className="h-5 w-5 text-[#c9a050] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-serif font-bold text-[#f4f1ea] uppercase tracking-wider block">Business Hours:</span>
                    <span className="text-[#a8a29e] block mt-1">
                      Monday – Saturday: 10:00 AM – 8:30 PM
                    </span>
                    <span className="text-[#a8a29e] block">
                      Sunday: 11:00 AM – 5:00 PM (By Appointment Only)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Directions Action Button */}
            <div className="pt-6 border-t border-white/5">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#c9a050] text-[#0c0c0b] font-bold uppercase text-xs tracking-widest py-3.5 hover:bg-[#b08b40] transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <Compass className="h-4 w-4 text-[#0c0c0b]" />
                <span>Get Directions</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#0c0c0b]" />
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Visual Styled Map Area */}
            <div className="relative bg-[#0c0c0b] border border-white/5 rounded overflow-hidden aspect-[16/10] flex flex-col items-center justify-center p-8 text-center shadow-lg group">
              {/* Graphic decorative grid in background */}
              <div className="absolute inset-0 opacity-[0.04] bg-radial-gradient from-[#c9a050] via-transparent to-transparent group-hover:opacity-[0.08] transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-5 max-w-md">
                <div className="bg-black/40 border border-[#c9a050]/20 p-4 rounded w-fit mx-auto">
                  <MapPin className="h-8 w-8 text-[#c9a050] animate-bounce" />
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-white tracking-wide uppercase">Banashankari Location Verified</h4>
                  <p className="font-sans text-xs text-[#a8a29e] leading-relaxed font-light">
                    Click the button below to load the precise live Google Maps navigation coordinates directly to our shop entrance in Bangalore.
                  </p>
                </div>

                <div className="bg-black/60 border border-white/5 rounded px-4 py-3 font-mono text-[10px] text-[#a8a29e] inline-block uppercase tracking-wider">
                  GPS: 12.9186798° N, 77.5447826° E
                </div>

                <div className="pt-2">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex border border-white/10 text-[#f4f1ea] hover:bg-[#c9a050] hover:text-[#0c0c0b] hover:border-[#c9a050] text-xs font-bold uppercase tracking-widest px-5 py-3 rounded transition-all duration-300"
                  >
                    Open Live Interactive Map
                  </a>
                </div>
              </div>
            </div>

            {/* Quick reviews showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((rev, idx) => (
                <div key={idx} className="bg-[#1a1a18] border border-white/5 p-4.5 rounded space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-serif font-bold text-[#f4f1ea]">{rev.author}</span>
                    <span className="font-mono text-[#a8a29e]">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-[#c9a050]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <p className="font-sans text-[11px] text-[#a8a29e] leading-normal italic font-light">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
