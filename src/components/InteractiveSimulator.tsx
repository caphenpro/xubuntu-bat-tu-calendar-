import React, { useState, useEffect } from 'react';
import { Monitor, Palette, Move, Sliders, Eye, RefreshCw, Copy, Check, Sparkles, Sun, Cloud, Cpu, HardDrive } from 'lucide-react';
import { CONKY_THEMES } from '../data/locations';
import { getBatTuNow, LunarCalendarData } from '../utils/lunarCalc';

interface SimulatorProps {
  onExportConkyConfig: (themeId: string, position: string) => void;
}

export function InteractiveSimulator({ onExportConkyConfig }: SimulatorProps) {
  const [selectedThemeId, setSelectedThemeId] = useState('twilight-classic');
  const [position, setPosition] = useState<'top_right' | 'top_left' | 'bottom_right' | 'bottom_left'>('top_right');
  const [wallpaper, setWallpaper] = useState<'twilight' | 'midnight' | 'cyber' | 'forest'>('twilight');
  const [transparency, setTransparency] = useState<'pure' | 'tinted' | 'glass'>('pure');
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [fontSize, setFontSize] = useState<number>(13);
  const [isLiveClock, setIsLiveClock] = useState(true);
  const [calendarData, setCalendarData] = useState<LunarCalendarData>(getBatTuNow());
  const [copiedConfig, setCopiedConfig] = useState(false);

  // Live second clock updater
  useEffect(() => {
    if (!isLiveClock) return;
    const timer = setInterval(() => {
      setCalendarData(getBatTuNow(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, [isLiveClock]);

  const currentTheme = CONKY_THEMES.find((t) => t.id === selectedThemeId) || CONKY_THEMES[0];

  // Wallpaper backgrounds
  const getWallpaperClass = () => {
    switch (wallpaper) {
      case 'twilight':
        // Gradient matching user screenshot: dusk purple to deep indigo with bird silhouettes
        return 'bg-gradient-to-b from-[#181639] via-[#211a45] to-[#0f1126]';
      case 'midnight':
        return 'bg-gradient-to-b from-[#0a1128] via-[#001f54] to-[#03071e]';
      case 'cyber':
        return 'bg-gradient-to-b from-[#1a102f] via-[#120e24] to-[#0a0612]';
      case 'forest':
        return 'bg-gradient-to-b from-[#0a1f18] via-[#0d2818] to-[#05110c]';
      default:
        return 'bg-[#0f1126]';
    }
  };

  // Position class for widget inside desktop
  const getPositionClass = () => {
    switch (position) {
      case 'top_right':
        return 'top-10 right-4 sm:right-8';
      case 'top_left':
        return 'top-10 left-4 sm:left-8';
      case 'bottom_right':
        return 'bottom-6 right-4 sm:right-8';
      case 'bottom_left':
        return 'bottom-6 left-4 sm:left-8';
      default:
        return 'top-10 right-8';
    }
  };

  const getBackgroundStyle = () => {
    switch (transparency) {
      case 'pure':
        return 'bg-transparent';
      case 'tinted':
        return 'bg-black/40 backdrop-blur-[2px] rounded-xl p-3 border border-white/10 shadow-2xl';
      case 'glass':
        return 'bg-slate-900/60 backdrop-blur-md rounded-xl p-3 border border-slate-700/50 shadow-2xl';
    }
  };

  const copyWidgetConkyCode = () => {
    const code = `-- Trích xuất cấu hình conky theo giao diện đang xem:
alignment = '${position}',
default_color = '#ffffff',
color1 = '${currentTheme.colorTitle}',
color2 = '${currentTheme.colorBatTu}',
color3 = '${currentTheme.colorAmLich}',
color4 = '${currentTheme.colorTietKhi}',
color5 = '${currentTheme.colorWeather}',
color6 = '${currentTheme.colorSun}',
`;
    navigator.clipboard.writeText(code);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <section id="simulator" className="py-16 bg-[#090d16] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>Mô Phỏng Trực Quan Thời Gian Thực</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Giao Diện Conky Màn Hình Xubuntu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Trải nghiệm hiển thị thực tế của Lịch Âm - Bát Tự trên màn hình Xubuntu (XFCE).
            Bạn có thể đổi bảng màu, vị trí, hình nền và kiểm tra độ sắc nét của font chữ.
          </p>
        </div>

        {/* Two-column layout: Desktop Stage + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Desktop Stage (Col 1-8) */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border-2 border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden">
              {/* XFCE Top Panel */}
              <div className="h-7 bg-[#1c2130] border-b border-slate-700/80 px-3 flex items-center justify-between text-xs text-slate-300 select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>Xubuntu XFCE 4.18</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">1</span>
                    <span className="px-1.5 py-0.5 rounded text-slate-400 text-[10px]">2</span>
                    <span className="px-1.5 py-0.5 rounded text-slate-400 text-[10px]">3</span>
                    <span className="px-1.5 py-0.5 rounded text-slate-400 text-[10px]">4</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-300">
                  <span className="hidden sm:inline text-slate-400">Thiên Văn NASA JPL DE421: Đã đồng bộ</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-mono">{calendarData.timeStr}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Workspace Canvas */}
              <div
                className={`relative w-full h-[660px] sm:h-[720px] ${getWallpaperClass()} overflow-hidden transition-all duration-500`}
                style={{
                  backgroundImage:
                    wallpaper === 'twilight'
                      ? 'radial-gradient(ellipse at 80% 30%, rgba(255,140,100,0.15), transparent 50%), radial-gradient(ellipse at 20% 70%, rgba(80,60,160,0.2), transparent 60%)'
                      : undefined,
                }}
              >
                {/* Decorative silhouettes for twilight wallpaper like the photo */}
                {wallpaper === 'twilight' && (
                  <>
                    {/* Mountain silhouette at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#090b14] via-[#0d1020] to-transparent pointer-events-none opacity-85" />
                    {/* Flying bird silhouettes */}
                    <div className="absolute top-44 left-1/4 pointer-events-none opacity-40 text-slate-900 text-lg">
                      <svg width="34" height="24" viewBox="0 0 34 24" fill="currentColor">
                        <path d="M0,12 Q8,0 17,12 Q26,0 34,12 Q24,6 17,16 Q10,6 0,12 Z" />
                      </svg>
                    </div>
                    <div className="absolute top-36 left-[30%] pointer-events-none opacity-50 text-slate-900 text-sm">
                      <svg width="22" height="16" viewBox="0 0 34 24" fill="currentColor">
                        <path d="M0,12 Q8,0 17,12 Q26,0 34,12 Q24,6 17,16 Q10,6 0,12 Z" />
                      </svg>
                    </div>
                  </>
                )}

                {/* Simulated Conky Widget Container */}
                <div
                  id="conky-live-widget"
                  className={`absolute ${getPositionClass()} ${getBackgroundStyle()} select-none transition-all duration-300 max-w-[320px] sm:max-w-[340px] text-center font-bold`}
                  style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Title Header */}
                  <div
                    className="text-lg sm:text-xl tracking-wider font-extrabold pb-1 uppercase transition-colors"
                    style={{ color: currentTheme.colorTitle }}
                  >
                    LỊCH ÂM - BÁT TỰ
                  </div>

                  {/* Horizontal Rule */}
                  <div
                    className="h-0.5 w-full my-1.5 opacity-90 transition-colors"
                    style={{ backgroundColor: currentTheme.colorDate }}
                  />

                  {/* Solar Date & Live Clock */}
                  <div className="text-xs sm:text-sm py-0.5">
                    <span style={{ color: currentTheme.colorDate }}>Dương Lịch: </span>
                    <span className="text-white font-mono">{calendarData.solarDateStr} - {calendarData.timeStr}</span>
                  </div>

                  {/* Horizontal Rule */}
                  <div
                    className="h-[1px] w-full my-1.5 opacity-80 transition-colors"
                    style={{ backgroundColor: currentTheme.colorDate }}
                  />

                  {/* Weather Information */}
                  <div className="space-y-0.5 text-xs sm:text-[13px] py-1">
                    <div style={{ color: currentTheme.colorWeather }}>
                      Trạng thái : <span className="font-semibold">{calendarData.weatherStatus}</span>
                    </div>
                    <div style={{ color: currentTheme.colorWeather }}>
                      Nhiệt độ : <span className="text-white">{calendarData.temperature}°C</span> | Độ ẩm: <span className="text-white">{calendarData.humidity}%</span>
                    </div>
                    <div style={{ color: currentTheme.colorSun }}>
                      Mặt trời : Mọc {calendarData.sunrise} | Lặn {calendarData.sunset}
                    </div>
                  </div>

                  {/* Dashed Separator */}
                  <div className="text-slate-400/80 text-[11px] tracking-widest my-1 select-none">
                    -----------------------------------
                  </div>

                  {/* Bat Tu & Current Solar Term */}
                  <div className="space-y-0.5 text-xs sm:text-[13px] py-0.5 font-bold">
                    <div style={{ color: currentTheme.colorBatTu }}>
                      Tiết Khí : <span className="font-extrabold">{calendarData.tietKhi}</span>
                    </div>
                    <div style={{ color: currentTheme.colorBatTu }}>
                      Năm : <span className="font-extrabold">{calendarData.namCanChi}</span>
                    </div>
                    <div style={{ color: currentTheme.colorBatTu }}>
                      Tháng : <span className="font-extrabold">{calendarData.thangCanChi}</span>
                    </div>
                    <div style={{ color: currentTheme.colorBatTu }}>
                      Ngày : <span className="font-extrabold">{calendarData.ngayCanChi}</span>
                    </div>
                    <div style={{ color: currentTheme.colorBatTu }}>
                      Giờ : <span className="font-extrabold">{calendarData.gioCanChi}</span>
                    </div>
                  </div>

                  {/* Dashed Separator */}
                  <div className="text-slate-400/80 text-[11px] tracking-widest my-1 select-none">
                    -----------------------------------
                  </div>

                  {/* Lunar Date & New Moon (Soc) */}
                  <div className="space-y-0.5 text-xs sm:text-[13px] py-0.5 font-bold" style={{ color: currentTheme.colorAmLich }}>
                    <div>
                      Âm Lịch : Tháng {calendarData.thangAm} - Ngày {calendarData.ngayAm}
                    </div>
                    <div className="text-[12px] opacity-95">
                      ({calendarData.loaiThang} - {calendarData.tongNgayThang} ngày)
                    </div>
                    <div className="text-[11px] sm:text-xs">
                      Sóc đầu : {calendarData.socDau}
                    </div>
                    <div className="text-[11px] sm:text-xs">
                      Sóc sau : {calendarData.socSau}
                    </div>
                  </div>

                  {/* Dashed Separator */}
                  <div className="text-slate-400/80 text-[11px] tracking-widest my-1 select-none">
                    -----------------------------------
                  </div>

                  {/* Solar terms in Lunar month */}
                  <div className="space-y-0.5 text-xs sm:text-[12px] py-0.5 font-bold" style={{ color: currentTheme.colorTietKhi }}>
                    <div className="underline underline-offset-2 mb-0.5">Tiết / Trung khí trong tháng:</div>
                    {calendarData.tietKhiTrongThang.map((tk, idx) => (
                      <div key={idx} className="text-[11px] sm:text-xs font-semibold">
                        {tk.name} ({tk.type}): {tk.time}
                      </div>
                    ))}
                  </div>

                  {/* Bottom Rule */}
                  <div
                    className="h-[1px] w-full my-2 opacity-80 transition-colors"
                    style={{ backgroundColor: currentTheme.colorDate }}
                  />

                  {/* CPU & RAM monitor */}
                  <div className="space-y-1 text-xs py-0.5">
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: currentTheme.colorHardware }}>CPU:</span>
                      <span className="text-white font-mono w-9 text-right">{calendarData.cpuUsage}%</span>
                      <div className="w-28 h-2.5 bg-slate-900/80 border border-slate-500 rounded-sm overflow-hidden p-[1px]">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${calendarData.cpuUsage}%`,
                            backgroundColor: currentTheme.colorHardware,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: currentTheme.colorHardware }}>RAM:</span>
                      <span className="text-white font-mono w-9 text-right">{calendarData.ramUsage}%</span>
                      <div className="w-28 h-2.5 bg-slate-900/80 border border-slate-500 rounded-sm overflow-hidden p-[1px]">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${calendarData.ramUsage}%`,
                            backgroundColor: currentTheme.colorHardware,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Status indicator in bottom corner */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] text-slate-300 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Conky Daemon: Running (PID: 1842)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Customization Controls (Col 9-12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white text-base">Tùy Chỉnh Hiển Thị</h3>
                </div>
                <button
                  onClick={() => setIsLiveClock(!isLiveClock)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                    isLiveClock ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <RefreshCw className={`w-3 h-3 ${isLiveClock ? 'animate-spin' : ''}`} />
                  {isLiveClock ? 'Đồng hồ chạy' : 'Tạm dừng'}
                </button>
              </div>

              {/* Theme Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  1. Bảng Màu Conky ({CONKY_THEMES.length} phối màu)
                </label>
                <div className="space-y-2">
                  {CONKY_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedThemeId(theme.id)}
                      className={`w-full p-2.5 rounded-xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                        selectedThemeId === theme.id
                          ? 'border-cyan-500 bg-cyan-500/10 shadow-sm'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">{theme.name}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[210px]">{theme.description}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.colorTitle }} />
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.colorBatTu }} />
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.colorAmLich }} />
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.colorTietKhi }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wallpaper Switcher */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  2. Hình Nền Desktop Thử Nghiệm
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setWallpaper('twilight')}
                    className={`p-2 rounded-lg text-xs font-medium border text-left flex items-center gap-2 cursor-pointer ${
                      wallpaper === 'twilight' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                    Hoàng Hôn (Ảnh gốc)
                  </button>
                  <button
                    onClick={() => setWallpaper('midnight')}
                    className={`p-2 rounded-lg text-xs font-medium border text-left flex items-center gap-2 cursor-pointer ${
                      wallpaper === 'midnight' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-blue-700"></span>
                    Đêm Trăng Khuyết
                  </button>
                  <button
                    onClick={() => setWallpaper('cyber')}
                    className={`p-2 rounded-lg text-xs font-medium border text-left flex items-center gap-2 cursor-pointer ${
                      wallpaper === 'cyber' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-purple-700"></span>
                    Cyberpunk Tím
                  </button>
                  <button
                    onClick={() => setWallpaper('forest')}
                    className={`p-2 rounded-lg text-xs font-medium border text-left flex items-center gap-2 cursor-pointer ${
                      wallpaper === 'forest' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-emerald-700"></span>
                    Rừng Đêm Mờ
                  </button>
                </div>
              </div>

              {/* Position selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  3. Vị Trí Trên Màn Hình (Alignment)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPosition('top_right')}
                    className={`p-2 rounded-lg text-xs font-medium border text-center cursor-pointer ${
                      position === 'top_right' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Góc Phải Trên (top_right)
                  </button>
                  <button
                    onClick={() => setPosition('top_left')}
                    className={`p-2 rounded-lg text-xs font-medium border text-center cursor-pointer ${
                      position === 'top_left' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Góc Trái Trên (top_left)
                  </button>
                  <button
                    onClick={() => setPosition('bottom_right')}
                    className={`p-2 rounded-lg text-xs font-medium border text-center cursor-pointer ${
                      position === 'bottom_right' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Góc Phải Dưới (bottom_right)
                  </button>
                  <button
                    onClick={() => setPosition('bottom_left')}
                    className={`p-2 rounded-lg text-xs font-medium border text-center cursor-pointer ${
                      position === 'bottom_left' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Góc Trái Dưới (bottom_left)
                  </button>
                </div>
              </div>

              {/* Transparency Mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  4. Độ Trong Suốt (XFCE Compositor)
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTransparency('pure')}
                    className={`p-2 rounded-lg text-[11px] font-medium border text-center cursor-pointer ${
                      transparency === 'pure' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Trong suốt 100%
                  </button>
                  <button
                    onClick={() => setTransparency('tinted')}
                    className={`p-2 rounded-lg text-[11px] font-medium border text-center cursor-pointer ${
                      transparency === 'tinted' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Mờ đen 40%
                  </button>
                  <button
                    onClick={() => setTransparency('glass')}
                    className={`p-2 rounded-lg text-[11px] font-medium border text-center cursor-pointer ${
                      transparency === 'glass' ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Kính mờ Frosted
                  </button>
                </div>
              </div>

              {/* Action: Copy config snippet */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  id="simulator-copy-config-btn"
                  onClick={copyWidgetConkyCode}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                >
                  {copiedConfig ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedConfig ? 'Đã sao chép cấu hình màu!' : 'Sao chép đoạn mã màu này'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
