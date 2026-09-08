import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { StepByStepGuide } from './components/StepByStepGuide';
import { CodeRepository } from './components/CodeRepository';
import { VisualOptimizationGuide } from './components/VisualOptimizationGuide';
import { ConfigGenerator } from './components/ConfigGenerator';
import { Troubleshooting } from './components/Troubleshooting';
import { QuickInstallModal } from './components/QuickInstallModal';
import { Footer } from './components/Footer';

export default function App() {
  const [quickInstallModalOpen, setQuickInstallModalOpen] = useState(false);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExportConkyConfig = (themeId: string, position: string) => {
    scrollToElement('generator');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top sticky navigation */}
      <Navbar onQuickInstallClick={() => setQuickInstallModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Introduction */}
        <Hero
          onExploreClick={() => scrollToElement('simulator')}
          onInstallGuideClick={() => scrollToElement('install-guide')}
        />

        {/* 1. Interactive Desktop Preview & Simulator */}
        <InteractiveSimulator onExportConkyConfig={handleExportConkyConfig} />

        {/* 2. Comprehensive 9-Step Installation Guide */}
        <StepByStepGuide />

        {/* 3. Full Source Code Repository & Documentation */}
        <CodeRepository />

        {/* 4. Visual & Performance Optimization Guide for Xubuntu XFCE */}
        <VisualOptimizationGuide />

        {/* 5. Custom Command & Script Generator */}
        <ConfigGenerator />

        {/* 6. FAQ & Troubleshooting Common Errors */}
        <Troubleshooting />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Install Command Popup Modal */}
      <QuickInstallModal
        isOpen={quickInstallModalOpen}
        onClose={() => setQuickInstallModalOpen(false)}
      />
    </div>
  );
}
