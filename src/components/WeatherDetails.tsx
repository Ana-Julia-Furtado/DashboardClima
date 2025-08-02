import React from 'react';
import { 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Sunset,
  Thermometer,
  Zap
} from 'lucide-react';
import { WeatherData } from '../types/weather';
import { format } from 'date-fns';

interface WeatherDetailsProps {
  data: WeatherData;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  const { current } = data;

  const details = [
    {
      icon: Thermometer,
      label: 'Sensação Térmica',
      value: `${Math.round(current.feelsLike)}°C`,
      color: 'text-orange-400',
    },
    {
      icon: Droplets,
      label: 'Umidade',
      value: `${current.humidity}%`,
      color: 'text-blue-400',
    },
    {
      icon: Wind,
      label: 'Vento',
      value: `${current.windSpeed} km/h`,
      subtitle: `${current.windDirection}°`,
      color: 'text-gray-400',
    },
    {
      icon: Gauge,
      label: 'Pressão',
      value: `${current.pressure} hPa`,
      color: 'text-purple-400',
    },
    {
      icon: Eye,
      label: 'Visibilidade',
      value: `${current.visibility} km`,
      color: 'text-cyan-400',
    },
    {
      icon: Zap,
      label: 'Índice UV',
      value: current.uvIndex.toString(),
      color: 'text-yellow-400',
    },
    {
      icon: Sun,
      label: 'Nascer do Sol',
      value: format(new Date(current.sunrise), 'HH:mm'),
      color: 'text-amber-400',
    },
    {
      icon: Sunset,
      label: 'Pôr do Sol',
      value: format(new Date(current.sunset), 'HH:mm'),
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {details.map((detail, index) => {
        const IconComponent = detail.icon;
        return (
          <div
            key={detail.label}
            className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl p-4 hover:bg-white/15 dark:hover:bg-black/30 transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <IconComponent className={`w-5 h-5 ${detail.color} group-hover:scale-110 transition-transform duration-300`} />
              <span className="text-xs text-white/60 dark:text-white/50 font-medium uppercase tracking-wide">
                {detail.label}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-white dark:text-white">
                {detail.value}
              </p>
              {detail.subtitle && (
                <p className="text-xs text-white/60 dark:text-white/50">
                  {detail.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};