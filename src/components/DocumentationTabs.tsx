import React, { useState } from 'react';
import { Sparkles, HelpCircle, Code2, ListOrdered, BookOpen } from 'lucide-react';
import { VisualOptimizationGuide } from './VisualOptimizationGuide';
import { Troubleshooting } from './Troubleshooting';
import { CodeRepository } from './CodeRepository';
import { StepByStepGuide } from './StepByStepGuide';

export const DocumentationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'optimization' | 'troubleshooting' | 'source' | 'manual'>('optimization');

  return (
    <section id="documentation-hub" className="py-12 bg-[#090d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-flex items-center gap-1.5 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Tài Liệu Hỗ Trợ & Bí Quyết Kỹ Thuật
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tối Ưu Hệ Thống & Hướng Dẫn Chuyên Sâu
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Chọn chủ đề bên dưới nếu bạn muốn tùy biến thêm hoặc cần xử lý hiện tượng đồ họa trên Xubuntu / XFCE.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-3xl mx-auto bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('optimization')}
            className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
            className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
            className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
            className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ListOrdered className="w-4 h-4 text-emerald-400" />
            <span>Cài Thủ Công 9 Bước</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="rounded-3xl bg-slate-900/40 border border-slate-800/80 p-2 sm:p-4 transition-all">
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
