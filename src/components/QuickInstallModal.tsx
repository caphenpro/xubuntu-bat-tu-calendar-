import { useState } from 'react';
import { X, Terminal, Copy, Check, Sparkles, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import { ONE_CLICK_INSTALL_SCRIPT } from '../data/sourceCode';

interface QuickInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickInstallModal({ isOpen, onClose }: QuickInstallModalProps) {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedManualCommand, setCopiedManualCommand] = useState(false);

  if (!isOpen) return null;

  const quickTerminalCommand = `mkdir -p ~/.config/conky ~/.config/autostart && cd ~/.config/conky && \\
sudo apt update && sudo apt install -y conky-all python3 python3-pip curl fonts-dejavu-core && \\
pip3 install skyfield pytz requests --break-system-packages && \\
curl -O https://raw.githubusercontent.com/skyfielders/python-skyfield/master/ci/de421.bsp`;

  const copyScript = () => {
    navigator.clipboard.writeText(ONE_CLICK_INSTALL_SCRIPT);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyManual = () => {
    navigator.clipboard.writeText(quickTerminalCommand);
    setCopiedManualCommand(true);
    setTimeout(() => setCopiedManualCommand(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0e1424] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg sm:text-xl">Lệnh Cài Đặt Nhanh Vào Xubuntu</h3>
            <p className="text-xs text-slate-400">Chọn phương thức cài đặt tiện lợi nhất cho bạn</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4 my-4">
          {/* Option 1: One-liner script */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Cách 1: Lệnh Chuẩn Bị Hệ Thống & Tải Dữ Liệu
              </span>
              <button
                onClick={copyManual}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedManualCommand ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedManualCommand ? 'Đã sao chép' : 'Sao chép lệnh'}</span>
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto border border-slate-800 leading-relaxed">
              <code>{quickTerminalCommand}</code>
            </pre>
            <p className="text-[11px] text-slate-400">
              Dán lệnh này vào Terminal trên Xubuntu để cài đủ package, thư viện và tải file thiên văn de421.bsp.
            </p>
          </div>

          {/* Option 2: Full automated bash script */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Cách 2: Script Tự Động Hóa 100% (install_all.sh)
              </span>
              <button
                onClick={copyScript}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? 'Đã sao chép' : 'Sao chép nội dung script'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Chỉ cần lưu vào file <code>install_all.sh</code> và gõ <code>bash install_all.sh</code>, toàn bộ mã nguồn Python, cấu hình Conky và Autostart sau 10s sẽ được thiết lập tự động!
            </p>
          </div>
        </div>

        {/* Modal footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              onClose();
              const el = document.getElementById('install-guide');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Xem hướng dẫn từng bước</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
