import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types/weather';

const API_KEY = 'demo_key'; // In production, use environment variable
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for demo purposes since we don't have a real API key
const mockWeatherData: WeatherData = {
  location: {
    name: 'São Paulo',
    country: 'BR',
    lat: -23.5505,
    lon: -46.6333,
  },
  current: {
    temperature: 24,
    feelsLike: 26,
    humidity: 68,
    pressure: 1013,
    windSpeed: 12,
    windDirection: 180,
    visibility: 10,
    uvIndex: 5,
    condition: 'Clear',
    description: 'Céu limpo',
    icon: 'sun',
    sunrise: Date.now() - 6 * 60 * 60 * 1000,
    sunset: Date.now() + 12 * 60 * 60 * 1000,
  },
  hourly: Array.from({ length: 24 }, (_, i) => ({
    time: Date.now() + i * 60 * 60 * 1000,
    temperature: 20 + Math.sin(i * Math.PI / 12) * 8 + Math.random() * 4,
    condition: i < 6 || i > 18 ? 'Clear' : 'Partly Cloudy',
    icon: i < 6 || i > 18 ? 'sun' : 'cloud',
  })),
  daily: Array.from({ length: 7 }, (_, i) => ({
    date: Date.now() + i * 24 * 60 * 60 * 1000,
    tempMax: 25 + Math.random() * 10,
    tempMin: 15 + Math.random() * 8,
    condition: ['Clear', 'Partly Cloudy', 'Cloudy', 'Rain'][Math.floor(Math.random() * 4)],
    description: ['Céu limpo', 'Parcialmente nublado', 'Nublado', 'Chuva'][Math.floor(Math.random() * 4)],
    icon: ['sun', 'cloud', 'cloud-rain', 'cloud-drizzle'][Math.floor(Math.random() * 4)],
    humidity: 50 + Math.random() * 30,
    windSpeed: 8 + Math.random() * 15,
    precipitation: Math.random() * 10,
  })),
};

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (city?: string, lat?: number, lon?: number) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, you would fetch from the API here
      // const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
      
      // For demo, we'll use mock data with city name update
      const data = {
        ...mockWeatherData,
        location: {
          ...mockWeatherData.location,
          name: city || mockWeatherData.location.name,
        },
      };
      
      setWeatherData(data);
    } catch (err) {
      setError('Erro ao buscar dados meteorológicos');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada pelo navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(undefined, latitude, longitude);
      },
      (error) => {
        setError('Erro ao obter localização');
        console.error('Geolocation error:', error);
      }
    );
  }, [fetchWeatherData]);

  useEffect(() => {
    fetchWeatherData('São Paulo');
  }, [fetchWeatherData]);

  return {
    weatherData,
    loading,
    error,
    fetchWeatherData,
    getCurrentLocation,
  };
};