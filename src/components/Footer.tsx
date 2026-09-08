import React from 'react';
import { Moon, Terminal, Heart, Sparkles, Code2, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#070a12] border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <Moon className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">Lịch Âm - Bát Tự Xubuntu</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Trang tài liệu và mã nguồn tích hợp Conky hiển thị Lịch Âm, Tứ Trụ Bát Tự, 24 Tiết Khí thiên văn NASA JPL DE421,
              Thời tiết & Giám sát hệ thống tối ưu cho môi trường màn hình XFCE trên hệ điều hành Xubuntu.
            </p>
            <div className="text-[11px] text-slate-500">
              Hỗ trợ đầy đủ: Xubuntu 24.04 LTS, 22.04 LTS, 20.04 LTS & các bản phân phối Linux chạy giao diện XFCE4.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">Tài Liệu & Mã Nguồn</div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#simulator" className="hover:text-cyan-400 transition-colors">
                  Trình mô phỏng trực quan
                </a>
              </li>
              <li>
                <a href="#install-guide" className="hover:text-cyan-400 transition-colors">
                  Hướng dẫn cài đặt 9 bước
                </a>
              </li>
              <li>
                <a href="#source-code" className="hover:text-cyan-400 transition-colors">
                  Mã nguồn Python & Conky
                </a>
              </li>
              <li>
                <a href="#optimization" className="hover:text-cyan-400 transition-colors">
                  Tối ưu giao diện Xubuntu
                </a>
              </li>
              <li>
                <a href="#generator" className="hover:text-cyan-400 transition-colors">
                  Bộ tạo lệnh tùy biến tọa độ
                </a>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">Công Nghệ Tích Hợp</div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>NASA JPL Ephemeris DE421</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Skyfield Astronomy Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Open-Meteo Weather API</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Conky System Monitor (Lua)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>XFCE4 Desktop & Compositor</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} Lịch Âm - Bát Tự Xubuntu. Phát triển cho cộng đồng người dùng Linux Việt Nam.
          </div>
          <div className="flex items-center gap-4">
            <span>Giấy phép mã nguồn mở</span>
            <span>•</span>
            <span>Chạy ẩn sau 10s Boot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
