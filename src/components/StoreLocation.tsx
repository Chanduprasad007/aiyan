import { MapPin, Phone, Clock, Compass, ExternalLink, Star, MessageCircle, Calendar } from 'lucide-react';

export default function StoreLocation() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=253,+4th+Main+Rd,+Kakathiya+Nagar,+Banashankari+3rd+Stage,+Banashankari,+Bengaluru,+Karnataka+560061";

  const reviews = [
    {
      author: 'Priya R. (Bridal Customer)',
      rating: 5,
      date: 'Recent Bridal Review',
      text: 'Extremely detailed Maggam and Zardosi work! Got my bridal blouse done for my wedding silk saree here. The peacocks and gold thread finish are stunning. Worth every rupee!'
    },
    {
      author: 'Anjali Sharma (Festive Wardrobe)',
      rating: 5,
      date: 'Festive Review',
      text: 'I requested custom embroidery on my raw silk jacket. The fit is superb and the floral embroidery looks regal. Prompt delivery and very polite master artisans.'
    }
  ];

  return (
    <section id="location" className="bg-[#09080b] py-20 sm:py-28 border-b border-white/5 relative">
      
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#c9a050]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-4 py-1 border border-[#c9a050]/30 rounded-full text-[10px] uppercase tracking-widest text-[#c9a050] bg-[#141318]">
            Visit Our Atelier
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Banashankari Boutique
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#c9a050] to-transparent mx-auto rounded-full" />
          <p className="font-sans text-neutral-300 text-sm leading-relaxed font-light">
            Experience our handcrafting looms in person. Visit Aiyan Embroidery And Hand Works in Bangalore to feel pure raw silk textures, view zari thread lusters, and consult directly with our master tailors.
          </p>
        </div>

        {/* Store Detail Card and Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Detailed Info Card */}
          <div className="lg:col-span-5 bg-[#141318] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-6">
              
              {/* Boutique Name */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-widest text-[#c9a050] uppercase block font-bold">
                  KAKATHIYA NAGAR, BANGALORE
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Aiyan Embroidery And Hand Works
                </h3>
              </div>

              {/* Specifications Address & Details */}
              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-start text-neutral-300">
                  <MapPin className="h-5 w-5 text-[#c9a050] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-cinzel font-bold text-white uppercase tracking-wider block">
                      Atelier Address:
                    </span>
                    <span className="text-neutral-300 leading-relaxed block mt-1">
                      253, 4th Main Rd, Kakathiya Nagar, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560061
                    </span>
                    <span className="text-[10px] text-[#c9a050] block mt-1 font-mono">
                      Landmark: Banashankari 3rd Stage, Kakathiya Nagar
                    </span>
                  </div>
                </div>

                <div className="flex items-start text-neutral-300">
                  <Phone className="h-5 w-5 text-[#c9a050] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-cinzel font-bold text-white uppercase tracking-wider block">
                      Direct Appointments & Orders:
                    </span>
                    <span className="text-white block mt-1 font-mono text-sm font-bold">
                      +91 98455 31210 / +91 80240 91312
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Consultation hours: 10:00 AM – 8:30 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start text-neutral-300">
                  <Clock className="h-5 w-5 text-[#c9a050] shrink-0 mr-3 mt-0.5" />
                  <div>
                    <span className="font-cinzel font-bold text-white uppercase tracking-wider block">
                      Business Hours:
                    </span>
                    <span className="text-neutral-300 block mt-1">
                      Monday – Saturday: 10:00 AM – 8:30 PM
                    </span>
                    <span className="text-neutral-300 block">
                      Sunday: 11:00 AM – 5:00 PM (By Prior Appointment)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#c9a050] hover:bg-[#b08535] text-[#09080b] font-bold uppercase text-xs tracking-wider py-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Compass className="h-4 w-4" />
                <span>Get Google Maps Route</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>

              <a
                href="https://wa.me/919845531210?text=Hello%20Aiyan%20Embroidery!%20I%20would%20like%20to%20book%20a%20bridal%20fitting%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-xl transition-colors flex items-center justify-center"
                title="Book on WhatsApp"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Interactive Map Visual & Reviews */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Visual Styled Map Area */}
            <div className="relative bg-[#141318] border border-white/10 rounded-2xl overflow-hidden aspect-[16/10] flex flex-col items-center justify-center p-8 text-center shadow-xl group">
              <div className="absolute inset-0 opacity-[0.03] bg-radial-gradient from-[#c9a050] via-transparent to-transparent group-hover:opacity-[0.06] transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-4 max-w-md">
                <div className="bg-[#09080b] border border-[#c9a050]/30 p-4 rounded-full w-fit mx-auto shadow-inner">
                  <MapPin className="h-8 w-8 text-[#c9a050] animate-bounce" />
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="font-cinzel text-base font-bold text-white tracking-wide uppercase">
                    Banashankari Location Coordinates
                  </h4>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed font-light">
                    Located centrally in Banashankari 3rd Stage, Kakathiya Nagar. Convenient parking available for bridal consultations.
                  </p>
                </div>

                <div className="bg-[#09080b] border border-white/10 rounded-xl px-4 py-2.5 font-mono text-[10px] text-[#c9a050] inline-block uppercase tracking-wider">
                  GPS: 12.9248231° N, 77.5355672° E
                </div>

                <div className="pt-2">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex border border-white/15 bg-white/5 hover:bg-[#c9a050] text-white hover:text-[#09080b] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 shadow-md"
                  >
                    Open Live Navigation
                  </a>
                </div>
              </div>
            </div>

            {/* Verified Reviews Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((rev, idx) => (
                <div key={idx} className="bg-[#141318] border border-white/10 p-5 rounded-xl space-y-2.5 shadow-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-cinzel font-bold text-white">{rev.author}</span>
                    <span className="font-mono text-[10px] text-neutral-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-[#c9a050]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed italic font-light">
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
