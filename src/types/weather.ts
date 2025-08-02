export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    visibility: number;
    uvIndex: number;
    condition: string;
    description: string;
    icon: string;
    sunrise: number;
    sunset: number;
  };
  hourly: Array<{
    time: number;
    temperature: number;
    condition: string;
    icon: string;
  }>;
  daily: Array<{
    date: number;
    tempMax: number;
    tempMin: number;
    condition: string;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
  }>;
}