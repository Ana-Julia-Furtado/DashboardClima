import React from 'react';
import { WeatherIcon } from './WeatherIcon';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { location, current } = data;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              {location.name}
            </h1>
            <p className="text-white/70 text-sm">
              {location.country}
            </p>
          </div>
          <WeatherIcon condition={current.icon} className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-light text-white">
              {Math.round(current.temperature)}
            </span>
            <span className="text-2xl text-white/70">°C</span>
          </div>
          
          <p className="text-white/80 text-lg capitalize">
            {current.description}
          </p>
          
          <p className="text-white/60 text-sm">
            Sensação térmica: {Math.round(current.feelsLike)}°C
          </p>
        </div>
      </div>
    </div>
  );
};