import React, { useState } from 'react';
import { Sliders, MapPin, Clock, Palette, Terminal, Copy, Check, Sparkles, Download, ArrowRight } from 'lucide-react';
import { VIETNAM_LOCATIONS, CONKY_THEMES } from '../data/locations';
import { CONKY_CONFIG_SOURCE, START_SCRIPT_SOURCE } from '../data/sourceCode';

export function ConfigGenerator() {
  const [selectedCity, setSelectedCity] = useState(VIETNAM_LOCATIONS[0].name);
  const [latitude, setLatitude] = useState(VIETNAM_LOCATIONS[0].lat);
  const [longitude, setLongitude] = useState(VIETNAM_LOCATIONS[0].lng);
  const [delaySeconds, setDelaySeconds] = useState(10);
  const [position, setPosition] = useState<'top_right' | 'top_left' | 'bottom_right' | 'bottom_left'>('top_right');
  const [themeId, setThemeId] = useState('twilight-classic');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const loc = VIETNAM_LOCATIONS.find((c) => c.name === cityName);
    if (loc) {
      setLatitude(loc.lat);
      setLongitude(loc.lng);
    }
  };

  const selectedTheme = CONKY_THEMES.find((t) => t.id === themeId) || CONKY_THEMES[0];

  const generatedCustomConky = `conky.config = {
    alignment = '${position}',
    gap_x = 25,
    gap_y = 45,
    minimum_width = 300,
    maximum_width = 340,
    update_interval = 1.0,
    double_buffer = true,
    no_buffers = true,

    own_window = true,
    own_window_type = 'desktop',
    own_window_transparent = true,
    own_window_argb_visual = true,
    own_window_argb_value = 0,
    own_window_hints = 'undecorated,below,sticky,skip_taskbar,skip_pager',

    use_xft = true,
    font = 'DejaVu Sans:size=10:bold',
    draw_shades = true,
    default_shade_color = '#000000',

    default_color = '#ffffff',
    color1 = '${selectedTheme.colorTitle}',
    color2 = '${selectedTheme.colorBatTu}',
    color3 = '${selectedTheme.colorAmLich}',
    color4 = '${selectedTheme.colorTietKhi}',
    color5 = '${selectedTheme.colorWeather}',
    color6 = '${selectedTheme.colorSun}',
};

conky.text = [[
\${alignc}\${font DejaVu Sans:size=14:bold}\${color1}LỊCH ÂM - BÁT TỰ\${font}\${color}
\${color1}\${hr 2}\${color}
\${alignc}\${color1}Dương Lịch: \${color}\${time %d/%m/%Y} - \${time %H:%M:%S}
\${color1}\${hr 1}\${color}
\${execpi 60 python3 ~/.config/conky/lunar_battu.py}
\${color1}\${hr 1}\${color}
\${alignc}\${color1}CPU:\${color} \${cpu cpu0}% \${cpubar 7,120}
\${alignc}\${color1}RAM:\${color} \${memperc}% \${membar 7,120}
]];`;

  const generatedStartScript = `#!/usr/bin/env bash
# Khởi động ẩn Conky có độ trễ ${delaySeconds}s cho Xubuntu
DELAY_SECONDS=${delaySeconds}

killall conky 2>/dev/null
echo "Chờ \${DELAY_SECONDS} giây để Desktop XFCE nạp hoàn tất..."
sleep \${DELAY_SECONDS}

cd ~/.config/conky
conky -d -c ~/.config/conky/conky_lunar.conf
echo "Đã khởi động Conky Lịch Âm Bát Tự ẩn ngầm thành công!"`;

  const oneLinerApply = `# Cập nhật tọa độ (${latitude}, ${longitude}) và thời gian trễ ${delaySeconds}s:
sed -i 's/latitude = .*/latitude = ${latitude}/' ~/.config/conky/lunar_battu.py 2>/dev/null || true
sed -i 's/longitude = .*/longitude = ${longitude}/' ~/.config/conky/lunar_battu.py 2>/dev/null || true
sed -i 's/DELAY_SECONDS=.*/DELAY_SECONDS=${delaySeconds}/' ~/.config/conky/start_conky.sh 2>/dev/null || true
killall conky 2>/dev/null && ~/.config/conky/start_conky.sh`;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <section id="generator" className="py-16 bg-[#090d16] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Trình Tạo Cấu Hình Thông Minh</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tùy Biến Tọa Độ Địa Phương & Thời Gian Trễ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Chọn tỉnh thành của bạn để cập nhật chính xác thời tiết và giờ Mặt Trời mọc/lặn,
            đồng thời tùy chỉnh độ trễ khởi động khi mở máy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Form (Col 1-5) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            {/* City Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Tỉnh / Thành Phố (Thời tiết & Mặt Trời)</span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              >
                {VIETNAM_LOCATIONS.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name} (Vĩ độ: {city.lat}, Kinh độ: {city.lng})
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-xs text-slate-400">
                  Vĩ độ (Lat): <span className="text-cyan-300 font-mono font-bold">{latitude}</span>
                </div>
                <div className="text-xs text-slate-400">
                  Kinh độ (Lng): <span className="text-cyan-300 font-mono font-bold">{longitude}</span>
                </div>
              </div>
            </div>

            {/* Delay seconds slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Thời Gian Chờ Khi Mở Máy</span>
                </label>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">
                  {delaySeconds} giây (sleep {delaySeconds})
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={delaySeconds}
                onChange={(e) => setDelaySeconds(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>3s (SSD nhanh)</span>
                <span>10s (Khuyên dùng XFCE)</span>
                <span>30s (HDD máy cũ)</span>
              </div>
            </div>

            {/* Position */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Vị Trí Căn Lề Màn Hình
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPosition('top_right')}
                  className={`p-2 rounded-lg text-xs font-semibold border text-center transition-colors cursor-pointer ${
                    position === 'top_right' ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  Góc Trên Phải (top_right)
                </button>
                <button
                  onClick={() => setPosition('top_left')}
                  className={`p-2 rounded-lg text-xs font-semibold border text-center transition-colors cursor-pointer ${
                    position === 'top_left' ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  Góc Trên Trái (top_left)
                </button>
                <button
                  onClick={() => setPosition('bottom_right')}
                  className={`p-2 rounded-lg text-xs font-semibold border text-center transition-colors cursor-pointer ${
                    position === 'bottom_right' ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  Góc Dưới Phải (bottom_right)
                </button>
                <button
                  onClick={() => setPosition('bottom_left')}
                  className={`p-2 rounded-lg text-xs font-semibold border text-center transition-colors cursor-pointer ${
                    position === 'bottom_left' ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  Góc Dưới Trái (bottom_left)
                </button>
              </div>
            </div>

            {/* Palette */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Bảng Màu
              </label>
              <select
                value={themeId}
                onChange={(e) => setThemeId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              >
                {CONKY_THEMES.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generated Code & One-click Command (Col 6-12) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Terminal Apply Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/50 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-sm text-white">Lệnh Cập Nhật Nhanh Tọa Độ & Khởi Chạy Lại</span>
                </div>
                <button
                  onClick={() => copyText(oneLinerApply, 'quick-apply')}
                  className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1 border border-cyan-500/30 transition-colors cursor-pointer"
                >
                  {copiedSection === 'quick-apply' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'quick-apply' ? 'Đã sao chép!' : 'Sao chép lệnh'}</span>
                </button>
              </div>
              <pre className="p-3 bg-black/60 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed border border-slate-800">
                <code>{oneLinerApply}</code>
              </pre>
            </div>

            {/* Generated start_conky.sh Preview */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
              <div className="px-4 py-2.5 bg-[#121824] border-b border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-300">start_conky.sh (Trễ {delaySeconds}s)</span>
                <button
                  onClick={() => copyText(generatedStartScript, 'start-script')}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === 'start-script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Sao chép</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-40">
                <code>{generatedStartScript}</code>
              </pre>
            </div>

            {/* Generated conky_lunar.conf Preview */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
              <div className="px-4 py-2.5 bg-[#121824] border-b border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyan-300">conky_lunar.conf (Vị trí: {position})</span>
                <button
                  onClick={() => copyText(generatedCustomConky, 'conky-conf')}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === 'conky-conf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Sao chép</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-52">
                <code>{generatedCustomConky}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
