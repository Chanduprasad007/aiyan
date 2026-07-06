import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ConsultantWidget from './components/ConsultantWidget';
import CostEstimator from './components/CostEstimator';
import StoreLocation from './components/StoreLocation';
import Footer from './components/Footer';

export default function App() {
  const [preFillDetails, setPreFillDetails] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDesign = (details: string) => {
    setPreFillDetails(details);
    // Clear pre-fill after a brief timeout so it can be re-triggered
    setTimeout(() => {
      setPreFillDetails('');
    }, 1000);
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#0a0505] text-stone-200 selection:bg-amber-600 selection:text-stone-900 overflow-x-hidden antialiased">
      {/* Header */}
      <Header onNavigate={handleNavigate} />

      <main id="main-content">
        {/* Hero Banner Section */}
        <Hero onNavigate={handleNavigate} />

        {/* About Heritage & Process */}
        <AboutSection />

        {/* Signature Works Gallery Portfolio */}
        <PortfolioSection onSelectDesign={handleSelectDesign} />

        {/* Interactive AI Embroidery Consultant */}
        <ConsultantWidget 
          customPreFill={preFillDetails} 
          onScrollToLocation={() => handleNavigate('location')} 
        />

        {/* Interactive Price Estimator */}
        <CostEstimator onPreFillConsultant={handleSelectDesign} />

        {/* Store Location & Google Maps Navigation */}
        <StoreLocation />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
