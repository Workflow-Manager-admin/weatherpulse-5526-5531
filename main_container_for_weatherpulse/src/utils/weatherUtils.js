/**
 * Format temperature to show degree symbol and unit
 * @param {number} temp - Temperature value
 * @param {boolean} showUnit - Whether to show unit (C/F)
 * @returns {string} - Formatted temperature
 */
// PUBLIC_INTERFACE
export const formatTemperature = (temp, showUnit = true) => {
  const roundedTemp = Math.round(temp);
  return showUnit ? `${roundedTemp}°C` : `${roundedTemp}°`;
};

/**
 * Format date from timestamp
 * @param {number} timestamp - Unix timestamp
 * @param {boolean} showTime - Whether to show time
 * @returns {string} - Formatted date string
 */
// PUBLIC_INTERFACE
export const formatDate = (timestamp, showTime = false) => {
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  
  if (showTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Format time from timestamp
 * @param {number} timestamp - Unix timestamp
 * @returns {string} - Formatted time string
 */
// PUBLIC_INTERFACE
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get weather icon URL from icon code
 * @param {string} iconCode - Weather icon code
 * @returns {string} - URL for the weather icon
 */
// PUBLIC_INTERFACE
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Get background gradient based on weather condition and time
 * @param {string} weatherCondition - Weather condition (Clear, Clouds, Rain, etc.)
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} - CSS gradient
 */
// PUBLIC_INTERFACE
export const getWeatherBackground = (weatherCondition, isDay) => {
  if (isDay) {
    switch (weatherCondition) {
      case 'Clear':
        return 'linear-gradient(to bottom, #4a90e2, #87ceeb)';
      case 'Clouds':
        return 'linear-gradient(to bottom, #636e72, #b2bec3)';
      case 'Rain':
      case 'Drizzle':
        return 'linear-gradient(to bottom, #2c3e50, #3498db)';
      case 'Thunderstorm':
        return 'linear-gradient(to bottom, #2c3e50, #4a4a4a)';
      case 'Snow':
        return 'linear-gradient(to bottom, #e5e5e5, #a9a9a9)';
      case 'Mist':
      case 'Fog':
        return 'linear-gradient(to bottom, #b8b894, #d3d3c6)';
      default:
        return 'linear-gradient(to bottom, #4a90e2, #87ceeb)';
    }
  } else {
    switch (weatherCondition) {
      case 'Clear':
        return 'linear-gradient(to bottom, #0c1445, #2c3e50)';
      case 'Clouds':
        return 'linear-gradient(to bottom, #2c3e50, #34495e)';
      case 'Rain':
      case 'Drizzle':
        return 'linear-gradient(to bottom, #1a1a2e, #16213e)';
      case 'Thunderstorm':
        return 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)';
      case 'Snow':
        return 'linear-gradient(to bottom, #343a40, #6c757d)';
      case 'Mist':
      case 'Fog':
        return 'linear-gradient(to bottom, #2d3436, #636e72)';
      default:
        return 'linear-gradient(to bottom, #0c1445, #2c3e50)';
    }
  }
};

/**
 * Group forecast data by day
 * @param {Array} forecastList - List of forecast items
 * @returns {Object} - Forecast data grouped by day
 */
// PUBLIC_INTERFACE
export const groupForecastByDay = (forecastList) => {
  const grouped = {};

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    if (!grouped[day]) {
      grouped[day] = [];
    }
    
    grouped[day].push(item);
  });
  
  return grouped;
};
