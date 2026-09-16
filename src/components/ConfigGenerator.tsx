import React, { useState, useMemo } from 'react';
import { Sliders, MapPin, Clock, Palette, Terminal, Copy, Check, Sparkles, Download, ArrowRight, CloudRain, Wind, Compass, Search } from 'lucide-react';
import { VIETNAM_LOCATIONS, CONKY_THEMES } from '../data/locations';
import { CONKY_CONFIG_SOURCE, START_SCRIPT_SOURCE } from '../data/sourceCode';

export function ConfigGenerator() {
  const [useAutoLocation, setUseAutoLocation] = useState(true);
  const [selectedCity, setSelectedCity] = useState(VIETNAM_LOCATIONS[0].name);
  const [latitude, setLatitude] = useState(VIETNAM_LOCATIONS[0].lat);
  const [longitude, setLongitude] = useState(VIETNAM_LOCATIONS[0].lng);
  const [regionFilter, setRegionFilter] = useState<'all' | 'Bắc' | 'Trung' | 'Nam'>('all');
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredProvinces = useMemo(() => {
    return VIETNAM_LOCATIONS.filter((loc) => {
      const matchRegion = regionFilter === 'all' || loc.region === regionFilter;
      const matchQuery =
        searchQuery.trim() === '' ||
        loc.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchRegion && matchQuery;
    });
  }, [regionFilter, searchQuery]);

  const northProvinces = useMemo(() => VIETNAM_LOCATIONS.filter((l) => l.region === 'Bắc'), []);
  const centralProvinces = useMemo(() => VIETNAM_LOCATIONS.filter((l) => l.region === 'Trung'), []);
  const southProvinces = useMemo(() => VIETNAM_LOCATIONS.filter((l) => l.region === 'Nam'), []);

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

  const oneLinerApply = useAutoLocation
    ? `# Bật tự động định vị GeoIP (kèm lượng mưa & tốc độ gió) và thời gian trễ ${delaySeconds}s:
sed -i 's/get_weather(.*)/get_weather()/' ~/.config/conky/lunar_battu.py 2>/dev/null || true
sed -i 's/DELAY_SECONDS=.*/DELAY_SECONDS=${delaySeconds}/' ~/.config/conky/start_conky.sh 2>/dev/null || true
killall conky 2>/dev/null && ~/.config/conky/start_conky.sh`
    : `# Cập nhật tọa độ (${latitude}, ${longitude}) (${selectedCity}), lượng mưa & tốc độ gió và trễ ${delaySeconds}s:
sed -i 's/get_weather(.*)/get_weather(${latitude}, ${longitude}, "${selectedCity}")/' ~/.config/conky/lunar_battu.py 2>/dev/null || true
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
            Tùy Biến Định Vị, Lượng Mưa, Gió & Thời Gian Trễ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Tùy chọn tự động định vị qua GeoIP mạng hoặc chỉ định tọa độ địa phương,
            cập nhật đo đạc lượng mưa, tốc độ gió và giờ Mặt Trời mọc/lặn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Form (Col 1-5) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            {/* Location mode */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Phương Thức Định Vị Vị Trí
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  GeoIP + Mưa + Gió
                </span>
              </label>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setUseAutoLocation(true)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    useAutoLocation
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Tự động qua IP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUseAutoLocation(false)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    !useAutoLocation
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Chỉ định tỉnh thành</span>
                </button>
              </div>

              {useAutoLocation ? (
                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
                  <div className="text-cyan-300 font-semibold flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5" />
                    <span>Tự động phát hiện vị trí máy tính</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Script Python tự động xác định thành phố qua kết nối Internet, sau đó gọi Open-Meteo để lấy nhiệt độ, cảm giác thực tế, lượng mưa (mm) và tốc độ gió (km/h).
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Region filter tabs */}
                  <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setRegionFilter('all')}
                      className={`flex-1 py-1 px-2 rounded-lg font-medium transition-colors ${
                        regionFilter === 'all'
                          ? 'bg-cyan-500/30 text-cyan-300 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Tất cả (63)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter('Bắc')}
                      className={`flex-1 py-1 px-2 rounded-lg font-medium transition-colors ${
                        regionFilter === 'Bắc'
                          ? 'bg-cyan-500/30 text-cyan-300 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Miền Bắc ({northProvinces.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter('Trung')}
                      className={`flex-1 py-1 px-2 rounded-lg font-medium transition-colors ${
                        regionFilter === 'Trung'
                          ? 'bg-cyan-500/30 text-cyan-300 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Miền Trung ({centralProvinces.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter('Nam')}
                      className={`flex-1 py-1 px-2 rounded-lg font-medium transition-colors ${
                        regionFilter === 'Nam'
                          ? 'bg-cyan-500/30 text-cyan-300 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Miền Nam ({southProvinces.length})
                    </button>
                  </div>

                  {/* Search input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm nhanh trong 63 tỉnh thành (vd: Cà Mau, Ninh Bình, Gia Lai...)"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
                      >
                        Xóa
                      </button>
                    )}
                  </div>

                  {/* Quick suggestion chips */}
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Gợi ý tỉnh thành tiêu biểu:</span>
                      <span className="text-cyan-400 lowercase font-normal">{filteredProvinces.length} tỉnh khả dụng</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                      {["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Cà Mau", "Huế", "Nha Trang", "Đà Lạt", "Vinh", "Quảng Ninh", "Bình Dương"].map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCityChange(city)}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium border cursor-pointer transition-colors ${
                            selectedCity === city
                              ? 'bg-cyan-500/30 border-cyan-400 text-white font-bold shadow-sm'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grouped Select */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Chọn trực tiếp từ danh sách đầy đủ:
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-cyan-500 outline-none"
                    >
                      {regionFilter === 'all' && !searchQuery.trim() ? (
                        <>
                          <optgroup label="Thành Phố Trực Thuộc Trung Ương">
                            {VIETNAM_LOCATIONS.slice(0, 5).map((city) => (
                              <option key={city.name} value={city.name}>
                                ★ {city.name} ({city.lat}, {city.lng})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Miền Bắc (25 tỉnh thành)">
                            {northProvinces.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name} ({city.lat}, {city.lng})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Miền Trung & Tây Nguyên (19 tỉnh thành)">
                            {centralProvinces.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name} ({city.lat}, {city.lng})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Miền Nam (19 tỉnh thành)">
                            {southProvinces.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name} ({city.lat}, {city.lng})
                              </option>
                            ))}
                          </optgroup>
                        </>
                      ) : (
                        filteredProvinces.map((city) => (
                          <option key={city.name} value={city.name}>
                            [{city.region ? `Miền ${city.region}` : 'VN'}] {city.name} ({city.lat}, {city.lng})
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Selected province info card */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{selectedCity}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                          {VIETNAM_LOCATIONS.find((c) => c.name === selectedCity)?.region
                            ? `Miền ${VIETNAM_LOCATIONS.find((c) => c.name === selectedCity)?.region}`
                            : 'Việt Nam'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-3">
                        <span>Vĩ độ (Lat): <strong className="text-cyan-300 font-mono">{latitude}</strong></span>
                        <span>Kinh độ (Lng): <strong className="text-cyan-300 font-mono">{longitude}</strong></span>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã chọn</span>
                    </span>
                  </div>
                </div>
              )}
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
