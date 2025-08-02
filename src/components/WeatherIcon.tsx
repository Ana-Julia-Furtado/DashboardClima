import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudDrizzle, 
  CloudSnow, 
  Zap,
  Cloudy,
  CloudLightning
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = '' }) => {
  const getIcon = () => {
    const iconClass = `${className} drop-shadow-lg filter`;
    
    switch (condition.toLowerCase()) {
      case 'sun':
      case 'clear':
      case 'sunny':
        return <Sun className={`${iconClass} text-amber-300`} />;
      case 'cloud':
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className={`${iconClass} text-gray-300`} />;
      case 'cloud-rain':
      case 'rain':
      case 'rainy':
        return <CloudRain className={`${iconClass} text-blue-300`} />;
      case 'cloud-drizzle':
      case 'drizzle':
        return <CloudDrizzle className={`${iconClass} text-blue-200`} />;
      case 'cloud-snow':
      case 'snow':
      case 'snowy':
        return <CloudSnow className={`${iconClass} text-blue-100`} />;
      case 'cloud-lightning':
      case 'thunderstorm':
        return <CloudLightning className={`${iconClass} text-purple-300`} />;
      case 'zap':
      case 'storm':
        return <Zap className={`${iconClass} text-yellow-300`} />;
      default:
        return <Cloudy className={`${iconClass} text-gray-300`} />;
    }
  };

  return (
    <div className="relative">
      {getIcon()}
    </div>
  );
};