import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { WeatherIcon } from './WeatherIcon';
import { WeatherData } from '../types/weather';

interface WeeklyForecastProps {
  data: WeatherData;
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data }) => {
  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white dark:text-white mb-6">
        Previsão dos Próximos 7 Dias
      </h3>
      <div className="space-y-4">
        {data.daily.map((day, index) => (
          <div
            key={day.date}
            className="flex items-center justify-between p-4 bg-white/5 dark:bg-black/10 rounded-xl hover:bg-white/10 dark:hover:bg-black/20 transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="group-hover:scale-110 transition-transform duration-300">
                <WeatherIcon condition={day.icon} className="w-8 h-8" />
              </div>
              <div>
                <p className="font-medium text-white dark:text-white">
                  {index === 0 ? 'Hoje' : format(new Date(day.date), 'EEEE', { locale: ptBR })}
                </p>
                <p className="text-sm text-white/60 dark:text-white/50 capitalize">
                  {day.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-sm text-white/60 dark:text-white/50">
                <div className="flex items-center gap-1">
                  <span>💧</span>
                  <span>{Math.round(day.precipitation)}mm</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>💨</span>
                  <span>{Math.round(day.windSpeed)}km/h</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 min-w-[80px] justify-end">
                <span className="text-lg font-semibold text-white dark:text-white">
                  {Math.round(day.tempMax)}°
                </span>
                <span className="text-white/60 dark:text-white/50">
                  {Math.round(day.tempMin)}°
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};