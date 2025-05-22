import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { 
  formatTemperature, 
  formatDate, 
  formatTime, 
  getWeatherIconUrl 
} from '../utils/weatherUtils';

// PUBLIC_INTERFACE
const CurrentWeather = () => {
  const { currentWeather, units } = useWeather();

  if (!currentWeather) {
    return null;
  }

  const {
    name,
    main: { temp, feels_like, humidity },
    weather,
    sys: { country, sunrise, sunset },
    wind
  } = currentWeather;

  const weatherCondition = weather[0].main;
  const weatherDescription = weather[0].description;
  const weatherIcon = weather[0].icon;

  return (
    <div className="current-weather-card">
      <div className="current-weather-header">
        <div className="location-info">
          <h2>
            <FaMapMarkerAlt /> {name}, {country}
          </h2>
          <p className="date-info">{formatDate(Date.now() / 1000, true)}</p>
        </div>
        <div className="temp-toggle">
          <button 
            className={`unit-toggle ${units === 'metric' ? 'active' : ''}`}
            onClick={() => toggleUnits()}
          >
            °C
          </button>
          <span className="unit-divider">|</span>
          <button 
            className={`unit-toggle ${units === 'imperial' ? 'active' : ''}`}
            onClick={() => toggleUnits()}
          >
            °F
          </button>
        </div>
      </div>

      <div className="current-weather-body">
        <div className="current-temp-container">
          <img 
            src={getWeatherIconUrl(weatherIcon)} 
            alt={weatherDescription} 
            className="weather-icon" 
          />
          <div className="temperature-display">
            <h1 className="current-temp">{formatTemperature(temp, false)}</h1>
            <p className="weather-condition">{weatherCondition}</p>
            <p className="weather-description">{weatherDescription}</p>
          </div>
        </div>

        <div className="weather-details-grid">
          <div className="weather-detail-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{formatTemperature(feels_like)}</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{Math.round(wind.speed * 3.6)} km/h</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Sunrise</span>
            <span className="detail-value">{formatTime(sunrise)}</span>
          </div>
          <div className="weather-detail-item">
            <span className="detail-label">Sunset</span>
            <span className="detail-value">{formatTime(sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
