export const PYTHON_SCRIPT_SOURCE = `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Chương trình: Lịch Âm - Bát Tự & Tiết Khí Thiên Văn cho Conky (Xubuntu)
Tác giả: Hướng dẫn tích hợp cho XFCE/Xubuntu Desktop
Tính năng:
  - Dự báo thời tiết tự động qua Open-Meteo API
  - Can Chi Bát Tự: Năm, Tháng, Ngày, Giờ chính xác
  - Xác định 24 Tiết Khí & Trung Khí thiên văn qua NASA JPL Ephemeris DE421
  - Tính điểm Sóc (Trăng Mới), Âm Lịch, Tháng Đủ/Thiếu
  - Định dạng chuẩn Conky Color Tags để render trực tiếp lên Desktop
"""

import math
import requests
from datetime import datetime, timedelta
from pytz import timezone
from skyfield.api import load
from skyfield import almanac
import os
import sys

# Thiết lập thư mục làm việc trỏ về thư mục chứa script để nạp file de421.bsp chính xác
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(SCRIPT_DIR)

CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]
CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]

TIET_KHI_INFO = [
    {"name": "Xuân Phân", "type": "Trung khí"},
    {"name": "Thanh Minh", "type": "Tiết khí"},
    {"name": "Cốc Vũ", "type": "Trung khí"},
    {"name": "Lập Hạ", "type": "Tiết khí"},
    {"name": "Tiểu Mãn", "type": "Trung khí"},
    {"name": "Mang Chủng", "type": "Tiết khí"},
    {"name": "Hạ Chí", "type": "Trung khí"},
    {"name": "Tiểu Thử", "type": "Tiết khí"},
    {"name": "Đại Thử", "type": "Trung khí"},
    {"name": "Lập Thu", "type": "Tiết khí"},
    {"name": "Xử Thử", "type": "Trung khí"},
    {"name": "Bạch Lộ", "type": "Tiết khí"},
    {"name": "Thu Phân", "type": "Trung khí"},
    {"name": "Hàn Lộ", "type": "Tiết khí"},
    {"name": "Sương Giáng", "type": "Trung khí"},
    {"name": "Lập Đông", "type": "Tiết khí"},
    {"name": "Tiểu Tuyết", "type": "Trung khí"},
    {"name": "Đại Tuyết", "type": "Tiết khí"},
    {"name": "Đông Chí", "type": "Trung khí"},
    {"name": "Tiểu Hàn", "type": "Tiết khí"},
    {"name": "Đại Hàn", "type": "Trung khí"},
    {"name": "Lập Xuân", "type": "Tiết khí"},
    {"name": "Vũ Thủy", "type": "Trung khí"},
    {"name": "Kinh Trập", "type": "Tiết khí"},
]

WEATHER_CODES = {
    0: "Trời quang",
    1: "Nắng nhẹ",
    2: "Mây rải rác",
    3: "Nhiều mây",
    45: "Có sương mù",
    48: "Sương mù đóng băng",
    51: "Mưa phùn nhẹ",
    53: "Mưa phùn vừa",
    55: "Mưa phùn to",
    61: "Mưa nhẹ",
    63: "Mưa vừa",
    65: "Mưa to",
    80: "Mưa rào nhẹ",
    81: "Mưa rào vừa",
    82: "Mưa rào rất to",
    95: "Có dông",
    96: "Dông kèm mưa đá nhẹ",
    99: "Dông kèm mưa đá to"
}

def get_weather(lat=9.176, lon=105.150):
    """Lấy thông tin thời tiết thời gian thực từ Open-Meteo API"""
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=sunrise,sunset&timezone=Asia%2FHo_Chi_Minh"
    
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            current_data = data.get("current", {})
            daily_data = data.get("daily", {})
            
            temp = current_data.get("temperature_2m", "--")
            humidity = current_data.get("relative_humidity_2m", "--")
            code = current_data.get("weather_code", 0)
            status = WEATHER_CODES.get(code, "Thời tiết bình thường")
            
            sunrise_raw = daily_data.get("sunrise", [""])[0]
            sunset_raw = daily_data.get("sunset", [""])[0]
            
            sunrise = sunrise_raw.split("T")[1] if "T" in sunrise_raw else "--:--"
            sunset = sunset_raw.split("T")[1] if "T" in sunset_raw else "--:--"
            
            print(f"\${{alignc}}\${{color5}}Trạng thái : {status}\${{color}}")
            print(f"\${{alignc}}\${{color5}}Nhiệt độ   : {temp}°C | Độ ẩm: {humidity}%\${{color}}")
            print(f"\${{alignc}}\${{color6}}Mặt trời   : Mọc {sunrise} | Lặn {sunset}\${{color}}")
            print(f"\${{alignc}}-----------------------------------")
        else:
            print(f"\${{alignc}}\${{color5}}Thời tiết  : Đang cập nhật...\${{color}}")
            print(f"\${{alignc}}-----------------------------------")
    except Exception:
        print(f"\${{alignc}}\${{color5}}Thời tiết  : Lỗi kết nối mạng\${{color}}")
        print(f"\${{alignc}}-----------------------------------")

def get_solar_longitude(eph, ts, dt_utc):
    """Tính kinh độ Hoàng Đạo của Mặt Trời theo chuẩn thiên văn NASA"""
    t = ts.from_datetime(dt_utc)
    astrometric = eph['earth'].at(t).observe(eph['sun'])
    lat, lon, distance = astrometric.ecliptic_latlon()
    return lon.degrees

def get_can_chi_ngay(dt_local):
    """Tính Can Chi cho Ngày dựa trên ngày Julius (Julian Day JD)"""
    y, m, d = dt_local.year, dt_local.month, dt_local.day
    if m <= 2:
        y -= 1
        m += 12
    A = y // 100
    B = 2 - A + (A // 4)
    jd = int(365.25 * (y + 4716)) + int(30.6001 * (m + 1)) + d + B - 1524.5
    day_count = int(jd + 0.5) + 49
    return day_count % 10, day_count % 12

def find_soc_points(eph, ts, dt_now):
    """Tìm thời điểm Sóc (Trăng Mới / New Moon) trước và sau ngày hiện tại"""
    tz_vn = timezone("Asia/Ho_Chi_Minh")
    t0 = ts.from_datetime((dt_now - timedelta(days=35)).astimezone(timezone("UTC")))
    t1 = ts.from_datetime((dt_now + timedelta(days=35)).astimezone(timezone("UTC")))
    
    t_times, phases = almanac.find_discrete(t0, t1, almanac.moon_phases(eph))
    
    soc_times = []
    for t, phase in zip(t_times, phases):
        if phase == 0:  # Pha 0 là điểm Sóc (New Moon)
            dt_vn = t.astimezone(tz_vn)
            soc_times.append(dt_vn)
            
    soc_truoc = None
    soc_sau = None
    for dt in soc_times:
        if dt <= dt_now:
            soc_truoc = dt
        elif dt > dt_now and soc_sau is None:
            soc_sau = dt
            break
            
    return soc_truoc, soc_sau

def get_tiet_khi_in_lunar_month(eph, ts, soc_truoc, soc_sau):
    """Tìm các Tiết khí và Trung khí xuất hiện trong chu kỳ tháng Âm lịch"""
    tz_vn = timezone("Asia/Ho_Chi_Minh")
    dt_start = soc_truoc.astimezone(timezone("UTC"))
    dt_end = soc_sau.astimezone(timezone("UTC"))
    
    results = []
    curr_dt = dt_start
    prev_lon = get_solar_longitude(eph, ts, curr_dt)
    
    while curr_dt < dt_end:
        next_dt = curr_dt + timedelta(hours=1)
        if next_dt > dt_end:
            next_dt = dt_end
            
        next_lon = get_solar_longitude(eph, ts, next_dt)
        prev_idx = math.floor(prev_lon / 15)
        next_idx = math.floor(next_lon / 15)
        
        if next_lon < prev_lon and prev_lon > 340:
            next_idx += 24

        if next_idx > prev_idx:
            for step in range(prev_idx + 1, next_idx + 1):
                target_idx = step % 24
                info = TIET_KHI_INFO[target_idx]
                vn_dt = next_dt.astimezone(tz_vn)
                results.append(f"\${{alignc}}\${{color4}}{info['name']} ({info['type']}): {vn_dt.strftime('%H:%M (%d/%m)')}\${{color}}")
                
        prev_lon = next_lon
        curr_dt = next_dt
        
    return results

def main():
    # 1. Hiển thị thông tin thời tiết
    get_weather()

    local_tz = timezone("Asia/Ho_Chi_Minh")
    dt_local = datetime.now(local_tz)
    dt_utc = dt_local.astimezone(timezone("UTC"))

    # Tải bộ lịch thiên văn JPL
    ts = load.timescale()
    try:
        eph = load('de421.bsp')
    except Exception:
        # Tự động tải nếu chưa có file
        print(f"\${{alignc}}\${{color5}}Đang nạp dữ liệu thiên văn NASA JPL...\${{color}}")
        eph = load('de421.bsp')

    # 2. Tính Bát Tự (Can Chi Năm, Tháng, Ngày, Giờ)
    can_nam_idx = (dt_local.year - 4) % 10
    chi_nam_idx = (dt_local.year - 4) % 12
    
    solar_lon = get_solar_longitude(eph, ts, dt_utc)
    chi_thang_idx = (int((solar_lon - 315) % 360 // 30) + 2) % 12
    start_can_thang = ((can_nam_idx % 5) * 2 + 2) % 10
    can_thang_idx = (start_can_thang + (chi_thang_idx - 2) % 12) % 10
    
    can_ngay_idx, chi_ngay_idx = get_can_chi_ngay(dt_local)
    
    chi_gio_idx = 0 if dt_local.hour in (23, 0) else (dt_local.hour + 1) // 2
    can_gio_idx = ((can_ngay_idx % 5) * 2 + chi_gio_idx) % 10

    thang_am_num = (chi_thang_idx - 2) % 12 + 1
    tk_hien_tai = TIET_KHI_INFO[int(solar_lon // 15) % 24]['name']

    print(f"\${{alignc}}\${{color2}}Tiết Khí : {tk_hien_tai}\${{color}}")
    print(f"\${{alignc}}\${{color2}}Năm      : {CAN[can_nam_idx]} {CHI[chi_nam_idx]}\${{color}}")
    print(f"\${{alignc}}\${{color2}}Tháng    : {CAN[can_thang_idx]} {CHI[chi_thang_idx]}\${{color}}")
    print(f"\${{alignc}}\${{color2}}Ngày     : {CAN[can_ngay_idx]} {CHI[chi_ngay_idx]}\${{color}}")
    print(f"\${{alignc}}\${{color2}}Giờ      : {CAN[can_gio_idx]} {CHI[chi_gio_idx]}\${{color}}")
    print(f"\${{alignc}}-----------------------------------")

    # 3. Tính Điểm Sóc và Âm Lịch
    soc_truoc, soc_sau = find_soc_points(eph, ts, dt_local)
    if soc_truoc and soc_sau:
        mung1_date = soc_truoc.date()
        today_date = dt_local.date()
        ngay_am = (today_date - mung1_date).days + 1
        tong_ngay_thang = (soc_sau.date() - mung1_date).days
        loai_thang = "Tháng Đủ" if tong_ngay_thang == 30 else "Tháng Thiếu"
        
        print(f"\${{alignc}}\${{color3}}Âm Lịch  : Tháng {thang_am_num} - Ngày {ngay_am}\${{color}}")
        print(f"\${{alignc}}\${{color3}}({loai_thang} - {tong_ngay_thang} ngày)\${{color}}")
        print(f"\${{alignc}}\${{color3}}Sóc đầu  : {soc_truoc.strftime('%H:%M:%S (%d/%m/%Y)')}\${{color}}")
        print(f"\${{alignc}}\${{color3}}Sóc sau  : {soc_sau.strftime('%H:%M:%S (%d/%m/%Y)')}\${{color}}")
        print(f"\${{alignc}}-----------------------------------")

        print(f"\${{alignc}}\${{color4}}Tiết / Trung khí trong tháng:\${{color}}")
        tiet_khi_list = get_tiet_khi_in_lunar_month(eph, ts, soc_truoc, soc_sau)
        if tiet_khi_list:
            for item in tiet_khi_list:
                print(item)
        else:
            print(f"\${{alignc}}\${{color4}}Không có (Tháng Nhuận)\${{color}}")

if __name__ == "__main__":
    main()
`;

export const CONKY_CONFIG_SOURCE = `--[[
#========================================================================#
# CẤU HÌNH CONKY LỊCH ÂM - BÁT TỰ TỐI ƯU CHO XUBUNTU (XFCE4)            #
# Vị trí lưu: ~/.config/conky/conky_lunar.conf                           #
# Đã tinh chỉnh:                                                         #
#  - Trong suốt hoàn hảo (ARGB) không bị viền đen xfwm4                  #
#  - Chống nhấp nháy (Double Buffer + no_buffers)                        #
#  - Font chữ Tiếng Việt sắc nét (DejaVu Sans / Noto Sans)               #
#  - Tự động chạy ẩn đằng sau các cửa sổ ứng dụng                         #
#========================================================================#
]]

conky.config = {
    -- Cấu hình hiển thị và chống chớp hình
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

    -- Cấu hình Cửa sổ cho Xubuntu XFCE (Không bị lỗi màn hình đen)
    own_window = true,
    own_window_type = 'desktop',       -- 'desktop' hoặc 'dock' hoặc 'normal'
    own_window_transparent = true,     -- Trong suốt nền
    own_window_argb_visual = true,     -- Hỗ trợ kênh màu Alpha (32-bit visual)
    own_window_argb_value = 0,         -- Độ mờ 0-255 (0 là trong suốt tuyệt đối)
    own_window_hints = 'undecorated,below,sticky,skip_taskbar,skip_pager',
    own_window_class = 'Conky',

    -- Font chữ và render hiển thị Tiếng Việt
    use_xft = true,
    font = 'DejaVu Sans:size=10:bold',
    xftalpha = 0.9,
    uppercase = false,
    text_buffer_size = 2048,

    -- Đổ bóng nhẹ giúp chữ cực kỳ nổi bật trên mọi hình nền
    draw_shades = true,
    default_shade_color = '#000000',
    draw_outline = false,
    draw_borders = false,
    draw_graph_borders = true,

    -- Bảng màu khớp chính xác với mã nguồn Python:
    default_color = '#ffffff',         -- Mặc định: Trắng
    color1 = '#00e5ff',                -- Cyan: Tiêu đề & Dương Lịch
    color2 = '#ffd600',                -- Vàng tươi: Bát Tự & Tiết Khí Hiện Tại
    color3 = '#ff9100',                -- Cam rực rỡ: Âm Lịch & Điểm Sóc
    color4 = '#00e676',                -- Xanh ngọc: Tiết / Trung khí trong tháng
    color5 = '#00b0ff',                -- Xanh da trời: Trạng thái & Nhiệt độ
    color6 = '#ff4081',                -- Hồng đào: Giờ Mặt Trời mọc/lặn
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
]];
`;

export const START_SCRIPT_SOURCE = `#!/usr/bin/env bash
#========================================================================#
# SCRIPT KHỞI ĐỘNG ẨN CONKY LỊCH ÂM - BÁT TỰ CÓ ĐỘ TRỄ CHO XUBUNTU      #
# Vị trí: ~/.config/conky/start_conky.sh                                 #
#========================================================================#

# 1. Thời gian chờ (giây) để XFCE desktop & Compositor tải xong hoàn toàn.
# Giúp ngăn chặn triệt để lỗi Conky bị đè màn hình đen hoặc chớp tắt khi boot.
DELAY_SECONDS=10

# 2. Tắt các tiến trình conky cũ nếu đang chạy để tránh nhân đôi giao diện
killall conky 2>/dev/null

# 3. Chờ hệ điều hành Xubuntu ổn định
echo "[Conky Lịch Âm] Chờ \${DELAY_SECONDS} giây để Desktop XFCE khởi động hoàn tất..."
sleep \${DELAY_SECONDS}

# 4. Di chuyển vào thư mục chứa code để Python nạp đúng file de421.bsp
cd ~/.config/conky

# 5. Khởi chạy Conky ở chế độ chạy nền hoàn toàn (daemon/hidden)
# Flag -d: Fork process chạy ngầm, không mở cửa sổ terminal
# Flag -c: Chỉ định file cấu hình
conky -d -c ~/.config/conky/conky_lunar.conf

echo "[Conky Lịch Âm] Đã khởi động thành công ở chế độ ẩn!"
`;

export const AUTOSTART_DESKTOP_ENTRY = `[Desktop Entry]
Type=Application
Exec=/home/$USER/.config/conky/start_conky.sh
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name=Conky Lịch Âm Bát Tự
Comment=Tự động chạy Conky Lịch Âm Bát Tự khi đăng nhập vào Xubuntu
Icon=utilities-system-monitor
Categories=Utility;System;
`;

export const ONE_CLICK_INSTALL_SCRIPT = `#!/usr/bin/env bash
#========================================================================#
# SCRIPT CÀI ĐẶT TỰ ĐỘNG LỊCH ÂM - BÁT TỰ CONKY TRÊN XUBUNTU             #
# Thực hiện toàn bộ từ A-Z chỉ với 1 lệnh                                #
#========================================================================#

set -e

echo "========================================================"
echo "   CÀI ĐẶT LỊCH ÂM - BÁT TỰ TRÊN MÀN HÌNH XUBUNTU       "
echo "========================================================"

# 1. Cập nhật và cài đặt phần mềm hệ thống
echo "[1/6] Đang cài đặt gói hệ thống: conky-all, python3, pip, curl..."
sudo apt-get update -y
sudo apt-get install -y conky-all python3 python3-pip python3-venv curl fonts-dejavu-core

# 2. Tạo thư mục cấu hình
echo "[2/6] Tạo thư mục ~/.config/conky và ~/.config/autostart..."
mkdir -p ~/.config/conky
mkdir -p ~/.config/autostart
cd ~/.config/conky

# 3. Cài đặt thư viện Python (hỗ trợ cả Ubuntu 22.04 & 24.04)
echo "[3/6] Cài đặt thư viện Python: skyfield, pytz, requests..."
pip3 install skyfield pytz requests --break-system-packages 2>/dev/null || pip3 install skyfield pytz requests

# 4. Tải tệp thiên văn NASA JPL DE421 (khoảng 16MB)
echo "[4/6] Đang tải tệp vị trí hành tinh NASA JPL (de421.bsp)..."
if [ ! -f "de421.bsp" ]; then
    curl -o de421.bsp https://raw.githubusercontent.com/skyfielders/python-skyfield/master/ci/de421.bsp || \\
    wget -O de421.bsp https://naif.jpl.nasa.gov/pub/naif/generic_kernels/spk/planets/de421.bsp
fi

# 5. Cấp quyền thực thi cho script
echo "[5/6] Thiết lập quyền thực thi cho các tệp script..."
chmod +x ~/.config/conky/lunar_battu.py 2>/dev/null || true
chmod +x ~/.config/conky/start_conky.sh

# 6. Thiết lập tự động khởi động khi mở máy
echo "[6/6] Kích hoạt Autostart khi khởi động Xubuntu..."
cat << 'EOF' > ~/.config/autostart/lunar-conky.desktop
[Desktop Entry]
Type=Application
Exec=/bin/bash -c "sleep 10 && cd $HOME/.config/conky && conky -d -c $HOME/.config/conky/conky_lunar.conf"
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name=Conky Lịch Âm Bát Tự
Comment=Khởi động Conky Lịch Âm Bát Tự sau 10 giây khi mở máy
Icon=utilities-system-monitor
Categories=Utility;System;
EOF

echo "========================================================"
echo "   CÀI ĐẶT HOÀN TẤT! ĐANG KHỞI CHẠY THỬ NGHIỆM...        "
echo "========================================================"
~/.config/conky/start_conky.sh
`;
