import { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, Shield, Cpu, Clock, Compass, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onInstallGuideClick: () => void;
}

export function Hero({ onExploreClick, onInstallGuideClick }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const oneLinerCommand = `bash <(curl -sSL https://gist.githubusercontent.com/raw/lunar_conky_xubuntu.sh)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(oneLinerCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/80">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Dành riêng cho hệ điều hành Xubuntu & Môi trường XFCE Desktop</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Lịch Âm - Bát Tự & Tiết Khí{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Trực Quan Trên Xubuntu
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Giải pháp hiển thị Lịch Âm, Tứ Trụ Bát Tự, 24 Tiết Khí thiên văn độ chính xác cao từ NASA JPL,
            tự động cập nhật Thời tiết & Trạng thái phần cứng. Hoạt động dạng <strong>ẩn nền tự động sau thời gian trễ</strong> khi mở máy.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-start-install-btn"
              onClick={onInstallGuideClick}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-base shadow-lg shadow-cyan-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Terminal className="w-5 h-5" />
              <span>Xem Hướng Dẫn Cài Đặt Chi Tiết</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-preview-btn"
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-semibold text-base flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-cyan-400" />
              <span>Thử Nghiệm Màn Hình Trực Quan</span>
            </button>
          </div>

          {/* Feature highlights pill bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs sm:text-sm mb-1">
                <Compass className="w-4 h-4" />
                <span>Thiên Văn NASA</span>
              </div>
              <p className="text-xs text-slate-400">Ephemeris DE421 tính kinh độ Mặt Trời & điểm Sóc trăng mới chuẩn xác</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs sm:text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>Bát Tự Can Chi</span>
              </div>
              <p className="text-xs text-slate-400">Can Chi Năm, Tháng, Ngày, Giờ & 24 Tiết/Trung khí trong tháng</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs sm:text-sm mb-1">
                <Shield className="w-4 h-4" />
                <span>Chạy Ẩn Sau Khi Boot</span>
              </div>
              <p className="text-xs text-slate-400">Độ trễ thông minh (sleep 10) tránh đè giao diện hoặc đen nền XFCE</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs sm:text-sm mb-1">
                <Cpu className="w-4 h-4" />
                <span>Siêu Nhẹ & Tối Ưu</span>
              </div>
              <p className="text-xs text-slate-400">Tiêu thụ &lt;0.1% CPU, font chữ sắc nét và độ trong suốt hoàn hảo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
