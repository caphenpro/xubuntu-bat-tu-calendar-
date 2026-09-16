import { CONKY_THEMES } from '../data/locations';
import { PYTHON_SCRIPT_SOURCE } from '../data/sourceCode';

export interface InstallerOptions {
  themeId: string;
  position: 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left';
  isAutoLocation: boolean;
  selectedCity: string;
  latitude: number;
  longitude: number;
  delaySeconds: number;
  gapX?: number;
  gapY?: number;
}

export function generateSingleInstallerScript(opts: InstallerOptions): string {
  const theme = CONKY_THEMES.find((t) => t.id === opts.themeId) || CONKY_THEMES[0];
  const gapX = opts.gapX ?? 25;
  const gapY = opts.gapY ?? 45;

  // Prepare Python script with customized weather call
  let customizedPython = PYTHON_SCRIPT_SOURCE;
  if (opts.isAutoLocation) {
    customizedPython = customizedPython.replace(
      /get_weather\([^)]*\)/,
      `get_weather()`
    );
  } else {
    customizedPython = customizedPython.replace(
      /get_weather\([^)]*\)/,
      `get_weather(lat=${opts.latitude}, lon=${opts.longitude}, location_label="${opts.selectedCity}")`
    );
  }

  // Prepare Conky config Lua
  const customizedConkyConf = `conky.config = {
    -- Vị trí hiển thị trên màn hình
    alignment = '${opts.position}',
    gap_x = ${gapX},
    gap_y = ${gapY},
    minimum_width = 320,
    maximum_width = 380,

    -- Cấu hình hiển thị chuẩn XFCE Desktop
    own_window = true,
    own_window_type = 'desktop',
    own_window_transparent = true,
    own_window_argb_visual = true,
    own_window_argb_value = 0,
    own_window_hints = 'undecorated,below,sticky,skip_taskbar,skip_pager',

    -- Hiệu năng và khử bóng
    double_buffer = true,
    update_interval = 1.0,
    cpu_avg_samples = 2,
    net_avg_samples = 2,
    no_buffers = true,
    out_to_console = false,
    out_to_ncurses = false,
    out_to_stderr = false,
    extra_newline = false,

    -- Font chữ và render text
    use_xft = true,
    font = 'DejaVu Sans:size=10',
    xftalpha = 0.9,
    uppercase = false,
    draw_shades = false,
    draw_outline = false,
    draw_borders = false,
    draw_graph_borders = false,

    -- Bảng màu chủ đề: ${theme.name}
    default_color = '${theme.colorDate}',
    color1 = '${theme.colorTitle}',    -- Khung viền và tiêu đề
    color2 = '${theme.colorBatTu}',    -- Can Chi Bát Tự
    color3 = '${theme.colorTietKhi}',  -- Tiết Khí thiên văn NASA JPL
    color4 = '${theme.colorAmLich}',   -- Lịch Âm & Điểm Sóc
    color5 = '${theme.colorWeather}',  -- Thời tiết, Lượng Mưa, Gió
    color6 = '${theme.colorSun}',      -- Giờ Mặt Trời mọc/lặn
};

conky.text = [[
\${execpi 60 python3 $HOME/.config/conky/lunar_battu.py}
]];`;

  const locationSummary = opts.isAutoLocation
    ? 'Tự động định vị qua mạng (GeoIP) + Đo lượng mưa & Tốc độ gió'
    : `${opts.selectedCity} (Vĩ độ: ${opts.latitude}, Kinh độ: ${opts.longitude})`;

  return `#!/usr/bin/env bash
#========================================================================#
#  BỘ CÀI ĐẶT 1-FILE DUY NHẤT: CONKY LỊCH ÂM - BÁT TỰ TRÊN XUBUNTU      #
#------------------------------------------------------------------------#
#  Cấu hình xuất tự động theo tùy chỉnh của bạn:                          #
#  - Vị trí định vị  : ${locationSummary}
#  - Bảng màu giao diện: ${theme.name}
#  - Vị trí màn hình : ${opts.position}
#  - Độ trễ khởi động : ${opts.delaySeconds} giây
#------------------------------------------------------------------------#
#  HƯỚNG DẪN CHẠY:                                                       #
#  Mở Terminal (Ctrl + Alt + T), dán lệnh và nhấn Enter là xong ngay!   #
#========================================================================#

set -e

# Màu hiển thị terminal
GREEN='\\033[0;32m'
CYAN='\\033[0;36m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m'

echo -e "\${CYAN}==================================================================\${NC}"
echo -e "\${CYAN}   CÀI ĐẶT TỰ ĐỘNG CONKY LỊCH ÂM - BÁT TỰ & TIẾT KHÍ THIÊN VĂN   \${NC}"
echo -e "\${CYAN}==================================================================\${NC}"
echo -e "\${YELLOW}→ Cấu hình:\${NC} ${theme.name} | Vị trí: ${opts.position} | ${locationSummary}"
echo ""

# 1. Cài đặt các gói hệ thống cần thiết
echo -e "\${BLUE}[1/6] Đang cài đặt gói hệ thống (conky-all, python3, pip, curl)... \${NC}"
sudo apt-get update -y
sudo apt-get install -y conky-all python3 python3-pip python3-venv curl fonts-dejavu-core

# 2. Tạo thư mục cấu hình
echo -e "\${BLUE}[2/6] Tạo thư mục ~/.config/conky và ~/.config/autostart... \${NC}"
mkdir -p "$HOME/.config/conky"
mkdir -p "$HOME/.config/autostart"
cd "$HOME/.config/conky"

# 3. Cài đặt thư viện Python (tương thích cả Ubuntu 22.04 & 24.04 PEP 668)
echo -e "\${BLUE}[3/6] Cài đặt thư viện Python: skyfield, pytz, requests... \${NC}"
pip3 install skyfield pytz requests --break-system-packages 2>/dev/null || pip3 install skyfield pytz requests

# 4. Tải tệp thiên văn NASA JPL DE421 (16MB) nếu chưa có
echo -e "\${BLUE}[4/6] Kiểm tra tệp thiên văn NASA JPL DE421... \${NC}"
if [ ! -f "$HOME/.config/conky/de421.bsp" ]; then
    echo "Đang tải de421.bsp từ máy chủ thiên văn..."
    curl -fsSL -o "$HOME/.config/conky/de421.bsp" "https://raw.githubusercontent.com/skyfielders/python-skyfield/master/ci/de421.bsp" || \\
    wget -q -O "$HOME/.config/conky/de421.bsp" "https://naif.jpl.nasa.gov/pub/naif/generic_kernels/spk/planets/de421.bsp"
    echo "Đã tải xong de421.bsp!"
else
    echo "Tệp de421.bsp đã tồn tại, bỏ qua bước tải."
fi

# 5. Ghi tệp mã nguồn Python tính toán Lịch Âm - Bát Tự
echo -e "\${BLUE}[5/6] Tạo tệp ~/.config/conky/lunar_battu.py... \${NC}"
cat << 'LUNAR_PY_EOF' > "$HOME/.config/conky/lunar_battu.py"
${customizedPython}
LUNAR_PY_EOF
chmod +x "$HOME/.config/conky/lunar_battu.py"

# Ghi tệp cấu hình Conky giao diện Lua
cat << 'CONKY_CONF_EOF' > "$HOME/.config/conky/conky_lunar.conf"
${customizedConkyConf}
CONKY_CONF_EOF

# Ghi tệp script khởi động có độ trễ an toàn cho XFCE
cat << 'START_SH_EOF' > "$HOME/.config/conky/start_conky.sh"
#!/usr/bin/env bash
DELAY_SECONDS=${opts.delaySeconds}

# Tắt tiến trình conky cũ nếu có
killall conky 2>/dev/null || true

# Chờ hệ điều hành XFCE và Compositor ổn định
sleep \${DELAY_SECONDS}

# Chuyển vào thư mục làm việc để nạp de421.bsp chính xác
cd "$HOME/.config/conky"

# Chạy conky ở chế độ nền ngầm (daemon)
conky -d -c "$HOME/.config/conky/conky_lunar.conf"
START_SH_EOF
chmod +x "$HOME/.config/conky/start_conky.sh"

# 6. Thiết lập tự động khởi động cùng hệ điều hành Xubuntu
echo -e "\${BLUE}[6/6] Thiết lập Autostart khi khởi động máy tính... \${NC}"
cat << AUTOSTART_EOF > "$HOME/.config/autostart/lunar-conky.desktop"
[Desktop Entry]
Type=Application
Exec=/bin/bash -c "sleep ${opts.delaySeconds} && cd \\$HOME/.config/conky && conky -d -c \\$HOME/.config/conky/conky_lunar.conf"
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name=Conky Lịch Âm Bát Tự
Comment=Khởi động Conky Lịch Âm Bát Tự sau ${opts.delaySeconds}s khi mở máy
Icon=utilities-system-monitor
Categories=Utility;System;
AUTOSTART_EOF

# Khởi chạy Conky ngay lập tức để người dùng kiểm tra kết quả
echo ""
echo -e "\${GREEN}==================================================================\${NC}"
echo -e "\${GREEN}   CÀI ĐẶT HOÀN TẤT 100%! ĐANG KHỞI CHẠY LÊN DESKTOP...           \${NC}"
echo -e "\${GREEN}==================================================================\${NC}"
killall conky 2>/dev/null || true
cd "$HOME/.config/conky" && conky -d -c "$HOME/.config/conky/conky_lunar.conf"

echo -e "\${YELLOW}→ Mẹo hữu ích:\${NC}"
echo "  • Tắt Conky       : killall conky"
echo "  • Khởi động lại   : ~/.config/conky/start_conky.sh"
echo "  • Tự động mở máy  : Đã kích hoạt trong Cài đặt Session & Startup của XFCE"
echo ""
`;
}
