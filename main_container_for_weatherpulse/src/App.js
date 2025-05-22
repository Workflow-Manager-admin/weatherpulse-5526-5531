import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import { useWeather } from './context/WeatherContext';
import { FaCloudSun } from 'react-icons/fa';

import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import LoadingSpinner from './components/LoadingSpinner';

import './App.css';

// Main App wrapper that provides the WeatherContext
function App() {
  return (
    <WeatherProvider>
      <WeatherPulseContainer />
    </WeatherProvider>
  );
}

// Main container component for WeatherPulse
const WeatherPulseContainer = () => {
  const { currentWeather, loading, error } = useWeather();
  
  // Determine if it's day or night based on current time
  const now = new Date();
  const hours = now.getHours();
  const isDay = hours >= 6 && hours < 18;

  // Determine weather condition for styling
  const weatherCondition = currentWeather?.weather?.[0]?.main || 'Clear';
  
  return (
    <div className="app" data-weather-condition={weatherCondition} data-time={isDay ? 'day' : 'night'}>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="logo">
              <FaCloudSun className="logo-icon" /> WeatherPulse
            </div>
            <SearchBar />
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button className="btn">Try Again</button>
            </div>
          ) : (
            <>
              <CurrentWeather />
              <Forecast />
              <WeatherDetails />
            </>
          )}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} WeatherPulse. Weather data provided by OpenWeather API.
          </p>
          <p className="disclaimer">
            For demonstration purposes only. Design by KAVIA.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
