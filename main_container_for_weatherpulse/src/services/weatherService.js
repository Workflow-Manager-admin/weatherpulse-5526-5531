import axios from 'axios';

// Using OpenWeather API for demonstration purposes
// In a real app, you would use environment variables for API keys
// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_KEY = 'demo_key'; // Replace with actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// For development, we'll create mock data to avoid API rate limits
const mockCurrentWeather = {
  name: 'New York',
  main: {
    temp: 22.5,
    feels_like: 23,
    humidity: 65,
    pressure: 1013
  },
  weather: [
    {
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  wind: {
    speed: 3.5,
    deg: 220
  },
  sys: {
    country: 'US',
    sunrise: 1621148892,
    sunset: 1621200073
  }
};

const mockForecast = {
  list: [
    {
      dt: 1621180800,
      main: {
        temp: 24,
        feels_like: 24.5,
        humidity: 62
      },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 3.8 },
      dt_txt: '2023-05-22 12:00:00'
    },
    {
      dt: 1621191600,
      main: {
        temp: 26.2,
        feels_like: 26.7,
        humidity: 55
      },
      weather: [{ main: 'Clouds', description: 'few clouds', icon: '02d' }],
      wind: { speed: 4.1 },
      dt_txt: '2023-05-22 15:00:00'
    },
    {
      dt: 1621202400,
      main: {
        temp: 21.5,
        feels_like: 21.8,
        humidity: 68
      },
      weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03n' }],
      wind: { speed: 3.2 },
      dt_txt: '2023-05-22 18:00:00'
    },
    {
      dt: 1621213200,
      main: {
        temp: 19.8,
        feels_like: 19.9,
        humidity: 73
      },
      weather: [{ main: 'Clouds', description: 'broken clouds', icon: '04n' }],
      wind: { speed: 2.8 },
      dt_txt: '2023-05-22 21:00:00'
    },
    {
      dt: 1621224000,
      main: {
        temp: 18.5,
        feels_like: 18.6,
        humidity: 78
      },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01n' }],
      wind: { speed: 2.5 },
      dt_txt: '2023-05-23 00:00:00'
    }
  ],
  city: {
    name: 'New York',
    country: 'US'
  }
};

/**
 * Get current weather data for a location
 * @param {string} location - City name or coordinates
 * @returns {Promise} - Weather data
 */
// PUBLIC_INTERFACE
export const getCurrentWeather = async (location) => {
  try {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve({ data: mockCurrentWeather });
    }
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        units: 'metric',
        appid: API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

/**
 * Get weather forecast for a location
 * @param {string} location - City name or coordinates
 * @returns {Promise} - Forecast data
 */
// PUBLIC_INTERFACE
export const getForecast = async (location) => {
  try {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve({ data: mockForecast });
    }
    
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: location,
        units: 'metric',
        appid: API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Get weather by geolocation coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} - Weather data
 */
// PUBLIC_INTERFACE
export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve({ data: mockCurrentWeather });
    }
    
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: API_KEY
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};
