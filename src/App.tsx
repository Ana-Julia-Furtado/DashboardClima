import React from 'react';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { WeatherDetails } from './components/WeatherDetails';
import { HourlyChart } from './components/HourlyChart';
import { WeeklyForecast } from './components/WeeklyForecast';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const { weatherData, loading, error, fetchWeatherData, getCurrentLocation } = useWeather();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSearch = (city: string) => {
    fetchWeatherData(city);
  };

  const handleRetry = () => {
    if (weatherData) {
      fetchWeatherData(weatherData.location.name);
    } else {
      fetchWeatherData('São Paulo');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800' 
        : 'bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Dashboard do Clima
            </h1>
            <p className="text-white/70 text-sm md:text-base">
              Previsão meteorológica em tempo real
            </p>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </header>

        {/* Search Bar */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={getCurrentLocation}
            loading={loading}
          />
        </div>

        {/* Main Content */}
        <main className="space-y-8">
          {loading && <LoadingSpinner />}
          
          {error && !weatherData && (
            <ErrorMessage error={error} onRetry={handleRetry} />
          )}

          {weatherData && !loading && (
            <>
              {/* Current Weather */}
              <div className="animate-scale-in">
                <WeatherCard data={weatherData} />
              </div>

              {/* Weather Details Grid */}
              <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <WeatherDetails data={weatherData} />
              </div>

              {/* Charts and Forecast */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Hourly Chart */}
                <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                  <HourlyChart data={weatherData} />
                </div>

                {/* Weekly Forecast */}
                <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                  <WeeklyForecast data={weatherData} />
                </div>
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-white/40 text-sm">
            Dados meteorológicos atualizados em tempo real
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App;