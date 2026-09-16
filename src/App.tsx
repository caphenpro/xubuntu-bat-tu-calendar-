import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { DocumentationTabs } from './components/DocumentationTabs';
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

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top sticky navigation */}
      <Navbar onQuickInstallClick={() => setQuickInstallModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Introduction */}
        <Hero
          onExploreClick={() => scrollToElement('simulator')}
          onInstallGuideClick={() => scrollToElement('documentation-hub')}
        />

        {/* 1. Interactive Desktop Preview & Simulator + Embedded Single-File Installer */}
        <InteractiveSimulator />

        {/* 2. Unified Documentation Hub (XFCE Tweaks, Troubleshooting FAQ, Source Code, Manual Guide) */}
        <DocumentationTabs />
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
