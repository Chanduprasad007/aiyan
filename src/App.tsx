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
    <div id="aiyan-app-root" className="min-h-screen bg-[#faf7f2] text-[#2c251e] selection:bg-[#fde68a] selection:text-[#78350f] overflow-x-hidden antialiased relative font-sans">
      
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
