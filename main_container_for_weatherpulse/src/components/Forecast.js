import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  formatTemperature, 
  formatDate, 
  formatTime, 
  getWeatherIconUrl,
  groupForecastByDay
} from '../utils/weatherUtils';

// PUBLIC_INTERFACE
const Forecast = () => {
  const { forecast } = useWeather();

  if (!forecast || !forecast.list) {
    return null;
  }

  const forecastByDay = groupForecastByDay(forecast.list);
  const days = Object.keys(forecastByDay);

  return (
    <div className="forecast-container">
      <h2 className="section-title">5-Day Forecast</h2>
      <div className="daily-forecast">
        {days.slice(0, 5).map(day => {
          const dayData = forecastByDay[day];
          const middayForecast = dayData[Math.floor(dayData.length / 2)];
          
          return (
            <div className="forecast-day-card" key={day}>
              <h3 className="forecast-day">{day}</h3>
              <img 
                src={getWeatherIconUrl(middayForecast.weather[0].icon)} 
                alt={middayForecast.weather[0].description} 
                className="forecast-icon" 
              />
              <div className="forecast-temps">
                <span className="forecast-high">
                  {formatTemperature(Math.max(...dayData.map(d => d.main.temp)))}
                </span>
                <span className="forecast-low">
                  {formatTemperature(Math.min(...dayData.map(d => d.main.temp)))}
                </span>
              </div>
              <p className="forecast-condition">{middayForecast.weather[0].main}</p>
            </div>
          );
        })}
      </div>
      
      <h2 className="section-title">Hourly Forecast</h2>
      <div className="hourly-forecast-scrollable">
        {forecast.list.slice(0, 8).map(item => (
          <div className="hourly-forecast-item" key={item.dt}>
            <p className="hourly-time">{formatTime(item.dt)}</p>
            <img 
              src={getWeatherIconUrl(item.weather[0].icon)} 
              alt={item.weather[0].description} 
              className="hourly-icon" 
            />
            <p className="hourly-temp">{formatTemperature(item.main.temp)}</p>
            <p className="hourly-condition">{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
