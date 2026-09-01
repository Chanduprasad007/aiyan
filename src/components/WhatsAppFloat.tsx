import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const whatsappNumber = "919845531210";
  const defaultMessage = encodeURIComponent("Hello SK! I would like to inquire about bridal blouse / maggam handwork customization.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="hidden sm:flex fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 items-center justify-center group cursor-pointer"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-sans text-xs font-bold pl-0 group-hover:pl-2">
        Chat with SK
      </span>
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d97706]"></span>
      </span>
    </a>
  );
}
