import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, Code2, ListOrdered, BookOpen, History } from 'lucide-react';
import { VisualOptimizationGuide } from './VisualOptimizationGuide';
import { Troubleshooting } from './Troubleshooting';
import { CodeRepository } from './CodeRepository';
import { StepByStepGuide } from './StepByStepGuide';
import { VersionHistory } from './VersionHistory';
import { CURRENT_VERSION } from '../data/versions';

interface DocumentationTabsProps {
  initialTab?: 'changelog' | 'optimization' | 'troubleshooting' | 'source' | 'manual';
}

export const DocumentationTabs: React.FC<DocumentationTabsProps> = ({ initialTab = 'changelog' }) => {
  const [activeTab, setActiveTab] = useState<'changelog' | 'optimization' | 'troubleshooting' | 'source' | 'manual'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const scrollToSingleInstaller = () => {
    const el = document.getElementById('single-file-installer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="documentation-hub" className="py-12 bg-[#090d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-flex items-center gap-1.5 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Tài Liệu Kỹ Thuật, Nâng Cấp & Sửa Lỗi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Trung Tâm Kỹ Thuật & Nhật Ký Phiên Bản
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Theo dõi quá trình nâng cấp, tra cứu mã nguồn, bí quyết khử chớp tắt XFCE và cẩm nang xử lý lỗi chi tiết.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-4xl mx-auto bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('changelog')}
            className={`flex-1 min-w-[160px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'changelog'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>Nhật Ký Phiên Bản</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
              {CURRENT_VERSION}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('optimization')}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'optimization'
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Tối Ưu XFCE</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('troubleshooting')}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'troubleshooting'
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-rose-400" />
            <span>Sửa Lỗi (FAQ)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('source')}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'source'
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Xem Mã Nguồn</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ListOrdered className="w-4 h-4 text-emerald-400" />
            <span>Cài Thủ Công</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="rounded-3xl bg-slate-900/40 border border-slate-800/80 p-2 sm:p-4 transition-all">
          {activeTab === 'changelog' && (
            <div className="animate-fadeIn p-2 sm:p-4">
              <VersionHistory onGoToInstaller={scrollToSingleInstaller} />
            </div>
          )}

          {activeTab === 'optimization' && (
            <div className="animate-fadeIn">
              <VisualOptimizationGuide />
            </div>
          )}

          {activeTab === 'troubleshooting' && (
            <div className="animate-fadeIn">
              <Troubleshooting />
            </div>
          )}

          {activeTab === 'source' && (
            <div className="animate-fadeIn">
              <CodeRepository />
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="animate-fadeIn">
              <StepByStepGuide />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

