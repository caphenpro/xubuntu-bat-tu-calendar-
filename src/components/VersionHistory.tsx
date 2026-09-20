import React, { useState } from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Wrench, 
  History, 
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
  Tag
} from 'lucide-react';
import { VERSION_HISTORY, CURRENT_VERSION, VersionRelease } from '../data/versions';

interface VersionHistoryProps {
  onGoToInstaller?: () => void;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({ onGoToInstaller }) => {
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({
    [CURRENT_VERSION]: true,
    'v3.1.0': false,
    'v3.0.0': false,
  });

  const toggleExpand = (ver: string) => {
    setExpandedVersions((prev) => ({
      ...prev,
      [ver]: !prev[ver],
    }));
  };

  const getStatusBadge = (status: VersionRelease['status']) => {
    switch (status) {
      case 'current':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Bản Hiện Tại (Khuyên Dùng)
          </span>
        );
      case 'stable':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            Bản Ổn Định
          </span>
        );
      case 'milestone':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            Cột Mốc Lớn
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-400 border border-slate-700">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            Lưu Trữ
          </span>
        );
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Sửa Lỗi':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <Wrench className="w-3 h-3 text-rose-400" />
            Sửa Lỗi
          </span>
        );
      case 'Tính Năng Mới':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Tính Năng Mới
          </span>
        );
      case 'Tối Ưu':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Zap className="w-3 h-3 text-amber-400" />
            Tối Ưu
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldAlert className="w-3 h-3 text-emerald-400" />
            Ổn Định & An Toàn
          </span>
        );
    }
  };

  return (
    <div className="space-y-8" id="version-history-section">
      {/* Header Info Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <History className="w-4 h-4" />
              <span>Tiến Trình Phát Triển & Nâng Cấp Phần Mềm</span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span>Lịch Sử Tiến Hóa Qua Các Phiên Bản</span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                Hiện tại: {CURRENT_VERSION}
              </span>
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Toàn bộ quá trình từ bản sơ khai đến phiên bản <strong className="text-white">{CURRENT_VERSION}</strong> hoàn thiện nhất — 
              đã giải quyết triệt để lỗi <code className="text-amber-300 bg-slate-800/80 px-1.5 py-0.5 rounded text-xs">UnboundLocalError</code>, 
              khắc phục xung đột XFCE Compositor và tích hợp trọn gói 1 file cài đặt duy nhất.
            </p>
          </div>

          {onGoToInstaller && (
            <button
              onClick={onGoToInstaller}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Lấy Ngay Bộ Cài {CURRENT_VERSION}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Version Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-800/80 text-center">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xl font-bold text-cyan-300 font-mono">6 Phiên bản</div>
            <div className="text-xs text-slate-400 mt-0.5">Tiến trình liên tục</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xl font-bold text-emerald-300 font-mono">100% Khắc phục</div>
            <div className="text-xs text-slate-400 mt-0.5">Lỗi biến & mạng</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xl font-bold text-amber-300 font-mono">1-File Shell</div>
            <div className="text-xs text-slate-400 mt-0.5">Cài đặt 1 lệnh duy nhất</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xl font-bold text-purple-300 font-mono">63 Tỉnh Thành</div>
            <div className="text-xs text-slate-400 mt-0.5">Tọa độ thời tiết VN</div>
          </div>
        </div>
      </div>

      {/* Timeline of Releases */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8 ml-2 sm:ml-4">
        {VERSION_HISTORY.map((rel) => {
          const isExpanded = !!expandedVersions[rel.version];
          const isCurrent = rel.status === 'current';

          return (
            <div key={rel.version} className="relative group">
              {/* Timeline Dot Marker */}
              <div 
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-[#0b0f19] ${
                  isCurrent 
                    ? 'bg-emerald-500 text-slate-950 ring-emerald-500/20 shadow-lg shadow-emerald-500/50' 
                    : rel.status === 'milestone'
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
              </div>

              {/* Version Card */}
              <div 
                className={`rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-b from-slate-900 to-slate-900/95 border-cyan-500/40 shadow-xl shadow-cyan-950/30'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Header Row */}
                <div 
                  onClick={() => toggleExpand(rel.version)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight">
                        {rel.version}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">({rel.releaseDate})</span>
                      {getStatusBadge(rel.status)}
                    </div>
                    <div className="text-sm font-semibold text-cyan-300">
                      {rel.codename}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">
                      {rel.highlight}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      type="button"
                      className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                    >
                      <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Details Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5 text-sm">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {rel.description}
                    </p>

                    {/* Categorized Changes */}
                    <div className="space-y-4">
                      {rel.changes.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-2 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
                          <div className="flex items-center gap-2">
                            {getCategoryBadge(group.category)}
                          </div>
                          <ul className="space-y-1.5 pl-1">
                            {group.items.map((item, iIdx) => (
                              <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                                <span className="text-cyan-400 font-bold mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Comparison note */}
                    <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-cyan-200">
                        <strong className="text-cyan-300">So với bản tiền nhiệm: </strong>
                        {rel.comparisonWithPrevious}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
