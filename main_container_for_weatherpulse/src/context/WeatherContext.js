import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getCurrentWeather, getForecast } from '../services/weatherService';

// Initial state for the weather context
const initialState = {
  location: 'New York',
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  units: 'metric' // 'metric' for Celsius, 'imperial' for Fahrenheit
};

// Action types
const ACTIONS = {
  SET_LOCATION: 'SET_LOCATION',
  FETCH_WEATHER_START: 'FETCH_WEATHER_START',
  FETCH_WEATHER_SUCCESS: 'FETCH_WEATHER_SUCCESS',
  FETCH_WEATHER_ERROR: 'FETCH_WEATHER_ERROR',
  FETCH_FORECAST_SUCCESS: 'FETCH_FORECAST_SUCCESS',
  TOGGLE_UNITS: 'TOGGLE_UNITS'
};

// Reducer function
const weatherReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case ACTIONS.FETCH_WEATHER_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ACTIONS.FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentWeather: action.payload
      };
    case ACTIONS.FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        forecast: action.payload
      };
    case ACTIONS.FETCH_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ACTIONS.TOGGLE_UNITS:
      return {
        ...state,
        units: state.units === 'metric' ? 'imperial' : 'metric'
      };
    default:
      return state;
  }
};

// Create context
const WeatherContext = createContext();

// PUBLIC_INTERFACE
export const useWeather = () => useContext(WeatherContext);

// Provider component
// PUBLIC_INTERFACE
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // Fetch weather data when location changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!state.location) return;
      
      dispatch({ type: ACTIONS.FETCH_WEATHER_START });
      
      try {
        // Fetch current weather
        const weatherResponse = await getCurrentWeather(state.location);
        dispatch({ 
          type: ACTIONS.FETCH_WEATHER_SUCCESS, 
          payload: weatherResponse.data 
        });
        
        // Fetch forecast
        const forecastResponse = await getForecast(state.location);
        dispatch({ 
          type: ACTIONS.FETCH_FORECAST_SUCCESS, 
          payload: forecastResponse.data 
        });
      } catch (error) {
        dispatch({ 
          type: ACTIONS.FETCH_WEATHER_ERROR, 
          payload: 'Failed to fetch weather data. Please try again.' 
        });
      }
    };
    
    fetchWeatherData();
  }, [state.location]);

  // Actions
  const setLocation = (location) => {
    dispatch({ type: ACTIONS.SET_LOCATION, payload: location });
  };
  
  const toggleUnits = () => {
    dispatch({ type: ACTIONS.TOGGLE_UNITS });
  };

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        setLocation,
        toggleUnits
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
