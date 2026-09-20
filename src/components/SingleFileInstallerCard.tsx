import React, { useState } from 'react';
import { Terminal, Copy, Check, Download, Sparkles, ChevronDown, ChevronUp, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateSingleInstallerScript, InstallerOptions } from '../utils/generateSingleInstaller';
import { CONKY_THEMES, VIETNAM_LOCATIONS } from '../data/locations';
import { CURRENT_VERSION } from '../data/versions';

interface SingleFileInstallerProps {
  options: InstallerOptions;
  onOptionChange?: (partial: Partial<InstallerOptions>) => void;
}

export const SingleFileInstallerCard: React.FC<SingleFileInstallerProps> = ({
  options,
  onOptionChange,
}) => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [showCodePreview, setShowCodePreview] = useState(false);

  const theme = CONKY_THEMES.find((t) => t.id === options.themeId) || CONKY_THEMES[0];
  const locationObj = VIETNAM_LOCATIONS.find((c) => c.name === options.selectedCity);

  const fullInstallerScript = generateSingleInstallerScript(options);

  // Command to paste directly into terminal (creates file and runs it)
  const oneLinerTerminalCommand = `cat << 'EOF' > install_lunar_conky.sh
${fullInstallerScript}
EOF
chmod +x install_lunar_conky.sh && bash install_lunar_conky.sh`;

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(oneLinerTerminalCommand);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownloadScript = () => {
    const blob = new Blob([fullInstallerScript], { type: 'text/x-shellscript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'install_lunar_conky.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="single-file-installer" className="mt-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-[#0b0f19] border border-cyan-500/30 p-5 sm:p-7 shadow-2xl shadow-cyan-950/30 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              BỘ CÀI ĐẶT 1-FILE DUY NHẤT ({CURRENT_VERSION})
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Đã Vá Lỗi Toàn Diện
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
              PEP 668 & XFCE Safe
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Chạy 1 Lệnh Là Lên Ngay Màn Hình Desktop
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Tất cả tùy chỉnh từ bộ mô phỏng phía trên đã được nhúng sẵn vào phiên bản <strong className="text-white">{CURRENT_VERSION}</strong>. Đã sửa triệt để lỗi <code className="text-cyan-300">UnboundLocalError</code> thời tiết và tích hợp autostart chống đen màn hình.
          </p>
        </div>

        {/* Real-time Config Summary Badges */}
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="text-slate-500">Vị trí:</span>
            <strong className="text-cyan-300">
              {options.isAutoLocation ? '🌐 Tự động GeoIP' : `📍 ${options.selectedCity}`}
            </strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="text-slate-500">Màu:</span>
            <strong className="text-cyan-300">{theme.name}</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="text-slate-500">Góc:</span>
            <strong className="text-cyan-300">{options.position}</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="text-slate-500">Chờ:</span>
            <strong className="text-cyan-300">{options.delaySeconds}s</strong>
          </div>
        </div>
      </div>

      {/* Main Action Area: Copy or Download */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left 7 cols: Terminal Command Box */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Dán vào Terminal của Xubuntu (Ctrl + Shift + V):
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">Bao gồm trọn gói 5 thành phần</span>
            </div>

            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-hidden group">
              <div className="text-slate-500 text-[11px] mb-1.5 select-none flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-1 text-slate-400">bash terminal</span>
              </div>
              <pre className="text-cyan-300 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-cyan-500/30 max-h-36 overflow-y-auto">
{`# 1. Tự động tạo install_lunar_conky.sh và thực thi:
cat << 'EOF' > install_lunar_conky.sh
# [Đã tích hợp ${options.isAutoLocation ? 'Tự động GeoIP' : options.selectedCity}, Theme ${theme.name}, Vị trí ${options.position}]
# [Cài conky-all, skyfield, NASA JPL de421, autostart XFCE...]
...
EOF
chmod +x install_lunar_conky.sh && bash install_lunar_conky.sh`}
              </pre>

              <button
                type="button"
                onClick={handleCopyCommand}
                className={`mt-3 w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                  copiedScript
                    ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20'
                }`}
              >
                {copiedScript ? (
                  <>
                    <Check className="w-5 h-5 text-white animate-bounce" />
                    <span>ĐÃ SAO CHÉP! MỞ TERMINAL DÁN VÀO LÀ XONG</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-white" />
                    <span>SAO CHÉP TOÀN BỘ LỆNH CÀI ĐẶT 1-CHẠM</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick download button */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400">Hoặc tải trực tiếp tệp script:</span>
            <button
              type="button"
              onClick={handleDownloadScript}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file install_lunar_conky.sh</span>
            </button>
          </div>
        </div>

        {/* Right 5 cols: 3-Step Execution Checklist */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Cách Chạy Trên Xubuntu (Chỉ 3 Bước)
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-xs border border-cyan-500/40">
                  1
                </span>
                <div>
                  <div className="font-semibold text-white">Mở Terminal</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Nhấn tổ hợp phím <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono">Ctrl + Alt + T</kbd>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-xs border border-cyan-500/40">
                  2
                </span>
                <div>
                  <div className="font-semibold text-white">Dán lệnh vừa sao chép</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Nhấn chuột phải chọn Paste hoặc bấm <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono">Ctrl + Shift + V</kbd>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-xs border border-emerald-500/40">
                  3
                </span>
                <div>
                  <div className="font-semibold text-white">Gõ Enter & Thưởng thức!</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Tất cả thư viện, NASA JPL DE421, cấu hình Lua và Autostart được nạp tự động 100%.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => setShowCodePreview(!showCodePreview)}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 text-xs font-medium flex items-center justify-between border border-slate-800 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                {showCodePreview ? 'Thu gọn mã nguồn bộ cài' : 'Xem trước toàn bộ nội dung file cài đặt (.sh)'}
              </span>
              {showCodePreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Full Script Preview */}
      {showCodePreview && (
        <div className="mt-5 pt-5 border-t border-slate-800 animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Nội dung đầy đủ của install_lunar_conky.sh ({fullInstallerScript.split('\n').length} dòng)
            </span>
            <button
              type="button"
              onClick={handleCopyCommand}
              className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Sao chép</span>
            </button>
          </div>
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 max-h-96 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre selection:bg-cyan-500/30">
            {fullInstallerScript}
          </div>
        </div>
      )}
    </div>
  );
};
