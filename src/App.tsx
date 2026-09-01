import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import CostEstimator from './components/CostEstimator';
import ConsultantWidget from './components/ConsultantWidget';
import StoreLocation from './components/StoreLocation';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
  const [consultantPreFill, setConsultantPreFill] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectDesign = (details: string) => {
    setConsultantPreFill(details);
  };

  const handlePreFillConsultant = (preFillText: string) => {
    setConsultantPreFill(preFillText);
  };

  return (
    <div id="aiyan-app-root" className="min-h-screen bg-[#09080b] text-[#f4f1ea] selection:bg-[#c9a050] selection:text-[#09080b] overflow-x-hidden antialiased relative font-sans">
      
      {/* Ambient background glow layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#6b151b]/10 blur-[150px]" />
        <div className="absolute top-[40%] right-[-5%] w-[650px] h-[650px] rounded-full bg-[#c9a050]/8 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#6b151b]/8 blur-[130px]" />
      </div>

      {/* Main App Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        <Hero onNavigate={handleNavigate} />
        <AboutSection />
        <PortfolioSection onSelectDesign={handleSelectDesign} />
        <CostEstimator onPreFillConsultant={handlePreFillConsultant} />
        <ConsultantWidget 
          customPreFill={consultantPreFill} 
          onScrollToLocation={() => handleNavigate('location')} 
        />
        <StoreLocation />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppFloat />
    </div>
  );
}
