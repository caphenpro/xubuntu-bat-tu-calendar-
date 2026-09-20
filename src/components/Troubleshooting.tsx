import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, AlertCircle, Wrench, CheckCircle2, Terminal, Copy, Check } from 'lucide-react';

export function Troubleshooting() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const faqs = [
    {
      q: "Tại sao trên Desktop chỉ hiện thời tiết mà bị mất Tiêu Đề 'LỊCH ÂM – BÁT TỰ', Dương Lịch và CPU/RAM so với mô phỏng?",
      a: "Nguyên nhân: File cấu hình ~/.config/conky/conky_lunar.conf của bạn chỉ chứa lệnh gọi mã nguồn Python mà bị thiếu khối khai báo tiêu đề Lua conky.text. Bản v3.2.1 đã cập nhật đầy đủ khối tiêu đề, đồng hồ Dương lịch thời gian thực và thanh CPU/RAM vào bộ cài 1-file.",
      fix: "Bạn không cần cài lại từ đầu! Hãy sao chép và dán lệnh dưới đây vào Terminal trên Xubuntu để cập nhật file conky_lunar.conf chuẩn và khởi động lại ngay lập tức:",
      cmd: `cat << 'EOF' > ~/.config/conky/conky_lunar.conf
conky.config = {
    alignment = 'top_right',
    gap_x = 25,
    gap_y = 45,
    minimum_width = 300,
    maximum_width = 340,
    update_interval = 1.0,
    total_run_times = 0,
    double_buffer = true,
    no_buffers = true,
    cpu_avg_samples = 2,
    net_avg_samples = 2,
    own_window = true,
    own_window_type = 'desktop',
    own_window_transparent = true,
    own_window_argb_visual = true,
    own_window_argb_value = 0,
    own_window_hints = 'undecorated,below,sticky,skip_taskbar,skip_pager',
    own_window_class = 'Conky',
    use_xft = true,
    font = 'DejaVu Sans:size=10:bold',
    xftalpha = 0.9,
    uppercase = false,
    text_buffer_size = 2048,
    draw_shades = true,
    default_shade_color = '#000000',
    draw_outline = false,
    draw_borders = false,
    draw_graph_borders = true,
    default_color = '#ffffff',
    color1 = '#00e5ff',
    color2 = '#ffd600',
    color3 = '#ff9100',
    color4 = '#00e676',
    color5 = '#00b0ff',
    color6 = '#ff4081',
};

conky.text = [[
\${alignc}\${font DejaVu Sans:size=14:bold}\${color1}LỊCH ÂM – BÁT TỰ\${font}\${color}
\${color1}\${hr 2}\${color}
\${alignc}\${color1}Dương Lịch: \${color}\${time %d/%m/%Y} - \${time %H:%M:%S}
\${color1}\${hr 1}\${color}
\${execpi 60 python3 ~/.config/conky/lunar_battu.py}
\${color1}\${hr 1}\${color}
\${alignc}\${color1}CPU:\${color} \${cpu cpu0}% \${cpubar 7,120}
\${alignc}\${color1}RAM:\${color} \${memperc}% \${membar 7,120}
]];
EOF
killall conky && ~/.config/conky/start_conky.sh`,
    },
    {
      q: "Gặp lỗi 'UnboundLocalError: local variable location_label referenced before assignment' trong get_weather()?",
      a: "Nguyên nhân: Khi kết nối mạng bị chập chờn hoặc API Open-Meteo phản hồi chậm, hàm thời tiết get_weather() trong các phiên bản cũ cố gắng truy xuất biến location_label trước khi biến này được gán giá trị ở nhánh ngoại lệ.",
      fix: "Bản nâng cấp v3.2.0 đã sửa triệt để lỗi này bằng cách gán tham số mặc định an toàn location_label=\"\" và kiểm soát toàn bộ nhánh fallback ngoại tuyến. Hãy sử dụng bộ cài 1-file v3.2.0 để cập nhật file lunar_battu.py mới nhất:",
      cmd: `sed -i 's/def get_weather(lat=None, lon=None, location_label=None):/def get_weather(lat=None, lon=None, location_label=""):/' ~/.config/conky/lunar_battu.py
killall conky && ~/.config/conky/start_conky.sh`,
    },
    {
      q: "Khi nhấn chuột trái/phải vào màn hình Desktop thì Conky bị biến mất?",
      a: "Đây là hiện tượng xfdesktop (trình quản lý màn hình nền XFCE) giành quyền ưu tiên hiển thị đè lên Conky.",
      fix: "Trong file ~/.config/conky/conky_lunar.conf, đảm bảo bạn đã đặt: own_window_type = 'desktop' và own_window_hints = 'undecorated,below,sticky,skip_taskbar,skip_pager'. Tùy chọn 'below' giữ Conky luôn ở lớp nền dưới cùng.",
      cmd: `killall conky && ~/.config/conky/start_conky.sh`,
    },
    {
      q: "Gặp lỗi 'ModuleNotFoundError: No module named skyfield' hoặc 'requests'?",
      a: "Trên Ubuntu / Xubuntu 24.04 LTS và 22.04 LTS, hệ điều hành bật cơ chế bảo vệ PEP 668 (externally-managed-environment) khiến lệnh pip3 thông thường bị từ chối.",
      fix: "Chạy lệnh cài đặt với cờ --break-system-packages để pip cho phép cài đặt thư viện vào Python môi trường người dùng:",
      cmd: `pip3 install skyfield pytz requests --break-system-packages`,
    },
    {
      q: "Chương trình báo lỗi không tìm thấy file 'de421.bsp' khi chạy ngầm?",
      a: "Khi hệ thống Autostart khởi động script, thư mục hiện hành (Current Working Directory) mặc định là thư mục gốc người dùng (/home/username), trong khi tệp de421.bsp lại nằm ở ~/.config/conky.",
      fix: "File script start_conky.sh đã được chúng tôi lập trình sẵn dòng lệnh 'cd ~/.config/conky' trước khi gọi conky. Bạn cũng có thể tải lại file de421.bsp (16MB) vào đúng thư mục bằng lệnh sau:",
      cmd: `cd ~/.config/conky && curl -O https://raw.githubusercontent.com/skyfielders/python-skyfield/master/ci/de421.bsp`,
    },
    {
      q: "Làm thế nào để tắt hẳn hoặc khởi động lại Conky khi muốn chỉnh sửa giao diện?",
      a: "Vì Conky chạy ẩn dưới dạng tiến trình nền (daemon), bạn không thể đóng nó bằng nút X trên cửa sổ.",
      fix: "Sử dụng lệnh killall trong terminal để tắt ngay lập tức, sau đó chạy lại script start_conky.sh:",
      cmd: `killall conky
# Sau khi sửa file conky_lunar.conf xong, chạy lại:
~/.config/conky/start_conky.sh`,
    },
    {
      q: "Muốn thay đổi thời gian chờ khi mở máy từ 10 giây sang 5 giây hoặc 15 giây?",
      a: "Bạn chỉ cần mở tệp start_conky.sh và sửa lại giá trị biến DELAY_SECONDS.",
      fix: "Dùng trình soạn thảo nano hoặc lệnh sed nhanh:",
      cmd: `# Đổi sang 15 giây nếu máy khởi động chậm:
sed -i 's/DELAY_SECONDS=.*/DELAY_SECONDS=15/' ~/.config/conky/start_conky.sh`,
    },
  ];

  return (
    <section id="faq" className="py-16 bg-[#0b0f19]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Hỏi Đáp & Sửa Lỗi Thường Gặp</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Khắc Phục Sự Cố & Tối Ưu Xubuntu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Tổng hợp các câu hỏi và tình huống thực tế hay gặp phải khi chạy Conky trên hệ điều hành Xubuntu.
          </p>
        </div>

        {/* Accordion FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg' : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                      ?
                    </div>
                    <span className="font-bold text-white text-sm sm:text-base">{faq.q}</span>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronDown className="w-5 h-5 text-cyan-400" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 space-y-3">
                    <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-emerald-400 font-semibold text-xs mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Cách giải quyết:</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{faq.fix}</p>

                      {faq.cmd && (
                        <div className="mt-2.5 relative">
                          <pre className="p-2.5 bg-[#0a0f1d] rounded-lg text-cyan-300 font-mono text-xs overflow-x-auto border border-slate-800">
                            <code>{faq.cmd}</code>
                          </pre>
                          <button
                            onClick={() => copyText(faq.cmd, `faq-${idx}`)}
                            className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 border border-slate-700 cursor-pointer"
                          >
                            {copiedCmd === `faq-${idx}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">Đã chép</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Chép</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
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
