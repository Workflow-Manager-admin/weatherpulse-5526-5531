import React from 'react';

// PUBLIC_INTERFACE
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;
