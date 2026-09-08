# 🌙 Lịch Âm - Bát Tự Trên Xubuntu (Conky Widget & Documentation)

> **Cổng thông tin, tài liệu hướng dẫn và bộ mã nguồn tích hợp Conky hiển thị Lịch Âm, Tứ Trụ Bát Tự, 24 Tiết Khí thiên văn NASA JPL DE421, Thời Tiết & Giám Sát Phần Cứng trên Xubuntu (XFCE Desktop).**

---

## 📖 Giới Thiệu Về Trang Web

Trang web **Lịch Âm - Bát Tự Trên Xubuntu /xubuntu-bat-tu-calendar.vercel.app** được xây dựng nhằm cung cấp giải pháp toàn diện cho người dùng Linux tại Việt Nam (đặc biệt là cộng đồng sử dụng Xubuntu và các bản phân phối chạy môi trường XFCE) muốn hiển thị thông tin văn hóa truyền thống kết hợp dữ liệu thiên văn học chính xác và giám sát hệ thống ngay trên màn hình Desktop.

Trang web đóng vai trò như một **trung tâm tài liệu tương tác (Interactive Documentation & Simulator)**, hỗ trợ người dùng xem trước giao diện, tùy biến thông số theo khu vực địa lý, sao chép mã nguồn và thực hiện cài đặt tự động chỉ với một vài thao tác đơn giản.

---

## ✨ Các Tính Năng Nổi Bật Của Trang Web

### 1. 🖥️ Trình Mô Phỏng Màn Hình Desktop Tương Tác (Interactive Simulator)
- **Xem trước thời gian thực**: Mô phỏng màn hình Xubuntu với thanh tác vụ Panel XFCE và khung thông tin Conky Lịch Âm.
- **Đa dạng phong cách thẩm mỹ (Themes)**:
  - **Cyberpunk Cyan**: Gam màu công nghệ hiện đại, nổi bật và sắc sảo.
  - **Hoàng Cung Kim Sắc**: Phong cách cổ điển sang trọng với sắc vàng hoàng gia.
  - **Ngọc Lục Bảo**: Dịu mắt, tự nhiên và tươi mát.
  - **Đêm Tối Tối Giản**: Tinh tế, tiết kiệm năng lượng, hòa nhập liền mạch vào hình nền.
- **Tùy biến vị trí linh hoạt**: Đổi vị trí widget giữa Góc trên-phải, Góc trên-trái, Góc dưới-phải và Góc dưới-trái.
- **Bộ điều khiển trực quan**: Thay đổi ngày mô phỏng, chọn múi giờ hiển thị và xuất file nén `.tar.gz` chứa toàn bộ cấu hình đã tùy biến.

### 2. 📋 Hướng Dẫn Cài Đặt Chi Tiết 9 Bước
- Lộ trình rõ ràng từng bước từ chuẩn bị gói hệ thống, cấu hình môi trường Python, tải tệp thiên văn đến kích hoạt tự động.
- **Xử lý triệt để cơ chế PEP 668** trên Ubuntu 24.04 LTS và 22.04 LTS với cờ `--break-system-packages`.
- **Cơ chế khởi động an toàn**: Hướng dẫn thiết lập kịch bản `start_conky.sh` với thời gian chờ 10 giây (`sleep 10`) để đợi XFCE Window Manager và Compositor nạp xong, chống hiện tượng đè cửa sổ.

### 3. 📦 Kho Mã Nguồn Đầy Đủ & Minh Bạch (Code Repository)
Trang web cung cấp toàn văn mã nguồn của 5 thành phần cốt lõi kèm tính năng sao chép và tải về:
- **`lunar_solar.py`**: Mã nguồn Python tính toán Lịch Âm, Tứ Trụ Bát Tự (Can Chi Năm/Tháng/Ngày/Giờ), 24 Tiết Khí dựa trên thư viện Skyfield & mô hình NASA JPL DE421, cùng tích hợp thời tiết Open-Meteo.
- **`conky_lunar.conf`**: Cấu hình Conky định dạng Lua hiện đại, tối ưu độ trong suốt và phân lớp hiển thị trên XFCE.
- **`start_conky.sh`**: Kịch bản Bash trì hoãn khởi động và chuyển đúng thư mục làm việc.
- **`lunar_conky.desktop`**: Tệp cấu hình Autostart tiêu chuẩn XDG.
- **`install_all.sh`**: Kịch bản cài đặt tự động 100% — chỉ cần chạy 1 lệnh terminal là hoàn thành.

### 4. 🛠️ Bộ Tạo Cấu Hình Tự Động Theo Tỉnh/Thành (Config Generator)
- Tích hợp sẵn tọa độ của các thành phố lớn: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng, Huế, Cần Thơ, Hải Phòng.
- Cho phép nhập tọa độ Kinh độ / Vĩ độ bất kỳ.
- Tự động tạo lệnh bash tùy biến sẵn vị trí hiển thị, tọa độ thời tiết và thời gian chờ khởi động.

### 5. 🎨 Hướng Dẫn Tối Ưu Hóa XFCE & Sửa Lỗi Thường Gặp (Troubleshooting)
- Hướng dẫn cấu hình **XFCE Compositor** (`xfwm4-tweaks-settings`) chống hiện tượng giật bóng đổ và nháy màn hình.
- Khắc phục triệt để lỗi Conky biến mất khi click chuột vào desktop XFCE (`own_window_type = 'desktop'`).
- Xử lý lỗi thiếu file dữ liệu thiên văn `de421.bsp` hoặc thiếu module Python.

---

## 🏗️ Cấu Trúc Mã Nguồn Trang Web

Dự án được xây dựng bằng **React**, **TypeScript** và **Tailwind CSS**:

```text
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Thanh điều hướng trên cùng & nút Cài Đặt Nhanh
│   │   ├── Hero.tsx                  # Khối giới thiệu tổng quan với badge công nghệ
│   │   ├── InteractiveSimulator.tsx  # Bộ mô phỏng màn hình Xubuntu trực quan
│   │   ├── StepByStepGuide.tsx       # Hướng dẫn 9 bước triển khai chi tiết
│   │   ├── CodeRepository.tsx        # Trình duyệt & tải mã nguồn các file cấu hình
│   │   ├── VisualOptimizationGuide.tsx # Hướng dẫn chỉnh XFCE Compositor
│   │   ├── ConfigGenerator.tsx       # Bộ tạo cấu hình & lệnh tùy biến
│   │   ├── Troubleshooting.tsx       # Hỏi đáp & khắc phục sự cố thường gặp
│   │   ├── QuickInstallModal.tsx     # Cửa sổ popup hướng dẫn lệnh nhanh
│   │   └── Footer.tsx                # Chân trang & thông tin bản quyền
│   ├── data/
│   │   └── sourceCode.ts             # Dữ liệu mã nguồn Python, Lua Conky & Bash
│   ├── types.ts                      # Khai báo kiểu TypeScript
│   ├── App.tsx                       # Thành phần ứng dụng chính
│   ├── main.tsx                      # Điểm vào ứng dụng React
│   └── index.css                     # Cấu hình Tailwind CSS & tùy biến giao diện
├── index.html                        # Entry point HTML với SEO & Web Fonts
├── metadata.json                     # Thông tin định danh ứng dụng
├── package.json                      # Quản lý thư viện & lệnh thực thi
└── vite.config.ts                    # Cấu hình Vite bundler
```

---

## 🚀 Hướng Dẫn Chạy Trang Web Ở Môi Trường Local

### Yêu Cầu
- **Node.js**: Phiên bản 18.0 trở lên
- **npm** hoặc **yarn** / **pnpm** / **bun**

### Các Bước Thực Hiện

1. **Cài đặt thư viện phụ thuộc**:
   ```bash
   npm install
   ```

2. **Chạy máy chủ phát triển (Development Server)**:
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ khả dụng tại địa chỉ `http://localhost:3000`.

3. **Kiểm tra cú pháp & Type check**:
   ```bash
   npm run lint
   ```

4. **Đóng gói dự án (Production Build)**:
   ```bash
   npm run build
   ```
   Thư mục sản phẩm sau khi đóng gói sẽ nằm ở `dist/`.

---

## 📄 Giấy Phép & Bản Quyền

Dự án được phát hành dưới hình thức **Mã Nguồn Mở (Open Source)** phục vụ cộng đồng người dùng Linux Việt Nam. Mọi đóng góp, chỉnh sửa và tối ưu hóa đều được hoan nghênh!
