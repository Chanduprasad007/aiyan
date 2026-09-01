import { MapPin, Phone, Clock, Compass, ExternalLink, Star, MessageCircle } from 'lucide-react';
import ownerImg from '../assets/images/owner.png';

export default function StoreLocation() {
  const mapUrl = "https://maps.app.goo.gl/U6CKjBacWw5xVvbB6";

  const reviews = [
    {
      author: 'Priya R.',
      type: 'Bridal Blouse',
      rating: 5,
      text: 'Got my wedding blouse done with heavy Maggam work. SK guided me on the design and the fitting was flawless on the first try. Very honest rates compared to commercial stores in Jayanagar!'
    },
    {
      author: 'Deepa Hegde',
      type: 'Varamahalakshmi Puja Saree',
      rating: 5,
      text: 'Superb boutique in Banashankari! I gave my silk saree blouse with peacock border work. Got it delivered right on time in 4 days. Highly recommended.'
    }
  ];

  return (
    <section id="location" className="bg-[#faf7f2] py-16 sm:py-24 border-b border-[#e8dfd3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-[#854d0e] bg-[#fef3c7] border border-[#fde68a]">
            <span>Banashankari 3rd Stage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1f1a15] tracking-tight">
            Drop by Our Banashankari Shop
          </h2>
          <div className="h-0.5 w-16 bg-[#d97706] mx-auto rounded-full" />
          <p className="text-[#574d43] text-sm sm:text-base leading-relaxed font-normal">
            We are conveniently located in Kakathiya Nagar, Banashankari 3rd Stage. Come visit us to feel raw silk textures, view zari threads, or get measured in person!
          </p>
        </div>

        {/* Store Detail Card and Map Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Detailed Info Card */}
          <div className="lg:col-span-5 bg-white border border-[#e8dfd3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-5">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d97706] bg-[#fef3c7] shrink-0">
                  <img src={ownerImg} alt="SK" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1f1a15]">
                    Aiyan Embroidery & Hand Works
                  </h3>
                  <span className="text-xs font-semibold text-[#b45309]">
                    Managed by Master Artisan SK
                  </span>
                </div>
              </div>

              {/* Specifications Address & Details */}
              <div className="space-y-3.5 text-xs text-[#3d342a]">
                <div className="flex items-start">
                  <MapPin className="h-4.5 w-4.5 text-[#d97706] shrink-0 mr-2.5 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1f1a15] block">
                      Shop Address:
                    </span>
                    <a 
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#574d43] hover:text-[#b45309] leading-relaxed block mt-0.5 transition-colors"
                    >
                      253, 4th Main Rd, Kakathiya Nagar, Banashankari 3rd Stage, Bengaluru, Karnataka 560061
                    </a>
                    <span className="text-[11px] text-[#b45309] font-semibold block mt-0.5">
                      Landmark: Near Kakathiya Nagar Park, Banashankari 3rd Stage
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-4.5 w-4.5 text-[#d97706] shrink-0 mr-2.5 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1f1a15] block">
                      Phone & Orders:
                    </span>
                    <a 
                      href="tel:+919845531210"
                      className="text-[#1f1a15] hover:text-[#b45309] block font-bold text-sm mt-0.5"
                    >
                      +91 98455 31210 / +91 80240 91312
                    </a>
                    <span className="text-[11px] text-[#736b63] block">
                      Feel free to call or WhatsApp anytime before visiting
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-4.5 w-4.5 text-[#d97706] shrink-0 mr-2.5 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1f1a15] block">
                      Opening Hours:
                    </span>
                    <span className="text-[#574d43] block mt-0.5">
                      Monday – Saturday: 10:00 AM – 8:30 PM
                    </span>
                    <span className="text-[#574d43] block">
                      Sunday: 11:00 AM – 5:00 PM (Appointments welcome)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#f5efe6] flex flex-col sm:flex-row gap-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <Compass className="h-4 w-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>

              <a
                href="https://wa.me/919845531210?text=Hello%20SK!%20I%20am%20coming%20to%20your%20shop%20in%20Banashankari."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 rounded-xl transition-colors flex items-center justify-center shadow-sm"
                title="WhatsApp SK"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Map Visual & Customer Reviews */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            
            {/* Visual Styled Map Area */}
            <div className="bg-white border border-[#e8dfd3] rounded-3xl p-6 text-center shadow-sm flex flex-col items-center justify-center space-y-3">
              <div className="bg-[#fef3c7] p-3 rounded-full text-[#d97706]">
                <MapPin className="h-6 w-6" />
              </div>
              
              <div>
                <h4 className="font-serif text-base font-bold text-[#1f1a15]">
                  Easy to Reach in Banashankari
                </h4>
                <p className="text-xs text-[#665e55] max-w-sm mx-auto mt-1">
                  Convenient street parking available. Located close to Ring Road, Banashankari 3rd Stage.
                </p>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#fef3c7] hover:bg-[#fde68a] text-[#854d0e] text-xs font-bold px-5 py-2.5 rounded-xl border border-[#fde68a] transition-colors shadow-sm"
              >
                <Compass className="h-4 w-4" />
                <span>Get Exact Live Directions (Google Maps)</span>
                <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
              </a>
            </div>

            {/* Verified Reviews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((rev, idx) => (
                <div key={idx} className="bg-white border border-[#e8dfd3] p-4.5 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#1f1a15] block">{rev.author}</span>
                      <span className="text-[10px] text-[#b45309] font-semibold">{rev.type}</span>
                    </div>
                    <div className="flex items-center text-[#d97706]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#574d43] leading-relaxed italic font-normal">
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
