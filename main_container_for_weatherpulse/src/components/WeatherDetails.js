import React from 'react';
import { useWeather } from '../context/WeatherContext';

// PUBLIC_INTERFACE
const WeatherDetails = () => {
  const { currentWeather } = useWeather();

  if (!currentWeather) {
    return null;
  }

  const { main, wind, visibility } = currentWeather;
  
  // Convert visibility from meters to kilometers
  const visibilityKm = visibility / 1000;

  return (
    <div className="weather-details-container">
      <h2 className="section-title">Weather Details</h2>
      <div className="weather-details-grid details-extended">
        <div className="weather-detail-item">
          <span className="detail-label">Humidity</span>
          <div className="detail-value-container">
            <span className="detail-value">{main.humidity}%</span>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${main.humidity}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="weather-detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
        
        <div className="weather-detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{Math.round(wind.speed * 3.6)} km/h</span>
        </div>
        
        <div className="weather-detail-item">
          <span className="detail-label">Wind Direction</span>
          <span className="detail-value">{wind.deg}°</span>
        </div>
        
        <div className="weather-detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{visibilityKm.toFixed(1)} km</span>
        </div>
        
        <div className="weather-detail-item">
          <span className="detail-label">UV Index</span>
          <span className="detail-value">-</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
