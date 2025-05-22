import React, { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { FaSearch } from 'react-icons/fa';

// PUBLIC_INTERFACE
const SearchBar = () => {
  const { setLocation } = useWeather();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setLocation(searchValue);
      setSearchValue('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
