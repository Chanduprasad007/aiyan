import { Phone, MessageCircle, Sparkles, MapPin } from 'lucide-react';

interface MobileBottomBarProps {
  onNavigate: (sectionId: string) => void;
}

export default function MobileBottomBar({ onNavigate }: MobileBottomBarProps) {
  const mapUrl = "https://maps.app.goo.gl/U6CKjBacWw5xVvbB6";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#e8dfd3] sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <div className="grid grid-cols-4 items-center h-16 px-2">
        
        {/* WhatsApp */}
        <a
          href="https://wa.me/919845531210?text=Hello%20SK!%20I%20want%20to%20get%20a%20quote%20for%20my%20blouse%20embroidery."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-[#25D366] hover:text-[#20bd5a] transition-colors py-1 cursor-pointer"
        >
          <div className="p-1 rounded-full bg-[#ecfdf5]">
            <MessageCircle className="h-4.5 w-4.5 fill-current" />
          </div>
          <span className="text-[10px] font-bold text-[#1f1a15] mt-1">WhatsApp</span>
        </a>

        {/* Call SK */}
        <a
          href="tel:+919845531210"
          className="flex flex-col items-center justify-center text-[#d97706] hover:text-[#b45309] transition-colors py-1 cursor-pointer"
        >
          <div className="p-1 rounded-full bg-[#fef3c7]">
            <Phone className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] font-bold text-[#1f1a15] mt-1">Call SK</span>
        </a>

        {/* AI Stylist */}
        <button
          onClick={() => onNavigate('ai-consultant')}
          className="flex flex-col items-center justify-center text-[#b45309] hover:text-[#d97706] transition-colors py-1 cursor-pointer"
        >
          <div className="p-1 rounded-full bg-[#fef3c7]">
            <Sparkles className="h-4.5 w-4.5 fill-[#d97706] text-[#d97706]" />
          </div>
          <span className="text-[10px] font-bold text-[#1f1a15] mt-1">AI Stylist</span>
        </button>

        {/* Google Maps */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-[#059669] hover:text-[#047857] transition-colors py-1 cursor-pointer"
        >
          <div className="p-1 rounded-full bg-[#ecfdf5]">
            <MapPin className="h-4.5 w-4.5" />
          </div>
          <span className="text-[10px] font-bold text-[#1f1a15] mt-1">Directions</span>
        </a>

      </div>
    </div>
  );
}
