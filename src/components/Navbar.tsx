import { useState } from 'react';
import { Moon, Sparkles, Terminal, Download, Monitor, Sliders, HelpCircle, Code2, Menu, X, Check } from 'lucide-react';

interface NavbarProps {
  onQuickInstallClick: () => void;
}

export function Navbar({ onQuickInstallClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedQuickCmd, setCopiedQuickCmd] = useState(false);

  const quickOneLiner = `curl -sSL https://raw.githubusercontent.com/.../install.sh | bash`;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0f19]/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">Lịch Âm - Bát Tự</span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-500/15 text-cyan-400 rounded border border-cyan-500/30">
                Xubuntu 22/24
              </span>
            </div>
            <p className="text-xs text-slate-400">Giao diện Conky Màn Hình Tối Ưu</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollTo('simulator')}
            className="px-3 py-2 rounded-lg hover:text-cyan-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Monitor className="w-4 h-4 text-cyan-400" />
            Mô Phỏng Trực Quan
          </button>
          <button
            onClick={() => scrollTo('install-guide')}
            className="px-3 py-2 rounded-lg hover:text-cyan-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            Hướng Dẫn Cài Đặt
          </button>
          <button
            onClick={() => scrollTo('source-code')}
            className="px-3 py-2 rounded-lg hover:text-cyan-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            Bộ Mã Nguồn
          </button>
          <button
            onClick={() => scrollTo('optimization')}
            className="px-3 py-2 rounded-lg hover:text-cyan-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Tối Ưu Xubuntu
          </button>
          <button
            onClick={() => scrollTo('generator')}
            className="px-3 py-2 rounded-lg hover:text-cyan-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4 text-sky-400" />
            Tùy Biến Lệnh
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="px-3 py-2 rounded-lg hover:text-cyan-400 hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-rose-400" />
            Sửa Lỗi
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-quick-install-btn"
            onClick={onQuickInstallClick}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>Lệnh Cài Đặt Nhanh</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1424] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => scrollTo('simulator')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Monitor className="w-4 h-4 text-cyan-400" />
            Trình Mô Phỏng Trực Quan
          </button>
          <button
            onClick={() => scrollTo('install-guide')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            Hướng Dẫn Cài Đặt Chi Tiết
          </button>
          <button
            onClick={() => scrollTo('source-code')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            Bộ Mã Nguồn & Cấu Hình
          </button>
          <button
            onClick={() => scrollTo('optimization')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Bí Quyết Tối Ưu Xubuntu
          </button>
          <button
            onClick={() => scrollTo('generator')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-sky-400" />
            Tùy Biến Lệnh & Tọa Độ
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-rose-400" />
            Khắc Phục Lỗi Thường Gặp
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuickInstallClick();
              }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              Xem Lệnh Cài Đặt Nhanh
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
