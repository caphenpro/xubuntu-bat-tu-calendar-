import React, { useState } from 'react';
import { Sparkles, Shield, Eye, Layers, Zap, CheckCircle, Terminal, AlertTriangle, Monitor, Copy, Check } from 'lucide-react';

export function VisualOptimizationGuide() {
  const [copiedSetting, setCopiedSetting] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSetting(id);
    setTimeout(() => setCopiedSetting(null), 2000);
  };

  return (
    <section id="optimization" className="py-16 bg-[#0b0f19] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kinh Nghiệm Tinh Chỉnh Xubuntu</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hướng Dẫn Tối Ưu Giao Diện Trực Quan Nhất
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            5 bí quyết giúp Conky Lịch Âm - Bát Tự hiển thị trong suốt không viền đen, chống chớp hình,
            chữ sắc nét trên mọi hình nền và chạy ẩn mượt mà sau khi boot.
          </p>
        </div>

        {/* 5 Key Optimization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* 1. Compositor & ARGB */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Khắc Phục Lỗi Nền Đen XFCE</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Xubuntu sử dụng trình quản lý cửa sổ <code>xfwm4</code>. Nếu cấu hình thiếu ARGB 32-bit,
                Conky sẽ hiện một khung chữ nhật đen tuyền che khuất hình nền.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] text-cyan-300 space-y-1">
              <div>own_window_argb_visual = true,</div>
              <div>own_window_transparent = true,</div>
              <div>own_window_type = 'desktop',</div>
            </div>
          </div>

          {/* 2. Anti-Aliasing & Vietnamese Fonts */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Font Chữ Tiếng Việt Sắc Nét</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Các ký tự Can Chi có dấu (Ất, Bính, Kỷ, Tỵ, Thân, Dậu, Tiết khí Bạch Lộ) dễ bị vỡ hoặc ô vuông nếu dùng font mặc định.
                Kích hoạt XFT và dùng <code>DejaVu Sans</code> hoặc <code>Noto Sans</code>:
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] text-emerald-300 space-y-1">
              <div>use_xft = true,</div>
              <div>font = 'DejaVu Sans:size=10:bold',</div>
              <div>xftalpha = 0.9,</div>
            </div>
          </div>

          {/* 3. Anti-Flicker & Double Buffer */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Chống Chớp Nháy & Tiết Kiệm Pin</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Bật <code>double_buffer</code> để hình ảnh được vẽ trong bộ nhớ đệm trước khi đưa lên màn hình.
                Tách biệt tần số: đồng hồ 1s, nhưng lệnh Python thiên văn chỉ gọi mỗi 60s qua <code>execpi 60</code>.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] text-amber-300 space-y-1">
              <div>double_buffer = true,</div>
              <div>update_interval = 1.0,</div>
              <div>\${'{execpi 60 python3 ...}'}</div>
            </div>
          </div>

          {/* 4. Drop Shadows on Any Wallpaper */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Đổ Bóng Nổi Bật Chữ</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Nếu bạn đổi sang hình nền sáng hoặc có nhiều chi tiết, màu chữ trắng hoặc vàng có thể bị chìm.
                Kích hoạt <code>draw_shades</code> để tạo bóng đen mềm mại bao bọc chữ:
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] text-purple-300 space-y-1">
              <div>draw_shades = true,</div>
              <div>default_shade_color = '#000000',</div>
              <div>draw_outline = false,</div>
            </div>
          </div>

          {/* 5. Window Hints & Desktop Integration */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">5. Ẩn Taskbar & Nằm Dưới Cửa Sổ</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Conky phải đóng vai trò như một phần của hình nền, không hiện biểu tượng trên thanh tác vụ (Taskbar)
                và không bị mất khi nhấn phím đổi Workspace:
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] text-rose-300 space-y-1">
              <div>own_window_hints =</div>
              <div>'undecorated,below,sticky,</div>
              <div>skip_taskbar,skip_pager'</div>
            </div>
          </div>

          {/* 6. Delayed Startup Daemon */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">6. Khởi Động Trễ (Sleep 10) Ẩn Hoàn Toàn</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Khi máy vừa boot, Desktop và Compositor chưa nạp kịp. Độ trễ 10 giây (<code>sleep 10</code>)
                kèm tham số <code>conky -d</code> giúp Conky khởi chạy mượt mà không bao giờ bị đè màn hình.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-[11px] text-sky-300 space-y-1">
              <div>sleep 10</div>
              <div>conky -d -c ~/.config/conky/conky_lunar.conf</div>
            </div>
          </div>
        </div>

        {/* Xubuntu Compositor Check Instructions */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Kiểm tra Bật Compositor trên Xubuntu (Nếu vẫn thấy nền đen)</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Mở Terminal và chạy lệnh: <code className="px-2 py-0.5 rounded bg-black/50 text-cyan-300 font-mono">xfwm4-tweaks-settings</code>.
                  Chuyển sang tab <strong>"Bộ phối màu" (Compositor)</strong> và đánh dấu tích vào ô <strong>"Bật tính năng phối màu hiển thị" (Enable display compositing)</strong>.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleCopy('xfwm4-tweaks-settings', 'xfwm4')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copiedSetting === 'xfwm4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Chép lệnh mở thiết lập</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
