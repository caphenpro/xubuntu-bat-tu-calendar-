export interface CityLocation {
  name: string;
  lat: number;
  lng: number;
}

export interface ConkyTheme {
  id: string;
  name: string;
  description: string;
  colorTitle: string;
  colorDate: string;
  colorWeather: string;
  colorSun: string;
  colorBatTu: string;
  colorAmLich: string;
  colorTietKhi: string;
  colorHardware: string;
  previewClass: string;
}

export interface GeneratorConfig {
  cityName: string;
  latitude: number;
  longitude: number;
  startupDelay: number;
  position: 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left';
  fontSize: number;
  fontFamily: string;
  themeId: string;
  username: string;
  updateInterval: number;
  useVenv: boolean;
}
