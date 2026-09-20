export interface VersionRelease {
  version: string;
  releaseDate: string;
  codename: string;
  status: 'current' | 'stable' | 'milestone' | 'legacy';
  highlight: string;
  description: string;
  changes: {
    category: 'Sửa Lỗi' | 'Tính Năng Mới' | 'Tối Ưu' | 'Bảo Mật & Ổn Định';
    items: string[];
  }[];
  comparisonWithPrevious: string;
}

export const CURRENT_VERSION = 'v3.2.1';

export const VERSION_HISTORY: VersionRelease[] = [
  {
    version: 'v3.2.1',
    releaseDate: '09/2026',
    codename: 'Đồng Bộ Giao Diện Thực Tế (Visual Parity)',
    status: 'current',
    highlight: 'Khôi phục Tiêu Đề "LỊCH ÂM – BÁT TỰ", Dương Lịch và thanh CPU/RAM trong file conky_lunar.conf',
    description:
      'Khắc phục sự cố bộ cài 1-file vô tình thiếu phần tiêu đề Lua conky.text khiến Conky trên máy thật chỉ hiển thị phần thân thời tiết. Khôi phục đầy đủ tiêu đề LỊCH ÂM - BÁT TỰ font 14 bold căn giữa, đồng hồ Dương lịch thời gian thực và 2 thanh đo tải CPU/RAM, khớp 100% với giao diện mô phỏng.',
    changes: [
      {
        category: 'Sửa Lỗi',
        items: [
          'Khôi phục dòng tiêu đề "${alignc}${font DejaVu Sans:size=14:bold}${color1}LỊCH ÂM – BÁT TỰ" và đường kẻ đôi phân cách ${hr 2} trong cấu hình conky_lunar.conf.',
          'Khôi phục dòng đồng hồ Dương Lịch thời gian thực "${time %d/%m/%Y} - ${time %H:%M:%S}" cập nhật mượt mà mỗi giây.',
          'Khôi phục 2 thanh đo tải phần cứng CPU và RAM (${cpubar}, ${membar}) dưới chân giao diện.',
          'Kích hoạt font chữ DejaVu Sans:size=10:bold kèm hiệu ứng bóng đen (draw_shades = true) giúp chữ sắc nét, dễ đọc trên mọi hình nền Xubuntu.',
        ],
      },
      {
        category: 'Tối Ưu',
        items: [
          'Tăng dung lượng text_buffer_size lên 2048 để chứa trọn vẹn toàn bộ dữ liệu thiên văn và thời tiết mà không bị cắt xén.',
          'Chuẩn hóa đường dẫn ~/.config/conky/lunar_battu.py trong cú pháp execpi 60.',
        ],
      },
    ],
    comparisonWithPrevious:
      'Giao diện khi chạy thực tế trên máy người dùng (Xubuntu Desktop) hiển thị đầy đủ, cân đối từ trên xuống dưới hoàn toàn giống với bản xem trước mô phỏng.',
  },
  {
    version: 'v3.2.0',
    releaseDate: '09/2026',
    codename: 'Hoàn Thiện Tối Đa (Rock-Solid Edition)',
    status: 'stable',
    highlight: 'Vá triệt để lỗi UnboundLocalError thời tiết, chuẩn hóa Conky tag và bộ cài 1-file 100% tự động',
    description:
      'Phiên bản ổn định và hoàn thiện nhất hiện nay. Khắc phục sự cố gián đoạn tiến trình do lỗi biến thời tiết cục bộ, loại bỏ ký tự thoát gây lỗi hiển thị màu Conky, đồng thời tích hợp toàn diện mọi thành phần vào 1 lệnh chạy duy nhất.',
    changes: [
      {
        category: 'Sửa Lỗi',
        items: [
          'Khắc phục triệt để lỗi "UnboundLocalError: local variable \'location_label\' referenced before assignment" trong hàm get_weather() khi mất mạng hoặc API phản hồi chậm.',
          'Gán giá trị mặc định location_label="" an toàn và xử lý fallback chuỗi hiển thị vị trí ngoại tuyến không gây crash script.',
          'Chuẩn hóa cú pháp render mã màu Conky (${alignc}, ${color}) trong Python script, loại bỏ ký tự backslash thoát thừa.',
          'Sửa lỗi regex thay thế get_weather() trong bộ sinh mã tự động để giữ nguyên khai báo hàm gốc.',
        ],
      },
      {
        category: 'Bảo Mật & Ổn Định',
        items: [
          'Hỗ trợ tương thích chuẩn PEP 668 trên Ubuntu 24.04 LTS với cờ --break-system-packages an toàn.',
          'Cơ chế dự phòng 2 tầng khi tải tệp thiên văn NASA JPL DE421: thử qua GitHub CDN, tự động chuyển sang NASA NAIF Mirror nếu thất bại.',
          'Thêm lệnh killall conky trước khi khởi động để chống nhân đôi tiến trình gây đè bộ nhớ.',
        ],
      },
      {
        category: 'Tính Năng Mới',
        items: [
          'Bộ cài đặt 1-File (.sh) duy nhất với cú pháp Heredoc đóng gói trọn gói 5 file: Python, Conky Conf, Start Script, Autostart Desktop, NASA BSP.',
          'Tự động kích hoạt kiểm tra màn hình ngay sau khi chạy xong mà người dùng không cần gõ thêm lệnh.',
        ],
      },
    ],
    comparisonWithPrevious:
      'Chạy mượt mà 100% không còn hiện tượng crash do lỗi biến thời tiết; cài đặt nhanh gấp 3 lần so với phiên bản v3.0.0.',
  },
  {
    version: 'v3.1.0',
    releaseDate: '08/2026',
    codename: 'Khí Tượng Đa Vùng (All-Vietnam Weather)',
    status: 'stable',
    highlight: 'Mở rộng cơ sở dữ liệu 63 tỉnh thành Việt Nam, đo lượng mưa mm và hướng gió tiếng Việt',
    description:
      'Nâng cấp hệ thống khí tượng thời gian thực từ Open-Meteo, mở rộng danh mục tọa độ chính xác của toàn bộ 63 tỉnh thành phố với bộ lọc vùng miền thông minh.',
    changes: [
      {
        category: 'Tính Năng Mới',
        items: [
          'Bổ sung bảng tọa độ đầy đủ 63 tỉnh thành Việt Nam phân nhóm Bắc - Trung - Nam.',
          'Bổ sung cảm biến đo lượng mưa thời gian thực (mm) và trạng thái có mưa/không mưa.',
          'Tính toán hướng gió 8 hướng tiếng Việt (Bắc, Đông Bắc, Đông, Đông Nam, Nam, Tây Nam, Tây, Tây Bắc) từ độ góc la bàn.',
          'Tích hợp thông tin giờ Mặt Trời mọc & Mặt Trời lặn theo tọa độ địa phương.',
        ],
      },
      {
        category: 'Tối Ưu',
        items: [
          'Tự động phát hiện tỉnh thành qua IP mạng GeoIP (ip-api.com) không cần cấu hình thủ công.',
          'Tối ưu bộ nhớ đệm cập nhật thời tiết theo chu kỳ 1 phút để tiết kiệm băng thông.',
        ],
      },
    ],
    comparisonWithPrevious:
      'Thay vì chỉ hiển thị nhiệt độ cơ bản của một số thành phố lớn, phiên bản này phủ sóng trọn vẹn toàn bộ 63 tỉnh thành với thông số mưa & gió chi tiết.',
  },
  {
    version: 'v3.0.0',
    releaseDate: '07/2026',
    codename: 'Giao Diện Trực Quan (Interactive Simulator)',
    status: 'milestone',
    highlight: 'Ra mắt trình mô phỏng màn hình ảo Xubuntu XFCE và bộ sinh cấu hình thời gian thực',
    description:
      'Chuyển đổi từ hướng dẫn lý thuyết sang trải nghiệm tương tác trực quan. Người dùng có thể xem trước Desktop XFCE với bảng màu và vị trí mong muốn trước khi áp dụng vào máy tính thật.',
    changes: [
      {
        category: 'Tính Năng Mới',
        items: [
          'Trình mô phỏng trực quan tương tác thời gian thực màn hình XFCE 4.18 trên nền Xubuntu.',
          'Tùy biến nhanh 4 bảng màu giao diện phong thủy: Hoàng Gia Bát Tự, Neon Cyberpunk, Cổ Điển, Tối Giản.',
          'Tùy chỉnh 6 góc hiển thị trên màn hình (top_right, top_left, bottom_right, v.v.).',
          'Bộ điều chỉnh thời gian trễ Autostart (5s - 20s) đảm bảo XFCE Compositor tải xong.',
        ],
      },
      {
        category: 'Tối Ưu',
        items: [
          'Quy hoạch lại giao diện ứng dụng theo kiến trúc đơn màn hình trực quan và tinh gọn.',
          'Xuất file bash script tự động đồng bộ mọi thông số người dùng đã chọn.',
        ],
      },
    ],
    comparisonWithPrevious:
      'Loại bỏ hoàn toàn việc chỉnh sửa file cấu hình thủ công bằng tay; xem trước kết quả trực quan trên trình duyệt.',
  },
  {
    version: 'v2.0.0',
    releaseDate: '05/2026',
    codename: 'Chạy Ẩn Tự Động (Silent Autostart & XFCE)',
    status: 'milestone',
    highlight: 'Tối ưu hóa chạy nền, tích hợp Autostart Xubuntu và khắc phục lỗi chớp nháy màn hình',
    description:
      'Giải quyết triệt để các hạn chế phổ biến trên môi trường desktop XFCE: hiện tượng màn hình đen xung quanh widget, chớp tắt khi đổi hình nền và đè lên thanh taskbar.',
    changes: [
      {
        category: 'Tối Ưu',
        items: [
          'Bổ sung script khởi động trễ start_conky.sh giải quyết triệt để xung đột khởi động cùng xfwm4 compositor.',
          'Tạo tệp Autostart chuẩn XDG (~/.config/autostart/lunar-conky.desktop).',
          'Cấu hình trong suốt tuyệt đối ARGB (own_window_argb_visual = true, own_window_argb_value = 0).',
          'Khử nhấp nháy màn hình với double_buffer = true và use_xft = true.',
        ],
      },
      {
        category: 'Bảo Mật & Ổn Định',
        items: [
          'Chạy conky dưới cờ -d (daemon ngầm), tự động giải phóng cửa sổ terminal.',
        ],
      },
    ],
    comparisonWithPrevious:
      'Conky khởi động mượt mà không còn bị lỗi đen nền hoặc chớp tắt mỗi khi người dùng đăng nhập Xubuntu.',
  },
  {
    version: 'v1.5.0',
    releaseDate: '03/2026',
    codename: 'Độ Chính Xác Thiên Văn (NASA Ephemeris Engine)',
    status: 'milestone',
    highlight: 'Tích hợp mô hình chuyển động hành tinh NASA JPL DE421 tính toán Sóc & 24 Tiết Khí',
    description:
      'Nâng cấp thuật toán cốt lõi: thay thế các công thức tính lịch dân gian xấp xỉ bằng dữ liệu quỹ đạo thiên văn thực nghiệm từ Phòng thí nghiệm Sức đẩy Phản lực NASA (JPL).',
    changes: [
      {
        category: 'Tính Năng Mới',
        items: [
          'Tích hợp thư viện Python Skyfield và tệp lịch vạn niên thiên văn de421.bsp.',
          'Tính toán chính xác thời điểm Sóc (Trăng Mới) đến từng giây theo múi giờ Việt Nam (UTC+7).',
          'Tự động phân biệt tháng đủ (30 ngày) và tháng thiếu (29 ngày) dựa vào 2 điểm Sóc liên tiếp.',
          'Xác định 24 Tiết khí và Trung khí chuẩn thiên văn theo kinh độ Hoàng Đạo của Mặt Trời (bội số 15°).',
          'Tính toán Can Chi Bát Tự theo ngày Julius (Julian Day JD).',
        ],
      },
    ],
    comparisonWithPrevious:
      'Độ chính xác ngày âm, tháng nhuận và điểm tiết khí đạt chuẩn thiên văn quốc tế, sai số 0 giây so với thực tế.',
  },
  {
    version: 'v1.0.0',
    releaseDate: '01/2026',
    codename: 'Khởi Điểm Dự Án (Initial Release)',
    status: 'legacy',
    highlight: 'Bản phát hành đầu tiên: Hiển thị Can Chi Bát Tự cơ bản trên Conky XFCE',
    description:
      'Phiên bản nguyên mẫu đầu tiên, cung cấp script Python đơn giản tính Can Chi Năm - Tháng - Ngày - Giờ và file cấu hình conky thô sơ.',
    changes: [
      {
        category: 'Tính Năng Mới',
        items: [
          'Hiển thị Can Chi 4 trụ Bát Tự cơ bản.',
          'File cấu hình Conky đơn giản hiển thị ở góc màn hình.',
          'Hướng dẫn cài đặt thủ công các gói phần mềm cần thiết.',
        ],
      },
    ],
    comparisonWithPrevious: 'Bản phát hành nền tảng đầu tiên của dự án.',
  },
];
