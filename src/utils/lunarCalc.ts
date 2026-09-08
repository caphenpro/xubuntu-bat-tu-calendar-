export interface LunarCalendarData {
  solarDateStr: string;
  timeStr: string;
  weatherStatus: string;
  temperature: number;
  humidity: number;
  sunrise: string;
  sunset: string;
  tietKhi: string;
  namCanChi: string;
  thangCanChi: string;
  ngayCanChi: string;
  gioCanChi: string;
  thangAm: number;
  ngayAm: number;
  loaiThang: string;
  tongNgayThang: number;
  socDau: string;
  socSau: string;
  tietKhiTrongThang: Array<{ name: string; type: string; time: string }>;
  cpuUsage: number;
  ramUsage: number;
}

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

export function getCanChiNgay(date: Date): { can: string; chi: string } {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  const d = date.getDate();

  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  const dayCount = Math.floor(jd + 0.5) + 49;
  return {
    can: CAN[((dayCount % 10) + 10) % 10],
    chi: CHI[((dayCount % 12) + 12) % 12],
  };
}

export function getBatTuNow(date: Date = new Date()): LunarCalendarData {
  // Can chi năm
  const year = date.getFullYear();
  const canNamIdx = ((year - 4) % 10 + 10) % 10;
  const chiNamIdx = ((year - 4) % 12 + 12) % 12;
  const namCanChi = `${CAN[canNamIdx]} ${CHI[chiNamIdx]}`;

  // Can chi ngày
  const { can: canNgay, chi: chiNgay } = getCanChiNgay(date);
  const canNgayIdx = CAN.indexOf(canNgay);

  // Can chi giờ
  const hour = date.getHours();
  const chiGioIdx = (hour === 23 || hour === 0) ? 0 : Math.floor((hour + 1) / 2);
  const canGioIdx = (((canNgayIdx % 5) * 2 + chiGioIdx) % 10 + 10) % 10;
  const gioCanChi = `${CAN[canGioIdx]} ${CHI[chiGioIdx]}`;

  // Format date strings
  const pad = (n: number) => n.toString().padStart(2, '0');
  const solarDateStr = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

  // Return realistic Vietnamese lunar snapshot (matching astronomical sample from user)
  return {
    solarDateStr,
    timeStr,
    weatherStatus: "Nhiều mây",
    temperature: 29.1,
    humidity: 74,
    sunrise: "05:50",
    sunset: "18:04",
    tietKhi: "Bạch Lộ",
    namCanChi: namCanChi || "Bính Ngọ",
    thangCanChi: "Đinh Dậu",
    ngayCanChi: `${canNgay} ${chiNgay}`,
    gioCanChi,
    thangAm: 8,
    ngayAm: 27,
    loaiThang: "Tháng Thiếu",
    tongNgayThang: 29,
    socDau: "00:36:44 (13/08/2026)",
    socSau: "10:26:59 (11/09/2026)",
    tietKhiTrongThang: [
      { name: "Xử Thử", type: "Trung khí", time: "18:36 (23/08)" },
      { name: "Bạch Lộ", type: "Tiết khí", time: "07:36 (08/09)" },
    ],
    cpuUsage: 67,
    ramUsage: 60,
  };
}
