import { useState } from 'react';
import { Code2, Copy, Download, Check, FileCode, Play, Sparkles, Terminal, FileText, CheckCircle2 } from 'lucide-react';
import {
  PYTHON_SCRIPT_SOURCE,
  CONKY_CONFIG_SOURCE,
  START_SCRIPT_SOURCE,
  AUTOSTART_DESKTOP_ENTRY,
  ONE_CLICK_INSTALL_SCRIPT,
} from '../data/sourceCode';

export function CodeRepository() {
  const [activeTab, setActiveTab] = useState<'python' | 'conky' | 'start' | 'desktop' | 'installer'>('python');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'python':
        return {
          filename: 'lunar_battu.py',
          lang: 'Python',
          content: PYTHON_SCRIPT_SOURCE,
          path: '~/.config/conky/lunar_battu.py',
          desc: 'Mã nguồn Python tính toán thiên văn NASA JPL DE421, điểm Sóc, Bát Tự Can Chi và lấy API thời tiết.',
        };
      case 'conky':
        return {
          filename: 'conky_lunar.conf',
          lang: 'Lua',
          content: CONKY_CONFIG_SOURCE,
          path: '~/.config/conky/conky_lunar.conf',
          desc: 'Tệp cấu hình Conky chuẩn cú pháp Lua tối ưu cho Xubuntu (chống viền đen, khử nhấp nháy, trong suốt ARGB).',
        };
      case 'start':
        return {
          filename: 'start_conky.sh',
          lang: 'Bash',
          content: START_SCRIPT_SOURCE,
          path: '~/.config/conky/start_conky.sh',
          desc: 'Script thực thi có độ trễ 10 giây (sleep 10) và chạy Conky ở dạng ẩn ngầm (conky -d).',
        };
      case 'desktop':
        return {
          filename: 'lunar-conky.desktop',
          lang: 'Desktop Entry',
          content: AUTOSTART_DESKTOP_ENTRY,
          path: '~/.config/autostart/lunar-conky.desktop',
          desc: 'Tệp kích hoạt tự động chạy cho môi trường màn hình XFCE của Xubuntu khi đăng nhập người dùng.',
        };
      case 'installer':
        return {
          filename: 'install_all.sh',
          lang: 'Bash Installer',
          content: ONE_CLICK_INSTALL_SCRIPT,
          path: '~/install_all.sh',
          desc: 'Tệp cài đặt tự động 1 chạm: cài package hệ thống, pip, tải de421.bsp, tạo toàn bộ file và chạy thử.',
        };
    }
  };

  const current = getActiveCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(current.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([current.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = current.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="source-code" className="py-16 bg-[#090d16] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Kho Mã Nguồn Trọn Bộ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bộ Mã Nguồn & Tệp Cấu Hình Đầy Đủ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Xem trực tiếp mã nguồn của từng tệp trong hệ thống. Bạn có thể sao chép hoặc tải trực tiếp về máy tính.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('python')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'python'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>lunar_battu.py</span>
          </button>
          <button
            onClick={() => setActiveTab('conky')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'conky'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>conky_lunar.conf</span>
          </button>
          <button
            onClick={() => setActiveTab('start')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'start'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>start_conky.sh (Khởi động ẩn)</span>
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'desktop'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>lunar-conky.desktop</span>
          </button>
          <button
            onClick={() => setActiveTab('installer')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'installer'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>install_all.sh (Tự động 1 chạm)</span>
          </button>
        </div>

        {/* Code Container */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="px-4 py-3 bg-[#131926] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">{current.filename}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-cyan-400 border border-slate-700">
                  {current.lang}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{current.path}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép mã!' : 'Sao chép toàn bộ'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải về .{current.filename.split('.').pop()}</span>
              </button>
            </div>
          </div>

          {/* Description banner */}
          <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 text-xs text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{current.desc}</span>
          </div>

          {/* Code Body */}
          <div className="p-4 sm:p-6 overflow-x-auto max-h-[500px] overflow-y-auto bg-[#070a12]">
            <pre className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed whitespace-pre">
              <code>{current.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
