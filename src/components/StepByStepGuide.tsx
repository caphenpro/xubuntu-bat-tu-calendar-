import { useState } from 'react';
import { Terminal, Copy, Check, ChevronDown, ChevronRight, AlertCircle, Info, Sparkles, Folder, Play, RefreshCw, Power } from 'lucide-react';
import { PYTHON_SCRIPT_SOURCE, CONKY_CONFIG_SOURCE, START_SCRIPT_SOURCE, AUTOSTART_DESKTOP_ENTRY } from '../data/sourceCode';

export function StepByStepGuide() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number>(1);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      step: 1,
      title: "Cài đặt các gói hệ thống cần thiết",
      desc: "Cài đặt Conky bản đầy đủ, Python 3, bộ quản lý gói pip, công cụ tải file và font chữ chuẩn Tiếng Việt.",
      command: `sudo apt update -y && sudo apt install -y conky-all python3 python3-pip python3-venv curl wget fonts-dejavu-core`,
      explanation: "Lệnh này cập nhật kho phần mềm Xubuntu và cài đặt conky-all (hỗ trợ đầy đủ Lua và ARGB trong suốt), Python3, công cụ curl/wget và font chữ DejaVu hiển thị tiếng Việt mượt mà không bị lỗi ô vuông.",
      tip: "Trên Xubuntu, conky-all là gói bắt buộc để có đầy đủ tính năng trong suốt và đồ họa mượt hơn bản conky-std rút gọn.",
    },
    {
      step: 2,
      title: "Tạo thư mục cấu hình chuyên biệt",
      desc: "Tổ chức không gian lưu trữ cho script và tệp cấu hình Conky trong thư mục chuẩn của người dùng.",
      command: `mkdir -p ~/.config/conky
mkdir -p ~/.config/autostart
cd ~/.config/conky`,
      explanation: "Thư mục ~/.config/conky là nơi chuẩn hóa lưu trữ mã nguồn và file cấu hình. Thư mục ~/.config/autostart dùng để kích hoạt ứng dụng khởi động cùng Xubuntu.",
      tip: "Dấu ~ đại diện cho thư mục cá nhân của bạn (/home/tên_người_dùng).",
    },
    {
      step: 3,
      title: "Cài đặt các thư viện Python (Skyfield, Pytz, Requests)",
      desc: "Cài đặt bộ thư viện thiên văn NASA Skyfield, múi giờ Việt Nam pytz và gửi yêu cầu thời tiết requests.",
      command: `# Đối với Ubuntu/Xubuntu 24.04 & 22.04:
pip3 install skyfield pytz requests --break-system-packages 2>/dev/null || pip3 install skyfield pytz requests`,
      explanation: "Skyfield là thư viện thiên văn vũ trụ hàng đầu sử dụng thuật toán JPL của NASA để tính toán vị trí Mặt Trời, Mặt Trăng, kinh độ hoàng đạo và điểm Sóc trăng mới tuyệt đối chính xác.",
      tip: "Tham số --break-system-packages giúp cài đặt trực tiếp trên Ubuntu 24.04 mà không bị chặn bởi cơ chế PEP 668.",
    },
    {
      step: 4,
      title: "Tải tệp dữ liệu vị trí thiên văn NASA JPL (de421.bsp)",
      desc: "Tải file dữ liệu quỹ đạo hành tinh (khoảng 16MB) để Skyfield tính toán ngoại tuyến tức thì mà không cần mạng.",
      command: `cd ~/.config/conky
curl -o de421.bsp https://raw.githubusercontent.com/skyfielders/python-skyfield/master/ci/de421.bsp || \\
wget -O de421.bsp https://naif.jpl.nasa.gov/pub/naif/generic_kernels/spk/planets/de421.bsp`,
      explanation: "Tệp de421.bsp là bộ số liệu thiên văn chính thống của NASA JPL (Jet Propulsion Laboratory) từ năm 1900 đến 2050, cho phép tính Tiết khí và ngày Âm lịch chính xác từng giây.",
      tip: "Tải tệp này trước giúp Conky khi vừa khởi động không bị đứng hình hoặc timeout do chờ mạng.",
    },
    {
      step: 5,
      title: "Tạo file mã nguồn Python (lunar_battu.py)",
      desc: "Tạo file chương trình tính Lịch Âm, Bát Tự và lấy dự báo thời tiết bằng trình soạn thảo nano hoặc lệnh cat.",
      command: `cat << 'EOF' > ~/.config/conky/lunar_battu.py
${PYTHON_SCRIPT_SOURCE.trim()}
EOF

# Cấp quyền thực thi cho file:
chmod +x ~/.config/conky/lunar_battu.py`,
      explanation: "Chương trình sẽ tự động tính Bát Tự (Can Chi 4 trụ: Năm, Tháng, Ngày, Giờ), 24 Tiết khí, chu kỳ Sóc trăng mới và gọi Open-Meteo API để lấy thời tiết.",
      tip: "Bạn có thể mở chỉnh sửa tọa độ vĩ độ / kinh độ thành phố của bạn ở hàm get_weather(lat=..., lon=...).",
    },
    {
      step: 6,
      title: "Tạo file cấu hình hiển thị Conky (conky_lunar.conf)",
      desc: "Cấu hình chuẩn Lua cho Conky: trong suốt ARGB không viền đen, chống chớp hình, căn lề góc trên bên phải.",
      command: `cat << 'EOF' > ~/.config/conky/conky_lunar.conf
${CONKY_CONFIG_SOURCE.trim()}
EOF`,
      explanation: "File cấu hình này thiết lập own_window_type = 'desktop', own_window_argb_visual = true giúp tích hợp hoàn hảo vào trình quản lý cửa sổ XFWM4 của Xubuntu mà không tạo vệt đen.",
      tip: "update_interval được đặt là 1.0 giây để đồng hồ nhảy thời gian thực, trong khi script Python được gọi mỗi 60 giây để tiết kiệm CPU tối đa.",
    },
    {
      step: 7,
      title: "Tạo Script Khởi Động Ẩn Có Độ Trễ (start_conky.sh)",
      desc: "Kỹ thuật quan trọng: Chờ 10 giây (sleep 10) để Xubuntu nạp xong màn hình desktop trước khi bật Conky ở chế độ ẩn ngầm (daemon).",
      command: `cat << 'EOF' > ~/.config/conky/start_conky.sh
${START_SCRIPT_SOURCE.trim()}
EOF

# Cấp quyền thực thi:
chmod +x ~/.config/conky/start_conky.sh`,
      explanation: "Khi bật máy, XFCE desktop, panel và compositor cần khoảng 5-10 giây để tải xong. Nếu bật Conky ngay lập tức, Conky có thể bị vẽ đè, chớp tắt hoặc dính nền đen. Lệnh sleep 10 và cờ 'conky -d' đảm bảo Conky chạy ẩn hoàn toàn không mở cửa sổ terminal.",
      tip: "Bạn có thể điều chỉnh DELAY_SECONDS=10 lên 15 giây nếu máy tính của bạn dùng ổ cứng HDD hoặc khởi động chậm hơn.",
    },
    {
      step: 8,
      title: "Thiết lập tự động chạy khi mở máy (Autostart)",
      desc: "Tạo tệp launcher chuẩn để hệ điều hành Xubuntu tự động kích hoạt script mỗi khi bạn đăng nhập.",
      command: `cat << 'EOF' > ~/.config/autostart/lunar-conky.desktop
[Desktop Entry]
Type=Application
Exec=/home/$USER/.config/conky/start_conky.sh
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name=Conky Lịch Âm Bát Tự
Comment=Khởi động ẩn Conky Lịch Âm sau khi Xubuntu mở máy
Icon=utilities-system-monitor
Categories=Utility;System;
EOF`,
      explanation: "Tệp .desktop trong ~/.config/autostart/ là tiêu chuẩn của XFCE/Ubuntu. Khi bạn đăng nhập, hệ thống sẽ tự động gọi file start_conky.sh để đếm lùi thời gian rồi khởi chạy Conky.",
      tip: "Bạn cũng có thể kiểm tra mục này trong giao diện đồ họa Xubuntu: Vào Menu Ứng dụng -> Cài đặt (Settings) -> Phiên làm việc và Khởi động (Session and Startup) -> tab 'Khởi động ứng dụng'.",
    },
    {
      step: 9,
      title: "Chạy thử nghiệm và Quản lý Conky",
      desc: "Các câu lệnh thông dụng để chạy thử ngay lập tức, kiểm tra trạng thái tiến trình hoặc tắt/bật lại Conky.",
      command: `# 1. Chạy thử nghiệm ngay lập tức (không cần đợi khởi động lại máy):
~/.config/conky/start_conky.sh

# 2. Kiểm tra tiến trình Conky đang chạy ngầm:
pgrep -l conky

# 3. Tắt Conky khi cần:
killall conky

# 4. Chạy trực tiếp script Python để xem kết quả xuất ra terminal:
python3 ~/.config/conky/lunar_battu.py`,
      explanation: "Khi chạy lệnh ~/.config/conky/start_conky.sh, sau 10 giây đếm ngược, widget Lịch Âm - Bát Tự sẽ xuất hiện êm ái ở góc phải màn hình desktop của bạn!",
      tip: "Nếu bạn chỉnh sửa file cấu hình hoặc đổi màu, chỉ cần gõ 'killall conky && ~/.config/conky/start_conky.sh' để nạp lại giao diện mới.",
    },
  ];

  return (
    <section id="install-guide" className="py-16 bg-[#0b0f19] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Hướng Dẫn Từng Bước Từ A-Z</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cài Đặt Chi Tiết Cho Người Dùng Mới
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Chỉ cần mở <strong>Terminal</strong> trên Xubuntu (phím tắt <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 text-xs">Ctrl + Alt + T</kbd>)
            và sao chép từng câu lệnh dưới đây.
          </p>
        </div>

        {/* Workflow Diagram Banner */}
        <div className="mb-10 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Quy Trình Chạy Ẩn Tự Động Khi Mở Máy</h4>
              <p className="text-xs text-slate-400">Khởi động máy → XFCE nạp màn hình → Chờ 10 giây (sleep 10) → Chạy ngầm Conky (-d) → Hiển thị Lịch Âm</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-black/40 px-3 py-2 rounded-lg border border-slate-800 text-slate-300">
            <Power className="w-4 h-4 text-emerald-400" />
            <span>Boot</span>
            <span>➔</span>
            <span className="text-amber-400">Sleep 10s</span>
            <span>➔</span>
            <span className="text-cyan-400">conky -d</span>
          </div>
        </div>

        {/* Step items list */}
        <div className="space-y-6">
          {steps.map((item, idx) => {
            const isExpanded = expandedStep === item.step;
            return (
              <div
                key={item.step}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'bg-slate-900/90 border-cyan-500/50 shadow-xl shadow-cyan-500/5' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Step header bar */}
                <div
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setExpandedStep(isExpanded ? 0 : item.step)}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-colors ${
                        isExpanded ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base tracking-tight flex items-center gap-2">
                        <span>{item.title}</span>
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isExpanded ? 'Thu gọn' : 'Xem lệnh'}
                    </span>
                    <div className="p-1 rounded text-slate-400 hover:text-white">
                      {isExpanded ? <ChevronDown className="w-5 h-5 text-cyan-400" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Step content accordion body */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-slate-800/80 space-y-4">
                    {/* Command terminal box */}
                    <div className="relative group">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-[#141a29] rounded-t-xl border-t border-x border-slate-700/80 text-[11px] text-slate-400 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                          <span className="ml-2 text-slate-400">Terminal: Bước {item.step}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(item.command, idx)}
                          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors py-0.5 px-2 rounded bg-cyan-500/10 border border-cyan-500/20 cursor-pointer"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Đã sao chép!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Sao chép lệnh</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-3 sm:p-4 rounded-b-xl bg-[#090d16] border border-slate-700/80 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-72 whitespace-pre">
                        <code>{item.command}</code>
                      </pre>
                    </div>

                    {/* Explanation */}
                    <div className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 pt-1">
                      <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item.explanation}</span>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Mẹo cho Xubuntu: </strong>
                        <span>{item.tip}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
